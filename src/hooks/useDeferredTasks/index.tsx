import { useEffect, useRef } from 'react'

type Task = () => void
type Tasks = Task[]
type Add = { addTask: (task: Task) => void }

/**
 * A custom React hook to manage a queue of tasks that are deferred and executed when the page becomes hidden.
 * @param tasks - An optional array of tasks to initialize the queue. Default: empty array.
 * @returns An object with the `addTask` function to add tasks to the queue.
 */
const useDeferredTasks = (tasks: Tasks = []): Add => {
  const taskQueue = useRef<(() => void)[]>(tasks)

  useEffect(() => {
    /**
     * Handles the visibility change event.
     * Executes all tasks in the queue when the page becomes hidden.
     */
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        while (taskQueue.current.length > 0) {
          const task = taskQueue.current.shift() as () => void
          try {
            task()
          } catch (error) {
            console.error('Error executing deferred task:', error)
          }
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, []) // Empty dependency array ensures the effect runs only once

  /**
   * Adds a new task to the queue.
   * @param task - The task to be executed when the page becomes hidden.
   */
  const addTask = (task: () => void) => {
    taskQueue.current.push(task)
  }

  return { addTask }
}

export default useDeferredTasks
