import React from "react"
import { Link, graphql } from "gatsby"
import './index.scss'

import { BlogEntry, Layout, Section, Wrapper } from "../components"

const HomePage = ({ data }) => (
  <Layout>
    <Section>
      <Wrapper>
        <h3 className="text--center">Recent Posts</h3>
        { data.posts.nodes.map( post => (
          <BlogEntry post={ post } />
          ))
        }
      </Wrapper>
    </Section>
    
    <Section className="about">
      <Wrapper>
        <h3>About Me</h3>
        <img className="about__image" src="me.jpg" />
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
      sort: { order: DESC, fields: [frontmatter___date] },
      limit: 3
    ) {
      nodes {
        meta: frontmatter {
          title
          excerpt
          slug
          date(formatString: "MMMM D, YYYY")
        }
      }
    }
  }`

export default HomePage
