import styles from '@/styles/(auth)/Auth.module.css'

interface InputFieldProps {
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

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  error,
  touched,
  onChange,
  onBlur,
  required = true,
  autoComplete = 'off',
}) => (
  <div className={styles.field}>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      required={required}
      autoComplete={autoComplete}
    />
    {touched && error && <span className={styles.error}>{error}</span>}
  </div>
)
