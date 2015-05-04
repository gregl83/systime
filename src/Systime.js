var util = require('util');
var EventEmitter = require('events').EventEmitter;


/**
 * System time keeper
 *
 * @constructor
 * @augments EventEmitter
 */
function Systime() {
  var self = this;

  EventEmitter.call(self);

  self._timeout = null;
}


util.inherits(Systime, EventEmitter);


/**
 * Tracks system time and emits interval events (second, minute, hour, day, etc)
 *
 * Note: Uses self-calling 1 second (1000 ms) timeouts (adjusts to track system time)
 *
 * @fires Systime#second
 * @fires Systime#minute
 * @fires Systime#hour
 * @fires Systime#day
 * @fires Systime#week
 * @private
 */
Systime.prototype._trackTime = function() {
  var self = this;

  clearTimeout(self._timeout);

  var date = new Date();

  var timeToSecond = 1000 - date.getTime() % 1000;
  var timeIncomplete = (timeToSecond < 10);

  if (timeIncomplete) return self._timeout = setTimeout(self._trackTime, timeToSecond);

  self.emit('second');

  self._timeout = setTimeout(function () {
    if (date.getSeconds() !== 0) return self._trackTime();

    self.emit('minute');

    if (date.getMinutes() !== 0) return self._trackTime();

    self.emit('hour');

    if (date.getHours() === 0) self.emit('day');

    if (date.getDay() === 0) self.emit('week');

    if (date.getDate() === 1) self.emit('month');

    if (date.getMonth() === 0) self.emit('year');

    self._trackTime();
  }, timeToSecond);
};


/**
 * Start tracking system time
 *
 * @fires Systime#start
 */
Systime.prototype.start = function() {
  var self = this;

  self.emit('start');

  self._trackTime();
};


/**
 * Stop tracking system time
 *
 * @fires Systime#stop
 */
Systime.prototype.stop = function() {
  var self = this;

  clearTimeout(self._timeout);

  self.emit('stop');
};


module.exports = Systime;