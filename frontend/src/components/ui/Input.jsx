import { forwardRef } from 'react';

const Input = forwardRef(({
    label,
    error,
    icon,
    className = '',
    ...props
}, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-dark-700 mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-dark-400">{icon}</span>
                    </div>
                )}
                <input
                    ref={ref}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${error
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-dark-300 focus:ring-primary-500 focus:border-transparent'
                        } ${icon ? 'pl-10' : ''} ${className}`}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;

