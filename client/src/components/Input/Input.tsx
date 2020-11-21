import React from 'react';
import './input.scss';

type InputProps = {
  placeholder: string
  onChange(e: React.FormEvent<HTMLInputElement>): void
  value: string
  type?: string
}

export const Input: React.FC<InputProps> = ({ placeholder, onChange, value, type = 'text' }) => (
  <input
    id={placeholder}
    className="input-field"
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);
