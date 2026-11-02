const pad = (n) => String(n).padStart(2, '0')

export const pad2 = pad
export const toDateStr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const parseDate = (s) => new Date(`${s}T00:00`)

export function addDays(d, n) {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}

/** Monday of the week containing `d` (weeks run Monday–Sunday). */
export function startOfWeek(d) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return addDays(x, -((x.getDay() + 6) % 7))
}

export const weekDays = (d) => {
  const s = startOfWeek(d)
  return Array.from({ length: 7 }, (_, i) => addDays(s, i))
}

export function weekRangeLabel(days) {
  const f = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return `${f(days[0])} – ${f(days[6])}, ${days[6].getFullYear()}`
}

/** "Friday 14, January" */
export function formatLong(str) {
  const d = parseDate(str)
  const wd = d.toLocaleDateString('en-US', { weekday: 'long' })
  const mo = d.toLocaleDateString('en-US', { month: 'long' })
  return `${wd} ${d.getDate()}, ${mo}`
}

/** "09:30" -> "9:30 AM" */
export function formatTime(t) {
  if (!t) return ''
  const [h, m] = t.split(':').map(Number)
  return `${h % 12 || 12}:${pad(m)} ${h >= 12 ? 'PM' : 'AM'}`
}

export function formatMeta(task) {
  const d = parseDate(task.date)
  const day = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const time = task.start ? `${formatTime(task.start)}${task.end ? ` – ${formatTime(task.end)}` : ''}` : ''
  return time ? `${day} · ${time}` : day
}
