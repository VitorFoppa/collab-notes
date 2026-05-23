import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'

import type { ReactNode } from 'react'

import {
  getNotes,
  createNoteRequest,
  updateNoteRequest,
  deleteNoteRequest,
} from '../services/noteService'

import { useAuth } from './AuthContext'

export type Note = {
  id: number
  title: string
  content: string
  ownerEmail?: string // Adicionado para compatibilidade com o layout cyberpunk
  sharedWithEmails?: string[]
  createdAt?: string
  updatedAt: Date
}

type NoteResponse = {
  id: number
  title: string | null
  content: string | null
  ownerEmail?: string
  sharedWithEmails?: string[]
  createdAt?: string
  updatedAt: string
}

type NotesContextType = {
  notes: Note[]
  createNote: (title: string, content?: string) => Promise<void>
  updateNote: (id: number, title: string, content: string) => Promise<void>
  deleteNote: (id: number) => Promise<void>
  refreshNotes: () => Promise<void> // EXPOSTO PARA SINCRONIZAÇÃO GLOBAL
  loading: boolean
}

const NotesContext = createContext({} as NotesContextType)

export function NotesProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth()
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  /* FUNÇÃO DE CARREGAMENTO ISOLADA (Pode ser chamada de fora) */
  const loadNotes = useCallback(async () => {
    if (!user) {
      setLoading(false)
      return
    }
    try {
      const data = await getNotes()
      setNotes(
        data.map((note: NoteResponse) => ({
          id: note.id,
          title: note.title ?? '',
          content: note.content ?? '',
          ownerEmail: note.ownerEmail ?? '',
          sharedWithEmails: note.sharedWithEmails ?? [],
          createdAt: note.createdAt ?? '',
          updatedAt: new Date(note.updatedAt),
        }))
      )
    } catch (error) {
      console.error('Erro ao carregar notas:', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  /* LOAD NOTES EFFECT */
  useEffect(() => {
    if (authLoading) return
    if (!user) {
      setLoading(false)
      return
    }
    loadNotes()
  }, [user, authLoading, loadNotes])

  /* CREATE */
async function createNote(title: string, content: string = '') {
  try {
    const createdNote = await createNoteRequest(title, content)
    
    setNotes((prev) => [
      {
        id: createdNote.id,
        title: createdNote.title ?? '',
        content: createdNote.content ?? '',
        ownerEmail: user?.email ?? '', 
        sharedWithEmails: [], 
        updatedAt: new Date(createdNote.updatedAt),
      },
      ...prev,
    ])
  } catch (error) {
    console.error('Erro ao criar nota:', error)
    await loadNotes()
  }
}

  /* UPDATE */
  async function updateNote(id: number, title: string, content: string) {
    try {
      const updatedNote = await updateNoteRequest(id, title, content)
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id
            ? {
                ...note,
                ...updatedNote,
                title: updatedNote.title ?? '',
                content: updatedNote.content ?? '',
                updatedAt: new Date(updatedNote.updatedAt),
              }
            : note
        )
      )
    } catch (error) {
      console.error('Erro ao atualizar nota:', error)
    }
  }

  /* DELETE */
  async function deleteNote(id: number) {
    try {
      await deleteNoteRequest(id)
      setNotes((prev) => prev.filter((note) => note.id !== id))
    } catch (error) {
      console.error('Erro ao deletar nota:', error)
    }
  }

  return (
    <NotesContext.Provider
      value={{
        notes,
        createNote,
        updateNote,
        deleteNote,
        refreshNotes: loadNotes, // Mapeia o recarregamento no contexto
        loading,
      }}
    >
      {children}
    </NotesContext.Provider>
  )
}

export function useNotes() {
  return useContext(NotesContext)
}