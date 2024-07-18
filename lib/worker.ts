import { Worker } from 'node:worker_threads'

export class WorkerThread {
  private worker: Worker | null = null

  runWorker<T>(workerPath: string, data: T): Promise<T> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(workerPath, {
        workerData: data,
      })
      worker.on('message', resolve)
      worker.on('error', (error) => {
        console.error('Worker error:', error)
        reject(error)
      })
      worker.on('messageerror', reject)
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`))
      })
    })
  }
}
