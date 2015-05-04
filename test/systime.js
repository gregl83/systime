var EventEmitter = require('events').EventEmitter;

var should = require('should');
var sinon = require('sinon');

var Systime = require('../');


var sandbox;

describe('systime', function() {
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('new instance', function(done) {
    var systime = new Systime();

    (systime).should.be.instanceOf(EventEmitter);
    should(systime._timeout).be.null;

    done();
  });

  it('start', function(done) {
    // todo

    done();
  });

  it('timeout runs again if fast', function(done) {
    var _trackTime = sandbox.spy(Systime.prototype, '_trackTime');
    var timeout = sandbox.stub(global, 'setTimeout');
    var getTime = sandbox.stub(Date.prototype, 'getTime');

    getTime
      .onFirstCall()
      .returns(999)
      .onSecondCall()
      .returns(950);

    timeout
      .onFirstCall()
      .callsArg(0)
      .onSecondCall()
      .returns(null);

    var systime = new Systime();

    var onSecond = sinon.spy();
    systime.on('second', onSecond);

    systime.start();

    sinon.assert.calledTwice(timeout);
    sinon.assert.calledTwice(_trackTime);
    sinon.assert.calledOnce(onSecond);

    done();
  });

  it('sample test', function(done) {
    // fixme

    //var stub = sandbox.stub(Date.prototype, 'getTime');
    //
    //stub.returns('time');
    //
    //var systime = new Systime();
    //
    //systime.on('second', function() {
    //  console.log('second');
    //});
    //
    //systime.on('minute', function() {
    //  console.log('minute');
    //});
    //
    //systime.on('hour', function() {
    //  console.log('hour');
    //});
    //
    //systime.on('day', function() {
    //  console.log('day');
    //});
    //
    //systime.on('week', function() {
    //  console.log('week');
    //});
    //
    //systime.on('month', function() {
    //  console.log('month');
    //});
    //
    //systime.on('year', function() {
    //  console.log('year');
    //});
    //
    //systime.start().stop();

    done();
  });

  it('stop', function(done) {
    // todo

    done();
  });
});