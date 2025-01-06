import { NextRequest, NextResponse } from 'next/server'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'node:path'
import fs from 'node:fs/promises'
import matter from 'gray-matter'
import { generateRssFeed } from 'utils/feed'
import { Post } from '@/types/Post'
import { cookies } from 'next/headers'
import { getCookies } from 'cookies-next'

/**
 * Read and parse blog posts from the file system.
 */
async function readPosts(dirPath: string): Promise<Post[]> {
  const files = await fs.readdir(dirPath)
  const posts = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(dirPath, filename)
      const source = await fs.readFile(filePath, 'utf-8')
      const { data, content } = matter(source)

      return {
        frontmatter: data as Post['frontmatter'],
        slug: data?.slug,
        content,
      }
    })
  )
  return posts
}

/**
 * Generate RSS feed for blog posts.
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const dirPath = path.join(process.cwd(), 'public', 'posts', 'pt')

  try {
    const rss = await generateRssFeed(readPosts(dirPath))

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/rss+xml',
      },
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}