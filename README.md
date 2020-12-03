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
