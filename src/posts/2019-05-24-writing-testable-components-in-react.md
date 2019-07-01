---
title: "Writing Testable Components in React"
subtitle: "Struturing Your Functional Components to Make Them Testable"
date: 2019-05-24 14:00:00 -0500
categories: engineering
tags: react javascript jest unit-testing functional-components testing
excerpt: "..."
slug: 2019/05/24/writing-testable-components-in-react
status: draft
---

## Why It Matters

Unit testing has long been considered a critical part of building confidence in your code. Ensuring each method or conditional works as anticipated, especially after a refactor is priceless when you have a team of people working on code that they may or may not be familiar with all the possible situations it could be executed.

As such, TDD has been hailed as a great way to develop, as it ensures that you're writing testable code from day 1.

## Living in the Real World

Though, like many of you, I don't live in a TDD world. My engineering team did not adopt TDD as a development paradigm, and our UI code base is full of untested components. A smattering of integration tests are used to maintain some level of confidence that the product still works as expected, but many components were written in such a way that unit testing is impractical, if not impossible.

## How We Improve

Knowing that we've got a lot of ground to make up on testing, there's an initiative in place to add test coverage to whatever you're working on. This incremental approach should build coverage and confidence over time, without pulling engineers off of new development entirely.

Perhaps like you, we're already refactoring a lot of things as we move through our code. Moving from class-based to functional components. Moving things off out of redux and into GraphQL, etc.

This leads us to the topic of this article, how do we write testable functional components in React? What does it look like?

## Some Considerations

This, by no means is an exhaustive list of things to think about, but are a few of the issues I've personally run into recently around testing functional components in React.

### Keep Functions Outside of Your Component

Testing methods written inside of a component can be tricky with Enzyme/Jest. With class-based components, this wasn't a problem. Enzyme's `shallow` wrapper provided an `instance` property that would represent the instance of the class, and would expose it's methods for you to easily spy or mock.

But with functional components, there is no `instance` in enzyme. 