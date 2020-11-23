import React from 'react';
import './auth-form.scss';

type AuthFormProps = {
  children: React.ReactElement[],
  onSubmit(e: React.FormEvent<HTMLFormElement>): void,
  submitBtnText: string,
}

export const AuthForm = ({ children, onSubmit, submitBtnText }: AuthFormProps) => {
  return (
    <form
      className='auth-form'
      onSubmit={onSubmit}
    >
      {
        children.map((child, i) => {
          return (
            <div key={i} className='auth-form__input'>{child}</div>
          )
        })
      }
      <button className="auth-form__btn" type="submit">
        {submitBtnText}
      </button>
    </form >
  )
}
