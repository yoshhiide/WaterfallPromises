# WaterfallPromises
Promise functions run in series

### Requirements
Node v4+

### Installation
`$ npm install --save waterfallpromises`

### Usage  
```js
const water = new WaterfallPromises(PromisifyFunction)
water.gen(arguments)
```

### Example
```js
const WaterfallPromises = require('WaterfallPromises');

const sleeeep = (arg) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(arg);
      resolve(arg);
    }, 300);
  });
};

const data = [];
for (let i = 0; i < 5; i++) {
  data.push(i);
}

const water = new WaterfallPromises(sleeeep);

water.gen(data)
  .then((results) => console.log(results))
  .catch((err)    => console.log(err));


// add data
let idx = 5;
const si = setInterval(() => {
  data.push(idx++);
}, 400);

// stop add data after 5 seconds
setTimeout(() => clearInterval(si), 5000);


// 0, 1, 2, 3...16
// [0, 1, 2, 3...16]
```

```js
'use strict';

const WaterfallPromises = require('WaterfallPromises');

const promise1 = (arg) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('promise1: ' + arg);
      resolve(arg);
    }, 1500);
  });
};

const promise2 = (arg) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('promise2: ' + arg);
      resolve(arg);
    }, 1000);
  });
};

const promise3 = (arg) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('promise3: ' + arg);
      resolve(arg);
    }, 2000);
  });
};

const data1 = [10, 20, 30];
const data2 = [40, 50, 60];
const data3 = [70, 80, 90];

const water1 = new WaterfallPromises(promise1);
const water2 = new WaterfallPromises(promise2);
const water3 = new WaterfallPromises(promise3);


Promise.all([
    water1.gen(data1),
    water2.gen(data2),
    water3.gen(data3)
])
  .then((res) => console.log(res));


// promise2: 40
// promise1: 10
// promise3: 70
// promise2: 50
// promise1: 20
// promise2: 60
// promise3: 80
// promise1: 30
// promise3: 90
// [ [ 10, 20, 30 ], [ 40, 50, 60 ], [ 70, 80, 90 ] ]
```