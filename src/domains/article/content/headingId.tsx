import React from 'react'

const headingId = (children: string) => {
  return children.toLowerCase().replace(/ /g, '-')
}

const headings = [1, 2, 3, 4, 5].map((level) => `h${level}`)

export const components = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ...headings.reduce((acc: any, heading) => {
    acc[heading] = ({ children }: { children: string }) => {
      const id = headingId(children)
      return React.createElement(heading, { id }, children)
    }
    return acc
  }, {}),
}
