import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { Topbar } from '../components/Topbar'
import { AnimatedBackground } from '../components/AnimatedBackground'

export function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-transparent text-white relative overflow-hidden">
      <AnimatedBackground />

      {/* OVERLAY PARA MOBILE (Clica fora para fechar) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* SIDEBAR - Responsiva */}
      <aside 
        className={`fixed md:relative z-50 w-72 h-full border-r border-white/10 transition-transform duration-300 bg-black md:bg-transparent
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Você pode passar a função de fechar para o seu componente de Sidebar se ele tiver links */}
        <Sidebar />
      </aside>

      {/* MAIN AREA */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">

        {/* TOPBAR */}
        <header className="h-16 border-b border-white/10 flex items-center px-4">
          {/* Botão de Menu visível apenas no mobile */}
          <button 
            className="md:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <div className="flex-1">
            <Topbar />
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="w-full max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  )
}