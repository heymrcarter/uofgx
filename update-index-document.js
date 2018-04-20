const AWS = require('aws-sdk')

const rawArgs = process.argv.slice(2)
const flags = rawArgs.filter(a => a.startsWith('--'))
const args = rawArgs.filter(a => !a.startsWith('--'))
const indexDocIndex = flags.findIndex(f => f.includes('indexDocument'))
const awsKeyIdIndex = flags.findIndex(f => f.includes('awsKeyId'))
const awsSecretKeyIndex = flags.findIndex(f => f.includes('awsSecretKey'))
const bucketNameIndex = flags.findIndex(f => f.includes('bucketName'))

const opts = {
  accessKeyId: args[awsKeyIdIndex],
  secretAccessKey: args[awsSecretKeyIndex]
}

const s3 = new AWS.S3(opts)

var params = {
  Bucket: args[bucketNameIndex],
  WebsiteConfiguration: {
    IndexDocument: {
      Suffix: args[indexDocIndex]
    }
  }
}

s3
  .putBucketWebsite(params)
  .promise()
  .then(result => {
    console.log(result)
    process.exit(0)
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
