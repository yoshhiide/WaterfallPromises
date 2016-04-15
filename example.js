'use strict';

const WaterfallPromises = require('./index');

const sleeeep = (arg) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(arg);
      resolve(arg);
    }, 400);
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
