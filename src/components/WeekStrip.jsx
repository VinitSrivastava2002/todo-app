import { ChevronLeft, ChevronRight } from './Icons'
import { pad2, toDateStr, weekRangeLabel } from '../utils/dates'

export default function WeekStrip({ days, selected, today, hasTasks, onSelect, onShift }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
        <span>{weekRangeLabel(days)}</span>
        <div className="flex">
          <button onClick={() => onShift(-7)} aria-label="Previous week" className="p-1 hover:text-brand"><ChevronLeft width={18} height={18} /></button>
          <button onClick={() => onShift(7)} aria-label="Next week" className="p-1 hover:text-brand"><ChevronRight width={18} height={18} /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1" role="group" aria-label="Days of the week">
        {days.map((d) => {
          const s = toDateStr(d)
          const sel = s === selected
          return (
            <button
              key={s}
              onClick={() => onSelect(s)}
              aria-pressed={sel}
              aria-label={d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              className={`flex flex-col items-center rounded-[3px] py-2 ${sel ? 'bg-brand text-white' : 'text-slate-400'}`}
            >
              <span className="text-[11px]">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
              <span className={`mt-0.5 text-base font-semibold ${!sel && s === today ? 'text-brand' : ''}`}>{pad2(d.getDate())}</span>
              <span className={`mt-1 h-1 w-1 rounded-full ${sel ? 'bg-white' : hasTasks.has(s) ? 'bg-brand/50' : 'bg-transparent'}`} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
