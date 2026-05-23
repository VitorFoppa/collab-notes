import { useEffect, useState } from 'react'

export function DisconnectOverlay() {
  const [terminalLines, setTerminalLines] = useState<string[]>([])

  // Simula linhas de log do terminal quebrando antes do colapso
  useEffect(() => {
    const logs = [
      '[SYS] Iniciando protocolo de encerramento...',
      '[AUTH] Revogando chaves de acesso...',
      '[NET] Desconectando do node central...',
      '[FATAL] SINAL PERDIDO.'
    ]
    
    logs.forEach((text, index) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, text])
      }, index * 300)
    })
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black font-mono select-none overflow-hidden">
      
      {/* EFEITO DE SCANLINES (Linhas de TV antiga) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px]" 
      />

      {/* RUIDO / ESTÁTICA PISCANDO */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] bg-[radial-gradient(circle,_transparent_20%,_black_70%)] animate-pulse" />

      {/* CONTEÚDO DO TERMINAL */}
      <div className="w-full max-w-md p-6 space-y-4 text-left border border-red-500/20 bg-red-950/10 backdrop-blur-sm rounded-lg shadow-[0_0_30px_rgba(239,68,68,0.1)]">
        
        <div className="flex items-center gap-2 text-red-500 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_#EF4444]" />
          <span className="text-xs font-bold uppercase tracking-widest">[ CONEXÃO INTERROMPIDA ]</span>
        </div>

        <div className="space-y-1 text-sm text-red-400/80 font-mono">
          {terminalLines.map((line, i) => (
            <p key={i} className={i === 3 ? "text-red-500 font-bold tracking-wider animate-bounce mt-2" : ""}>
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* FLASH DE ESTÁTICA BRANCA NA TELA */}
      <div className="absolute inset-0 bg-white/5 pointer-events-none animate-[ping_0.5s_ease-in-out_infinite]" />
    </div>
  )
}