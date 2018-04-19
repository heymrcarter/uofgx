const AWS = require('aws-sdk')

const opts = {
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
}

const s3 = new AWS.S3(opts)

var params = {
  Bucket: 'destinyclanmanager',
  WebsiteConfiguration: {
    IndexDocument: {
      Suffix: process.env.INDEX_DOCUMENT
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
