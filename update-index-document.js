const AWS = require('aws-sdk')
const s3 = new AWS.S3()

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
