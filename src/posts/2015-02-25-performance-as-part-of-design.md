---
title: "Performance as Part of Design"
subtitle: "Saving time and building better sites with performance budgets"
date: 2015-02-25 09:00:00 -0600
categories: engineering
tags: performance, development, design thinking
excerpt: Let’s move performance to the front of the design process. No longer should it have to wait at the end of the line to be noticed, when it can help us early in the design process.
slug: 2015/02/25/performance-as-part-of-design
status: published

---
I’ll start with a question.

How many design meetings have you been a part of? Maybe it wasn’t called a ‘design meeting’ per-se, maybe the term ‘kickoff meeting’ was used. Let’s assume, for this exercise, that a design meeting is anything that involves a group of people working on an upcoming project discussing the nature of what they hope to achieve.

OK, now how many of these meetings have included conversation about load-time? How about file size? If you’re like me, the answer is probably none of them.

From my experience, designers, product managers, user experience folks, and even developers will talk about all sorts of features and goals — and rarely does the weight or speed of these decisions ever come up…until about 3 days before launch. Yep, once every whiz-bang javascript interaction and 1600×800 hi-res image has been crammed into this poor thing, people begin to say things like ‘it looks great once it loads, but it just feels a little sluggish…” Then it’s a mad rush to start peeling back layers and compressing images to death until we feel like we’ve done ‘enough’ to get it faster.

If you follow the work of many of the web’s leading men and women (including [Scott Jehl](http://www.twitter.com/scottjehl){:target="_blank"}, [Lara Hogan](https://twitter.com/lara_hogan){:target="_blank"}, [Dan Mall](http://www.twitter.com/danielmall){:target="_blank"}, [Chris Coyier](http://www.twitter.com/chriscoyier){:target="_blank", and a host of others) you may already know where I’m going with this. If you don’t — then please keep reading — because we can fix this.

*Let’s move performance to the front of the queue.* No longer should it have to wait at the end of the line to be noticed, when it can help us early in the design process.

### Performance Budgets

This is where performance budgets come in. Performance budgeting is a way for us to make decisions about how quickly we want our site to load, relative to the network a user is on. We obviously can’t assume every user is on a blazing fast network, but we can make assumptions about the general range of speeds that our users have when accessing our site.

### Finding your budget total

To put together a performance budget, the first thing we need to do, is make a decision about how quickly we want our site to load for a user on a specified network.

For this exercise, let’s say we know that our user base is made up of at least 70% of users on a network that provides a download speed of 4 megabits (note: not megabyte) per second or faster.

Now this gets a little mathy, but stay with me.

1 megabit = .125 megabyte (8 bits equals 1 byte)

Therefore, a 4 megabit/sec download speed is equivalent to a .5 megabyte/sec download speed.

.5 megabyte = 512 kilobytes

SO… a 4 megabit/sec network downloads at a rate of 512 kb/s

We can say that we’d like for our site to load in 2 seconds for the users at the bottom of that cross-section (those with download speeds of 512 kb/s).

2 seconds * 512 kb/s = 1024 kb (1 megabyte)

So to have our site be served over a 4 mbps network in 2 seconds, it can only be 1 megabyte in total size. This is how much we have to ‘spend’ in our performance budget.

### Creating your line items

A typical site is made of HTML, CSS, JavaScript (of some flavor), images, and web-fonts. So how do we divide our total budget (1024kb/1mb) between these 4 categories? Particularly before we’ve even started building! I use two methods, depending on the project.

#### Estimating using a similar project

If it’s something similar to a previous project, you can examine the HTML and CSS of that project and use them as a best-guess to give you a starting point. Let’s say that our HTML was 62kb on a similar project, and our CSS was 35kb. We’ll use those numbers as guesses as to what our new markup and styles will weigh as well. Same goes with our javascript. Let’s assume a similar project was pretty lightweight and the JS was 17kb. 1024–62–35–17 = 910kb remaining
So now we know we have ~ 910kb to devote to typography and images. This gives our UX and visual designers a framework in how they are going to approach layout and design before they even start sketching.

#### Using available data concerning averages

The other option, is to use data that has been compiled about average file sizes in 2014. When we’re unsure about how large our site might be, this can be a good option to get a ballpark number to begin with. SitePoint tracks this data, and you can find it here: [www.sitepoint.com/average-page-weight-increases-15-2014/](http://www.sitepoint.com/average-page-weight-increases-15-2014/){:target="_blank"}

### Calculator Tool

In writing this blog post, I thought, “Man, it would be great if someone had put together a little calculator to help people get started with this.” No one had, so I’ve started one myself. It’s pretty rough around the edges right now, but give it a spin and let me know what you think. You can find it here: [www.joshmobley.net/tools/performance-calculator](www.joshmobley.net/tools/performance-calculator){:target="_blank"}

### How it helps

Obviously, this allows us to set a target for performance from the earliest phases of design. That’s a huge win that can save folks a lot of headache and time later. Secondly, it helps designers make better decisions.

Design is about working within constraints to solve a problem. A performance budget assigns very specific parameters to the performance constraint. Try working it into your next project.

### Shout Outs

Big shout outs again to Dan Mall and Scott Jehl for giving awesome talks about performance at An Event Apart SF in Nov 2014.

