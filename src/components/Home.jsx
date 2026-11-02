import { useMemo, useState } from 'react'
import WeekStrip from './WeekStrip'
import TaskRow from './TaskRow'
import { CheckIcon, CloseIcon, PlusIcon, SearchIcon } from './Icons'
import { addDays, formatMeta, pad2, parseDate, toDateStr, weekDays } from '../utils/dates'

const byTime = (a, b) => (a.date + (a.start || '')).localeCompare(b.date + (b.start || ''))

function StatCard({ tone, label, value }) {
  const t = tone === 'done'
    ? { card: 'bg-[#EEF1FF]', chip: 'bg-[#B5C1FF]', edge: 'border-brand text-brand' }
    : { card: 'bg-[#FFE5E5]', chip: 'bg-[#FFB8B8]', edge: 'border-[#E5484D] text-[#E5484D]' }
  return (
    <div className={`flex-1 rounded-[3px] p-3.5 ${t.card}`}>
      <div className="flex items-center gap-2">
        <span className={`grid h-7 w-7 place-items-center rounded-[3px] ${t.chip}`}>
          <span className={`grid h-[18px] w-[18px] place-items-center rounded-[2px] border-[1.5px] ${t.edge}`}>
            {tone === 'done' ? <CheckIcon width={12} height={12} strokeWidth={3} /> : <CloseIcon width={12} height={12} strokeWidth={3} />}
          </span>
        </span>
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="mt-3 flex items-baseline gap-1.5">
        <span className="text-2xl font-bold">{pad2(value)}</span>
        <span className="text-[10px] text-slate-500">This Week</span>
      </p>
    </div>
  )
}

export default function Home({ tasks, selected, setSelected, onAdd, onOpenSearch, ...rowHandlers }) {
  const [showAll, setShowAll] = useState(false)
  const today = toDateStr(new Date())
  const days = useMemo(() => weekDays(parseDate(selected)), [selected])
  const weekStrs = useMemo(() => days.map(toDateStr), [days])

  const weekTasks = useMemo(() => tasks.filter((t) => weekStrs.includes(t.date)).sort(byTime), [tasks, weekStrs])
  const hasTasks = useMemo(() => new Set(tasks.map((t) => t.date)), [tasks])
  const done = weekTasks.filter((t) => t.status === 'completed').length
  const pending = weekTasks.length - done
  const pct = weekTasks.length ? (done / weekTasks.length) * 100 : 0

  const list = showAll ? weekTasks : weekTasks.filter((t) => t.date === selected)
  const heading = showAll
    ? 'Tasks This Week'
    : selected === today
      ? 'Tasks Today'
      : `Tasks · ${parseDate(selected).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}`

  const shift = (n) => { setSelected(toDateStr(addDays(parseDate(selected), n))); setShowAll(false) }

  return (
    <div className="px-5 pb-32 pt-[max(1.75rem,env(safe-area-inset-top))]">
      <button
        onClick={onOpenSearch}
        className="flex h-11 w-full items-center justify-between rounded-[3px] border border-slate-200 bg-white px-3.5 text-left text-xs text-slate-500"
        aria-label="Search for a task"
      >
        Search for a task
        <SearchIcon width={20} height={20} className="text-ink" />
      </button>

      <div className="mt-5">
        <WeekStrip days={days} selected={selected} today={today} hasTasks={hasTasks}
          onSelect={(s) => { setSelected(s); setShowAll(false) }} onShift={shift} />
      </div>

      <div className="mt-5 flex gap-3">
        <StatCard tone="done" label="Task Complete" value={done} />
        <StatCard tone="pending" label="Task Pending" value={pending} />
      </div>

      <h2 className="mt-7 text-base font-semibold">Weekly Progress</h2>
      <div className="mt-3 h-4 bg-[#D9DBFF]" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label="Weekly progress">
        <div className="h-full bg-brand-navy transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>

      <div className="mt-7 flex items-center justify-between">
        <h2 className="text-base font-semibold">{heading}</h2>
        <button onClick={() => setShowAll((v) => !v)} className="text-xs font-medium text-brand hover:underline">
          {showAll ? 'Show day' : 'View All'}
        </button>
      </div>

      {list.length === 0 ? (
        <p className="mt-8 text-center text-sm text-slate-500">
          {showAll ? 'No tasks this week.' : 'No tasks for this day.'} Tap + to add one.
        </p>
      ) : (
        <ul className="mt-2">
          {list.map((t) => (
            <TaskRow key={t.id} task={t} meta={showAll ? formatMeta(t) : null} {...rowHandlers} />
          ))}
        </ul>
      )}

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 mx-auto flex max-w-[420px] justify-center pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <button onClick={onAdd} aria-label="Add task"
          className="pointer-events-auto grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-[0_6px_16px_rgba(67,97,238,.45)] hover:bg-brand-navy">
          <PlusIcon width={28} height={28} strokeWidth={1.6} />
        </button>
      </div>
    </div>
  )
}
