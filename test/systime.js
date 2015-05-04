var should = require('should');
var sinon = require('sinon');

var Systime = require('../');
var systime = new Systime();

systime.on('second', function() {
  console.log('second');
});

systime.on('minute', function() {
  console.log('minute');
});

systime.on('hour', function() {
  console.log('hour');
});

systime.on('day', function() {
  console.log('day');
});


//describe('systime', function() {
//  // todo write tests
//});