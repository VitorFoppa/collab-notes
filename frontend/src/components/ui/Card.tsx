import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function Card({
  children,
  className = '',
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative

        bg-white/5

        border
        border-white/10

        rounded-2xl

        p-5

        backdrop-blur-md

        shadow-lg

        transition-all
        duration-300

        ${className}
      `}
    >
      {children}
    </div>
  )
}