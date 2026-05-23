import { useState } from 'react'
import { CyberInput } from './ui/CyberInput'
import { NeonButton } from './ui/NeonButton'
import { useNotes } from '../context/NotesContext' 

interface CreateNoteModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void 
}

export function CreateNoteModal({ isOpen, onClose, onSuccess }: CreateNoteModalProps) {
  const { refreshNotes } = useNotes() // <--- EXTRAÍDO O REFRESH GLOBAL DO CONTEXTO
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // CORREÇÃO DA CHAVE: Buscando o token correto alinhado com o AuthContext
    const token = localStorage.getItem('cyber_token')

    // TRAVA DE SEGURANÇA: Evita disparar requisições com token quebrado ou nulo
    if (!token || token === 'null' || token === 'undefined') {
      alert('[CRITICAL_ERROR]: Token de autenticação ausente ou inválido. Reconecte ao terminal.')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('http://localhost:8080/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim()
        })
      })

      if (response.ok) {
        // 1. Sincroniza o estado global do Contexto (Atualiza o Dashboard na hora!)
        await refreshNotes()

        // 2. Executa o callback local se ele existir (Atualiza a página Notes.tsx se necessário)
        if (onSuccess) {
          onSuccess()
        }

        // Limpa o formulário e fecha o modal
        setTitle('')
        setContent('')
        onClose()
      } else {
        const errorText = await response.text()
        alert(`Erro na compilação do payload: ${errorText}`)
      }
    } catch (error) {
      console.error('Falha crítica ao injetar nota:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 animate-fade-in overflow-y-auto">
      <div className="w-full max-w-xl border border-pink-500/20 bg-black/90 p-6 rounded-2xl space-y-4 shadow-2xl shadow-pink-500/5 my-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-center border-b border-white/5 pb-3 font-mono">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-pink-500/10 text-pink-400 px-2 py-0.5 rounded">
              [ INITIALIZE_NEW_PAYLOAD ]
            </span>
            <p className="text-[9px] text-slate-500 mt-1">Alocar espaço de memória para novo registro</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-xs text-slate-500 hover:text-white transition-colors cursor-pointer"
            disabled={isLoading}
          >
            [ ABORT_SEQUENCE ✕ ]
          </button>
        </div>

        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit} className="space-y-4 font-mono">
          <CyberInput
            label="Payload Name / Title"
            type="text"
            placeholder="ex: database_config.yaml"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
            required
          />

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-400">Payload Core Content</label>
            <textarea
              rows={5}
              placeholder="Insira as informações confidenciais do bloco de notas..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isLoading}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-pink-500/40 transition-colors disabled:opacity-40 font-mono resize-none"
            />
          </div>

          {/* AÇÕES */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="text-[10px] text-slate-400 uppercase tracking-widest hover:text-white transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <NeonButton type="submit" variant="purple" disabled={isLoading}>
              {isLoading ? '[ INJECTING... ]' : '[ ALLOCATE_NOTE ]'}
            </NeonButton>
          </div>
        </form>
      </div>
    </div>
  )
}