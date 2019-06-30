import React from "react"
import { Link, graphql } from "gatsby"

import { BlogEntry, Layout, Section, Wrapper } from "../components"

const IndexPage = ({ data }) => (
  <Layout>
    <Wrapper>
      <h3>Recent Posts</h3>
      { data.posts.nodes.map( post => (
        <BlogEntry post={ post } />
        ))
      }
    </Wrapper>
    
    <Section>
      <Wrapper>
        <h3>About Me</h3>
        <img src="//placehold.it/200x300" />
      </Wrapper>
    </Section>

  </Layout>
)

export const pageQuery = graphql`
  {
    posts: allMarkdownRemark (

      sort: { order: DESC, fields: [frontmatter___date] },
      limit: 3
    ) {
      nodes {
        frontmatter {
          title
          excerpt
        }

      }
      
    }
  }`

export default IndexPage
