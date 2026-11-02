import { useCallback, useEffect, useRef, useState } from 'react'
import useTasks from './hooks/useTasks'
import Onboarding from './components/Onboarding'
import Home from './components/Home'
import SearchScreen from './components/SearchScreen'
import TaskSheet from './components/TaskSheet'
import { toDateStr } from './utils/dates'

const ONBOARD_KEY = 'weekly-todo:onboarded'

export default function App() {
  const { tasks, addTask, updateTask, removeTask, restoreTask, toggleStatus } = useTasks()
  const [onboarded, setOnboarded] = useState(() => {
    try { return localStorage.getItem(ONBOARD_KEY) === '1' } catch { return true }
  })
  const [view, setView] = useState('home')
  const [selected, setSelected] = useState(() => toDateStr(new Date()))
  const [sheet, setSheet] = useState(null) // { task? }
  const [toast, setToast] = useState(null)
  const timer = useRef(null)

  const start = () => {
    try { localStorage.setItem(ONBOARD_KEY, '1') } catch { /* ignore */ }
    setOnboarded(true)
  }

  const handleDelete = useCallback((task) => {
    removeTask(task.id)
    clearTimeout(timer.current)
    setToast(task)
    timer.current = setTimeout(() => setToast(null), 5000)
  }, [removeTask])

  useEffect(() => () => clearTimeout(timer.current), [])

  const save = (data) => {
    if (sheet.task) updateTask(sheet.task.id, data)
    else {
      addTask(data)
      setSelected(data.date)
    }
    setSheet(null)
  }

  const rowHandlers = { onToggle: toggleStatus, onEdit: (task) => setSheet({ task }), onDelete: handleDelete }

  if (!onboarded) {
    return <div className="mx-auto min-h-screen max-w-[420px] bg-white"><Onboarding onStart={start} /></div>
  }

  return (
    <div className="mx-auto min-h-screen max-w-[420px] bg-canvas md:shadow-xl">
      {view === 'search' ? (
        <SearchScreen tasks={tasks} onBack={() => setView('home')} {...rowHandlers} />
      ) : (
        <Home
          tasks={tasks}
          selected={selected}
          setSelected={setSelected}
          onAdd={() => setSheet({})}
          onOpenSearch={() => setView('search')}
          {...rowHandlers}
        />
      )}

      {sheet && (
        <TaskSheet
          key={sheet.task?.id || 'new'}
          isNew={!sheet.task}
          initial={sheet.task || { date: selected }}
          onSave={save}
          onClose={() => setSheet(null)}
        />
      )}

      {toast && (
        <div role="status" className="fixed inset-x-4 bottom-24 z-50 mx-auto flex max-w-[360px] items-center justify-between rounded-[3px] bg-ink px-4 py-3 text-sm text-white shadow-lg">
          <span className="truncate pr-3">Deleted “{toast.title}”</span>
          <button onClick={() => { restoreTask(toast); setToast(null) }} className="shrink-0 font-semibold text-brand-soft hover:underline">Undo</button>
        </div>
      )}
    </div>
  )
}
