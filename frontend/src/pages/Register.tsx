import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { GlassCard } from '../components/ui/GlassCard'
import { CyberInput } from '../components/ui/CyberInput'
import { NeonButton } from '../components/ui/NeonButton'
import { AnimatedBackground } from '../components/AnimatedBackground'
import { registerRequest } from '../services/authService'

export function Register() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false) // Novo estado para disparar o HUD de sucesso

  async function handleRegister(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await registerRequest(email, password)
      setIsSuccess(true) // Ativa a varredura e os logs de sincronização

      // Segura o operador por 1.5 segundos para a animação rodar perfeitamente
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (error: any) {
      setError(error?.response?.data || 'REGISTER_FAILED')
      setLoading(false) // Só desliga o loading em caso de erro
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent">
      <AnimatedBackground />

      {/* ESTILOS DE ANIMAÇÃO DO TERMINAL (SCANLINE + GLITCH EFFECT) */}
      <style>{`
        @keyframes cyber-scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes cyber-glitch {
          0%, 100% { transform: none; opacity: 1; }
          7% { transform: skew(-3deg); opacity: 0.8; }
          10% { transform: skew(3deg); opacity: 0.9; }
          15% { transform: none; }
        }
      `}</style>

      {/* TELA DE SUCESSO: HUD DE PROVISIONAMENTO (Contraste Ciano Neon contra o card Rosa) */}
      {isSuccess && (
        <div className="absolute inset-0 bg-cyan-950/20 backdrop-blur-md z-50 flex flex-col items-center justify-center transition-all duration-300">
          {/* Laser de varredura ciano elétrico */}
          <div 
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#00f5ff] opacity-70"
            style={{ animation: 'cyber-scanline 1.4s linear infinite' }}
          />

          <div className="text-center font-mono space-y-4 max-w-xs px-4">
            <div 
              className="text-cyan-400 text-xs font-bold tracking-[0.2em] p-3 border border-cyan-500/30 bg-black/80 rounded-xl shadow-[0_0_20px_rgba(0,245,255,0.2)]"
              style={{ animation: 'cyber-glitch 1s infinite' }}
            >
              [ IDENTITY_SYNCHRONIZED ]
            </div>
            
            <div className="text-[9px] text-cyan-500/70 text-left space-y-1 bg-black/60 p-4 rounded-xl border border-cyan-500/10 backdrop-blur-sm">
              <p className="animate-pulse">_ PROVISIONING_NEW_DATABASE_NODE...</p>
              <p className="delay-150 animate-pulse">_ INJECTING_CRYPTOGRAPHIC_KEYS...</p>
              <p className="delay-300 text-cyan-400 font-bold">_ OPERATOR_CREATED. DEPLOYING_GATEWAY.</p>
            </div>
          </div>
        </div>
      )}

      {/* CASULO DE TRANSIÇÃO DO FORMULÁRIO */}
      <div 
        className={`
          z-10 transition-all duration-700 ease-in-out
          ${isSuccess ? 'scale-95 opacity-0 blur-md pointer-events-none' : 'scale-100 opacity-100'}
        `}
      >
        <GlassCard className="w-[420px]" title="USER_CREATION_PROTOCOL">
          
          <div className="text-center mb-8 select-none">
            <h1 className="font-['Orbitron'] text-2xl font-black text-pink-400 tracking-[0.2em]">
              NEW_OPERATOR
            </h1>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mt-2">
              Initialize identity credentials
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <CyberInput
              label="Operator E-mail"
              type="email"
              placeholder="operator@cyber.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || isSuccess}
              required
            />

            <CyberInput
              label="Security Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading || isSuccess}
              required
              error={error || undefined}
            />

            {/* Painel sutil de erro do sistema (opcional, caso queira reforçar o log de erro) */}
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-2 text-center animate-pulse">
                <p className="font-mono text-[9px] text-rose-400 tracking-wider uppercase">
                  [CRITICAL_ERR]: {error}
                </p>
              </div>
            )}

            <NeonButton
              type="submit"
              className="w-full"
              variant="purple"
              disabled={loading || isSuccess}
            >
              {loading || isSuccess
                ? '[ CREATING_OPERATOR... ]'
                : '[ CREATE_ACCOUNT ]'}
            </NeonButton>
          </form>

          {/* ÁREA DO BOTÃO RETORNAR AO LOGIN (LINHA DE COMANDO ESTILIZADA) */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => !loading && !isSuccess && navigate('/login')}
              disabled={loading || isSuccess}
              className="
                group/btn
                relative
                inline-flex
                items-center
                justify-center
                gap-2
                
                font-mono
                text-[11px]
                uppercase
                tracking-[0.15em]
                text-slate-500
                
                border
                border-white/5
                bg-white/[0.01]
                
                px-4
                py-2
                rounded-lg
                cursor-pointer
                
                transition-all
                duration-300
                
                hover:text-pink-400
                hover:border-pink-500/30
                hover:bg-pink-500/5
                hover:shadow-[0_0_12px_rgba(244,114,182,0.1)]
                
                disabled:opacity-30
                disabled:pointer-events-none
              "
            >
              <span className="text-slate-600 group-hover/btn:text-pink-400 transition-colors duration-200">
                {loading || isSuccess ? '■' : '<'}
              </span>
              
              <span>RETURN_TO_GATEWAY</span>
              
              <span className="w-1.5 h-3 bg-pink-400 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-pulse transition-opacity duration-200 shadow-[0_0_6px_#f472b6]"></span>
            </button>
          </div>

        </GlassCard>
      </div>
    </div>
  )
}