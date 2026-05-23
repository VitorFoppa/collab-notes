import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { GlassCard } from '../components/ui/GlassCard'
import { CyberInput } from '../components/ui/CyberInput'
import { NeonButton } from '../components/ui/NeonButton'
import { AnimatedBackground } from '../components/AnimatedBackground'
import { useAuth } from '../context/AuthContext' // Importando o contexto para pegar os dados atuais

export function Profile() {
  const { user, logout } = useAuth() // Puxando o operador atual e a função de deslogar
  const navigate = useNavigate()

  // Estados para edição de perfil sutil
  const [operatorTag, setOperatorTag] = useState('OPERATOR_' + Math.floor(1000 + Math.random() * 9000))
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    // Simula a injeção/gravação dos novos metadados na rede
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
    }, 800)
  }

  const handleLogoutClick = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (err) {
      console.error('Falha ao quebrar link de criptografia:', err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent p-4">
      <AnimatedBackground />

      <GlassCard className="w-full max-w-3xl" title="OPERATOR_CORE_DIAGNOSTICS_v1.0">
        
        {/* CABEÇALHO DO PERFIL */}
        <div className="flex flex-col md:flex-row gap-6 items-center border-b border-white/5 pb-6 mb-6 select-none">
          
          {/* AVATAR / ASSINATURA BIOMÉTRICA DIGITAL */}
          <div className="relative group/avatar w-24 h-24 rounded-xl border border-cyan-500/30 bg-black/50 flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            {/* Grid Matricial de Fundo */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:8px_8px]" />
            
            {/* Ícone Hacker */}
            <span className="font-mono text-3xl text-cyan-400 group-hover/avatar:scale-110 transition-transform duration-300">
              {isSaving ? '⏳' : '👁'}
            </span>

            {/* Tarjeta inferior de status */}
            <div className="absolute bottom-0 left-0 right-0 bg-cyan-950/80 border-t border-cyan-500/20 text-center py-0.5">
              <span className="font-mono text-[8px] text-cyan-400 tracking-widest animate-pulse">ONLINE</span>
            </div>
          </div>

          {/* METADADOS RÁPIDOS */}
          <div className="text-center md:text-left flex-1 font-mono">
            <h1 className="font-['Orbitron'] text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-500 tracking-wider">
              {operatorTag}
            </h1>
            <p className="text-slate-400 text-xs mt-1 lowercase select-all">
              uplink: {user?.email || 'unknown_node@system.io'}
            </p>
            
            {/* BADGES DE CLASSIFICAÇÃO NA REDE */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
              <span className="text-[9px] bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded text-cyan-400 font-bold tracking-wider">
                CLEARANCE_LEVEL_01
              </span>
              <span className="text-[9px] bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 rounded text-purple-400 font-bold tracking-wider">
                NODE_STABLE
              </span>
            </div>
          </div>
        </div>

        {/* MALHA PRINCIPAL DO PERFIL */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          
          {/* PAINEL ESQUERDO: FORMULÁRIO DE CONFIGURAÇÃO (3 colunas) */}
          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h2 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
                // Identity_Parameters
              </h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="font-mono text-[10px] text-cyan-400 hover:underline tracking-wider"
                >
                  [ MODIFY_TAG ]
                </button>
              )}
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <CyberInput
                label="Operator Tagname"
                type="text"
                value={operatorTag}
                onChange={(e) => setOperatorTag(e.target.value)}
                disabled={!isEditing || isSaving}
                placeholder="Altere sua alcunha de rede"
                required
              />

              <CyberInput
                label="Primary Uplink Core"
                type="email"
                value={user?.email || ''}
                disabled
                placeholder="Nenhum link ativo detectado"
              />

              {isEditing && (
                <div className="flex gap-2 pt-2">
                  <NeonButton
                    type="submit"
                    className="flex-1"
                    variant="cyan"
                    disabled={isSaving}
                  >
                    {isSaving ? '[ SAVING_DATA... ]' : '[ COMMIT_CHANGES ]'}
                  </NeonButton>
                  <NeonButton
                    type="button"
                    variant="purple"
                    disabled={isSaving}
                    onClick={() => setIsEditing(false)}
                  >
                    [ CANCEL ]
                  </NeonButton>
                </div>
              )}
            </form>
          </div>

          {/* PAINEL DIREITO: MONITOR DE DIAGNÓSTICO DO NODE (2 colunas) */}
          <div className="md:col-span-2 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h2 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-white/5 pb-2">
                // Diagnostics_Terminal
              </h2>
              
              {/* LOGS DE DEPURADOR FICTÍCIOS */}
              <div className="bg-black/40 border border-white/5 rounded-xl p-3 font-mono text-[9px] text-slate-500 space-y-1.5 select-none backdrop-blur-sm">
                <p className="text-cyan-500/70">_ SESSION_KEY: ACTIVE</p>
                <p>_ ENCRYPTION: AES_256_GCM</p>
                <p>_ HANDSHAKE_LATENCY: 42ms</p>
                <p className="text-pink-500/70">_ PACKETS_STREAM: COMPILING</p>
                <p className="animate-pulse text-emerald-400">● GATEWAY_SECURE_LINK</p>
              </div>
            </div>

            {/* BOTÃO CRÍTICO DE DISCONEXÃO (LOGOUT) */}
            <button
              onClick={handleLogoutClick}
              className="
                w-full
                group/logout
                font-mono
                text-[11px]
                uppercase
                tracking-[0.2em]
                text-rose-500/80
                
                border
                border-rose-500/20
                bg-rose-500/5
                
                py-2.5
                rounded-xl
                cursor-pointer
                transition-all
                duration-300
                
                hover:text-rose-400
                hover:border-rose-500/5
                hover:bg-rose-500/10
                hover:shadow-[0_0_15px_rgba(244,63,94,0.15)]
              "
            >
              <span className="inline-block transition-transform duration-300 group-hover/logout:-translate-x-1 mr-1">
                ◀
              </span>
              [ SEVER_HANDSHAKE_LINK ]
            </button>
          </div>

        </div>

      </GlassCard>
    </div>
  )
}