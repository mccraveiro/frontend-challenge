#!/usr/bin/env node

const { writeFileSync } = require('fs')
const names = require('../support/names.json')

const sortBy = (field) => (a, b) => b[field] - a[field]
const increaseWhen = (value, condition) => condition ? value + 1 : value
const capitalize = (string) => string.charAt(0) + string.slice(1).toLowerCase()
const formatPercentage = (value) => Math.round(value * 100)

const buildResult = (name) => ({
  name,
  count: 0,
  gender: {
    male: 0,
    female: 0,
    unknown: 0,
  },
  breeds: new Map()
})

const groupByName = (nameList, dog) => {
  const name = capitalize(dog.name)
  const breedName = dog.breed || 'Unknown'
  const previousResult = nameList.get(name) || buildResult(name)
  const previousBreedCount = previousResult.breeds.get(breedName) || 0

  result = {
    name,
    count: previousResult.count + 1,
    gender: {
      male: increaseWhen(previousResult.gender.male, dog.gender === 'MALE'),
      female: increaseWhen(previousResult.gender.female, dog.gender === 'FEMALE'),
      unknown: increaseWhen(previousResult.gender.unknown, dog.gender !== 'MALE' && dog.gender !== 'FEMALE'),
    },
    breeds: previousResult.breeds.set(breedName, previousBreedCount + 1)
  }

  return nameList.set(name, result)
}

const setPositions = (name, position) => ({
  ...name,
  position: position + 1,
})

const convertGendersToPercentage = (name) => {
  name.gender = {
    male: formatPercentage(name.gender.male / name.count),
    female: formatPercentage(name.gender.female / name.count),
    unknown: formatPercentage(name.gender.unknown / name.count),
  }

  return name
}

const selectBreeds = (name) => {
  name.breeds = Array.from(name.breeds.entries())
    .sort(sortBy(1))
    .slice(0, 4)
    .map(([name, count]) => ({
      name,
      count
    }))

  return name
}

const setBreedsHistogramValues = (name) => {
  const maxValue = name.breeds[0].count

  name.breeds = name.breeds
    .map(breed => ({
      ...breed,
      histogram: formatPercentage(breed.count / maxValue)
    }))

  return name
}

const aggregatedNames = names
  .reduce(groupByName, new Map())
  .values()

const aggregate = Array.from(aggregatedNames)
  .sort(sortBy('count'))
  .slice(0, 500)
  .map(setPositions)
  .map(convertGendersToPercentage)
  .map(selectBreeds)
  .map(setBreedsHistogramValues)

writeFileSync('./src/dataset.json', JSON.stringify(aggregate), 'utf8')
