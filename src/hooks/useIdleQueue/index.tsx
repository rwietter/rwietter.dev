import { useCallback, useEffect, useRef } from 'react'

type Deadline = {
  didTimeout: boolean
  timeRemaining: () => number
}

type Task = () => void

const useIdleQueue = (timeout = 2000) => {
  const taskQueue = useRef<Task[]>([])
  const idleCallbackId = useRef(0)

  const runTasks = useCallback(
    (deadline: Deadline) => {
      while (
        (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
        taskQueue.current.length > 0
      ) {
        const task = taskQueue.current.shift() as Task
        task()
      }

      if (taskQueue.current.length > 0) {
        idleCallbackId.current = window.requestIdleCallback(runTasks, {
          timeout,
        })
      }
    },
    [timeout],
  )

  const addTask = useCallback(
    (task: () => void) => {
      taskQueue.current.push(task)
      if (!idleCallbackId.current) {
        idleCallbackId.current = window.requestIdleCallback(runTasks, {
          timeout,
        })
      }
    },
    [runTasks, timeout],
  )

  useEffect(() => {
    return () => {
      if (idleCallbackId.current) {
        window.cancelIdleCallback(idleCallbackId.current)
      }
    }
  }, [])

  return addTask
}

export default useIdleQueue
