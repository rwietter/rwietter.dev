import MDX from '@/base/components/MDX'
import type { MDXSerialized } from '@/types/MDX'

type MicroBlogTypeProps = {
  data: {
    content: MDXSerialized
  }
}

const Microblog: React.FC<MicroBlogTypeProps> = (props) => {
  return (
    <div>
      <MDX mdxSource={props.data.content} />
    </div>
  )
}

export default Microblog
