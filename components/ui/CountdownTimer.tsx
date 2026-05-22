'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface CountdownTimerProps {
  /** Target date or duration in seconds */
  targetDate?: Date
  durationSeconds?: number
  onExpire?: () => void
  className?: string
  showLabels?: boolean
  compact?: boolean
}

interface TimeLeft {
  hours: number
  minutes: number
  seconds: number
  days?: number
}

function calculateTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 }

  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds }
}

export function CountdownTimer({
  targetDate,
  durationSeconds,
  onExpire,
  className,
  showLabels = true,
  compact = false,
}: CountdownTimerProps) {
  const [target] = useState<Date>(() => {
    if (targetDate) return targetDate
    if (durationSeconds) return new Date(Date.now() + durationSeconds * 1000)
    // Default: 24 hours from now
    return new Date(Date.now() + 24 * 60 * 60 * 1000)
  })

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(target))
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const tl = calculateTimeLeft(target)
      setTimeLeft(tl)
      if (tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
        setExpired(true)
        clearInterval(interval)
        onExpire?.()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [target, onExpire])

  if (expired) return null

  const units = compact
    ? [
        { value: timeLeft.hours, label: 'h' },
        { value: timeLeft.minutes, label: 'm' },
        { value: timeLeft.seconds, label: 's' },
      ]
    : [
        ...(timeLeft.days && timeLeft.days > 0
          ? [{ value: timeLeft.days, label: 'días' }]
          : []),
        { value: timeLeft.hours, label: 'horas' },
        { value: timeLeft.minutes, label: 'min' },
        { value: timeLeft.seconds, label: 'seg' },
      ]

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {units.map((unit, idx) => (
        <span key={unit.label} className="flex items-center gap-1">
          <span className="tabular-nums font-mono font-bold text-inherit">
            {String(unit.value).padStart(2, '0')}
          </span>
          {showLabels && (
            <span className="text-inherit opacity-60 text-[0.7em]">{unit.label}</span>
          )}
          {idx < units.length - 1 && (
            <span className="text-inherit opacity-40 font-bold">:</span>
          )}
        </span>
      ))}
    </div>
  )
}

export default CountdownTimer
