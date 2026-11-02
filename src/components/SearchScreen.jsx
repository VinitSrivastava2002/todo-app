import { useMemo, useState } from 'react'
import { BackIcon, SearchIcon } from './Icons'
import TaskRow from './TaskRow'
import { formatMeta } from '../utils/dates'

export default function SearchScreen({ tasks, onBack, ...rowHandlers }) {
  const [q, setQ] = useState('')
  const term = q.trim().toLowerCase()

  const results = useMemo(() => {
    if (!term) return []
    return tasks
      .filter((t) => t.title.toLowerCase().includes(term) || (t.description || '').toLowerCase().includes(term))
      .sort((a, b) => (a.date + (a.start || '')).localeCompare(b.date + (b.start || '')))
  }, [term, tasks])

  return (
    <div className="px-5 pb-10 pt-[max(1.75rem,env(safe-area-inset-top))]">
      <button onClick={onBack} aria-label="Back to home" className="-ml-1 p-1"><BackIcon width={24} height={24} /></button>

      <div className="relative mt-5">
        <input
          autoFocus
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search for a task"
          aria-label="Search for a task"
          className="h-11 w-full rounded-[3px] border border-slate-200 bg-white pl-3.5 pr-11 text-xs outline-none focus:border-brand [&::-webkit-search-cancel-button]:hidden"
        />
        <SearchIcon width={20} height={20} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
      </div>

      {!term ? (
        <p className="mt-12 text-center text-sm text-slate-500">Type a keyword to find a task.</p>
      ) : results.length === 0 ? (
        <p className="mt-12 text-center text-sm text-slate-500">No tasks match “{q.trim()}”. Try a different keyword.</p>
      ) : (
        <ul className="mt-4">
          {results.map((t) => <TaskRow key={t.id} task={t} meta={formatMeta(t)} {...rowHandlers} />)}
        </ul>
      )}
    </div>
  )
}
