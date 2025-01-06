'use client'

import { useCallback, useEffect, useRef } from 'react'

type Deadline = {
  didTimeout: boolean
  timeRemaining: () => number
}

type Task = () => void

/**
 * A custom React hook to manage a queue of tasks that are executed during the browser's idle periods. The hook uses requestIdleCallback to execute tasks during the browser's idle periods, ensuring that critical tasks (like UI updates) are not blocked.
 * @param timeout - The maximum time (in milliseconds) the browser can wait to execute the tasks. Default: 2000 ms.
 * @returns An object with the `addTask` function to add tasks to the queue.
 */
const useIdleQueue = (timeout = 2000) => {
  const taskQueue = useRef<Task[]>([])
  const idleCallbackId = useRef<number | null>(null) // Stores the ID of the current idle callback

  // Cleanup effect to cancel the requestIdleCallback when the component unmounts
  useEffect(() => {
    return () => {
      if (idleCallbackId.current) {
        window.cancelIdleCallback(idleCallbackId.current)
      }
    }
  }, [])

  /**
   * Processes tasks from the queue during the browser's idle time.
   * @param deadline - An object providing information about the remaining time and whether the timeout was reached.
   */
  const runTasks = useCallback(
    (deadline: Deadline) => {
      while (
        (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
        taskQueue.current.length > 0
      ) {
        const task = taskQueue.current.shift() as Task
        task()
      }

      // If there are still tasks in the queue, schedule a new requestIdleCallback
      if (taskQueue.current.length > 0) {
        idleCallbackId.current = window.requestIdleCallback(runTasks, {
          timeout,
        })
      } else {
        idleCallbackId.current = null // Clear the callback ID when the queue is empty
      }
    },
    [timeout],
  )

  /**
   * Adds a new task to the queue and schedules execution during idle time.
   * @param task - The task to be executed.
   */
  const addTask = useCallback(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (task: any) => {
      taskQueue.current.push(task)
      if (!idleCallbackId.current) {
        // Schedule a new idle callback if one isn't already scheduled
        idleCallbackId.current = window.requestIdleCallback(runTasks, {
          timeout,
        })
      }
    },
    [runTasks, timeout],
  )

  return { addTask }
}

export { useIdleQueue }
