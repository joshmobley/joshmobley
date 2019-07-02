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
        <div class="text--center">
          <Link to="/blog">All Posts &rarr;</Link>
        </div>
      </Wrapper>
    </Section>
    
    <Section className="about section--no-padding">
        <div className="about__wrapper">
          <img className="about__image" src="me.jpg" />
          <div class="about__content">
            <h3>About Me</h3>
            <h4>Frontend Engineer. Wanna-be Athlete.</h4>
            <p>During the day, I work to build elegant user experiences with today's most modern frontend tools. Spending my early career as a UX Designer, I can happily stand in the gap between design and engineering to ensure everyone is speaking the same language.</p>
            <p>After work, I lift heavy things in my garage. I sometimes review these heavy things on my blog.</p>
          </div>
        </div>
    </Section>

    <Section className="brands section--green">
      <Wrapper>
        <h3 className="text--center">Brands I've Worked With</h3>
        <ul>
          <li>Kaleido</li>
          <li>Consensys</li>
          <li>Truffle Suite</li>
          <li>Pendo</li>
          <li>Anchore</li>
          <li>Pearson English</li>
          <li>Foreign Policy Magazine</li>
          <li>The Economist</li>
          <li>NC State University</li>
          <li>Duke University</li>
          <li>UNC School of Medicine</li>
          <li>Great Outdoor Provision Co.</li>
          <li>Cameron Village</li>
          <li>Raleigh Little Theatre</li>
        </ul>
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
          categories
          date(formatString: "MMMM D, YYYY")
        }
      }
    }
  }`

export default HomePage
