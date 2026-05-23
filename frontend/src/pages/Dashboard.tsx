import { useState } from 'react'

import { useNotes, type Note } from '../context/NotesContext'

import { NoteCard } from '../components/NoteCard'
import { NoteModal } from '../components/NoteModal'

export function Dashboard() {

  const {
    notes,
    createNote,
    deleteNote,
    updateNote,
  } = useNotes()

  const [title, setTitle] =
    useState('')

  const [selectedNote, setSelectedNote] =
    useState<Note | null>(null)

  return (
    <div className="space-y-10 animate-fade-in">

      {/* HEADER */}
      <div className="relative pb-4 border-b border-white/5">

        <div
          className="
            absolute
            bottom-0
            left-0
            w-24
            h-[2px]
            bg-cyan-400
            shadow-[0_0_10px_#00F5FF]
          "
        />

        <h1
          className="
            text-4xl
            font-['Orbitron']
            font-black
            tracking-wider
            text-transparent
            bg-clip-text
            bg-gradient-to-r
            from-cyan-400
            via-purple-400
            to-pink-500
            drop-shadow-[0_0_15px_rgba(0,245,255,0.3)]
          "
        >
          CYBER_NOTES
        </h1>

        <p
          className="
            text-xs
            uppercase
            tracking-[0.2em]
            text-slate-500
            font-mono
            mt-1
          "
        >
          // Terminal de gerenciamento de dados em tempo real
        </p>

      </div>

      {/* CREATE PANEL */}
      <div
        className="
          relative
          bg-white/[0.02]
          border
          border-white/10
          rounded-2xl
          p-6
          backdrop-blur-md
          shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
          group
          transition-all
          duration-300
          hover:border-cyan-500/30
        "
      >

        <div
          className="
            absolute
            top-0
            right-0
            w-4
            h-4
            border-t-2
            border-r-2
            border-purple-500/40
            rounded-tr-xl
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-0
            w-4
            h-4
            border-b-2
            border-l-2
            border-cyan-500/40
            rounded-bl-xl
          "
        />

        <div className="flex flex-col sm:flex-row gap-4">

          <div className="relative flex-1">

            <input
              value={title}

              onChange={(e) =>
                setTitle(e.target.value)
              }

              placeholder="Inserir nova diretriz de dados..."

              className="
                w-full
                bg-black/40
                border
                border-white/10
                rounded-xl
                px-5
                py-3.5
                text-white
                font-mono
                text-sm
                placeholder-slate-600
                outline-none
                transition-all
                duration-300
                focus:border-cyan-400
                focus:shadow-[0_0_15px_rgba(0,245,255,0.1)]
              "
            />

            <span
              className="
                absolute
                right-4
                top-3.5
                text-xs
                text-slate-600
                font-mono
                pointer-events-none
                hidden
                md:inline
              "
            >
              [INPUT]
            </span>

          </div>

          <button
            onClick={async () => {

              if (!title.trim()) return

              await createNote(title)

              setTitle('')
            }}

            className="
              px-8
              py-3.5
              bg-gradient-to-r
              from-cyan-500/10
              to-cyan-500/20
              border
              border-cyan-400/40
              text-cyan-400
              font-['Orbitron']
              text-sm
              font-bold
              tracking-widest
              rounded-xl
              cursor-pointer
              transition-all
              duration-300
              hover:from-cyan-500/20
              hover:to-cyan-400/40
              hover:text-white
              hover:shadow-[0_0_20px_rgba(0,245,255,0.4)]
              active:scale-[0.98]
            "
          >
            EXEC_CRIAR
          </button>

        </div>

      </div>

      {/* EMPTY STATE */}
      {notes.length === 0 ? (

        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            p-16
            border
            border-dashed
            border-white/10
            rounded-2xl
            bg-white/[0.01]
            text-center
            animate-pulse
          "
        >

          <div
            className="
              w-12
              h-12
              rounded-full
              border
              border-slate-700
              flex
              items-center
              justify-center
              text-slate-600
              font-mono
              mb-4
            "
          >
            !
          </div>

          <p
            className="
              text-slate-500
              font-mono
              uppercase
              tracking-wider
              text-xs
            "
          >
            [ NENHUM NODE DE INFORMAÇÃO DETECTADO ]
          </p>

          <p className="text-slate-600 text-xs mt-1">
            Crie uma nota acima.
          </p>

        </div>

      ) : (

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
        >

          {notes.map((note) => (

            <NoteCard
              key={note.id}
              note={note}
              onDelete={deleteNote}
              onClick={() =>
                setSelectedNote(note)
              }
            />

          ))}

        </div>

      )}

      {/* MODAL */}
      {selectedNote && (

        <NoteModal
          note={{
            ...selectedNote,
            id: String(selectedNote.id)
          }}

          onClose={() =>
            setSelectedNote(null)
          }

          onSave={async (
            id, 
            title,
            content
          ) => {

            await updateNote(
              Number(id),
              title,
              content
            )

            setSelectedNote(null)
          }}
        />

      )}

    </div>
  )
}