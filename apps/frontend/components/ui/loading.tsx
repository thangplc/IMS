import { cn } from '@/lib/utils'

interface LoadingProps {
  /**
   * Size of the spinner
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  
  /**
   * Loading text to display below spinner
   */
  text?: string
  
  /**
   * Whether to center the spinner in viewport (fullscreen)
   * @default false
   */
  fullscreen?: boolean
  
  /**
   * Additional className for the container
   */
  className?: string
  
  /**
   * Spinner color variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'white'
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-4',
  lg: 'h-12 w-12 border-4',
  xl: 'h-16 w-16 border-4',
}

const variantClasses = {
  primary: 'border-primary border-t-transparent',
  secondary: 'border-gray-600 border-t-transparent',
  white: 'border-white border-t-transparent',
}

export function Loading({
  size = 'md',
  text,
  fullscreen = false,
  className,
  variant = 'primary',
}: LoadingProps) {
  const content = (
    <div className={cn('text-center', className)}>
      <div
        className={cn(
          'animate-spin rounded-full mx-auto',
          sizeClasses[size],
          variantClasses[variant]
        )}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className="mt-4 text-sm text-gray-600 animate-pulse">
          {text}
        </p>
      )}
    </div>
  )

  if (fullscreen) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        {content}
      </div>
    )
  }

  return content
}

/**
 * Inline loading spinner (no text, smaller)
 */
export function LoadingSpinner({
  size = 'sm',
  variant = 'primary',
  className,
}: Pick<LoadingProps, 'size' | 'variant' | 'className'>) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  )
}

/**
 * Loading overlay (covers parent container)
 */
export function LoadingOverlay({
  text,
  size = 'lg',
  className,
}: Pick<LoadingProps, 'text' | 'size' | 'className'>) {
  return (
    <div className={cn(
      'absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50',
      className
    )}>
      <Loading size={size} text={text} />
    </div>
  )
}

/**
 * Skeleton loader for content placeholders
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200', className)}
      {...props}
    />
  )
}
