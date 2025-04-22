import type { Post } from '@/types/Post'
import { Feed } from 'feed'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export async function generateRssFeed(posts: Promise<Post[]>): Promise<string> {
  const url = process.env.PUBLIC_SITE_URL || 'https://rwietter.dev'

  const feedOptions = {
    title: "rwietter's blog posts",
    description: 'A blog about computer science, programming, theory, and more.',
    site_url: url,
    feed_url: `${url}/rss.xml`,
    image_url: `${url}/icons/mstile-310x310.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Maurício Witter`,
    id: url,
    author: {
      email: 'rwietter@duck.com',
      name: 'Maurício Witter',
      link: 'https://bsky.app/profile/did:plc:l4rdag2x2gkyq5zkgb46pbzl',
    },
    favicon: `${url}/favicon.ico`,
    feedLinks: {
      rss2: `${url}/rss.xml`,
      json: `${url}/rss.json`,
      atom: `${url}/rss.atom`,
    },
    link: url,
    image: `${url}/icons/mstile-310x310.png`,
    updated: new Date(),
    language: 'pt-BR',
    feed: 'https://rwietter.xyz/rss.xml',
  }

  const feed = new Feed(feedOptions)

  const postsResolved = await posts

  // Process all posts concurrently using Promise.all
  await Promise.all(postsResolved.map(async (post) => {
    const VFile = await remark().use(remarkHtml).process(post.content)
    const content = VFile.toString()

    feed.addItem({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      link: `${url}/blog/${post.slug}`,
      guid: post.slug,
      published: new Date(post.frontmatter.publishedAt),
      id: `${url}/blog/${post.slug}`,
      content: content,
      copyright: feedOptions.copyright,
      date: new Date(post.frontmatter.publishedAt),
      author: [
        {
          email: 'mauriciobw17@gmail.com',
          name: 'Maurício Witter',
          link: 'https://bsky.app/profile/did:plc:l4rdag2x2gkyq5zkgb46pbzl',
        },
      ],
    })
  }))
  const rss = feed.rss2()

  return rss
}
