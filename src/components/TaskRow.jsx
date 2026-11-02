import { useRef, useState } from 'react'
import { CheckIcon, EditIcon, TrashIcon } from './Icons'

const REVEAL = 84
const DOT = { low: 'bg-sky-400', medium: 'bg-amber-400', high: 'bg-rose-500' }

export default function TaskRow({ task, meta, onToggle, onEdit, onDelete }) {
  const [dx, setDx] = useState(0)
  const [dragging, setDragging] = useState(false)
  const start = useRef(null)
  const isOpen = useRef(false)
  const done = task.status === 'completed'

  const down = (e) => {
    start.current = { x: e.clientX, base: isOpen.current ? -REVEAL : 0 }
    setDragging(true)
  }
  const move = (e) => {
    if (!start.current) return
    setDx(Math.max(-REVEAL, Math.min(0, start.current.base + e.clientX - start.current.x)))
  }
  const up = () => {
    if (!start.current) return
    start.current = null
    setDragging(false)
    isOpen.current = dx < -REVEAL / 2
    setDx(isOpen.current ? -REVEAL : 0)
  }

  return (
    <li>
      <div className="relative overflow-hidden">
        <button
          onClick={() => onDelete(task)}
          tabIndex={dx < 0 ? 0 : -1}
          aria-label={`Delete ${task.title}`}
          className="absolute inset-y-0 right-0 flex items-center justify-center bg-rose-500 text-sm font-medium text-white"
          style={{ width: REVEAL }}
        >
          Delete
        </button>

        <div
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerLeave={up}
          onPointerCancel={up}
          className="relative flex select-none items-center gap-3.5 bg-canvas py-3.5"
          style={{ transform: `translateX(${dx}px)`, transition: dragging ? 'none' : 'transform .2s ease', touchAction: 'pan-y' }}
        >
          <button
            onClick={() => onToggle(task.id)}
            aria-label={done ? `Mark ${task.title} as in progress` : `Mark ${task.title} as completed`}
            aria-pressed={done}
            className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[3px] border-[1.5px] border-brand ${
              done ? 'bg-brand-soft text-brand' : 'bg-white text-transparent'
            }`}
          >
            <CheckIcon width={13} height={13} strokeWidth={2.8} />
          </button>

          <div className="min-w-0 flex-1">
            <p className={`flex items-center gap-2 text-sm font-medium ${done ? 'text-slate-600 line-through' : ''}`}>
              <span className="truncate">{task.title}</span>
              {task.priority && <span className={`h-2 w-2 shrink-0 rounded-full ${DOT[task.priority]}`} title={`${task.priority} priority`} />}
            </p>
            {meta && <p className="mt-0.5 truncate text-[11px] text-slate-400">{meta}</p>}
          </div>

          <button onClick={() => onDelete(task)} aria-label={`Delete ${task.title}`} className="p-1 text-slate-300 hover:text-rose-500">
            <TrashIcon width={20} height={20} />
          </button>
          <button onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`} className="p-1 text-slate-300 hover:text-brand">
            <EditIcon width={20} height={20} />
          </button>
        </div>
      </div>
      <div className="ml-8 border-b border-slate-200" />
    </li>
  )
}
