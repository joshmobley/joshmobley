import React from "react"
import './contact.scss'

import { Layout, Section, Wrapper } from "../components"

const ContactPage = () => (
  <Layout>
    <Section>
      <Wrapper>
        <h3 className="text--center">Contact Me</h3>
        <form data-netlify="true" method="POST" name="contact" action="#" className="form">
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
    <Section className="contact">
      <Wrapper>
        <h3 className="text--center">Or On Social</h3>
        <div class="social-links">
          <a href="https://twitter.com/joshmobley">
            <img src="/twitter.png" alt="Twitter" />
          </a>
          <a href="https://linkedin.com/in/joshuamobley">
            <img src="/linkedin.png" alt="LinkedIn" />
          </a>
        </div>
      </Wrapper>
    </Section>

  </Layout>
)


export default ContactPage
