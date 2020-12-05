# Medal.tv JavaScript API Wrapper

[![npm version](https://img.shields.io/npm/v/medal-js.svg)](https://www.npmjs.org/package/medal-js)
[![install size](https://packagephobia.now.sh/badge?p=medal-js)](https://packagephobia.now.sh/result?p=medal-js)
[![npm downloads](https://img.shields.io/npm/dt/medal-js)](http://npm-stat.com/charts.html?package=medal-js)
[![npm downloads](https://img.shields.io/npm/dm/medal-js.svg)](http://npm-stat.com/charts.html?package=medal-js)

JavaScript library for the [Medal.tv](https://medal.tv) [REST API](https://docs.medal.tv/api)

## Table of Contents

- [Installation](#installation)
- [Technical Prologue](#technical-prologue)
- [Usage](#usage)
- [`Medal.categories`](#medalcategories)
- [`Medal.latest()`](#medallatest)
- [`Medal.search()`](#medalsearch)
- [`Medal.trending()`](#medaltrending)
- [Global Options](#global-options)
- [Example](#example)
- [Async/Await Example](#asyncawait-example)

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

There are two unauthenticated functions that you may use right away to receive a public or private API key.

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

**Example**

```ts
import { Medal } from 'medal-js';

const medal = new Medal('pub_***');

medal.categories.then((response) => console.log(response.data));
```

`response.data` will look something like:

```json
[
  {
    "categoryId": 0,
    "categoryName": "All",
    "alternativeName": "All",
    "activeSessions": 0,
    "slug": "all"
  },
  {
    "categoryId": 1,
    "categoryName": "Medal Plays",
    "alternativeName": "Medal Plays",
    "activeSessions": 0,
    "slug": "medal-plays"
  },
  {
    "categoryId": 2,
    "categoryName": "Following",
    "alternativeName": "Following",
    "activeSessions": 0,
    "slug": "following"
  },
  {
    "categoryId": 3,
    "categoryName": "Discover",
    "alternativeName": "Discover",
    "activeSessions": 32,
    "slug": "discover"
  }
  // ...
]
```

## `Medal.latest()`

| parameter  | required | type     | default     | description |
| ---------- | -------- | -------- | ----------- | ----------- |
| userId     | no       | `number` | `undefined` |             |
| categoryId | no       | `number` | `undefined` |             |
| limit      | no       | `number` | `undefined` |             |
| offset     | no       | `number` | `undefined` |             |

**Example**

```ts
import { Medal } from 'medal-js';

const medal = new Medal('pub_***');

medal.latest({ userId: 12597, categoryId: 10, limit: 2 }).then((response) => console.log(response.data));
```

`response.data` will look something like:

```json
{
  "contentObjects": [
    {
      "contentId": "cid5042841",
      "rawFileUrl": "not_authorized",
      "contentTitle": "that winning team name...",
      "contentViews": 47,
      "contentLikes": 1,
      "categoryId": 10,
      "videoLengthSeconds": 15,
      "createdTimestamp": 1563692235000,
      "directClipUrl": "https://medal.tv/clip/5042841/LV0xUt2QyowNBQXL",
      "embedIframeUrl": "<iframe width='640' height='360' src='https://medal.tv/clip/5042841/Z6XRiXu8BKwSrDYW?loop=1&autoplay=1&cta=1' frameborder='0' allow='autoplay' allowfullscreen class='medal-clip' id='contentId-5042841'></iframe>",
      "credits": "Credits to Galkon (https://medal.tv/users/12597)"
    },
    {
      "contentId": "cid5037877",
      "rawFileUrl": "not_authorized",
      "contentTitle": "lmao so close",
      "contentViews": 42,
      "contentLikes": 4,
      "categoryId": 10,
      "videoLengthSeconds": 14,
      "createdTimestamp": 1563668946000,
      "directClipUrl": "https://medal.tv/clip/5037877/W98gfTlhKN7bw2DG",
      "embedIframeCode": "<iframe width='640' height='360' src='https://medal.tv/clip/5037877/sFfcDeWAI9n0B8Yy?loop=1&autoplay=1&cta=1' frameborder='0' allow='autoplay' allowfullscreen class='medal-clip' id='contentId-5037877'></iframe>",
      "credits": "Credits to Galkon (https://medal.tv/users/12597)"
    }
  ]
}
```

## `Medal.search()`

**Example**

```ts
import { Medal } from 'medal-js';

const medal = new Medal('pub_***');

medal
  .search({
    text: 'flip reset',
    steamappid: 252950,
    autoplay: 1,
    loop: 1,
    cta: 0,
    customStyleClass: 'rlclip',
    offset: 100,
    limit: 1,
  })
  .then((response) => console.log(response.data));
```

`response.data`

```json
{
  "contentObjects": [
    {
      "contentId": "cid3471744",
      "rawFileUrl": "not_authorized",
      "contentTitle": "flip reset",
      "contentViews": 20,
      "contentLikes": 0,
      "categoryId": 10,
      "videoLengthSeconds": 15,
      "createdTimestamp": 1550037169000,
      "directClipUrl": "https://medal.tv/clip/3471744/2PaSuhVQX5OWKPnO",
      "embedIframeCode": "<iframe width='640' height='360' src='https://medal.tv/clip/3471744/vcMONks6G5T412oH?loop=1&autoplay=1&cta=0&steamappid=252950' frameborder='0' allow='autoplay' allowfullscreen class='rlclip' id='contentId-3471744'></iframe>",
      "credits": "Credits to Hakugei (https://medal.tv/users/233543)"
    }
  ]
}
```

| parameter | required | type     | default     | description |
| --------- | -------- | -------- | ----------- | ----------- |
| text      | **yes**  | `string` |             |             |
| limit     | no       | `number` | `undefined` |             |
| offset    | no       | `number` | `undefined` |             |

## `Medal.trending()`

**Example**

```ts
import { Medal } from 'medal-js';

const medal = new Medal('pub_***');

medal.trending({ categoryId: 62, limit: 1 }).then((response) => console.log(response.data));
```

`response.data` will look something like:

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

| parameter  | required | type     | default     | description |
| ---------- | -------- | -------- | ----------- | ----------- |
| categoryId | no       | `number` | `undefined` |             |
| limit      | no       | `number` | `undefined` |             |
| offset     | no       | `number` | `undefined` |             |

## Global Options

There's a bunch of options that can be applied to all of the endpoint functions. **None of these options are required**, they are ALL optional.

| parameter        | required | type     | default     | description                                                                                                             |
| ---------------- | -------- | -------- | ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| steamappid       | no       | `number` | `undefined` | Adds the Steam AppId to every link and iframe returned, so users viewing and sharing the clip can get the game on steam |
| cta              | no       | `number` | `1`         | Hide donation buttons or user-generated call-to-actions on the clip, most commonly used for safety reasons              |
| autoplay         | no       | `number` | `0`         | Specify whether the iframes returned contain the autoplay tag                                                           |
| loop             | no       | `number` | `0`         | Specify whether the iframes returned loop content                                                                       |
| muted            | no       | `number` | `1`         | Specify whether the iframes returned should auto-play sound. By default it does not.                                    |
| width            | no       | `number` | `640`       | The height of the returned clip player                                                                                  |
| height           | no       | `number` | `360`       | The width of the returned clip player                                                                                   |
| customStyleClass | no       | `string` | `medal-js`  | Apply a custom class to your embeddable player. `medal-js` will _always_ be applied (last).                             |

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

## Async/Await Example

Here's a replica of the above example, just using async/await.

```ts
(async () => {
  const medal = new Medal('pub_***');

  const latest = await medal.latest({
    categoryId: 10,
    limit: 1,
    offset: 5,
    customStyleClass: 'custom-class-name',
  });

  console.log(latest);
})();
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
