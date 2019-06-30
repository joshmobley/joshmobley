---
layout: post
title: "Web Standards in a Post-Standards World"
subtitle: "The more things change, the more they stay the same"
date: 2017-04-06 14:00:00 -0500
categories: writing
tags: development web standards AEA thoughts industry
excerpt: "I attended my first An Event Apart in 2011 in Washington, D.C. and the landscape of front-end development and design was a lot different than it is today. It's interesting to consider how the winds of change have blown against the industry for the last few years."
---

### Intro

The first edition of [An Event Apart](https://aneventapart.com){:target="_blank"} has just wrapped up this year. As expected, it was a top-flight conference with some of the industry's well-known and influential thinkers. 

I attended my first "AEA" in 2011 in Washington, D.C. and the landscape of front-end development and design was a lot different than it is today. It's interesting to consider how the winds of change have blown against the industry for the last few years.

First, some context.

### The Web in 2011

In those days, a good front-end developer was primarily focused on writing clean, semantic HTML that was accessible to all people. Additionally, we had a slew of browser quirks to contend with while attempting to write cross-browser CSS. IE 6-8 were still very much in play, and were considered when beginning any project.

Often times, an experienced developer was measured by his or her ability to know how to navigate this unpredictable and inconstant landscape.

#### The Responsive Web

Another pivotal moment in 2011 was the advent of Responsive Web Design by [Ethan Marcotte](https://ethanmarcotte.com/){:target="_blank"}. The practice and consideration of a mobile-first workflow, and crafting one unified experiences regardless of device type or screen size was novel, and uncharted territory.

The ability to shift a layout with media queries seemed like magic, and completely changed the way we thought about building for the browser.

### The Web in 2017

Fast forward to today, and many things have changed. The title of "front-end developer" has fallen out of fashion with the rise of client-side development (i.e. javascript). Many of us who were writing media queries in 2012 are now being asked to build complex applications for the browser. We've replaced "developer" with "engineer" and work on engineering teams producing SaaS products for the web and for native.

Meanwhile, the title of "designer" has come to represent a wide swath of responsibilities, depending on what organization you work with. UI designers are being tasked with understanding how to build out their designs with HTML and CSS. 

Luckily for them, the variation between browser support has improved dramatically. Microsoft has sunsetted Internet Explorer for Edge, and now all of the major players can be described as "evergreen" and more importantly "standards-compliant". Hacks and work-arounds aren't really necessary to ensure that layouts aren't horribly broken from one browser to the next.

### The Downside

From my perspective, this has led to a couple of different...well, issues.

1. The most experienced "engineers" aren't working on informational websites.
2. Designers aren't immediately approaching HTML/CSS from the perspective of an engineer.

These two issues lead to a lack of attention to things like semantic markup, performance, and accessibility on many of the sites on today's web. It's no one's fault, it's just the product of the shift that's happened in roles and responsibilities.

### Where to Now

Designers, developers, whatever you want to call yourself, if you write HTML I'm talking to you. 

It's up to you to make sure you're thinking about development as more than just "coding". Writing code that renders appropriately in the browser is table-stakes. Thoughtful implementations that consider the opportunities for your site or application to break, and still provide an accessible experience for your users is key. 

Better yet, build to the least common denominator, and enhance your product as is applicable and prudent. This approach is called [progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement){:target="_blank"} and it's been around a long time. It's not the cool phrase on the block anymore, but it's still as true today as it was when Steven Champeon coined it in 2003.

#### Progressive Enhancement

It's true that our browsers and networks are better than ever before. But that's just OUR browsers and OUR networks. As annual mobile device sales approach 1 per adult on earth, there's a slew of people in underserved markets beginning to use the web on what's available to them. Think about their experience, how can we ensure that we're serving lightweight experiences that grow when appropriate?

The web is a [hostile medium](https://adactio.com/journal/6692){:target="_blank"}. It always has been. 

When we used to think of progressive enhancement as "works in old browsers", now we need to consider if it "works on bad/no networks" or "works without javascript". We have more tools at our disposal than ever before to ensure this happens, but it takes thoughtful decision-making in design, and thorough execution in development.

### Conclusion

My point in all of this, is that the underlying principles of the web standards movement are still as relevant as they've always been. Build things that work everywhere, and then layer enhanced experiences where appropriate.

What once was a wide and diverse browser landscape has just been replaced with a wide and diverse device landscape, and because of that, we must still and always build to the least common denominator, and enhance; progressively enhance.