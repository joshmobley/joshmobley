---
title: "Wordpress and Gatsby"
subtitle: "Bringing your legacy CMS into the JAM-Stack"
date: 2019-06-03 14:00:00 -0500
categories: engineering
tags: wordpress gatsby jamstack react javascript cms
excerpt: "Migrating multiple Wordpress sites to Gatsby without touching the data. Gatsby shines as a flexible way to source content from wherever it is, and provide you a nice toolset for building static-site/SPA hybrids."
slug: 2019/06/03/wordpress-and-gatsby
status: published
---

## The Situation

In a recent project, I was in charge of an organizations marketing sites that were all built on Wordpress. In this particular case, we had 3 seperate wordpress instances that powered 3 different sites that all needed to share some amount of style/branding.

The choice was made to host these sites on 3 separate wordpress themes, that all shared a common set of assets (CSS, JS) so that things like headers/footers/typography could remain consistant, but the editor experience for each site could be unique to it's own content.

### The Problem

As the brand evolved (rapidly), it was problematic to go through each marketing property and update markup as needed to make global changes. The amount of duplicated work was starting to feel untenable, and we needed a solution to ensure consistancy throughout the marketing journey while keeping engineering overhead low.

Additionally, our mainline product is a javascript (React) application, and getting JS engineers excited to make changes to Wordpress templates was like pulling teeth.

### The Solution

Ideally, I wanted more engineers to feel comfortable/interested in working on the marketing properties. But more importantly, we needed a way to share components across UI. React seemed like a good option, if only there was a reliable way to build an accessible website with react other than the complexity of server-side rendered...

## Gatsby.js

Of course, now there is. Gatsby has been picking up steam for the last couple of years as a viable way to build sites with the toolchain of React + GraphQL. Gatsby supports sourcing content from any number of CMS options, or even the filesystem/markdown (like Jekyll).

In this case, it seemed like a great solution to our problem. We can keep content inside of wordpress, but improve the workflow for engineering to ensure all 3 sites stay consistant.

### Making WP talk to Gatsby

To leverage Wordpress as a content source, there are a few steps you need to take. First of all, you will be leveraging the WP REST API. That's how gatsby will pull in all of the available content at build-time. 

You'll use the `gatsby-source-wordpress` plugin to configure your gatsby instance to talk to your api endpoints. [It's well documented here](https://www.gatsbyjs.org/packages/gatsby-source-wordpress/). 

Any plugins you're using on your wordpress site that contain data you'll need to expose to your Gatsby site should also be included in the API. Make sure you've accounted for them. Things like Advanced Custom Fields, or Yoast SEO for example.

### Gotchas

#### ACF Null Values

The biggest gotcha I had to deal with to make things go smoothly is ensuring that all field types in ACF returned a `null` response if a value wasn't present.

If you see this error: `GraphQL Error Unknown field {field} on type {type}`, that's likely what you're dealing with. ACF by default returns `false` on empty fields. You'll need to manually edit your api response to ensure a `false` response is presented as `null`.

[There is now some nice documentation about this issue here.](https://www.gatsbyjs.org/packages/gatsby-source-wordpress/#graphql-error---unknown-field-on-acf) 

#### Understanding Server-side vs. Client-side Rendering

Gatsby does a lot of magical stuff under the hood. It turns regular-old React into a nice static-site that is enhanced by React when JS is available.

It also provides you some fine-grained control over how certain things work. It uses the following files to present that control:

- [gatsby-browser.js](https://www.gatsbyjs.org/docs/browser-apis/)
- [gatsby-ssr.js](https://www.gatsbyjs.org/docs/ssr-apis/)
- [gatsby-node.js](https://www.gatsbyjs.org/docs/node-apis/)

`gatsby-node.js` is a file you'll touch a lot. It helps you configure creating static pages based on content/gql queries, etc.

Otherwise, you can get pretty far without bothering with `gatsby-browser` or `gatsby-ssr`, but you may find that some of your react code presents bugs when you refresh or directly-load on that page (instead of navigating after the fact, using react router under the hood).

In that case you may need to make some affordances with `gatsby-ssr` to get your behavior exactly the way you want on page load. Something to be aware of.

## Conclusion

After we had successfully build a couple of our proeprties on Gatsby, using a shared npm module full of reusable React components, we realized we were on to something. 

We took the leap and migrated our existing content (from 3 wordpress instances), into 1 purpose-built WP instance that was intended to be API-only from day 1. This has simplified the things content creators need to remember (content in one place, one set of credentials, etc) as well as keeping API engineering in one place.

But that's the beauty of Gatsby. You can source content from 1 place or many places, and it really doesn't care. It'll help you map it to GQL queries inside of your 'app' and you can present it side-by-side to your users. 

I'm a big fan of Gatsby now, so much so that I migrated this site from an old Jekyll build (circa 2016) to Gatsby, and once again Gatsby showed it's prowess. I just copy/pasted my markdown, edited a little config, and I was displaying all of my existing content -- because Gatsby is unopinionated and awesome. 