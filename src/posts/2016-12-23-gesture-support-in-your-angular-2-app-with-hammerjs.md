---
title: "Gesture Support in your Angular 2 App with HammerJS"
subtitle: "Capturing gesture events with ease"
date: 2016-12-23 19:30:00 -0600
categories: engineering
tags: angular development gesture mobile
excerpt: "Recently when assisting on an Angular 2 project, one of the requirements included gesture support for mobile devices, specifically swipe. Luckily, Angular 2 ships with some native support for HammerJS, a javascript gesture library."
slug: 2016/12/23/gesture-support-in-your-angular-2-app-with-hammerjs
status: published
---


### Intro

Recently when assisting on an Angular 2 project, one of the requirements included gesture support for mobile devices, specifically swipe. Luckily, Angular 2 ships with some native support for HammerJS, a javascript gesture library.

### Installing HammerJS

In my angular project, I generally create a folder inside of `src` called `lib`. I put any third-party libraries or resources here that aren't installed via NPM.

The Hammer library comes in two parts. The main library, `hammer.min.js`, includes all the necessary gesture support you need, while `hammer-time.min.js` is a library that removes the 300ms delay on click events. This helps make a web-app feel more native and reponsive.

For simplicity sake, I include the hammer library with a script tag inside the head of my index.html file like so:

```html
<script src="lib/hammer.min.js"></script>
```

_**Note: you can also include the Hammer library via CDN like so:**_

```html
<!-- Hammer JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.js"></script>
```

### Capturing events

The beauty of using Angular 2 + HammerJS together is that Angular 2 comes out of the box with gesture support baked in. You can reference gesture events in the template just like you'd reference a click event.

For example:

```typescript
/* setting event handlers on a template element */

<div 
    (click)="doThisOnClick()" // click event
    (swipeleft)="doThisOnSwipe(left)" // swipe left event
    (swiperight)="doThisOnSwipe(right)" // swipe right event
>
```

Hammer supports all of the gestures and touch events you'd expect:

* [pan](https://hammerjs.github.io/recognizer-pan/){:target="_blank"}
* [pinch](https://hammerjs.github.io/recognizer-pinch){:target="_blank"}
* [press](https://hammerjs.github.io/recognizer-press){:target="_blank"}
* [rotate](https://hammerjs.github.io/recognizer-rotate){:target="_blank"}
* [swipe](https://hammerjs.github.io/recognizer-swipe){:target="_blank"}
* [tap](https://hammerjs.github.io/recognizer-tap){:target="_blank"}


To see a full list, check out the [HammerJS Documentation under "Recognizers"](https://hammerjs.github.io/){:target="_blank"}.

### Customizing Hammer

You may run into situations in which you want to customize how HammerJS behaves or handles certain input events. I'd encourage you to check out the [API documentation](https://hammerjs.github.io/api/) for a more detailed explination of the options that are available.

One specific point to note is that by default, HammerJS prevents text selection on desktop machines. This is intentional to attempt to provide a consistant user experience regardless of input device. That being said, I've found multiple situations in which I'd prefer to only use gesture support on touch events only, and to restore text highlighting as expected on desktop.

Using the methods below, you can do both. Write these anywhere after the Hammer library has been loaded:

```javascript
/* common hammerjs customization */
delete Hammer.defaults.cssProps.userSelect; // restore text highlight on desktop
Hammer.defaults.inputClass = Hammer.TouchInput; // only recognize gestures on touch inputs
```

Also, if you've got a web application that requires the ability to scroll, you'll need to use the following customization:

```javascript
Hammer.defaults.touchAction = 'pan-x pan-y'; // allow touch to scroll
```
Learn more about how touch actions can be restricted in the [docs](https://hammerjs.github.io/touch-action/){:target="_blank"}.

### Testing

To assist in testing while you're in development, you may want to consider using the HammerJS touch emulator. This script allows you to use your mouse to fire touch events. It even has options to enable multi-touch emulation.

```html
<script src="http://cdn.rawgit.com/hammerjs/touchemulator/master/touch-emulator.js"></script>
<script>
    TouchEmulator();
</script>
```

For more information on the emulator, check out the [documentation](https://hammerjs.github.io/touch-emulator/){:target="_blank"}.

### Conclusion

HammerJS is a great library for enabling touch support in your SPA. If you're using Angular 2, I'd highly recommend getting familiar with it, as it's easy to spin up and test.

It's configured out of the box to try to emulate the most common use-cases of a "native" experience in a web application. So, as noted above in the customization section, you may need to do some light customization to the library to meet your specific needs. 

That being said, the flexibility and power of HammerJS makes adding gesture support a snap compared to some of the hoops we've jumped through in the past.

