# Medal.tv JavaScript API Wrapper

[![npm version](https://img.shields.io/npm/v/medal-js.svg)](https://www.npmjs.org/package/medal-js)
[![install size](https://packagephobia.now.sh/badge?p=medal-js)](https://packagephobia.now.sh/result?p=medal-js)
[![npm downloads](https://img.shields.io/npm/dt/medal-js)](http://npm-stat.com/charts.html?package=medal-js)
[![npm downloads](https://img.shields.io/npm/dm/medal-js.svg)](http://npm-stat.com/charts.html?package=medal-js)

JavaScript library for the [Medal.tv](https://medal.tv) [REST API](https://docs.medal.tv/api)

## Installation

You can add the library as a dependancy to your project using Yarn or NPM.

```bash
yarn add medal-js
# OR
npm install medal-js
```

## Technical Prologue

This library is built by extending the functionality (and types) of the [axios HTTP client library](https://github.com/axios/axios). It does the heavy lifting for you but it effectively _is_ `axios` at it's core. This means you should find success in both browser and node environments.

## Usage

There are two unauthenticated functions that you may use right to receive a public or private API key.

```ts
import { generatePublicKey, generatePrivateKey } from 'medal-js';

generatePublicKey().then((response) => console.log(response.data));
// Returns: pub_***

generatePrivateKey().then((response) => console.log(response.data));
// Returns: priv_***
```

This key is required for creating an instance of a Medal class.

```ts
import { Medal } from 'medal-js';
// OR
const { Medal } = require('medal-js');

// Construct the Medal Class instance, you will be required to include your public or private key
const medal = new Medal('pub_***');
```

Once you've instantiated the Medal class you have access to all of the endpoint functions requiring authentication.

## `Medal.categories`

**Note: this is a getter, NOT a function call. The lack of `()` is not a typo.**

_No customization parameters_.

## `Medal.latest()`

| parameter  | type     | default     | description |
| ---------- | -------- | ----------- | ----------- |
| userId     | `number` | `undefined` |             |
| categoryId | `number` | `undefined` |             |
| limit      | `number` | `undefined` |             |
| offset     | `number` | `undefined` |             |

**Example**

```ts
import { Medal } from 'medal-js';

const medal = new Medal('pub_***');

medal.latest({ categoryId: 62, limit: 1 }).then((response) => console.log(response.data));
```

`response.data`

```json
{
  "contentObjects": [
    {
      "contentId": "cid4954089",
      "rawFileUrl": "not_authorized",
      "contentTitle": "Testing fortnite w/keyboard, damn is hard lol",
      "contentViews": 1836,
      "contentLikes": 10,
      "categoryId": 62,
      "videoLengthSeconds": 10,
      "createdTimestamp": 1563233109000,
      "directClipUrl": "https://medal.tv/clip/4954089/5xAyYcy7Spquc7Jz",
      "embedIframeUrl": "<iframe width='640' height='360' src='https://medal.tv/clip/4954089/UUzr8lZ41i8pPVC4?loop=1&autoplay=1&cta=1' frameborder='0' allow='autoplay' allowfullscreen class='medal-clip' id='contentId-4954089'></iframe>",
      "credits": "Credits to ODarwed (https://medal.tv/users/452854)"
    }
  ]
}
```

## `Medal.search()`

## `Medal.trending()`

## Functions

Once you've instantiated the Medal class you have access to all of the endpoint functions requiring authentication.

## Global Options

There's a bunch of options that can be applied to all of the endpoint functions. **None of these options are required**, they are ALL optional.

| parameter        | default     | description                                                                                                             |
| ---------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| steamappid       | `undefined` | Adds the Steam AppId to every link and iframe returned, so users viewing and sharing the clip can get the game on steam |
| cta              | `1`         | Hide donation buttons or user-generated call-to-actions on the clip, most commonly used for safety reasons              |
| autoplay         | `0`         | Specify whether the iframes returned contain the autoplay tag                                                           |
| loop             | `0`         | Specify whether the iframes returned loop content                                                                       |
| muted            | `1`         | Specify whether the iframes returned should auto-play sound. By default it does not.                                    |
| width            | `640`       | The height of the returned clip player                                                                                  |
| height           | `360`       | The width of the returned clip player                                                                                   |
| customStyleClass | `medal-js`  | Apply a custom class to your embeddable player. `medal-js` will _always_ be applied (last).                             |

## Example

Here's a minimum working example of how you can:

- Instantiate the class with your authentication token.
- Fetch the latest Rocket League video(s), but only 1, and offset by 5.
- Video player will have the `custom-class-name` class applied.

```ts
new Medal('pub_***')
  .latest({
    categoryId: 10,
    limit: 1,
    offset: 5,
    customStyleClass: 'custom-class-name',
  })
  .then((response) => console.log(response.data));
```

```json
{
  "contentObjects": [
    {
      "contentId": "cid37920939",
      "rawFileUrl": "not_authorized",
      "rawFileUrlLowRes": "not_authorized",
      "unbrandedFileUrl": "not_authorized",
      "contentTitle": "carry",
      "contentViews": 2,
      "contentLikes": 0,
      "contentThumbnail": "https://cdn.medal.tv/12667981/thumbnail-37920939-360p.jpg",
      "categoryId": 10,
      "videoLengthSeconds": 15,
      "createdTimestamp": 1606969604000,
      "directClipUrl": "https://medal.tv/clip/37920939/7Ok8QtplXsccgV3m",
      "embedIframeCode": "<iframe width='640' height='360' src='https://medal.tv/clip/37920939/rLWGbYREMxWrtOOW?loop=1&autoplay=1&muted=1&cta=1' frameborder='0' allow='autoplay' allowfullscreen class='custom-class-name medal-js' id='cid37920939'></iframe>",
      "credits": "Credits to GPS TRASHER (https://medal.tv/users/12667981)"
    }
  ]
}
```
