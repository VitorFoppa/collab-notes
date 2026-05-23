import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { GlassCard } from '../components/ui/GlassCard'
import { CyberInput } from '../components/ui/CyberInput'
import { NeonButton } from '../components/ui/NeonButton'
import { AnimatedBackground } from '../components/AnimatedBackground'
import { useAuth } from '../context/AuthContext'

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false) 

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    setAuthError('')
    setIsLoading(true)

    try {
      await login(email, password)
      setIsSuccess(true)

      setTimeout(() => {
        navigate('/')
      }, 1200)
    } catch (error: any) {
      setAuthError(error?.response?.data?.detail || 'BAD_CREDENTIALS')
      setIsLoading(false)
    }
  }

  // Intercepta o clique de registro para rodar o efeito visual primeiro
  const handleRegisterNavigation = () => {
    if (!isLoading && !isSuccess && !isRegistering) {
      setIsRegistering(true)

      // Aguarda 1 segundo da animação de transição antes de mudar de página
      setTimeout(() => {
        navigate('/register')
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent">
      <AnimatedBackground />

      {/* ESTILOS DE ANIMAÇÃO DO TERMINAL */}
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

      {/* TELA DE SUCESSO (LOGIN ACEITO) */}
      {isSuccess && (
        <div className="absolute inset-0 bg-emerald-950/20 backdrop-blur-md z-50 flex flex-col items-center justify-center transition-all duration-300">
          <div 
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981] opacity-70"
            style={{ animation: 'cyber-scanline 1.2s linear infinite' }}
          />

          <div className="text-center font-mono space-y-4 max-w-xs px-4">
            <div 
              className="text-emerald-400 text-xs font-bold tracking-[0.25em] p-3 border border-emerald-500/30 bg-black/80 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              style={{ animation: 'cyber-glitch 1s infinite' }}
            >
              [ ACCESS_GRANTED ]
            </div>
            
            <div className="text-[9px] text-emerald-500/70 text-left space-y-1 bg-black/60 p-4 rounded-xl border border-emerald-500/10 backdrop-blur-sm">
              <p className="animate-pulse">_ HANDSHAKE_LINK: ESTABLISHED</p>
              <p className="delay-150 animate-pulse">_ INITIALIZING PROTOCOL_CORE...</p>
              <p className="delay-300 text-emerald-400 font-bold">_ REDIRECTING TO MAIN_FRAME.</p>
            </div>
          </div>
        </div>
      )}

      {/* TELA DE REDIRECIONAMENTO (CRIAR NOVO OPERADOR) */}
      {isRegistering && (
        <div className="absolute inset-0 bg-purple-950/20 backdrop-blur-md z-50 flex flex-col items-center justify-center transition-all duration-300">
          {/* Laser de varredura roxo/magenta para diferenciar do login */}
          <div 
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_12px_#a855f7] opacity-70"
            style={{ animation: 'cyber-scanline 1s linear infinite' }}
          />

          <div className="text-center font-mono space-y-4 max-w-xs px-4">
            <div 
              className="text-purple-400 text-xs font-bold tracking-[0.15em] p-3 border border-purple-500/30 bg-black/80 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.2)]"
              style={{ animation: 'cyber-glitch 1s infinite' }}
            >
              [ NEW_OPERATOR_UPLINK ]
            </div>
            
            <div className="text-[9px] text-purple-500/70 text-left space-y-1 bg-black/60 p-4 rounded-xl border border-purple-500/10 backdrop-blur-sm">
              <p className="animate-pulse">_ ALLOCATING_NEW_MEMORY_NODE...</p>
              <p className="delay-150 animate-pulse">_ SECURING REGISTRATION_STREAM...</p>
              <p className="delay-300 text-purple-400 font-bold">_ REDIRECTING HANDSHAKE.</p>
            </div>
          </div>
        </div>
      )}

      {/* CASULO DE TRANSIÇÃO DO FORMULÁRIO (Reage se der Sucesso OU se for para o Registro) */}
      <div 
        className={`
          z-10 transition-all duration-700 ease-in-out
          ${isSuccess || isRegistering ? 'scale-95 opacity-0 blur-md pointer-events-none' : 'scale-100 opacity-100'}
        `}
      >
        <GlassCard className="w-[400px]" title="AUTH_GATEWAY_v1.0">
          
          <div className="text-center mb-6 select-none">
            <h1 className="font-mono text-xl font-black text-cyan-400 tracking-[0.2em]">
              COLLAB://ACCESS
            </h1>
            <p className="font-mono text-[9px] uppercase text-slate-500 tracking-widest mt-1.5">
              Establish secure handshake link
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            
            <CyberInput
              label="Terminal Identity (E-mail)"
              type="email"
              placeholder="operator@system.io"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || isSuccess || isRegistering}
              error={authError ? 'ACCESS_DENIED' : undefined}
            />

            <CyberInput
              label="Access Encryption (Senha)"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading || isSuccess || isRegistering}
              error={authError ? authError : undefined}
            />

            {/* PAINEL DE ERRO */}
            {authError && (
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-2.5 text-center animate-pulse">
                <p className="font-mono text-[10px] text-rose-400 tracking-wider">
                  [SYSTEM_ERROR]: {authError}
                </p>
              </div>
            )}

            <NeonButton
              type="submit"
              className="w-full mt-2"
              variant={isLoading ? 'purple' : 'cyan'}
              disabled={isLoading || isSuccess || isRegistering}
            >
              {isLoading ? '[ ESTABLISHING_LINK... ]' : '[ INITIALIZE_SESSION ]'}
            </NeonButton>
          </form>

          {/* ÁREA DO BOTÃO DE REGISTRO */}
          <div className="mt-6 text-center">
            <button
              onClick={handleRegisterNavigation}
              disabled={isLoading || isSuccess || isRegistering}
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
                
                hover:text-cyan-400
                hover:border-cyan-500/30
                hover:bg-cyan-500/5
                hover:shadow-[0_0_12px_rgba(34,211,238,0.1)]
                
                disabled:opacity-30
                disabled:pointer-events-none
              "
            >
              <span className="text-slate-600 group-hover/btn:text-cyan-400 transition-colors duration-200">
                {isLoading || isSuccess || isRegistering ? '■' : '>'}
              </span>
              
              <span>CREATE_NEW_OPERATOR</span>
              
              <span className="w-1.5 h-3 bg-cyan-400 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-pulse transition-opacity duration-200 shadow-[0_0_6px_#00F5FF]"></span>
            </button>
          </div>

        </GlassCard>
      </div>
    </div>
  )
}