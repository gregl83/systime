var util = require('util');
var EventEmitter = require('events').EventEmitter;


/**
 * System Timer Keeper
 *
 * @constructor
 * @augments EventEmitter
 */
function Systime() {
  var self = this;

  EventEmitter.call(self);

}


util.inherits(Systime, EventEmitter);


module.exports = Systime;