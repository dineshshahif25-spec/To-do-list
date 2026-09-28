import { useState } from 'react'

/**
 * Form component for adding new tasks
 * Controlled inputs with onChange handlers
 */
function TaskInput({ onAdd, categories }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title.trim(), category, dueDate || null)
    setTitle('')
    setDueDate('')
  }

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="task-input-field"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="task-input-select"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="task-input-date"
      />
      <button type="submit" className="btn-add">
        Add Task
      </button>
    </form>
  )
}

export default TaskInput
