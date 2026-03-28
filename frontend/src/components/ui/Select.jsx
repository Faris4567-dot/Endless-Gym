import { forwardRef } from 'react';

const Select = forwardRef(({
    label,
    error,
    options = [],
    className = '',
    placeholder = 'Select an option',
    ...props
}, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-dark-700 mb-2">
                    {label}
                </label>
            )}
            <select
                ref={ref}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${error
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-dark-300 focus:ring-primary-500 focus:border-transparent'
                    } bg-white ${className}`}
                {...props}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
});

Select.displayName = 'Select';

export default Select;

