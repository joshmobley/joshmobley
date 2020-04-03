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

Earlier today a teammate and myself were looking at an issue in a React app that leverages Apollo for it's data-fetching and state-management.

In general, Apollo has worked extremely well for us, and gives us nice control over our local state without having to fiddle with it very much, and without the boilerplate of something like Redux.

In this particular situation, though, we had a mutation that was using the `refetchQueries` option to pull fresh data and update all the instances of that query around our app. We use this method in various places in our application and it always works fine, but for some reason this particular case was not.

As we troubleshooted, we noticed that the network request was firing as we expected, and the data coming back was what we wanted, but the Apollo cache was just not updating (the component showing the data from the original query never re-rendered with the data from the network request).

Finally, I took the time to download the Apollo Dev Tools (HIGHLY RECOMMENDED MOVING FORWARD) and took a look at the cache object.

What we noticed is that the refetched query was passing an id as a variable as an **integer**, while the original query was passing it as a **string**. The Apollo cache treats these as separate items in the store, and therefore updating one will not update the other!

This was happening because we were grabbing the id for one of our queries from `useParams` (i.e. the id in the URI). React Router passes these params as strings. Moving forward, we'll be parsing those to integers with `parseInt` anytime we're pulling an id from params. Problem solved.

I hope this little snippet saves someone the couple of hours we spent today tracking this down.
