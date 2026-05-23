import {
  LayoutDashboard,
  FileText,
  User,
  Radio, 
} from 'lucide-react'

import { Link, useLocation } from 'react-router-dom'

const menuItems = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    path: '/',
  },
  {
    icon: FileText,
    label: 'Notas',
    path: '/notes',
  },
  {
    icon: User,
    label: 'Perfil',
    path: '/profile',
  },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="h-full flex flex-col justify-between p-6 bg-black/20 backdrop-blur-md">
      
      {/* SEÇÃO SUPERIOR */}
      <div>
        {/* LOGO COM METADADOS */}
        <div className="relative mb-10 pb-6 border-b border-white/5 group">
          {/* Falsa tag de versão do sistema */}
          <span className="absolute top-0 right-0 font-mono text-[9px] text-cyan-400/40 tracking-tighter">
            V4.0.26
          </span>
          
          <h1 className="text-3xl font-['Orbitron'] font-black tracking-[0.15em] text-cyan-400 drop-shadow-[0_0_12px_rgba(0,245,255,0.3)]">
            C-NOTES
          </h1>

          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500 mt-2 flex items-center gap-1.5">
            {/* Ponto piscante de conexão ativa */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            CORE_SYS_ONLINE
          </p>
        </div>

        {/* MENU DE NAVEGAÇÃO */}
        <nav className="flex flex-col gap-2.5">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = location.pathname === item.path

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative
                  flex
                  items-center
                  gap-4
                  px-4
                  py-3.5
                  rounded-xl
                  font-['Orbitron']
                  text-xs
                  font-bold
                  tracking-widest
                  uppercase
                  transition-all
                  duration-300
                  group
                  border

                  ${
                    active
                      ? `
                        bg-gradient-to-r from-cyan-500/15 to-transparent
                        border-cyan-400
                        text-cyan-300
                        shadow-[0_0_20px_rgba(0,245,255,0.15)]
                      `
                      : `
                        border-transparent
                        text-slate-400
                        hover:bg-white/5
                        hover:border-white/10
                        hover:text-cyan-300
                      `
                  }
                `}
              >
                {/* Indicador Neon Lateral exclusivo do item ativo */}
                {active && (
                  <span className="absolute left-0 top-1/4 h-1/2 w-[3px] bg-cyan-400 rounded-r shadow-[0_0_8px_#00F5FF]"></span>
                )}

                {/* Ícone com brilho se ativo */}
                <Icon 
                  size={18} 
                  className={`transition-colors duration-300 ${
                    active ? 'text-cyan-400 drop-shadow-[0_0_5px_#00F5FF]' : 'text-slate-500 group-hover:text-cyan-400'
                  }`} 
                />

                <span className="flex-1">
                  {item.label}
                </span>

                {/* Detalhe decorativo no canto direito que surge no hover */}
                <span className={`font-mono text-[9px] transition-all duration-300 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 ${
                  active ? 'text-cyan-400/60' : 'text-slate-600'
                }`}>
                  {active ? '[SEL]' : '>>'}
                </span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* SEÇÃO INFERIOR / RODAPÉ DO TERMINAL */}
      <div className="border-t border-white/5 pt-4 font-mono text-[10px] text-slate-600 space-y-1.5 select-none">
        <div className="flex justify-between items-center">
          <span className="tracking-tight">SECURE_NODE:</span>
          <span className="text-purple-400 font-bold drop-shadow-[0_0_5px_rgba(168,85,247,0.4)]">ACTIVE</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="tracking-tight">NET_PROTOCOL:</span>
          <span className="text-slate-400">WSS://DB_SYNC</span>
        </div>
      </div>

    </div>
  )
}