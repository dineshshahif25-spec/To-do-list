import { useState } from 'react'

/**
 * Individual task card component
 * Shows task details, supports edit/delete/toggle
 */
function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editCategory, setEditCategory] = useState(task.category)
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '')

  // Check if task is overdue
  const isOverdue =
    task.dueDate && !task.completed && new Date(task.dueDate) < new Date()

  const handleSave = () => {
    if (!editTitle.trim()) return
    onEdit(task.id, {
      title: editTitle.trim(),
      category: editCategory,
      dueDate: editDueDate || null,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(task.title)
    setEditCategory(task.category)
    setEditDueDate(task.dueDate || '')
    setIsEditing(false)
  }

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  if (isEditing) {
    return (
      <div className="task-item editing">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="edit-input"
        />
        <select
          value={editCategory}
          onChange={(e) => setEditCategory(e.target.value)}
          className="edit-select"
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
        </select>
        <input
          type="date"
          value={editDueDate}
          onChange={(e) => setEditDueDate(e.target.value)}
          className="edit-date"
        />
        <div className="task-actions">
          <button onClick={handleSave} className="btn-save">
            Save
          </button>
          <button onClick={handleCancel} className="btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <label className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="checkmark"></span>
      </label>
      <div className="task-content">
        <span className="task-title">{task.title}</span>
        <div className="task-meta">
          <span className={`category-badge ${task.category.toLowerCase()}`}>
            {task.category}
          </span>
          {task.dueDate && (
            <span className={`due-date ${isOverdue ? 'overdue-text' : ''}`}>
              {isOverdue ? '⚠ Overdue: ' : 'Due: '}
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>
      <div className="task-actions">
        <button onClick={() => setIsEditing(true)} className="btn-edit">
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem
