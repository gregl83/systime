var util = require('util');
var EventEmitter = require('events').EventEmitter;


/**
 * System Time Keeper
 *
 * @constructor
 * @augments EventEmitter
 */
function Systime() {
  var self = this;

  EventEmitter.call(self);

  self._timeout = null;

  self._trackTime();
}


util.inherits(Systime, EventEmitter);


/**
 * Tracks System Time and Emits Interval Events (second, minute, hour, day, etc)
 *
 * Note: Uses Self Calling 1 second (1000 ms) Timeouts (adjusts to track system time)
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


module.exports = Systime;