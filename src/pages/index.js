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
          <li><img src="/logos/consensys.webp" alt="Consensys" /></li>
          <li><img src="/logos/truffle.png" alt="Truffle Suite" /></li>
          <li><img src="/logos/pendo.png" alt="Pendo" /></li>
          <li><img src="/logos/anchore.png" alt="Anchore" /></li>
          <li><img src="/logos/pearson-english.png" alt="Pearson English" /></li>
          <li><img src="/logos/foreign-policy.png" alt="Foreign Policy Magazine" /></li>
          <li><img src="/logos/economist.png" alt="The Economist" /></li>
          <li><img src="/logos/nc-state.png" alt="NC State University" /></li>
          <li><img src="/logos/duke.svg" alt="Duke University" /></li>
          <li><img src="/logos/unc.png" alt="UNC School of Medicine" /></li>
          <li><img src="/logos/gopc.png" alt="Great Outdoor Provision Co." /></li>
          <li><img src="/logos/cameron-village.png" alt="Cameron Village" /></li>
          <li><img src="/logos/raleigh-little-theater.svg" alt="Raleigh Little Theatre" /></li>
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
