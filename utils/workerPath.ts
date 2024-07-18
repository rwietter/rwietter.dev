import path from 'node:path'

export function workerPath(workerName: string) {
  return path.join(process.cwd(), 'public', 'workers', `${workerName}`)
}
