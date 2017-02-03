# Instant Karma!

*Instant Karma!* is going to be a testing tool for JavaScript/TypeScript development with an emphasis on TDD. It's companion project [karma-instant-reporter](https://github.com/erasethis/karma-instant-reporter) is a plugin for the [Karma testrunner](https://github.com/karma-runner/karma) and relays Karma's messages to *Instant Karma!*, which is a fully-fledged Angular web application and as such is going to be interactive. You will be able to drill down to a particular spec suite and monitor that suite only, or to focus on a single spec and never have to worry again about refreshing the page or sifting through hundreds of spec results in order to find what you were looking for. 

## Installation

*Instant Karma!* is very much a work in progress, so there is no NPM package available yet.
If you really want to get this thing running anyway, here's how. Your mileage may vary.

Clone *both* repos, [karma-instant-reporter](https://github.com/erasethis/karma-instant-reporter) and [instant-karma](https://github.com/erasethis/instant-karma):

    git clone https://github.com/erasethis/karma-instant-reporter
    git clone https://github.com/erasethis/instant-karma

Change into your project folder (the one where you'd like to run your tests) and create a link

    cd <your-project-folder>
    npm link <relative-path-to-karma-instant-reporter>

e.g.

    cd instant-karma
    npm link ../karma-instant/reporter

if you wanted to run the tests from `instant-karma`. The `link` command will make the reporter available for your project as if it had been installed to your `node_modules` folder.

Edit your `karma.conf.js` and add the `karma-instant-reporter` plugin:

    reporters: ['instant', 'growl', 'mocha'],

Change into the `instant-karma` folder and start the application:

    npm start

Wait for Webpack to compile the app, then open a browser for `localhost:3000`, *Instant Karma!* should be up and running.

Now go to your project folder and start a test run, for example,

    cd instant-karma
    npm run watch:test

When `karma` comes up and starts executing your tests, you should be able to see them pop up in *Instant Karma!*'s window. 

## Screenshot

![Screenshot](https://github.com/erasethis/instant-karma/blob/gh-pages/screenshot.png)

