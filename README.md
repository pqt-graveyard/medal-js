# Medal.tv JavaScript API Wrapper

[![npm version](https://img.shields.io/npm/v/medal-js.svg)](https://www.npmjs.org/package/medal-js)
[![install size](https://packagephobia.now.sh/badge?p=medal-js)](https://packagephobia.now.sh/result?p=medal-js)
[![npm downloads](https://img.shields.io/npm/dt/medal-js)](http://npm-stat.com/charts.html?package=medal-js)
[![npm downloads](https://img.shields.io/npm/dm/medal-js.svg)](http://npm-stat.com/charts.html?package=medal-js)

JavaScript library for the Medal.tv API

## Installation

You can add the library as a dependancy to your project using Yarn or NPM.

```bash
yarn add medal-js
# OR
npm install medal-js
```

## Usage

```ts
import { Medal } from 'medal-js';
// OR
const { Medal } = require('medal-js');

// Instantiate the Medal Class, make sure to include your public or private key
const medal = new Medal('pub_***');
```

## Functions

Once you've instantiated the Medal class you have access to all of the endpoint functions requiring authentication.

```ts
medal.categories; // <-- Note this is a getter. No function call is required. IT IS NOT categories()

medal.latest();
medal.search();
medal.trending();
```

There's also two unauthenticated functions that you may use to receive a public or private API key.

```ts
import { generatePublicKey, generatePrivateKey } from 'medal-js';

generatePublicKey().then((response) => console.log(response.data));
// Returns: pub_***

generatePrivateKey().then((response) => console.log(response.data));
// Returns: priv_***
```

## Global Options

There's a bunch of options that can be applied to all of the endpoint functions. **None of these options are required**, they are ALL optional.

| parameter        | default     | description                                                                                                              |
| ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| steamappid       | `undefined` | Adds the Steam App Id to every link and iframe returned, so users viewing and sharing the clip can get the game on steam |
| cta              | `1`         | Hide donation buttons or user-generated call-to-actions on the clip, most commonly used for safety reasons               |
| autoplay         | `0`         | Specify whether the iframes returned contain the autoplay tag                                                            |
| loop             | `0`         | Specify whether the iframes returned loop content                                                                        |
| muted            | `1`         | Specify whether the iframes returned should auto-play sound. By default it does not.                                     |
| width            | `640`       | The height of the returned clip player                                                                                   |
| height           | `360`       | The width of the returned clip player                                                                                    |
| customStyleClass | `medal-js`  | Apply a custom class to your embeddable player. `medal-js` will _always_ be applied (last).                              |
