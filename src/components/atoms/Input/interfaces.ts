import { ChangeEvent, FocusEvent } from 'react'

export interface InputFieldProps {
  id: string
  label: string
  placeholder?: string
  value: string
  onChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => void
  onBlur: (
    e: FocusEvent<HTMLInputElement> | FocusEvent<HTMLSelectElement>,
  ) => void
  error?: string | null
  touched: boolean
  type?: 'text' | 'password' | 'email' | 'select' | 'number'
  options?: string[]
  autoComplete?: string
}
