global.td = require('testdouble')
global.expect = require('expect')

require('testdouble-jest')(td, jest) // eslint-disable-line

afterEach(function() {
  td.reset() // eslint-disable-line
})
