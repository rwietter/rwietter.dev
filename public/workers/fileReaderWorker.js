import { readFileSync } from 'node:fs';
import { parentPort, workerData } from 'node:worker_threads';

function readFile(filePath) {
  return readFileSync(filePath, 'utf-8');
}

const fileContent = readFile(workerData);
parentPort.postMessage(fileContent);
