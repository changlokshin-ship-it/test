import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-fill-primary-01 text-fill-white hover:bg-fill-primary-02 disabled:opacity-40',
  secondary: 'bg-fill-secondary-01 text-fill-white hover:bg-fill-secondary-02 disabled:opacity-40',
  tertiary:
    'border border-border-default bg-fill-tertiary-01 text-text-default hover:border-border-strong disabled:text-text-disabled',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-6 px-2 py-1 text-caption-base',
  md: 'h-8 px-3 py-1.5 text-caption-base',
  lg: 'h-10 px-3 py-3 text-body-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  leadingIcon,
  trailingIcon,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-px whitespace-nowrap rounded-2 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className ?? ''}`}
      {...rest}
    >
      {leadingIcon && <span className="size-5 shrink-0">{leadingIcon}</span>}
      {children}
      {trailingIcon && <span className="size-5 shrink-0">{trailingIcon}</span>}
    </button>
  )
}
