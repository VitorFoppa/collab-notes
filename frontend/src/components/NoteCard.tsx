import { useState } from 'react'
import { Card } from './ui/Card'

type Note = {
  id: number
  title: string
  content: string
  updatedAt: Date
}

type Props = {
  note: Note
  onDelete: (id: number) => void
  onClick: () => void
}

export function NoteCard({
  note,
  onDelete,
  onClick,
}: Props) {
  const [isDeleting, setIsDeleting] = useState(false)

  const shortId =
    String(note.id).padStart(4, '0')

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDeleting(true)

    // Sincronizado com os 400ms da animação de saída (cyber-dematerialize)
    setTimeout(() => {
      onDelete(note.id)
    }, 400)
  }

  return (
    /* CASULO DA ANIMAÇÃO: Alterna dinamicamente entre as animações por Keyframes */
    <div
      style={{
        animation: isDeleting
          ? 'cyber-dematerialize 0.4s ease-in forwards'
          : 'cyber-materialize 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
      className={isDeleting ? 'pointer-events-none' : ''}
    >
      {/* Estilos locais injetados para evitar poluição no arquivo global de config */}
      <style>{`
        @keyframes cyber-materialize {
          0% {
            opacity: 0;
            transform: scale(0.96) translateY(-20px);
            filter: blur(10px);
          }
          60% {
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }

        @keyframes cyber-dematerialize {
          0% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
          100% {
            opacity: 0;
            transform: scale(0.92) translateY(15px);
            filter: blur(8px);
          }
        }
      `}</style>

      <Card
        onClick={onClick}
        className="
          group
          relative
          overflow-hidden
          hover:-translate-y-1
          hover:border-purple-500/40
          hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]
        "
      >
        {/* SEQUÊNCIA DE DESTRUIÇÃO: Overlay HUD piscando em vermelho */}
        {isDeleting && (
          <div className="absolute inset-0 flex items-center justify-center bg-rose-950/50 z-30 animate-pulse">
            <span className="font-mono text-[10px] uppercase text-rose-400 tracking-[0.2em] font-black">
              [ DESTRUCT_SEQUENCE ]
            </span>
          </div>
        )}

        {/* DETALHES DE BORDA CIBERNÉTICA */}
        <div className="absolute top-0 left-0 w-2 h-[2px] bg-cyan-400"></div>
        <div className="absolute top-0 left-0 w-[2px] h-2 bg-cyan-400"></div>

        <div className="
          absolute
          top-0
          right-0
          w-[1px]
          h-full
          bg-gradient-to-b
          from-transparent
          via-transparent
          to-transparent
          group-hover:via-purple-500/40
          transition-all
          duration-500
        "></div>

        {/* HEADER */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <span className="
              w-1.5
              h-1.5
              rounded-full
              bg-cyan-400
              animate-pulse
              shrink-0
              shadow-[0_0_6px_#00F5FF]
            "></span>

            <h2 className="
              text-white
              font-['Orbitron']
              font-medium
              tracking-wide
              text-sm
              truncate
            ">
              {note.title}
            </h2>
          </div>

          <button
            onClick={handleDelete}
            className="
              font-mono
              text-[10px]
              uppercase
              tracking-wider
              text-rose-400/70
              border
              border-rose-500/20
              bg-rose-500/5
              px-2
              py-0.5
              rounded
              cursor-pointer
              transition-all
              duration-200
              hover:bg-rose-500/20
              hover:text-rose-300
              hover:border-rose-400
              hover:shadow-[0_0_8px_rgba(244,63,94,0.3)]
            "
          >
            [DESTRUT_]
          </button>
        </div>

        {/* CONTENT */}
        <p className="
          text-slate-400
          font-mono
          text-xs
          mt-4
          line-clamp-3
          leading-relaxed
          border-l-2
          border-white/5
          pl-3
          group-hover:border-purple-500/30
          transition-colors
          duration-300
        ">
          {note.content || '// Nenhum registro adicional indexado...'}
        </p>

        {/* FOOTER */}
        <div className="
          flex
          justify-between
          items-center
          text-[9px]
          font-mono
          text-slate-600
          mt-5
          pt-3
          border-t
          border-white/5
        ">
          <span className="tracking-tight">
            ADDR:{' '}
            <span className="text-slate-400">
              {shortId}
            </span>
          </span>

          <span className="text-slate-500">
            {new Date(note.updatedAt).toLocaleString()}
          </span>
        </div>
      </Card>
    </div>
  )
}