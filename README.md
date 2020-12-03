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
