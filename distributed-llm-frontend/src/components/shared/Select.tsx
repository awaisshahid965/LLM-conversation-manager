import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange, className = '' }) => (
  <select defaultValue={value} onChange={onChange} className={`px-4 py-2 border rounded ${className}`}>
    <option value="" selected disabled>
        Select Option
      </option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Select;
