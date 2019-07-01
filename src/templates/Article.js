import React from 'react'
import { Layout } from '../components'

const ArticleTemplate = ({ data }) => (
  <Layout>
  <article>
      <h1>{ data.post.meta.title }</h1>
      <div dangerouslySetInnerHTML={{ __html: data.post.html }} />
  </article>

  </Layout>
)

export const pageQuery = graphql`
query PageQuery($slug: String) {
    post: markdownRemark (
        frontmatter: {
          slug: { eq: $slug}
      }
) {
     meta: frontmatter {
          title
          excerpt
          slug
        }
        html
      }
       
    
  }`

export default ArticleTemplate