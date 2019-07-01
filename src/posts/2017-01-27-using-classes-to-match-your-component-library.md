---
title: "Extend Your Component Library with JavaScript Classes"
subtitle: "Creating consistency across your HTML, CSS, and JS"
date: 2017-01-27 14:00:00 -0500
categories: engineering
tags: javascript development css architecture components UI design
excerpt: "One method I've been exploring when working on new website projects is how to organize my javascript, css, and html to all be reflective of the component library that we're using to build our visual system."
slug: 2017/01/27/using-classes-to-match-your-component-library
status: published
---

### Intro

One method I've been exploring when working on new website projects is how to organize my javascript, css, and html to all be reflective of the component library that we're using to build our visual system.

Using JavaScript modules has helped to split my javascript up in ways that are similar to how we're used to organizing our CSS thanks to preprocessors like SASS/LESS. But that's just the first step. Once we've got our JS split into multiple files, how do we organize those files to make sense?

### What are Classes?

Classes were introduced in ECMAScript 2015 (ES5) and have been used pretty extensively by javascript developers since. Usually, classes represent a new object that can be stamped out at-will and really aid in an object-oriented approach to development.

If you're not familiar with JavaScript classes, here's an example of a class representing a "Glass":

_**Note: I'm using typescript for my examples, so you'll notice the typing declarations. If you're not using typescript, just ignore those.**_

```typescript
// glass.module.ts

export class Glass {

    // properties of a Glass
    height: number;
    width: number;
    volume: number;

    // constructor to assist in initializing the Glass
    constructor(){
        this.setHeight( 6 );
        this.setWidth( 4 );
        this.calcVolume( );
    }

    // method to set height of Glass
    setHeight( inches: number ){
        this.height = inches;
    }

    // method to set width of Glass
    setWidth( inches: number ){
        this.width = inches;
    }

    // method to get heights of selectors
    calcVolume( ) : number {
        let radius = this.width / 2;
        return 3.14 * ( radius * radius ) * this.height;
    }

}

```

### An Object-Oriented Front-end

The notion of creating an object and reusing it is very much in-line with the practice of building out component libraries in HTML/CSS. It works to the same end; creating a library of "objects" that we can reuse in various templates so that our code is reusable and consistant (DRY).

So how do we leverage classes to help us?

### Classes as UI Components

So let's imagine that we're working on a project that includes a gallery as part of the UI. In many projects, you'll just find one large javascript (often jQuery) file that includes some code that instructs our gallery on how to behave. Perhaps you're using a build tool like gulp/grunt to modularize your javascript a bit, and have that code split into it's own js file, that's being concatinated together at build time. 

But what if your JavaScript was as _expressive_ as your HTML?

For example perhaps your gallery.js/ts looks something like this:

```typescript
// gallery.ts

if( $('.gallery') ){ animateGallery( 200 ); }

function animateGallery( imageWidth: number ){

    $('.gallery').each(function(){
    
    let currentPosition: number = 0;

    // function to advance slider
    $(this).children('.next-button').on('click', function(){
        currentPosition - imageWidth;
        moveSlider();
    });

    // function to regress slider
    $(this).children('.prev-button').on('click', function(){
        currentPosition + imageWidth;
        moveSlider();
    });

    function moveSlider(){
        $('.gallery-wrapper').css('left', currentPosition);
    }

}


```

Here's how that might look as a class:

```typescript
// gallery.module.ts

export class Gallery{

    imageWidth: number;
    currentPosition: number;
    nextButton: jQuery = this.children

    constructor( width ){

        this.imageWidth = width;
        this.currentPosition = 0;

        $('.gallery').children('.next-button').on('click', function(){
            this.advanceSlider();
        });

        $('.gallery').children('.prev-button').on('click', function(){
            this.regressSlider();
        });

    }

    advanceSlider(){
        this.currentPosition - this.imageWidth;
        this.moveSlider();
    }

    regressSlider(){
        this.currentPosition + this.imageWidth;
        this.moveSlider();
    }

    moveSlider(){
        $('.gallery-wrapper').css('left', currentPosition);
    }

}
```

```typescript
// scripts.ts

import { Gallery } from './modules/gallery.module';

$(document).ready(function(){

    $('.gallery').each( function(){
        let gallery = new Gallery(200);
    });

});
```

Now you might be thinking "These two snippets of code don't look all that different...and if anything, I don't want to initiate a module loader just to run some jQuery". I hear you, but consider this. If you've got a component library with lets say 25-50 components in it, and half of those require some javascript enhancement, wouldn't it make life easier for those who are working with you on the project to namespace your javascript to match your SASS/HTML? I think it might. 

That being said, I'm trying this for the first time on a project that's in-progress, but so far I like where it's headed. It's easy to look at my file system and know exactly where to look to see relevant javascript code for a specific piece of functionality.

### Conclusion

I'm not suggesting this is the next design pattern that will blow the world away, but it might solve a specific problem when refactoring a huge piece of jQuery or when authoring a javascript layer on top of a popular CMS. Give it a spin and let me know what you think!

