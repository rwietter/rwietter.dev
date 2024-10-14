import useReadingTime from 'reading-time'

export const getReadingTime = (content: string) => {
  const { minutes } = useReadingTime(content)
  return { readTime: Math.ceil(minutes).toString() }
}
