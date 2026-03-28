import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ProgramsPage from './pages/public/ProgramsPage';
import TrainersPage from './pages/public/TrainersPage';
import MembershipPage from './pages/public/MembershipPage';
import GalleryPage from './pages/public/GalleryPage';
import ContactPage from './pages/public/ContactPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import MembersPage from './pages/admin/MembersPage';
import TrainersPageAdmin from './pages/admin/TrainersPage';
import ProgramsManagementPage from './pages/admin/ProgramsManagementPage';
import MembershipsPage from './pages/admin/MembershipsPage';
import InquiriesPage from './pages/admin/InquiriesPage';

// Protected Route Component
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/programs" element={<ProgramsPage />} />
                    <Route path="/trainers" element={<TrainersPage />} />
                    <Route path="/membership" element={<MembershipPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/contact" element={<ContactPage />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }>
                        <Route path="dashboard" element={<DashboardPage />} />
                        <Route path="members" element={<MembersPage />} />
                        <Route path="trainers" element={<TrainersPageAdmin />} />
                        <Route path="programs" element={<ProgramsManagementPage />} />
                        <Route path="memberships" element={<MembershipsPage />} />
                        <Route path="inquiries" element={<InquiriesPage />} />
                    </Route>

                    {/* Catch all - redirect to home */}
                    <Route path="*" element={<HomePage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

