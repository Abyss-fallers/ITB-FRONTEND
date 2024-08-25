export const SIZES = ['small', 'medium', 'large'] as const
export const VARIANTS = ['primary', 'secondary', 'danger', 'iconOnly'] as const

export type Size = (typeof SIZES)[number]
export type Variant = (typeof VARIANTS)[number]
