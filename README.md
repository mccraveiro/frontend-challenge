# DuffelHQ Frontend Engineering Challenge

This challenge consists in using the provided dataset and mockup to create a simple single-page application using plain JavaScript (no libraries), HTML and CSS. The application is a basic searchable list of the 500 most common/popular dog names in New York City.

You can find the full challenge description at https://github.com/duffelhq/frontend-challenge.

## Working with the dataset

The dataset (names.json) contains approximately 16,000 dog names. On this app we use only the 500 most common. Therefore, we have a script at `scripts/parse-dataset.js` which parses the data and outputs only the aggregate result. To run this script use:

```sh
$ npm run dataset
```

The aggregate result will be saved at `src/dataset.json`.
