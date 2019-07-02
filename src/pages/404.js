import React from "react"
import './404.scss'

import { Layout, Section, Wrapper } from "../components"

const NotFoundPage = () => (
  <Layout>
    <Section className="not-found">
      <Wrapper>
        <div className="not-found__message">
          <div className="not-found__bg"></div>
          <h1>This Page Doesn't Exist</h1>
          <p>&ldquo;Someone&rdquo; must&rsquo;ve run off with it.</p>
        </div>
      </Wrapper>
    </Section>
  </Layout>
)

export default NotFoundPage
