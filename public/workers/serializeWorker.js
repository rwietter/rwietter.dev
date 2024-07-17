import { serialize } from 'next-mdx-remote/serialize'
import { parentPort, workerData } from 'node:worker_threads'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

async function serializeMDX(content) {
  const source = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeKatex,
        [
          rehypePrettyCode,
          {
            highlight: true,
            lineNumbers: true,
            theme: {
              dark: 'github-dark-default',
              light: 'github-light-default',
            },
          },
        ],
        [rehypeExternalLinks, { target: '_blank' }],
      ],
      remarkPlugins: [remarkGfm, remarkMath],
      useDynamicImport: true,
    },
  })
  return source
}

serializeMDX(workerData).then((result) => {
  parentPort?.postMessage(result)
}).catch((error) => {
  parentPort?.postMessage(error)
})
