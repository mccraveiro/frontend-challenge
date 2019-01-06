# DuffelHQ Frontend Engineering Challenge

This challenge consists in using the provided dataset and mockup to create a simple single-page application using plain JavaScript (no libraries), HTML and CSS. The application is a basic searchable list of the 500 most common/popular dog names in New York City.

You can find the full challenge description at https://github.com/duffelhq/frontend-challenge.

## Working with the dataset

The dataset (names.json) contains approximately 16,000 dog names. On this app we use only the 500 most common. Therefore, we have a script at `scripts/parse-dataset.js` which parses the data and outputs only the aggregate result. To run this script use:

```sh
$ npm run dataset
```

The aggregate result will be saved at `src/dataset.json` and a top 10 preview will be saved at `src/dataset-preview.json`.

## Developing the app

To begin developing the app one can run the following command:

```sh
$ npm start
```

It will start a development server and it will reload at any changes.

Make sure to always follow our javascript style guide. You can check all files by running:

```sh
$ npm run lint
```

After the change is made, make sure all tests are passing by running:

```sh
$ npm run test
```

While in development you can include a watch flag so it will re-run all tests when a change is made:

```sh
$ npm run test -- --watch
```

## Deploying the app

At any time you can deploy the current version of the app using just:

```sh
$ npm run deploy
```

It will push all changes to the `gh-pages` and the new app version will become available at github.io.

## Project structure

This project is divided in two main parts: the custom framework and the specific components.

The custom framework is located at `src/custom-framework` and it is resposible for rendering the app. It follows a similar structure as ReactJS and uses a virtual DOM.

Subsequently, all app specific components are located at `src/components`.
