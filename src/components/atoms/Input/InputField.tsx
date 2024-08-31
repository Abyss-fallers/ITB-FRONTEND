import './InputField.css'
import { InputFieldProps } from './interfaces'

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  type = 'text',
  options = [],
  autoComplete,
}) => {
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (type === 'select' && e.target instanceof HTMLSelectElement) {
      onChange(e as React.ChangeEvent<HTMLSelectElement>)
    } else if (type !== 'select' && e.target instanceof HTMLInputElement) {
      onChange(e as React.ChangeEvent<HTMLInputElement>)
    }
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLSelectElement>,
  ) => {
    if (type === 'select' && e.target instanceof HTMLSelectElement) {
      onBlur(e as React.FocusEvent<HTMLSelectElement>)
    } else if (type !== 'select' && e.target instanceof HTMLInputElement) {
      onBlur(e as React.FocusEvent<HTMLInputElement>)
    }
  }

  if (type === 'select') {
    return (
      <div className="field">
        <label htmlFor={id}>{label}</label>
        <select
          id={id}
          value={value as string}
          onChange={handleChange}
          onBlur={handleBlur}
          className="field__input"
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && touched && <span className="field__error">{error}</span>}
      </div>
    )
  }

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete={autoComplete}
        className="field__input"
      />
      {error && touched && <span className="field__error">{error}</span>}
    </div>
  )
}

export default InputField
