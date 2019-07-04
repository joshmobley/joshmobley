import React from "react"
import { Helmet } from 'react-helmet'
import './contact.scss'

import { Layout, Section, Wrapper } from "../components"

const ContactPage = () => (
  <Layout>
    <Helmet>
      <title>Contact - Josh Mobley</title>
      <meta name="description" content="Contact me, or react out on social." />
    </Helmet>
    <Section>
      <Wrapper>
        <h3 className="text--center">Contact Me</h3>
        <form data-netlify="true" method="POST" name="contact" action="#" className="form">
          <input type="hidden" name="form-name" value="contact" />
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
