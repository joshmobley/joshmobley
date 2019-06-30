---
layout: post
title: "Simple JavaScript Modules with Require.js"
subtitle: "A step-by-step guide to breaking down your scripts into pieces for the browser"
date: 2016-12-21 09:00:00 -0600
categories: writing
tags: javascript development
excerpt: If you've used any CLI's or large javascript frameworks (think Angular, Ember, etc.) you've probably seen and even used javascript modules. When we're dealing with large amounts of javascript, it's easier to parse what's going on when we've encapsulated our functions into bite-sized chunks.

---


### Intro

If you've used any CLI's or large javascript frameworks (think Angular, Ember, etc.) you've probably seen and even used javascript modules.

When we're dealing with large amounts of javascript, it's easier to parse what's going on when we've encapsulated our functions into bite-sized chunks.

That being said, sometimes a project isn't large enough to warrant a high-powered module bundler like webpack or you've already got another build pipeline in place that you don't want to replace.

In either scenario, Require.js is a good option for light-weight module bundling. I recently took the opportunity on a small project to use it and I've outlined the process here. Hopefully it'll help someone else!

### Transpiling

The first thing to understand is that javascript modules aren't really supported just yet, at least not natively in the browser. 

If you're considering using modules, you're probably already writing in ES2015+ syntax paired with a transpiler (babel, typescript, etc.) If not, know that's a requirement to using modules.

If you're not sure what I'm talking about, check out the [ES2015 documentation](https://babeljs.io/docs/learn-es2015/){:target="_blank"} on babel's website. That's where you'll want to start.

### Module syntax

Today's javascript landscape is pretty fractured. The same is true with modules. 

There are currently a handful of different syntaxes that one could use when writing a module. CommonJS, AMD, systemJS, UMD, and the ES2015 syntax. We're not going to go into detail about the differences or histories behind each approach here, but check out this article to learn some of [the differences between CommonJS, AMD, and ES2015](https://auth0.com/blog/javascript-module-systems-showdown/){:target="_blank"}.

**Require.js supports modules in [AMD syntax](http://requirejs.org/docs/whyamd.html), and that's important to know as you set up your project. Ensure whatever transpiler you're using is configured to output your modules in AMD syntax.**

It's important to understand that just because you're transpiling your modules out to AMD doesn't mean you have to write them in AMD. I'd advise everyone to be writing in ES2015 syntax as that is the approved spec for javascript moving forward.

### Writing a Module

Writing modules can be fairly straightforward. Do you currently have a function or group of functions that pertain to some specific behavior? Maybe you have a `modalOpen()` and `modalClose()` function in your scripts file. These would be a great candidate to pull into a module called `modal.module.ts`. _**Note: I'm showing examples here in typescript syntax (hence the .ts extension), but if you're using babel or some other transpiler, you should still be able to understand the examples.**_

Maybe your original code looks something like this:

```typescript
/* scripts.ts */

$('document').ready( function(){ 

    $('.model-open').on( 'click', 
        function(event){

            /* do some things */
            let attr : string = $(this).data('attr');

            /* maybe call a function */
            modelBuild( attr );

        }
    );

    function modelBuild( attr : string ){

        /* do something */
        $('.model').attr('attr', attr).addClass('is-visible');

    }

});
```

If we wanted to modularize these pieces of functionality, we could do so like this:

```typescript
/* model.module.ts */

export function modelOpen(){

    $('.model-open').on( 'click', 
        function(event){

            /* do some things */
            let attr : string = $(this).data('attr');

            /* maybe call a function */
            modelBuild( attr );

        }
    );
}

export function modelBuild( attr : string ){

    /* do something */
    $('.model').attr('attr', attr).addClass('is-visible');

}

```

Notice how we're using `export` to tell the module which functions need to be accessible to javascript outside of the module. In this example, we're making both functions available, but we could refactor this example to only expose `modelBuild()` to other functions inside of `model.module.ts`.

```javascript
/* model.module.ts */

export function modelOpen(){

    $('.model-open').on( 'click', 
        function(event){

            /* do some things */
            let attr : string = $(this).data('attr');

            /* maybe call a function */
            modelBuild( attr );

        }
    );
}

// modelBuild() is now only available to other functions inside this module

function modelBuild( attr : string ){

    /* do something */
    $('.model').attr('attr', attr).addClass('is-visible');

}

```
It'll depend on how you intend to use various functions as to how you organize and expose them inside of your modules. There's also a default export that looks like this:

```javascript

export function default(){
    /* things to do */
}

```

When is one appropriate and not the other? That's largely dependant on your use-case, and somewhat dependant on your style preferences. But depending on what you choose, it will also impact how you import these modules into another script.

_**Note: Mozilla does a good job of [documenting those and explaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) the import syntax.**_

#### What about classes?

For the purposes of this article, I've focused on functions, but classes work essentially the same way. Obviously you'll replace `function` with `class`, and follow the rules for constructing a class, but the export/import works the same.

### Importing a Module

So let's take a look at how we import modules so that their functions are available for use.

Let's look at our `scripts.ts` file again.

```javascript
/* scripts.ts */

// importing a named export with brackets

import { modelOpen } from './model.module';

$('document').ready( function(){

    modelOpen();

});
```

You'll notice how I've imported the function by name. I'm using brackets here because that export was named inside the module.

_**Note: If you use the default export syntax, you'll need to assign a name to your import without the brackets like this:**_

```javascript
/* scripts.ts */

// importing a default export and assigning the name here without 

import modelOpen from './model.module';

$('document').ready( function(){

    modelOpen();

});
```

### Using Require.js

You might be thinking, but Josh, why would I want to use Require.js when Webpack seems to be taking over the world? Fair question. From my perspective, there are two situations in which Require.js makes a lot of sense.

1. You want to dip your toes into modularizing JS and don't want to bother rolling a webpack config.
2. You already have a build pipeline/task-runner on the project that you don't want to convert to webpack (think Gulp or Grunt). Require.js is easy to add-on in these situations.

Assuming you've already got your transpiler and build process set up, you should be able to integrate require.js with relative ease. 

After [downloading the script](http://requirejs.org/docs/download.html){:target="_blank"}, add it to your top-level scripts directory. For our purposes we'll call that `/js`.

Next, remove whatever scripts you're referencing in your HTML and replace them with Require.js.

```html
<script data-main="js/scripts.js" src="js/require.js" async></script>
```

You'll notice the script tag has an attribute called `data-main`. This tells require.js where the "entry point" for your scripts is located. In our example, our entry point is `scripts.js`, as that's where we're including our modules.

#### jQuery

If your project uses jQuery, an easy way to include it is to ensure jQuery is named "jquery.js" and is located at the root of whatever directory require.js is located in. For example: `/js/jquery.js` 

Require.js automatically looks through it's siblings for jquery, and if it exists, creates a module named `jquery`.

Importing the library is as easy as:

```javascript
import * as $ from jquery;
```

This syntax looks a little different than what we covered above. Whenever a javascript file includes many functions, you can include them all as a scoped namespace using `import * as (namespace) from (module)`. The `*` wildcard let's our transpiler know that we want the entire contents of that module.

[Learn more about using jQuery with Require.js here.](http://requirejs.org/docs/jquery.html){:target="_blank"}


### Testing & Conclusion

Ensuring your modules are being imported properly will be very apparant, either via intellisense in VSCode (or something like it), or at very least inside the console at runtime.

If you're using a framework, componentizing your scripts is likely baked in. But if you're not, using modules are a real gift when adding a JavaScript layer to your project.