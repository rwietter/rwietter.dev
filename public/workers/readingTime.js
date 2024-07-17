import useReadingTime from 'reading-time';

import { parentPort, workerData } from 'node:worker_threads';

function getReadingTime(content) {
  const { text } = useReadingTime(content)
  return text
}

const readingTime = getReadingTime(workerData);
parentPort.postMessage(readingTime);
