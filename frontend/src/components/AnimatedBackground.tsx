export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0f1d]">
      {/* CSS embutido para as animações de movimento */}
      <style>{`
        @keyframes cyber-drift-1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.1); }
        }
        @keyframes cyber-drift-2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-40px, 40px) scale(1.1); }
        }
        @keyframes crt-scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
      `}</style>

      {/* GLOW CIANO (Mais forte e visível) */}
      <div
        className="
          absolute
          -top-10
          -left-10
          w-[500px]
          h-[500px]
          bg-cyan-500/25
          blur-[80px]
          rounded-full
          pointer-events-none
        "
        style={{ animation: 'cyber-drift-1 15s infinite ease-in-out' }}
      />

      {/* GLOW ROXO (Mais forte e visível) */}
      <div
        className="
          absolute
          -bottom-10
          -right-10
          w-[500px]
          h-[500px]
          bg-purple-600/25
          blur-[80px]
          rounded-full
          pointer-events-none
        "
        style={{ animation: 'cyber-drift-2 18s infinite ease-in-out' }}
      />

      {/* GRID (Aumentado para opacity-15 para ficar bem visível) */}
      <div
        className="
          absolute
          inset-0
          opacity-15
          bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
          bg-[size:40px_40px]
        "
      />

      {/* SCANLINES (Linhas de monitor subindo de forma perceptível) */}
      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-[0.08]
          bg-[repeating-linear-gradient(
            0deg,
            rgba(255,255,255,0.1),
            rgba(255,255,255,0.1) 2px,
            transparent 2px,
            transparent 5px
          )]
        "
        style={{
          animation: 'crt-scanlines 20s linear infinite',
          backgroundSize: '100% 20px'
        }}
      />

      {/* VIGNETTE SUAVE */}
      <div 
        className="
          absolute 
          inset-0 
          pointer-events-none 
          bg-[radial-gradient(circle_at_center,transparent_50%,rgba(10,15,29,0.6)_100%)]
        " 
      />
    </div>
  )
}