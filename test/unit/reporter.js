const builder = require('jest-trx-results-processor')
const path = require('path')

const resultFile = path.resolve(path.join(__dirname, 'results.trx'))

const processor = builder({
  outputFile: resultFile
})

module.exports = processor
