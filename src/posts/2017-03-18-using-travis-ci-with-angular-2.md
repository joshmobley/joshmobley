---
title: "Using TravisCI with Angular"
subtitle: "Setting up continuous integration for an Angular App"
date: 2017-03-18 14:00:00 -0500
categories: engineering
tags: development angular travisci continuous integration ci/cd tools
excerpt: "Continuous Integration is a key piece of modern software development. Ensuring that we can keep new code flowing into our master branch as it's ready is important to keeping the speed of delivering new fixes and features to our customers as quickly as possible."
slug: 2017/03/18/using-travis-ci-with-angular-2
status: published
---

### Intro

Continuous Integration is a key piece of modern software development. Ensuring that we can keep new code flowing into our master branch as it's ready is important to keeping the speed of delivering new fixes and features to our customers as quickly as possible.

TravisCI is one of the top hosted CI services in use. There are a few other competitors &mdash; [CircleCI](https://circleci.com/){:target="_blank"} and [CodeShip](https://codeship.com/){:target="_blank"} being two of them. Perhaps I'll write about those in the future, but for the purposes of this article, we'll stick to TravisCI.

### Automated Tests

I think it's important, before we begin, to stress the importance of a robust and efficient automated test suite. Without good tests, CI loses almost all of it's value. A mix of unit tests, integration tests, and even system tests are important to ensure your changes have been tested from multiple angles to verify that the new code builds and runs as expected.

If you're not already writing tests, I'd recommend you spend some time with that before worrying about your CI pipeline.

### TravisCI

So let's take a brief look at TravisCI.

#### Pricing

TravisCI is not the cheapest option for running private repos, though it is completely free for any public repos. Their smallest pricing tier is $69/month and includes 1 concurrent job, meaning that you can only run 1 set of tests at a time. 

To run public repos, visit [https://travis-ci.org](https://travis-ci.org){:target="_blank"}. For private/priced options, visit [https://travis-ci.com](https://travis-ci.com){:target="_blank"}. These two environments seem to be set up as completely different applications/authentication, so you'll have to authorize both with github if you want to keep them separate.

Here's the pricing table (as of today):

| Name           | Price | Concurrent Jobs | 
| -------------- | ----- | --------------- |
| Bootstrap      | $69   | 1               |
| Startup        | $129  | 2               |
| Small Business | $249  | 5               |
| Premium        | $489  | 10              |

All plans come with unlimited build minutes, unlimited repos, and unlimited collaborators.

### Setting it Up

OK, let's assume you've already decided to take the plunge and you've authenticated with Travis, and activated the repo that contains your Angular project. Travis projects use a YAML file to hold any configuration you'll need called `.travis.yml`.

Once you've added that file to the root of your repo, you'll need to add some configuration options.

For all angular projects, you'll be telling TravisCI to use a NodeJS environment. You'll also need to let Travis know what version of Node to use.

```yaml
# .travis.yml

language: node_js
node_js:
  - 6.9.5

```

Next, you'll need to make sure you have your `package.json` configured to run tests. I'm assuming you're already using tests for this tutorial, and likely using Karma, as that's the recommended test runner for Angular.

If so, you're package.json probably looks something like this:

```javascript
// package.json
...
"scripts": {
    "test": "karma start ./test/karma.conf.js"
...
```

From my testing, this works fine in the Travis environment. I've seen other folks recommend pointing it more explicitly to the package, so if you run into any issues with the karma command erroring, you may want to try this:

```javascript
//package.json
...
"scripts": {
    "test": "./node_modules/.bin/karma start ./test/karma.conf.js"
...
```

_**It's important to note that the Travis environment is case-sensitive when it comes to importing packages. In one of my test files, I was attempting to import `rxjs/observable` which worked fine locally, but failed in Travis. Once I changed this to the proper casing `rxjs/Observable` it worked fine.**_

### Yarn + PhantomJS Issue

I did run into a specific bug when I was attempting to run my tests on Travis. Because I use Yarn as my package manager, there seems to be an issue where yarn doesn't execute install.js insdie of the phantomjs-prebuilt module. If you're receiving an error that says: `Path must be a string. Received null`, and you're using Yarn, add this to your `package.json` file.

```javascript
// package.json
...
"scripts": {
    "test": "karma start ./test/karma.conf.js",
    "postinstall": "node node_modules/phantomjs-prebuilt/install.js" // add this
...
```

This postinstall hook ensures that this file gets executed at the end of any `yarn` command and resolves the issue. You can [read more about it here](https://github.com/karma-runner/karma-phantomjs-launcher/issues/120#issuecomment-262634703){:target="_blank"}.

### Automated Deployment

Assuming all of that is working, and your Travis builds are passing, it's time to add Automated Deployment.

TravisCI supports a plethora of the most popular hosting solutions including AWS, Github, Google, Heroku, NPM, Rackspace, Surge, S3, and many more. To learn how to deploy to your provider, [check out the documentation](https://docs.travis-ci.com/user/deployment){:target="_blank"}.

Regardless of what you choose, you'll need to add some configuration options to `.travis.yml`.

I'm using surge.sh for a small project I'm working on, so my `.travis.yml` looks like this:

```yaml
# .travis.yml

language: node_js
node_js:
  - 6.9.5
deploy:
  provider: surge
  domain: project-name.surge.sh
  skip_cleanup: true
```

The `skip_cleanup` option tells Travis to leave any built assets in place during deployment, otherwise your newly built files will not be deployed.

#### Environment Variables

TravisCI provides a few different ways to define environment variables. You'll need to use one of them to pass any important authentication information to your host during the deployment process. 

If you want all builds to use the same set of variables, you can configure them in your repository settings in the TravisCI admin. Otherwise, you can define them in `.travis.yml` file. [You can learn about all the options here.](https://docs.travis-ci.com/user/environment-variables/){:target="blank"}

#### Build Before Deploy

With an Angular project, you'll likely need to run webpack before you deploy, to update all your static/built files. To do this, we can take advantage of the `script` lifecycle hook in our `.travis.yml` file.

```yaml
# .travis.yml

language: node_js
node_js:
  - 6.9.5
script: 
  - "webpack"
deploy:
  provider: surge
  domain: project-name.surge.sh
  skip_cleanup: true
```

_**If you use the `node-sass` package, or rely on it for the webpack `sass-loader`, there's a [known issue](https://github.com/sass/node-sass/issues/1579){:target="_blank"} that often Travis will not reliably execute the install.js file for `node-sass`. We can fix this by running an `npm rebuild node-sass` before we run `webpack`.**_

```yaml
# .travis.yml

language: node_js
node_js:
  - 6.9.5
script: 
  - "npm rebuild node-sass"
  - "webpack"
deploy:
  provider: surge
  domain: project-name.surge.sh
  skip_cleanup: true
```

### Conclusion

This config should get you to the point of being able to both test and build using TravisCI. We've seen a couple of the issues you may run into here, both with PhantomJS and node-sass that we don't experience locally. Like most tools that build your project in a new environment, expect issues like these to arise from time to time. While they can be a pain to set up, it does give you some comfort and peace of mind knowing that only code that passes your testing suite will be deployed to production!


