import styles from '@/styles/(auth)/Auth.module.css'
import {
  DEFAULT_AUTO_COMPLETE,
  DEFAULT_REQUIRED,
  DEFAULT_TYPE,
} from './constants'
import { InputFieldProps } from './interfaces'

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = DEFAULT_TYPE,
  placeholder,
  value,
  error,
  touched,
  onChange,
  onBlur,
  required = DEFAULT_REQUIRED,
  autoComplete = DEFAULT_AUTO_COMPLETE,
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

export default InputField
