import React from "react"
import { Helmet } from 'react-helmet'
import { Link, graphql } from "gatsby"
import './index.scss'

import { BlogEntry, Layout, Section, Wrapper } from "../components"

const BlogPage = ({ data }) => (
  <Layout>
    <Helmet>
      <title>Writing - Josh Mobley</title>
      <meta name="description" content="I write about my experiences with engineering for the web. Also lifting heavy things in my garage." />
    </Helmet>
    <Section>
      <Wrapper>
        <h3 className="text--center">All Posts</h3>
        { data.posts.nodes.map( post => (
          <BlogEntry post={ post } />
          ))
        }
      </Wrapper>
    </Section>

  </Layout>
)

export const pageQuery = graphql`
  {
    posts: allMarkdownRemark (
      filter: {
        frontmatter: {
          status: { eq: "published" }
        }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      nodes {
        meta: frontmatter {
          title
          excerpt
          slug
          date(formatString: "MMMM D, YYYY")
          categories
        }
      }
    }
  }`

export default BlogPage
