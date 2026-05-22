import { cn } from '@/lib/utils'

type BadgeColor = 'gold' | 'red' | 'green' | 'blue' | 'purple' | 'gray'
type BadgeSize = 'sm' | 'md'

interface BadgeProps {
  text: string
  color?: BadgeColor
  size?: BadgeSize
  className?: string
  pulse?: boolean
}

const colorStyles: Record<BadgeColor, string> = {
  gold: 'bg-amber-500/20 text-amber-300 border-amber-500/40 ring-amber-500/20',
  red: 'bg-red-500/20 text-red-300 border-red-500/40 ring-red-500/20',
  green: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 ring-emerald-500/20',
  blue: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 ring-indigo-500/20',
  purple: 'bg-purple-500/20 text-purple-300 border-purple-500/40 ring-purple-500/20',
  gray: 'bg-white/5 text-white/60 border-white/10 ring-white/5',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[10px] tracking-wider',
  md: 'px-2.5 py-1 text-xs tracking-wider',
}

export function Badge({ text, color = 'gray', size = 'md', className, pulse = false }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-bold uppercase rounded-full border ring-1',
        colorStyles[color],
        sizeStyles[size],
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span
            className={cn(
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
              color === 'red' && 'bg-red-400',
              color === 'gold' && 'bg-amber-400',
              color === 'green' && 'bg-emerald-400',
              color === 'blue' && 'bg-indigo-400'
            )}
          />
          <span
            className={cn(
              'relative inline-flex rounded-full h-1.5 w-1.5',
              color === 'red' && 'bg-red-500',
              color === 'gold' && 'bg-amber-500',
              color === 'green' && 'bg-emerald-500',
              color === 'blue' && 'bg-indigo-500'
            )}
          />
        </span>
      )}
      {text}
    </span>
  )
}

export default Badge
