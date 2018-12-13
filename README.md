# Frontend Engineering Challenge

Using the provided [dataset](/support/names.json) and [mockup](/support/mockup.png), we'd like you to create a simple single-page application using plain JavaScript (no libraries), HTML and CSS. The application is a basic searchable list of popular dog names in New York City and should look like the following mockup:

![mockup](/support/mockup.png)

**The app is made up of 3 components.**

* A simple header
* A search input
* Name cards.

**Each of the name cards should display the following information:**

* Overall popularity ranking
* Total number of dogs with that name
* A breakdown of the gender
* The top 4 breeds with that name in the form of a simple histogram.

Although you may not use any libraries for the application code, you can use libraries for build tools if you wish (e.g. Babel, Webpack, etc for ES6) and obviously libraries for testing. The challenge is designed in a way that you'll need to do some work with the dataset that we've provided. As we'll be evaluating the performance of your application, it's recommended that you avoid loading the raw data in the browser.

_One approach could be to create your own simplified implementation of React's `Component` module, minus the virtual DOM aspects._

## Requirements

* No javascript libraries (except for testing)
* Unit testing
* Documentation

## Nice to have

* Conditional re-rendering (think about React's `componentShouldUpdate`)
* Responsive layout
* Feature extensions, such as autocomplete for search.

## What we'll be evaluating

* Code quality and consistency
* Naming conventions
* Performance/Accessibility
* Styling
* Test quality
* Documentation quality

# How to

1. Clone or fork this repo.
2. Write your code.
3. Send us a link to your fork or simply zip it up and send it back.
