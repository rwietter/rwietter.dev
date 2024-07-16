import { expose } from 'comlink'
import useReadingTime from 'reading-time'

const workerAPI = {
  getReadingTime(content) {
    const { text } = useReadingTime(content)
    return { readTime: text }
  },
}

expose(workerAPI)
