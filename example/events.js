var Systime = require('../');

var systime = new Systime();

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

systime.start();