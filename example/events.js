var Systime = require('../')

var systime = new Systime()

systime.on('second', date => console.log(date))

systime.on('minute', () => console.log('new minute'))

systime.on('hour', () => console.log('new hour'))

systime.on('day', () => console.log('new day'))

systime.on('week', () => console.log('new week'))

systime.on('month', () => console.log('new month'))

systime.on('year', () => console.log('new year'))

systime.start()