export interface InputFieldProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  value: string
  error: string | null
  touched: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  required?: boolean
  autoComplete?: string
}
