import { readFileSync } from 'node:fs'
import { parentPort, workerData } from 'node:worker_threads'

function readFileAsync(filePath) {
  return readFileSync(filePath, 'utf-8')
}

const fileContent = readFileAsync(workerData)
parentPort.postMessage(fileContent)
