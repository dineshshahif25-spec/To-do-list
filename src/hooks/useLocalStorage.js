import { useState, useEffect } from 'react'

/**
 * Custom hook that syncs state with localStorage
 * @param {string} key - The localStorage key
 * @param {any} initialValue - Default value if nothing in storage
 */
function useLocalStorage(key, initialValue) {
  // Read initial value from localStorage or use default
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  // Update localStorage whenever value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage full or unavailable - fail silently
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
