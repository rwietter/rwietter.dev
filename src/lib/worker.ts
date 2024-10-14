import { Worker, type WorkerOptions } from 'node:worker_threads'

export class WorkerThread {
  private worker: Worker | null = null

  public runWorker<T>(
    workerPath: string,
    data: T,
    workerOptions?: WorkerOptions,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.worker = new Worker(workerPath, {
        workerData: data,
        ...workerOptions,
      })
      this.worker.on('message', (result: T) => {
        resolve(result)
        this.cleanup()
      })
      this.worker.on('error', (error: Error) => {
        console.error('[WorkerThread Error]:', error)
        reject(error)
        this.cleanup()
      })
      this.worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`))
        }
        this.cleanup()
      })
    })
  }
  public terminate(): void {
    if (this.worker) {
      this.worker.terminate()
      this.worker = null
    }
  }

  private cleanup(): void {
    if (this.worker) {
      this.worker.removeAllListeners()
      this.worker = null
    }
  }
}
