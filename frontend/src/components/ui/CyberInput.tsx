import type { InputHTMLAttributes } from 'react'

type CyberInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string // <-- Essencial para validações de formulário (ex: React Hook Form)
}

export function CyberInput({ label, error, ...props }: CyberInputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full group">
      
      {/* LABEL ESTILO VARIÁVEL DE SISTEMA */}
      {label && (
        <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-cyan-400/60 group-focus-within:text-cyan-400 transition-colors flex items-center gap-1 select-none">
          <span className="text-cyan-500/40 group-focus-within:text-cyan-400">&gt;</span> 
          {label}
        </label>
      )}

      {/* CONTAINER DO INPUT */}
      <div className="relative">
        <input
          {...props}
          className={`
            w-full
            px-4
            py-2.5
            font-mono
            text-xs
            bg-black/40
            text-slate-200
            rounded-lg
            border
            outline-none
            transition-all
            duration-300
            placeholder:text-slate-600

            /* Alterna as cores de borda e brilho neon caso haja erro ativo */
            ${
              error
                ? `
                  border-rose-500/30
                  text-rose-200
                  focus:border-rose-500/60
                  focus:shadow-[0_0_15px_rgba(244,63,94,0.12)]
                `
                : `
                  border-white/5
                  focus:border-cyan-500/40
                  focus:shadow-[0_0_15px_rgba(0,245,255,0.08)]
                `
            }
            ${props.className || ''}
          `}
        />

        {/* Micro indicador decorativo no canto direito superior que acende no foco */}
        <div className={`
          absolute top-0 right-0 w-1.5 h-[1px] transition-all duration-300
          ${error ? 'bg-rose-500/50' : 'bg-cyan-400/40 opacity-0 group-focus-within:opacity-100'}
        `} />
      </div>

      {/* PRINT DE ERRO ESTILO DIAGNÓSTICO DE COMPILADOR */}
      {error && (
        <span className="font-mono text-[10px] text-rose-400/90 tracking-wide mt-0.5 flex items-center gap-1 animate-pulse">
          // ERR_STATUS: [ {error} ]
        </span>
      )}
    </div>
  )
}