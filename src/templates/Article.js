import React from 'react'
import { Helmet } from 'react-helmet'
import { Layout } from '../components'
import './Article.scss'

const ArticleTemplate = ({ data }) => (
  <Layout>
    <Helmet>
      <title>{ data.post.meta.title } - Josh Mobley</title>
      <meta name="description" content={ data.post.meta.excerpt } />
    </Helmet>
    <article className="article">
        <p class="article__date">{ data.post.meta.date } / { data.post.meta.categories }</p>
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
          categories
          date(formatString: "MMMM D, YYYY")
        }
        html
      }
       
    
  }`

export default ArticleTemplate