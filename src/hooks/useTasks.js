import { useCallback, useEffect, useState } from 'react'
import { addDays, toDateStr } from '../utils/dates'

const KEY = 'weekly-todo:tasks:v2'
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()))

function seed() {
  const day = (n) => toDateStr(addDays(new Date(), n))
  const mk = (title, description, date, start, end, priority, status = 'open') => ({
    id: uid(), title, description, date, start, end, priority, status, createdAt: Date.now(),
  })
  return [
    mk('Finishing Wireframe', 'Complete the home and search screens', day(0), '09:00', '10:30', 'high'),
    mk('Meeting with team', 'Weekly sync', day(0), '11:00', '12:00', 'medium'),
    mk('Buy a cat food', '', day(0), '17:30', '', 'low', 'completed'),
    mk('Finishing daily commission', '', day(0), '14:00', '15:00', '', 'completed'),
    mk('Review pull requests', '', day(1), '10:00', '11:00', 'medium'),
    mk('Grocery shopping', 'Milk, eggs, vegetables', day(2), '18:00', '', 'low'),
    mk('Plan sprint demo', '', day(8), '11:00', '12:00', 'medium'),
    mk('Book dentist appointment', '', day(-8), '09:00', '', 'low', 'completed'),
  ]
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore corrupted storage */ }
  return seed()
}

export default function useTasks() {
  const [tasks, setTasks] = useState(load)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(tasks)) } catch { /* storage blocked */ }
  }, [tasks])

  const addTask = useCallback((data) => {
    setTasks((t) => [...t, { ...data, id: uid(), status: 'open', createdAt: Date.now() }])
  }, [])
  const updateTask = useCallback((id, patch) => {
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, ...patch } : x)))
  }, [])
  const removeTask = useCallback((id) => setTasks((t) => t.filter((x) => x.id !== id)), [])
  const restoreTask = useCallback((task) => setTasks((t) => [...t, task]), [])
  const toggleStatus = useCallback((id) => {
    setTasks((t) =>
      t.map((x) => (x.id === id ? { ...x, status: x.status === 'completed' ? 'open' : 'completed' } : x))
    )
  }, [])

  return { tasks, addTask, updateTask, removeTask, restoreTask, toggleStatus }
}
