import { useState } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

const CATEGORIES = ['Work', 'Personal', 'Urgent']

function App() {
  // Tasks persisted in localStorage
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  // Theme persisted in localStorage
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  // Current filter: 'all' | 'active' | 'completed'
  const [filter, setFilter] = useState('all')
  // Current category filter
  const [categoryFilter, setCategoryFilter] = useState('all')

  // Apply theme to document
  useState(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  // Add a new task
  const addTask = (title, category, dueDate) => {
    const newTask = {
      id: Date.now(),
      title,
      category,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks([newTask, ...tasks])
  }

  // Toggle task completion status
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Edit a task
  const editTask = (id, updates) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    )
  }

  // Filter tasks based on status and category
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !task.completed) ||
      (filter === 'completed' && task.completed)
    const matchesCategory =
      categoryFilter === 'all' || task.category === categoryFilter
    return matchesFilter && matchesCategory
  })

  // Count remaining (incomplete) tasks
  const remainingCount = tasks.filter((t) => !t.completed).length
  const completedCount = tasks.filter((t) => t.completed).length

  return (
    <div className="app">
      <header className="app-header">
        <h1>TaskMaster</h1>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      <main className="app-main">
        <TaskInput onAdd={addTask} categories={CATEGORIES} />

        <div className="stats-bar">
          <span>{remainingCount} remaining</span>
          <span>{completedCount} completed</span>
        </div>

        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          categories={CATEGORIES}
        />

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      </main>
    </div>
  )
}

export default App
