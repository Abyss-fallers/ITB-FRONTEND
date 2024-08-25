import './button.css'
import { SIZES, VARIANTS } from './constants'
import { ButtonProps } from './interfaces'

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
  const buttonClasses = [
    'button',
    SIZES.includes(size) ? size : undefined,
    VARIANTS.includes(variant) ? variant : undefined,
    rounded ? 'rounded' : undefined,
    variant === 'iconOnly' ? 'icon__only' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ')

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
