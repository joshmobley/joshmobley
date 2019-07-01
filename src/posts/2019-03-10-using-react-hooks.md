---
title: "Using React Hooks"
subtitle: "Going full-functional with your React Components"
date: 2019-03-10 14:00:00 -0500
categories: engineering
tags: react javascript hooks state functional-components
excerpt: "React hooks provide a path to fully-commit to functional-style components without the need to handle small amounts of component state with a higher-level state management system."
slug: 2019/03/10/using-react-hooks
status: published
---

## What are Hooks?

Hooks are a new paradigm in React core that allows a developer to maintain state and fire side-effects within a functional component. Shipped with React 16.8, they allow you to `hook into` the state and lifecycle of a component without the need for class-based syntax.

These provide a nice syntax for allowing developers in the React ecosystem to fully-commit to functional-style components without the need to immediately handle stateful components with a higher-level state management system.

## Do I need to Refactor My Class-based Components?

Echoing the official React docs,

> We don’t recommend rewriting your existing components overnight but you can start using Hooks in the new ones if you’d like.

There's no immediate need to refactor all of your components, but as you're working on your project you may want to consider it. Some lifecycle hooks themselves have been deprecated in React 17:

- `componentWillMount`
- `componentWillReceiveProps`
- `componentWillUpdate`

Any existing component you have that are using these might be good candidates for the first pass of refactoring.

## Making the Switch

In my usage of hooks, the two most common are `useState` and `useEffect`.

### useState

`useState` is the hook that allows you to create/update state inside of your component. Unlike `setState`, `useState` does not require you to consider the state of a component as an object, but instead lets you focus on one piece of state at a time.

Here's the syntax:

```javascript
const [count, updateCout] = useState(0);
```

So as you can see, we're declaring a new constant as a destructured array. The first value, `count` in this case, represents our piece of state. The second, `updateCount`, represents the method we'll call to update our piece of state. Finally, the value we pass to `useState()` represents the default value for our piece of state on instantiation. This value is optional, but as with all things in React, having `undefined` state can be problematic from a rendering perspective.

### useEffect

`useEffect` is the hook that allows you to create and manage side-effects based on updates to your component. It's really useful to create a side-effect based on the value of a prop, or on component instantiation.

Let's look at the syntax:

```javascript
useEffect( () => {
    doSomething(count)
},[count])
```

Here's a simple example, where we're watching the value of `count` and when it updates, the function we've passed to `useEffect` will be called. In this case `doSomething` will be executed.

But what about if we want to fire something only once, on component instantiation?

```javascript
useEffect( () => {
    doSomething(count)
}, [])
```

You'll notice our second parameter we've passed, is now an empty array. This is effectively telling this `useEffect` hook that we don't want to watch anything for firing updates.

Some React engineers will say you should always pass `useEffect` a value to watch , but I've found this particular syntax practically very useful for firing some side-effects on component creation.

Let's take a look at a demo component using `useState` and `useEffect`.

```javascript
import React, { useState, useEffect } from 'React'

const MyComponent = ({ initalCount }) => {
    const [count, updateCount] = useState(initialCount);
    count [message, updateMessage] = useState();

    useEffect( () => {
        checkCountLimit(count);
    }, [count]);

    checkCountLimit(count) {
        if(count > 100) {
            updateMessage('Max Count is 100');
            updateCount(100);
        } else if( count < 0) {
            updateMessage('Min Count is 0');
            updateCount(0);
        }
    }

    return (
        <div>
            <p>{count}</p>
            { message && <p>{message}</p> }
            <button onClick={ e => updateCount(count++) }>Increase Count</button>
            <button onClick={ e => updateCount(count--) }>Decrease Count</button>
        </div>
    )
}

MyComponent.propTypes = {
    initialCount: PropTypes.number
}

MyComponent.defaultProps = {
    initialCount: 0
}

export default MyComponent
```

So here you can get a sense for how one might use these hooks. Even though there are more sophisticated/performant ways to ensure someone isn't setting state outside of a given bounds (0 - 100 in this case), I just wanted to show how you might watch a value with `useEffect` and then fire some side effects on it.

## Wrapping Up

Hooks can be a really sophisticated way to manage a bit of state inside your components that need it. Check out the [offical documentation](https://reactjs.org/docs/hooks-overview.html) to learn more, and give them a spin on your next React project.