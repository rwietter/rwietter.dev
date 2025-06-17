export function formatDate(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  const dateObj = new Date(Date.UTC(year, month - 1, day + 1))

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }

  return new Intl.DateTimeFormat('en-US', options).format(dateObj)
}

export function getDate(date?: string) {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: '2-digit',
  }

  if (!date) return new Intl.DateTimeFormat('en-US', options).format(new Date())

  const [year, month, day] = new Date(date).toISOString().split(/[-T:.]/)
  const utc = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day) + 1))
  return new Intl.DateTimeFormat('en-US', options).format(utc)
}
