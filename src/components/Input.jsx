import React from 'react';

const Input = ({ label, error, className = '', ...props }) => {
    return (
        <div className={`input-group ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    {label}
                </label>
            )}
            <input
                className={`input-field ${error ? 'border-red-500' : ''}`}
                {...props}
            />
            {error && (
                <span className="text-xs text-red-400 mt-1 block">{error}</span>
            )}
        </div>
    );
};

export default Input;
