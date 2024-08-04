import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type = 'button', className = '' }) => (
  <button type={type} onClick={onClick} className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}>
    {children}
  </button>
);

export default Button;
