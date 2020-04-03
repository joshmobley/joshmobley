---
title: "RefetchQueries and the Apollo Cache"
subtitle: "Make sure your variables are of the same type"
date: 2020-04-02 20:30:00 -0500
categories: engineering quick-tip
tags: react javascript apollo graphql
excerpt: "If you're having trouble with refetchQueries not updating your UI, it could be a type mismatch."
slug: 2020/04/02/refetchqueries-and-the-apollo-cache
status: published
---

## Background

Earlier today a teammate and myself were looking at an issue in a React app that leverages Apollo for it's data-fetching and state-management.

In general, Apollo has worked extremely well for us, and gives us nice control over our local state without having to fiddle with it very much, and without the boilerplate of something like Redux.

## The Problem

In this particular situation, we had a mutation that was using the `refetchQueries` option to pull fresh data and update all the instances of that query around our app. We use this method in various places in our application and it always works fine, but for some reason this one instance was not.

As we troubleshooted, we noticed that the network request was firing as we expected, and the data coming back was what we wanted, but the Apollo cache was just not updating (the component showing the data from the original query never re-rendered with the data from the network request).

## The Solution

Finally, after downloading the Apollo Dev Tools (recommended) and looking at the `ROOT_QUERY` cache object, we found the problem.

What we noticed is that the refetched query was passing it's `id` as an `integer`, while the original query was passing it as a `string`. The Apollo cache treats these as separate items in the store, and therefore updating one will not update the other!

This was happening because we were grabbing the id for our initial query from router params, which are always returned as strings. The `refetchQuery` id was coming from a decoded JWT. Moving forward, we'll be using `parseInt` on `id`s that get compared to a JWT, and that should fix us right up.

## Takeaways

In general, you may never see an issue if you're passing variables in as strings. As long as the components that query that data are also pulling their id's from router params, it works like a charm.

It's the situation in which you have ANOTHER component refetching those queries, and pulling the same id from elsewhere (a decoded JWT in our case) that things can go sideways with typing issues.

In general, its just something to keep in mind if you find yourself with a stubborn cache and you're not sure why. Check the types.

I hope this little snippet saves someone the couple of hours we spent today tracking this down.
