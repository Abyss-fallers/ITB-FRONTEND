interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'secondary' | 'danger'
  rounded?: boolean
  iconOnly?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = 'medium',
  variant = 'primary',
  rounded = false,
  iconOnly = false,
  className,
  disabled = false,
  ...props
}) => {
  let buttonClasses = 'button'

  switch (size) {
    case 'small':
      buttonClasses += ' button--small'
      break
    case 'large':
      buttonClasses += ' button--large'
      break
    default:
      buttonClasses += ' button--medium'
      break
  }

  switch (variant) {
    case 'primary':
      buttonClasses += ' button--primary'
      break
    case 'secondary':
      buttonClasses += ' button--secondary'
      break
    case 'danger':
      buttonClasses += ' button--danger'
      break
    default:
      buttonClasses += ' button--primary'
      break
  }

  if (rounded) {
    buttonClasses += ' button--rounded'
  }

  if (iconOnly) {
    buttonClasses += ' button--icon-only'
  }

  if (className) {
    buttonClasses += ` ${className}`
  }

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
