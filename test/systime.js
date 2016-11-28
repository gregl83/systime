var EventEmitter = require('events').EventEmitter

var should = require('should')
var sinon = require('sinon')

var Systime = require('../')


var sandbox

describe('systime', () => {
  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => sandbox.restore())

  it('new instance', done => {
    var systime = new Systime();

    (systime).should.be.instanceOf(EventEmitter)
    should(systime._timeout).be.null

    done()
  })

  it('start', done => {
    var start = sandbox.spy(Systime.prototype, 'start')
    var _trackTime = sandbox.stub(Systime.prototype, '_trackTime')

    var systime = new Systime();

    var onStart = sinon.spy()
    systime.on('start', onStart)

    systime.start()

    sinon.assert.calledOnce(start)
    sinon.assert.calledOnce(_trackTime)
    sinon.assert.calledOnce(onStart)

    start.returned(sinon.match.same(systime))

    done()
  })

  it('timeout ahead of system time', done => {
    var _trackTime = sandbox.spy(Systime.prototype, '_trackTime')
    var timeout = sandbox.stub(global, 'setTimeout')
    var getTime = sandbox.stub(Date.prototype, 'getTime')

    timeout
      .onFirstCall()
      .callsArg(0)
      .onSecondCall()
      .returns(null)

    getTime
      .onFirstCall()
      .returns(999)
      .onSecondCall()
      .returns(950)

    var systime = new Systime();

    var onSecond = sinon.spy()
    systime.on('second', onSecond)

    systime.start()

    sinon.assert.calledTwice(timeout)
    sinon.assert.calledTwice(_trackTime)
    sinon.assert.calledOnce(onSecond)

    done()
  })

  it('emit second', done => {
    var timeout = sandbox.stub(global, 'setTimeout')
    var getTime = sandbox.stub(Date.prototype, 'getTime')

    timeout.returns(null)
    getTime.returns(950)

    var systime = new Systime();

    var onSecond = sinon.spy()
    systime.on('second', onSecond)

    systime.start()

    sinon.assert.calledOnce(onSecond)

    done()
  })

  it('emit minute sans hour', done => {
    var timeout = sandbox.stub(global, 'setTimeout')
    var getTime = sandbox.stub(Date.prototype, 'getTime')
    var getSeconds = sandbox.stub(Date.prototype, 'getSeconds')
    var getMinutes = sandbox.stub(Date.prototype, 'getMinutes')

    timeout.returns(null)
    getTime.returns(950)
    getSeconds.returns(0)
    getMinutes.returns(1)

    var systime = new Systime();

    var onSecond = sinon.spy()
    systime.on('second', onSecond)

    var onMinute = sinon.spy()
    systime.on('minute', onMinute)

    var onHour = sinon.spy()
    systime.on('hour', onHour)

    systime.start()

    sinon.assert.calledOnce(onSecond)
    sinon.assert.calledWith(onSecond, sinon.match.date)

    sinon.assert.calledOnce(onMinute)
    sinon.assert.calledWith(onMinute, sinon.match.date)

    sinon.assert.notCalled(onHour)

    done()
  })

  it('emit hour sans day', done => {
    var timeout = sandbox.stub(global, 'setTimeout')
    var getTime = sandbox.stub(Date.prototype, 'getTime')
    var getSeconds = sandbox.stub(Date.prototype, 'getSeconds')
    var getMinutes = sandbox.stub(Date.prototype, 'getMinutes')
    var getHours = sandbox.stub(Date.prototype, 'getHours')

    timeout.returns(null)
    getTime.returns(950)
    getSeconds.returns(0)
    getMinutes.returns(0)
    getHours.returns(1)

    var systime = new Systime();

    var onSecond = sinon.spy()
    systime.on('second', onSecond)

    var onMinute = sinon.spy()
    systime.on('minute', onMinute)

    var onHour = sinon.spy()
    systime.on('hour', onHour)

    var onDay = sinon.spy()
    systime.on('day', onDay)

    systime.start()

    sinon.assert.calledOnce(onSecond)
    sinon.assert.calledWith(onSecond, sinon.match.date)

    sinon.assert.calledOnce(onMinute)
    sinon.assert.calledWith(onMinute, sinon.match.date)

    sinon.assert.calledOnce(onHour)
    sinon.assert.calledWith(onHour, sinon.match.date)

    sinon.assert.notCalled(onDay)

    done()
  })

  it('emit day sans week', done => {
    var timeout = sandbox.stub(global, 'setTimeout')
    var getTime = sandbox.stub(Date.prototype, 'getTime')
    var getSeconds = sandbox.stub(Date.prototype, 'getSeconds')
    var getMinutes = sandbox.stub(Date.prototype, 'getMinutes')
    var getHours = sandbox.stub(Date.prototype, 'getHours')
    var getDay = sandbox.stub(Date.prototype, 'getDay')

    timeout.returns(null)
    getTime.returns(950)
    getSeconds.returns(0)
    getMinutes.returns(0)
    getHours.returns(0)
    getDay.returns(1)

    var systime = new Systime();

    var onSecond = sinon.spy()
    systime.on('second', onSecond)

    var onMinute = sinon.spy()
    systime.on('minute', onMinute)

    var onHour = sinon.spy()
    systime.on('hour', onHour)

    var onDay = sinon.spy()
    systime.on('day', onDay)

    var onWeek = sinon.spy()
    systime.on('week', onWeek)

    systime.start()

    sinon.assert.calledOnce(onSecond)
    sinon.assert.calledWith(onSecond, sinon.match.date)

    sinon.assert.calledOnce(onMinute)
    sinon.assert.calledWith(onMinute, sinon.match.date)

    sinon.assert.calledOnce(onHour)
    sinon.assert.calledWith(onHour, sinon.match.date)

    sinon.assert.calledOnce(onDay)
    sinon.assert.calledWith(onDay, sinon.match.date)

    sinon.assert.notCalled(onWeek)

    done()
  })

  it('emit week sans sans', done => {
    var timeout = sandbox.stub(global, 'setTimeout')
    var getTime = sandbox.stub(Date.prototype, 'getTime')
    var getSeconds = sandbox.stub(Date.prototype, 'getSeconds')
    var getMinutes = sandbox.stub(Date.prototype, 'getMinutes')
    var getHours = sandbox.stub(Date.prototype, 'getHours')
    var getDay = sandbox.stub(Date.prototype, 'getDay')
    var getDate = sandbox.stub(Date.prototype, 'getDate')

    timeout.returns(null)
    getTime.returns(950)
    getSeconds.returns(0)
    getMinutes.returns(0)
    getHours.returns(0)
    getDay.returns(0)
    getDate.returns(2)

    var systime = new Systime();

    var onSecond = sinon.spy()
    systime.on('second', onSecond)

    var onMinute = sinon.spy()
    systime.on('minute', onMinute)

    var onHour = sinon.spy()
    systime.on('hour', onHour)

    var onDay = sinon.spy()
    systime.on('day', onDay)

    var onWeek = sinon.spy()
    systime.on('week', onWeek)

    var onMonth = sinon.spy()
    systime.on('month', onMonth)

    systime.start()

    sinon.assert.calledOnce(onSecond)
    sinon.assert.calledWith(onSecond, sinon.match.date)

    sinon.assert.calledOnce(onMinute)
    sinon.assert.calledWith(onMinute, sinon.match.date)

    sinon.assert.calledOnce(onHour)
    sinon.assert.calledWith(onHour, sinon.match.date)

    sinon.assert.calledOnce(onDay)
    sinon.assert.calledWith(onDay, sinon.match.date)

    sinon.assert.calledOnce(onWeek)
    sinon.assert.calledWith(onWeek, sinon.match.date)

    sinon.assert.notCalled(onMonth)

    done()
  })

  it('emit month sans year', done => {
    var timeout = sandbox.stub(global, 'setTimeout')
    var getTime = sandbox.stub(Date.prototype, 'getTime')
    var getSeconds = sandbox.stub(Date.prototype, 'getSeconds')
    var getMinutes = sandbox.stub(Date.prototype, 'getMinutes')
    var getHours = sandbox.stub(Date.prototype, 'getHours')
    var getDay = sandbox.stub(Date.prototype, 'getDay')
    var getDate = sandbox.stub(Date.prototype, 'getDate')
    var getMonth = sandbox.stub(Date.prototype, 'getMonth')

    timeout.returns(null)
    getTime.returns(950)
    getSeconds.returns(0)
    getMinutes.returns(0)
    getHours.returns(0)
    getDay.returns(0)
    getDate.returns(1)
    getMonth.returns(1)

    var systime = new Systime();

    var onSecond = sinon.spy()
    systime.on('second', onSecond)

    var onMinute = sinon.spy()
    systime.on('minute', onMinute)

    var onHour = sinon.spy()
    systime.on('hour', onHour)

    var onDay = sinon.spy()
    systime.on('day', onDay)

    var onWeek = sinon.spy()
    systime.on('week', onWeek)

    var onMonth = sinon.spy()
    systime.on('month', onMonth)

    var onYear = sinon.spy()
    systime.on('year', onYear)

    systime.start()

    sinon.assert.calledOnce(onSecond)
    sinon.assert.calledWith(onSecond, sinon.match.date)

    sinon.assert.calledOnce(onMinute)
    sinon.assert.calledWith(onMinute, sinon.match.date)

    sinon.assert.calledOnce(onHour)
    sinon.assert.calledWith(onHour, sinon.match.date)

    sinon.assert.calledOnce(onDay)
    sinon.assert.calledWith(onDay, sinon.match.date)

    sinon.assert.calledOnce(onWeek)
    sinon.assert.calledWith(onWeek, sinon.match.date)

    sinon.assert.calledOnce(onMonth)
    sinon.assert.calledWith(onMonth, sinon.match.date)

    sinon.assert.notCalled(onYear)

    done()
  })

  it('emit year plus all others', done => {
    var timeout = sandbox.stub(global, 'setTimeout')
    var getTime = sandbox.stub(Date.prototype, 'getTime')
    var getSeconds = sandbox.stub(Date.prototype, 'getSeconds')
    var getMinutes = sandbox.stub(Date.prototype, 'getMinutes')
    var getHours = sandbox.stub(Date.prototype, 'getHours')
    var getDay = sandbox.stub(Date.prototype, 'getDay')
    var getDate = sandbox.stub(Date.prototype, 'getDate')
    var getMonth = sandbox.stub(Date.prototype, 'getMonth')

    timeout.returns(null)
    getTime.returns(950)
    getSeconds.returns(0)
    getMinutes.returns(0)
    getHours.returns(0)
    getDay.returns(0)
    getDate.returns(1)
    getMonth.returns(0)

    var systime = new Systime();

    var onSecond = sinon.spy()
    systime.on('second', onSecond)

    var onMinute = sinon.spy()
    systime.on('minute', onMinute)

    var onHour = sinon.spy()
    systime.on('hour', onHour)

    var onDay = sinon.spy()
    systime.on('day', onDay)

    var onWeek = sinon.spy()
    systime.on('week', onWeek)

    var onMonth = sinon.spy()
    systime.on('month', onMonth)

    var onYear = sinon.spy()
    systime.on('year', onYear)

    systime.start()

    sinon.assert.calledOnce(onSecond)
    sinon.assert.calledWith(onSecond, sinon.match.date)

    sinon.assert.calledOnce(onMinute)
    sinon.assert.calledWith(onMinute, sinon.match.date)

    sinon.assert.calledOnce(onHour)
    sinon.assert.calledWith(onHour, sinon.match.date)

    sinon.assert.calledOnce(onDay)
    sinon.assert.calledWith(onDay, sinon.match.date)

    sinon.assert.calledOnce(onWeek)
    sinon.assert.calledWith(onWeek, sinon.match.date)

    sinon.assert.calledOnce(onMonth)
    sinon.assert.calledWith(onMonth, sinon.match.date)

    sinon.assert.calledOnce(onYear)
    sinon.assert.calledWith(onYear, sinon.match.date)

    done()
  })

  it('stop', done => {
    var _trackTime = sandbox.stub(Systime.prototype, '_trackTime')
    var stop = sandbox.spy(Systime.prototype, 'stop')
    var clear = sandbox.stub(global, 'clearTimeout')

    _trackTime.returnsThis()

    var systime = new Systime();

    var onStop = sinon.spy()
    systime.on('stop', onStop)

    systime.start().stop()

    sinon.assert.calledOnce(stop)
    sinon.assert.calledOnce(clear)
    sinon.assert.calledOnce(onStop)

    stop.returned(sinon.match.same(systime))

    done()
  })
})