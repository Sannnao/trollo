import React from 'react';

type InputProps = {
  placeholder: string
  setValue(value: string): void
  value: string
  type?: string
}

export const Input: React.FC<InputProps> = ({ placeholder, setValue, value, type = 'text' }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return (
    <div className="input-field col s6">
      <input
        id={placeholder}
        className="input-field"
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <label htmlFor={placeholder}>{placeholder}</label>
    </div>

  );
};
