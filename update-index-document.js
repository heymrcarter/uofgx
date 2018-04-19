const AWS = require('aws-sdk')

const rawArgs = process.argv.slice(2)
const flags = rawArgs.filter(a => a.startsWith('--'))
const args = rawArgs.filter(a => !a.startsWith('--'))
const indexDocIndex = flags.findIndex(f => f.includes('indexDocument'))
const awsKeyIdIndex = flags.findIndex(f => f.includes('awsKeyId'))
const awsSecretKeyIndex = flags.findIndex(f => f.includes('awsSecretKey'))

console.log('script:index document', args[indexDocIndex])
console.log('script:aws key idt', args[awsKeyIdIndex])
console.log('script:aws secret', args[awsSecretKeyIndex])

const opts = {
  accessKeyId: args[awsKeyIdIndex],
  secretAccessKey: args[awsSecretKeyIndex]
}

const s3 = new AWS.S3(opts)

var params = {
  Bucket: 'destinyclanmanager',
  WebsiteConfiguration: {
    IndexDocument: {
      Suffix: args[indexDocIndex]
    }
  }
}

s3
  .putBucketWebsite(params)
  .promise()
  .then(result => console.log(result))
  .catch(error => {
    console.error(error)
    throw error
  })
