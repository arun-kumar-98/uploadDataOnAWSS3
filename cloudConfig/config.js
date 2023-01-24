const aws = require("aws-sdk");
require("dotenv").config();

const BUCKET_NAME = process.env.BUCKET_NAME;

//update before initialization
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "eu-west-2",
  maxRetries: 100,
});

//initialize s3

const s3 = new aws.S3({
  region: "eu-west-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

//creates buckets

const params = {
  Bucket: BUCKET_NAME,
};

// already bucket credeted

// s3.createBucket(params, (err, data) => {
//   if (err) {
//     console.log("bucket creation error ", err);
//   } else {
//     console.log("bucket created successfullly" + data);
//   }
// });

module.exports = { s3 };
