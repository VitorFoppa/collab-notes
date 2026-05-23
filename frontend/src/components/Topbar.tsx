import { useState } from 'react' // Adicionado para controlar o estado do efeito
import { Search, Bell } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { DisconnectOverlay } from '../components/DisconnectOverlay' // Importando o efeito

export function Topbar() {
  const { logout } = useAuth() 
  const [isDisconnecting, setIsDisconnecting] = useState(false)

  // Função que gerencia o blackout antes de deslogar
  const handleDisconnect = () => {
    setIsDisconnecting(true)

    // Aguarda os 2.2 segundos da animação dos logs falhando
    setTimeout(() => {
      logout()
    }, 2200)
  }

  return (
    <>
      {/* Ativa o overlay de estática por cima de tudo se estiver desconectando */}
      {isDisconnecting && <DisconnectOverlay />}

      <div className="h-full px-8 flex items-center justify-between bg-black/10 backdrop-blur-md">
        
        {/* CAMPO DE BUSCA ESTILO PROMPT DE COMANDO */}
        <div
          className="
            flex
            items-center
            gap-3
            bg-black/40
            border
            border-white/5
            focus-within:border-cyan-500/40
            focus-within:shadow-[0_0_15px_rgba(0,245,255,0.08)]
            rounded-lg
            px-4
            py-2
            w-[380px]
            transition-all
            duration-300
            group
          "
        >
          {/* Prefixo simulando um protocolo de busca de sistema */}
          <span className="font-mono text-[10px] text-cyan-400/40 group-focus-within:text-cyan-400 select-none transition-colors">
            SRC://
          </span>
          
          <input
            type="text"
            placeholder="Query index_database..."
            className="
              bg-transparent
              outline-none
              w-full
              text-xs
              font-mono
              text-slate-200
              placeholder:text-slate-600
            "
          />
          
          <Search className="text-slate-600 group-focus-within:text-cyan-400 transition-colors duration-300" size={14} />
        </div>

        {/* PAINEL DE AÇÕES / USUÁRIO */}
        <div className="flex items-center gap-6">
          
          {/* NOTIFICAÇÕES COM BADGE DE ALERTA PISCANTE */}
          <button
            className="
              relative
              p-2
              rounded-lg
              bg-black/30
              border
              border-white/5
              text-slate-400
              hover:border-cyan-500/40
              hover:text-cyan-400
              hover:shadow-[0_0_10px_rgba(0,245,255,0.1)]
              transition-all
              duration-200
              cursor-pointer
            "
          >
            <Bell size={16} />
            {/* Ping ativo de nova notificação */}
            <span className="absolute top-0.5 right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
          </button>

          {/* BOTÃO DE LOGOUT ATUALIZADO */}
          <button
            onClick={handleDisconnect}
            disabled={isDisconnecting} // Evita cliques duplos durante a pane visual
            className="
              font-mono 
              text-[10px] 
              uppercase 
              tracking-wider
              text-rose-400/80 
              border 
              border-rose-500/20 
              bg-rose-500/5
              px-3 
              py-1.5 
              rounded-lg
              cursor-pointer 
              transition-all 
              duration-200
              hover:bg-rose-500/15 
              hover:text-rose-300 
              hover:border-rose-400
              hover:shadow-[0_0_10px_rgba(244,63,94,0.2)]
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            [DISCONNECT_]
          </button>

          {/* AVATAR COM MOLDURA NEON FLUIDA */}
          <div className="relative group select-none">
            {/* Anel de brilho cibernético no fundo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-full blur-[3px] opacity-50 group-hover:opacity-90 transition-opacity duration-300" />
            
            {/* Círculo do Avatar */}
            <div
              className="
                relative
                w-9
                h-9
                rounded-full
                bg-gradient-to-br
                from-cyan-500
                to-fuchsia-600
                border-2
                border-[#05060a]
              "
            />
            {/* Ponto indicador de status do usuário (Online) */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#05060a] rounded-full shadow-[0_0_4px_#10B981]"></span>
          </div>

        </div>
      </div>
    </>
  )
}