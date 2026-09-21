import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Restore and verify admin session
    useEffect(() => {
        const restoreSession = async () => {
            const token = localStorage.getItem('adminToken');

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await authAPI.getProfile();

                if (response.data.success) {
                    const adminData = response.data.admin;

                    setAdmin(adminData);
                    localStorage.setItem(
                        'adminInfo',
                        JSON.stringify(adminData)
                    );
                } else {
                    logout();
                }
            } catch (error) {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminInfo');
                setAdmin(null);
            } finally {
                setLoading(false);
            }
        };

        restoreSession();
    }, []);

    // Login
    const login = async (email, password) => {
        try {
            setError(null);

            const response = await authAPI.login({
                email,
                password,
            });

            if (response.data.success) {
                const { token, admin: adminData } = response.data;

                localStorage.setItem('adminToken', token);
                localStorage.setItem(
                    'adminInfo',
                    JSON.stringify(adminData)
                );

                setAdmin(adminData);

                return {
                    success: true,
                    admin: adminData,
                };
            }

            const message =
                response.data.message || 'Login failed';

            setError(message);

            return {
                success: false,
                message,
            };
        } catch (err) {
            const message =
                err.response?.data?.message ||
                'Unable to login. Please try again.';

            setError(message);

            return {
                success: false,
                message,
            };
        }
    };

    // Logout
    const logout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');

        setAdmin(null);
        setError(null);
    };

    const value = {
        admin,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!admin,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;