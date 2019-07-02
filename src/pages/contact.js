import React from "react"
import './contact.scss'

import { Layout, Section, Wrapper } from "../components"

const ContactPage = () => (
  <Layout>
    <Section>
      <Wrapper>
        <h3 className="text--center">Contact Me</h3>
        <form data-netlify="true" method="POST" name="contact" className="form">
          <label>Name</label>
          <input type="text" name="name" />
          <label>Email Address</label>
          <input type="email" name="email" />
          <label>Message</label>
          <textarea name="message"></textarea>
          <button type="submit">Send &rarr;</button>
        </form>
      </Wrapper>
    </Section>

  </Layout>
)


export default ContactPage
