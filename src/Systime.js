var util = require('util')
var EventEmitter = require('events').EventEmitter


/**
 * System time keeper (chainable)
 *
 * @returns {Systime} self
 * @constructor
 * @augments EventEmitter
 */
function Systime() {
  var self = this

  EventEmitter.call(self)

  self._timeout = null

  return self
}


util.inherits(Systime, EventEmitter)


/**
 * Tracks system time and emits interval events (second, minute, hour, day, etc)
 *
 * Note: Uses self-calling 1 second (1000 ms) timeouts (adjusts to track system time)
 *
 * @returns {Systime} self
 * @fires Systime#second
 * @fires Systime#minute
 * @fires Systime#hour
 * @fires Systime#day
 * @fires Systime#week
 * @fires Systime#month
 * @fires Systime#year
 * @private
 */
Systime.prototype._trackTime = function() {
  var self = this

  clearTimeout(self._timeout)

  var date = new Date()
  var timeToSecond = 1000 - date.getTime() % 1000
  var timeIncomplete = (timeToSecond < 10)

  if (!timeIncomplete) {
    self.emit('second', date)
    if (date.getSeconds() === 0) {
      self.emit('minute', date)
      if (date.getMinutes() === 0) {
        self.emit('hour', date)
        if (date.getHours() === 0) {
          self.emit('day', date)
          if (date.getDay() === 0) {
            self.emit('week', date)
            if (date.getDate() === 1) {
              self.emit('month', date)
              if (date.getMonth() === 0) {
                self.emit('year', date)
              }
            }
          }
        }
      }
    }
  }

  self._timeout = setTimeout(() => self._trackTime(), timeToSecond)
};


/**
 * Start tracking system time
 *
 * @returns {Systime} self
 * @fires Systime#start
 */
Systime.prototype.start = function() {
  var self = this

  self.emit('start')

  self._trackTime()

  return self
}


/**
 * Stop tracking system time
 *
 * @returns {Systime} self
 * @fires Systime#stop
 */
Systime.prototype.stop = function() {
  var self = this

  clearTimeout(self._timeout)

  self.emit('stop')

  return self
}


module.exports = Systime