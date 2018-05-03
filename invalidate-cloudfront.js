const AWS = require('aws-sdk')

const rawArgs = process.argv.slice(2)
const flags = rawArgs.filter(a => a.startsWith('--'))
const args = rawArgs.filter(a => !a.startsWith('--'))
const distributionIdIndex = flags.findIndex(f => f.includes('distributionId'))
const awsKeyIdIndex = flags.findIndex(f => f.includes('awsKeyId'))
const awsSecretKeyIndex = flags.findIndex(f => f.includes('awsSecretKey'))

const opts = {
  accessKeyId: args[awsKeyIdIndex],
  secretAccessKey: args[awsSecretKeyIndex]
}

const cf = new AWS.CloudFront(opts)
const caller = Math.round(new Date().getTime() / 1000)

var params = {
  DistributionId: args[distributionIdIndex],
  InvalidationBatch: {
    CallerReference: `${caller}`,
    Paths: {
      Quantity: 1,
      Items: ['/*']
    }
  }
}

cf
  .createInvalidation(params)
  .promise()
  .then(result => {
    console.log(result)
    process.exit(0)
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
