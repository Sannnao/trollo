import { useState } from 'react'

export const useInput = (initValue: any) => {
  const [value, setValue] = useState(initValue)

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setValue(e.currentTarget.value)
  }

  return {
    value,
    onChange,
  }
}
