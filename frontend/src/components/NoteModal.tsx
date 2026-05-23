import { useState } from 'react'

type Note = {
  id: string
  title: string
  content: string
  updatedAt: Date
}

type Props = {
  note: Note

  onClose: () => void

  onSave: (
    id: string,
    title: string,
    content: string
  ) => Promise<void>
}

export function NoteModal({
  note,
  onClose,
  onSave,
}: Props) {

  const [title, setTitle] =
    useState(note.title ?? '')

  const [content, setContent] =
    useState(note.content ?? '')

  const [saving, setSaving] =
    useState(false)

  async function handleSave() {

    try {

      setSaving(true)

      await onSave(
        note.id,
        title,
        content
      )

      onClose()

    } catch (error) {

      console.error(
        'Erro ao salvar:',
        error
      )

    } finally {

      setSaving(false)
    }
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/80
        backdrop-blur-md
        flex
        items-center
        justify-center
        p-6
      "
    >

      {/* MODAL */}
      <div
        className="
          relative
          w-full
          max-w-5xl
          h-[85vh]
          bg-[#0B1120]
          border
          border-cyan-500/20
          rounded-3xl
          overflow-hidden
          flex
          flex-col
          shadow-[0_0_40px_rgba(0,245,255,0.08)]
        "
      >

        {/* DECORAÇÕES */}
        <div className="
          absolute
          top-0
          left-0
          w-16
          h-[2px]
          bg-cyan-400
        " />

        <div className="
          absolute
          top-0
          left-0
          w-[2px]
          h-16
          bg-cyan-400
        " />

        {/* HEADER */}
        <div
          className="
            flex
            items-center
            justify-between
            px-6
            py-4
            border-b
            border-white/10
            bg-black/20
          "
        >

          <div className="flex-1 mr-4">

            {/* TITULO */}
            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              disabled={saving}
              placeholder="Título da nota"

              className="
                w-full
                bg-transparent
                text-cyan-400
                font-['Orbitron']
                text-xl
                font-bold
                tracking-wider
                outline-none
                border
                border-transparent
                rounded-lg
                px-2
                py-1
                transition-all
                duration-300
                focus:border-cyan-400/30
                focus:bg-cyan-500/5
                disabled:opacity-50
              "
            />

            <p
              className="
                text-xs
                text-slate-500
                mt-2
                font-mono
              "
            >
              Última atualização:
              {' '}
              {new Date(
                note.updatedAt
              ).toLocaleString()}
            </p>

          </div>

          {/* FECHAR */}
          <button
            onClick={onClose}
            disabled={saving}

            className="
              px-4
              py-2
              rounded-lg
              border
              border-rose-500/20
              bg-rose-500/5
              text-rose-400
              transition-all
              duration-300
              hover:bg-rose-500/10
              hover:border-rose-400
              hover:shadow-[0_0_12px_rgba(244,63,94,0.25)]
              disabled:opacity-50
            "
          >
            FECHAR
          </button>

        </div>

        {/* EDITOR */}
        <div
          className="
            flex-1
            p-6
            overflow-hidden
          "
        >

          <textarea
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }

            placeholder="// Digite sua nota..."

            disabled={saving}

            className="
              w-full
              h-full
              resize-none
              bg-black/20
              border
              border-white/5
              rounded-2xl
              p-5
              text-slate-200
              font-mono
              text-sm
              leading-7
              outline-none
              transition-all
              duration-300
              focus:border-cyan-400/40
              focus:shadow-[0_0_20px_rgba(0,245,255,0.08)]
              disabled:opacity-50
            "
          />

        </div>

        {/* FOOTER */}
        <div
          className="
            flex
            justify-end
            px-6
            py-4
            border-t
            border-white/10
            bg-black/20
          "
        >

          <button
            onClick={handleSave}
            disabled={saving}

            className="
              px-6
              py-3
              rounded-xl
              bg-cyan-500/10
              border
              border-cyan-400/30
              text-cyan-300
              font-['Orbitron']
              text-sm
              tracking-widest
              transition-all
              duration-300
              hover:bg-cyan-500/20
              hover:text-white
              hover:border-cyan-300
              hover:shadow-[0_0_20px_rgba(0,245,255,0.25)]
              disabled:opacity-50
            "
          >
            {saving
              ? 'SAVING_NODE...'
              : 'SAVE_NODE'}
          </button>

        </div>

      </div>

    </div>
  )
}