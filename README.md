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