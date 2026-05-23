import type { ButtonHTMLAttributes, ReactNode } from 'react'


type NeonButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'cyan' | 'pink' | 'purple'
}

export function NeonButton({
  children,
  variant = 'cyan',
  className = '',
  ...props 
}: NeonButtonProps) {
  
  const variants = {
    cyan: {
      border: 'border-cyan-500/30 hover:border-cyan-400',
      text: 'text-cyan-400 group-hover:text-black',
      bgHover: 'hover:bg-gradient-to-r hover:from-cyan-400 hover:to-cyan-500',
      shadow: 'hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]'
    },
    pink: {
      border: 'border-pink-500/30 hover:border-pink-400',
      text: 'text-pink-400 group-hover:text-black',
      bgHover: 'hover:bg-gradient-to-r hover:from-pink-400 hover:to-pink-500',
      shadow: 'hover:shadow-[0_0_25px_rgba(244,63,94,0.35)]'
    },
    purple: {
      border: 'border-fuchsia-500/30 hover:border-fuchsia-400',
      text: 'text-fuchsia-400 group-hover:text-black',
      bgHover: 'hover:bg-gradient-to-r hover:from-fuchsia-400 hover:to-fuchsia-500',
      shadow: 'hover:shadow-[0_0_25px_rgba(217,70,239,0.35)]'
    }
  }

  const currentVariant = variants[variant]

  return (
    <button
      {...props}
      className={`
        group
        relative
        px-5
        py-2.5
        font-mono
        text-xs
        font-bold
        uppercase
        tracking-widest
        bg-black/40
        backdrop-blur-sm
        border
        rounded-lg
        cursor-pointer
        transition-all
        duration-300

        /* Injeção das classes dinâmicas baseadas na variante ativa */
        ${currentVariant.border}
        ${currentVariant.text}
        ${currentVariant.bgHover}
        ${currentVariant.shadow}

        /* Mecânicas de clique e estados desabilitados */
        active:scale-[0.97]
        disabled:opacity-30
        disabled:cursor-not-allowed
        disabled:pointer-events-none
        
        ${className}
      `}
    >
      {/* Container interno para garantir alinhamento caso você use ícones junto com o texto */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  )
}