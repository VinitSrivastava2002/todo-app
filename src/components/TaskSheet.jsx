import { useEffect, useState } from 'react'
import { CalendarIcon, ClockIcon, CloseIcon } from './Icons'
import { formatLong, formatTime } from '../utils/dates'

const box = 'relative flex h-11 w-full items-center gap-2 rounded-[3px] border border-slate-200 bg-white px-3 text-[13px]'
const label = 'mb-1.5 block text-[11px] text-slate-500'

function Picker({ type, value, onChange, display, placeholder, icon, iconRight, label: aria }) {
  return (
    <div className={box}>
      {!iconRight && icon}
      <span className={value ? 'text-ink' : 'text-slate-500'}>{value ? display : placeholder}</span>
      {iconRight && <span className="ml-auto">{icon}</span>}
      <input
        type={type}
        value={value}
        aria-label={aria}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => { try { e.currentTarget.showPicker?.() } catch { /* not supported */ } }}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </div>
  )
}

const PRIORITIES = [['low', 'Low'], ['medium', 'Medium'], ['high', 'High']]

export default function TaskSheet({ initial, isNew, onSave, onClose }) {
  const [title, setTitle] = useState(initial.title || '')
  const [description, setDescription] = useState(initial.description || '')
  const [date, setDate] = useState(initial.date || '')
  const [start, setStart] = useState(initial.start || '')
  const [end, setEnd] = useState(initial.end || '')
  const [priority, setPriority] = useState(initial.priority || '')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!title.trim()) errs.title = 'Add a title for this task.'
    if (!start) errs.start = 'Pick a start time.'
    if (start && end && end <= start) errs.end = 'End time must be after the start time.'
    if (!date) errs.date = 'Pick a date.'
    setErrors(errs)
    if (Object.keys(errs).length) return
    onSave({ title: title.trim(), description: description.trim(), date, start, end, priority })
  }

  const err = (m) => m && <p className="mt-1 text-[11px] text-rose-600">{m}</p>

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40" onMouseDown={onClose}>
      <form
        onSubmit={submit}
        noValidate
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={isNew ? 'Add new task' : 'Edit task'}
        className="sheet-up max-h-[94vh] w-full max-w-[420px] overflow-y-auto bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[15px] font-medium">{isNew ? 'Add New Task' : 'Edit Task'}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1"><CloseIcon width={20} height={20} /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="t-title" className={label}>Task title</label>
            <input id="t-title" autoFocus={isNew} value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="Doing Homework" aria-invalid={!!errors.title}
              className={`${box} outline-none focus:border-brand`} />
            {err(errors.title)}
          </div>

          <div>
            <span className={label}>Set Time</span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Picker type="time" value={start} onChange={setStart} display={formatTime(start)} placeholder="Start"
                  icon={<ClockIcon width={16} height={16} />} label="Start time" />
                {err(errors.start)}
              </div>
              <div>
                <Picker type="time" value={end} onChange={setEnd} display={formatTime(end)} placeholder="Ends"
                  icon={<ClockIcon width={16} height={16} />} label="End time" />
                {err(errors.end)}
              </div>
            </div>
          </div>

          <div>
            <span className={label}>Set Date</span>
            <Picker type="date" value={date} onChange={setDate} display={date ? formatLong(date) : ''}
              placeholder="Pick a date" icon={<CalendarIcon width={16} height={16} />} iconRight label="Task date" />
            {err(errors.date)}
          </div>

          <div>
            <label htmlFor="t-desc" className={label}>Description</label>
            <textarea id="t-desc" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Add Description"
              className="w-full resize-none rounded-[3px] border border-slate-200 p-3 text-[13px] outline-none focus:border-brand" />
          </div>

          <fieldset>
            <legend className={label}>Priority (optional)</legend>
            <div className="grid grid-cols-3 gap-3">
              {PRIORITIES.map(([k, l]) => (
                <button key={k} type="button" aria-pressed={priority === k}
                  onClick={() => setPriority(priority === k ? '' : k)}
                  className={`h-9 rounded-[3px] border text-xs ${priority === k ? 'border-brand bg-brand-soft font-medium text-brand' : 'border-slate-200 text-slate-600'}`}>
                  {l}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <button type="submit" className="mt-6 h-12 w-full rounded-[3px] bg-brand text-sm font-medium text-white hover:bg-brand-navy">
          {isNew ? 'Create task' : 'Save changes'}
        </button>
      </form>
    </div>
  )
}
