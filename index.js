'use strict';

class WaterfallPromises {
  constructor(promiseFunc) {
    this.nextPromiseFunc = promiseFunc;
  }

  gen(args) {
    this.data = (args || []).slice(0);
    this.results = [];
    this.promise = Promise.resolve(true);

    return this.start();
  }

  start() {
    return this.promise.then((res) => {
      this.results.push(res);

      if (!this.data.length) {
        return Promise.resolve(this.results.slice(1));
      }

      const nextArg = this.data.shift();
      this.promise = this.nextPromiseFunc(nextArg);
      return this.start();
    });
  }
};

module.exports = WaterfallPromises;
