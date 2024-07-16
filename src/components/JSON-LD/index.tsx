import { ArticleJsonLd } from 'next-seo'

interface JSONLDProps {
  title: string
  description: string
  url: string
  datePublished?: string
  authorName: string
  image: string
  isAccessibleForFree?: boolean
  type?: 'Article' | 'BlogPosting' | 'NewsArticle' | 'Blog'
}

const JSONLD: React.FC<JSONLDProps> = (props) => (
  <ArticleJsonLd
    useAppDir={true}
    url={props.url}
    title={props.title}
    images={[props.image]}
    datePublished={props.datePublished || ''}
    authorName={[
      {
        name: props.authorName,
        url: 'https://rwietter.dev',
      },
    ]}
    publisherName={props.authorName}
    description={props.description}
    isAccessibleForFree={props.isAccessibleForFree || true}
    type={props.type || 'Article'}
  />
)

export default JSONLD
