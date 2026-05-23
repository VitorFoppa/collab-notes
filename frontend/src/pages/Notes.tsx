import { useState } from 'react'
import { useNotes, type Note } from '../context/NotesContext'
import { api } from '../services/api'
import { GlassCard } from '../components/ui/GlassCard'
import { AnimatedBackground } from '../components/AnimatedBackground'
import { CyberInput } from '../components/ui/CyberInput'
import { NeonButton } from '../components/ui/NeonButton'
import { CreateNoteModal } from '../components/CreateNoteModal'

export function Notes() {
  // Consome o contexto global de notas
  const { notes, deleteNote, updateNote } = useNotes()
  
  const [activeFilter, setActiveFilter] = useState<'all' | 'owned' | 'shared'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  // ESTADOS DO EDITOR / VISUALIZADOR
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')
  const [emailToShare, setEmailToShare] = useState('')
  const [isActionLoading, setIsActionLoading] = useState(false)

  // Filtragem simples para a barra de busca (grep)
  const filteredNotes = notes.filter(note => {
    const matchesSearch = 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (note.content && note.content.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesSearch
  })

  // Executa a deleção na API através do contexto global
  const handlePurge = async (id: number) => {
    if (!window.confirm("[SYSTEM_WARNING]: Deseja purgar permanentemente este registro da memória?")) {
      return
    }
    try {
      setIsActionLoading(true)
      await deleteNote(id)
      setSelectedNote(null)
    } catch (error) {
      console.error("Falha ao deletar registro:", error)
      alert("[ERRO]: Não foi possível deletar este node.")
    } finally {
      setIsActionLoading(false)
    }
  }

  // Protocolo de Encaminhamento / Compartilhamento da Nota
  const handleShareNote = async () => {
    if (!selectedNote || !emailToShare.trim()) return

    try {
      setIsActionLoading(true)
      

      await api.post(`/notes/${selectedNote.id}/share?emailToShare=${encodeURIComponent(emailToShare.toLowerCase().trim())}`)
      
      alert(`[TRANSMISSÃO_CONCLUÍDA]: Acesso concedido para ${emailToShare}`)
      setEmailToShare('')
      setSelectedNote(null)
    } catch (error) {
      console.error("Falha na transmissão de dados:", error)
      alert("[ERRO]: Falha no protocolo de compartilhamento de rede. Verifique o e-mail informado.")
    } finally {
      setIsActionLoading(false)
    }
  }

  const handleOpenNote = (note: Note) => {
    setSelectedNote(note)
    setEditTitle(note.title)
    setEditContent(note.content || '')
    setEmailToShare('')
  }

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedNote) return

    try {
      setIsActionLoading(true)
      await updateNote(selectedNote.id, editTitle, editContent)
      setSelectedNote(null)
    } catch (error) {
      console.error("Erro ao commitar alterações:", error)
    } finally {
      setIsActionLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent p-6">
      <AnimatedBackground />

      <GlassCard className="w-full max-w-5xl h-[85vh] flex flex-col relative" title="SECURE_DATA_STORAGE_v2.0">
        
        {/* BARRA DE TOPO */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center border-b border-white/5 pb-4 mb-4 font-mono">
          <div>
            <h1 className="font-['Orbitron'] text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 tracking-wider">
              ARCHIVE_VAULT
            </h1>
            <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-0.5">
              Indexador de payloads e transmissões locais
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsCreateOpen(true)}
              className="px-4 py-2 bg-pink-500/10 border border-pink-500/30 text-pink-400 font-mono text-xs font-bold rounded-lg hover:bg-pink-500/20 transition-all uppercase tracking-widest cursor-pointer whitespace-nowrap"
            >
              [+ NEW_PAYLOAD]
            </button>

            <div className="relative w-full md:w-64">
              <span className="absolute left-3 top-2.5 text-slate-500 text-xs font-bold font-mono">$</span>
              <input
                type="text"
                placeholder="grep_archive_name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-lg pl-7 pr-4 py-2 font-mono text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-pink-500/30 transition-all"
              />
            </div>
          </div>
        </div>

        {/* ABAS DE FILTRO OPERACIONAIS */}
        <div className="flex gap-2 mb-6 font-mono border-b border-white/5 pb-4 select-none">
          <button onClick={() => setActiveFilter('all')} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase border cursor-pointer ${activeFilter === 'all' ? 'bg-white/10 text-white border-white/20' : 'bg-transparent text-slate-500 border-transparent hover:text-slate-300'}`}>
            [--all_nodes]
          </button>
        </div>

        {/* CORPO / LISTAGEM */}
        <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-max">
          {filteredNotes.map((note) => {
            return (
              <div
                key={note.id}
                onClick={() => handleOpenNote(note)}
                className="relative isolate flex flex-col justify-between min-h-[160px] bg-black/50 border border-pink-500/10 rounded-xl p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 cursor-pointer hover:border-pink-500/30 hover:bg-pink-500/[0.01]"
              >
                {/* BOTÃO RÁPIDO DE EXCLUSÃO (SEMPRE VISÍVEL COMO NO DASHBOARD) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // Impede de abrir o modal ao clicar direto no lixo
                    handlePurge(note.id);
                  }}
                  disabled={isActionLoading}
                  className="absolute top-3 right-3 z-50 block text-rose-400 hover:text-rose-200 font-mono text-[10px] font-bold tracking-wider transition-all duration-200 cursor-pointer bg-neutral-900 border border-rose-500/60 px-2 py-1 rounded shadow-lg shadow-black/80 hover:bg-rose-950 hover:border-rose-400"
                >
                  {isActionLoading ? '...' : '🗑 PURGE'}
                </button>

                <div className="space-y-2 pr-16">
                  <div className="flex justify-between items-center font-mono text-[9px]">
                    <span className="px-1.5 py-0.5 rounded uppercase font-bold tracking-wider bg-pink-500/10 text-pink-400">
                      LOCAL_NODE
                    </span>
                  </div>
                  <h3 className="font-['Orbitron'] text-sm font-bold text-slate-200 tracking-wide line-clamp-1 transition-colors">
                    {note.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">
                    {note.content || '// Sem payload de dados...'}
                  </p>
                </div>
                
                <div className="mt-4 pt-2 border-t border-white/5 font-mono text-[9px] text-slate-500 truncate flex justify-between">
                  <span>SRC: <span className="text-pink-400/70">{(note as any).ownerEmail || (note as any).owner_email || 'network_node'}</span></span>
                </div>
              </div>
            )
          })}
        </div>

        {/* OVERLAY INTERNO / EDITOR + PAINEL DE ENCAMINHAMENTO */}
        {selectedNote && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-30 rounded-2xl flex items-center justify-center p-6 transition-all duration-300">
            <div className="w-full max-w-2xl border bg-black/60 p-6 rounded-2xl relative space-y-4 shadow-2xl border-pink-500/30">
              
              <div className="flex justify-between items-start border-b border-white/5 pb-3 font-mono">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-pink-500/10 text-pink-400">
                    [ DATA_STREAM_ACCESS ]
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* BOTÃO PURGAR DENTRO DO MODAL */}
                  <button
                    type="button"
                    onClick={() => handlePurge(selectedNote.id)}
                    disabled={isActionLoading}
                    className="text-xs text-rose-500 hover:text-rose-400 font-mono transition-colors cursor-pointer bg-rose-950/20 border border-rose-500/30 px-2 py-0.5 rounded"
                  >
                    [ PURGE_RECORD 🗑 ]
                  </button>
                  <button type="button" onClick={() => setSelectedNote(null)} className="text-xs text-slate-500 hover:text-white transition-colors cursor-pointer">[ CLOSE_STREAM ✕ ]</button>
                </div>
              </div>

              <form onSubmit={handleUpdateSubmit} className="space-y-4 font-mono">
                <CyberInput
                  label="Payload Subject"
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  disabled={isActionLoading}
                  required
                />

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Payload Buffer Core</label>
                  <textarea
                    rows={5}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    disabled={isActionLoading}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-purple-500/50 transition-colors disabled:opacity-40 font-mono resize-none"
                  />
                </div>

                {/* PAINEL DE TRANSMISSÃO COLABORATIVA (SEMPRE DISPONÍVEL AGORA) */}
                <div className="flex flex-col sm:flex-row justify-between items-end gap-4 pt-4 border-t border-white/5">
                  <div className="flex items-end gap-2 w-full sm:w-2/3">
                    <div className="flex-1">
                      <CyberInput
                        label="Encaminhar diretriz para operador externo (Email)"
                        type="email"
                        placeholder="operador@rede.io"
                        value={emailToShare}
                        onChange={(e) => setEmailToShare(e.target.value)}
                        disabled={isActionLoading}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleShareNote}
                      disabled={isActionLoading || !emailToShare.trim()}
                      className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold px-4 py-3 rounded-xl hover:bg-cyan-500/20 transition-all disabled:opacity-40 uppercase tracking-wider cursor-pointer h-[42px] whitespace-nowrap"
                    >
                      [ ENCAMINHAR ]
                    </button>
                  </div>

                  <NeonButton type="submit" variant="purple" disabled={isActionLoading}>
                    {isActionLoading ? '[ INJECTING... ]' : '[ COMMIT_UPDATES ]'}
                  </NeonButton>
                </div>
              </form>
            </div>
          </div>
        )}

        <CreateNoteModal 
          isOpen={isCreateOpen} 
          onClose={() => setIsCreateOpen(false)} 
          onSuccess={() => {}} 
        />

      </GlassCard>
    </div>
  )
}