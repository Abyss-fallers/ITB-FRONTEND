import { Size, Variant } from './constants'

export interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size?: Size
  variant?: Variant
  rounded?: boolean
  type: 'button' | 'reset' | 'submit'
}

export interface IconOnlyButtonProps extends BaseButtonProps {
  variant: 'iconOnly'
  iconOnly: true
  'aria-label': string
  title: string
}

export interface RegularButtonProps extends BaseButtonProps {
  variant: Exclude<Variant, 'iconOnly'>
  iconOnly?: false
}

export type ButtonProps = IconOnlyButtonProps | RegularButtonProps
