[![Build Status](https://travis-ci.org/gregl83/systime.svg?branch=master)](https://travis-ci.org/gregl83/systime)
[![Coverage Status](https://coveralls.io/repos/gregl83/systime/badge.svg)](https://coveralls.io/r/gregl83/systime?branch=master)
# systime

NodeJS Event Based System Time Keeper

Systime syncs with system time and emits time events. It accounts for fluctuations in time accuracy by continuously re-syncing with local system time.

Use this package for any software that needs to accurately track time (assuming system time is accurate).

For more information on computer clocks and time see [NTP.org](http://www.ntp.org/ntpfaq/NTP-s-sw-clocks.htm).

## Requirements

- NodeJS v0.10.x or higher
- NPM

See `./package.json`

## Installation

Source available on [GitHub](https://github.com/gregl83/systime) or install module via NPM:

    $ npm install systime

## Usage

After requiring systime create a new instance. Bind event listeners to systime then call the start method.

```js
var Systime = require('systime');

var systime = new Systime();

// bind listeners to zero or more of the following events (each callback has a date object argument)

systime.on('second', function(date) {
  console.log(date);
});

systime.on('minute', function() {
  console.log('new minute');
});

systime.on('hour', function() {
  console.log('new hour');
});

systime.on('day', function() {
  console.log('new day');
});

systime.on('week', function() {
  console.log('new week');
});

systime.on('month', function() {
  console.log('new month');
});

systime.on('year', function() {
  console.log('new year');
});

systime.start(); // start systime

// systime will run until the process has exited or the systime.stop() method is called
```

The above will start systime and console.log when event listeners are triggered.

See `./example/events.js` for working example.

That's it!

## License

MIT