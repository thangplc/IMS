import * as React from 'react'
import { cn } from '@/lib/utils'
import { LoadingSpinner } from './loading'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  /**
   * Show loading spinner and disable button
   */
  isLoading?: boolean
  /**
   * Icon to show before children (ignored if isLoading)
   */
  icon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'default',
    isLoading = false,
    icon,
    children,
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-primary text-primary-foreground hover:bg-primary/90':
              variant === 'default',
            'bg-destructive text-destructive-foreground hover:bg-destructive/90':
              variant === 'destructive',
            'border border-input bg-background hover:bg-accent hover:text-accent-foreground':
              variant === 'outline',
            'hover:bg-accent hover:text-accent-foreground':
              variant === 'ghost',
          },
          {
            'h-10 px-4 py-2 text-sm': size === 'default',
            'h-9 rounded-md px-3 text-xs': size === 'sm',
            'h-11 rounded-md px-8 text-base': size === 'lg',
          },
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <LoadingSpinner 
              size="sm" 
              variant={variant === 'outline' ? 'primary' : 'white'}
            />
            {children}
          </>
        ) : (
          <>
            {icon && <span className="inline-flex">{icon}</span>}
            {children}
          </>
        )}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
