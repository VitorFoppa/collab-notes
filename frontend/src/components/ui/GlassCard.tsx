import type { ReactNode } from 'react'

type GlassCardProps = {
  children: ReactNode
  className?: string
  title?: string 
}

export function GlassCard({ children, className = '', title }: GlassCardProps) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-xl
        border
        border-white/5
        bg-black/30
        backdrop-blur-md
        p-6
        transition-all
        duration-300
        group

        /* Hover states focados em brilho cirúrgico e não em sombras pesadas */
        hover:border-cyan-500/30
        hover:shadow-[0_0_30px_rgba(0,245,255,0.06)]
        
        ${className}
      `}
    >
      {/* GLOW DE TOPO (Linha neon sutil que acende quando o mouse passa por cima) */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

      {/* DETALHE CIBERNÉTICO (Micro cantoneira no canto superior direito) */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-800 group-hover:border-cyan-400/40 transition-colors duration-300" />

      {/* CABEÇALHO DO MÓDULO (Apenas renderiza se a prop title for enviada) */}
      {title && (
        <div className="mb-4 pb-2.5 border-b border-white/5 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-cyan-400/50 group-hover:text-cyan-400 transition-colors">//</span>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-400/80 group-hover:text-cyan-300 transition-colors">
              {title}
            </h3>
          </div>
          
          {/* Falsa tag de indexação do sistema */}
          <span className="font-mono text-[8px] text-slate-600 tracking-tighter group-hover:text-cyan-500/30 transition-colors">
            [SYS_MOD_4.0]
          </span>
        </div>
      )}

      {/* CONTEÚDO DO CARD */}
      <div className="relative z-10 text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
        {children}
      </div>
    </div>
  )
}