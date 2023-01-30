const AWS = require("aws-sdk");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const randomString = require("randomstring");


//upload file 
/**
 *
 * @param {*} location
 * @param {*} client
 * @param {*} project
 * @returns
 */

async function uploadFile(location, client, project) {
  try {
    const s3 = new AWS.S3({
      region: "eu-west-2",
      accessKeyId: process.env.Access_Key,
      secretAccessKey: process.env.Secret_Key,
    });
    console.log("File", location);
    console.log(path.basename(`${location}`), path.extname(`${location}`));

    const fileContent = fs.readFileSync(location);
    console.log("----->", fileContent);

    let randomString1 = randomString.generate({
      length: 5,
      charset: path.basename(location),
    });

    console.log("Random_String:->", randomString1);

    let key = `${
      process.env.bsaas_location
    }/${client}/${project}/${randomString1}${path.extname(location)}`;
    console.log("Key:", key);

    const exists = await s3
      .headObject({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
      })
      .promise()
      .then(
        () => true,
        (err) => {
          if (err.code === "NotFound") {
            return false;
          }
          throw err;
        }
      );
    console.log("exists==>", exists);
    if (exists === false) {
      const params = {
        Bucket: `${process.env.BUCKET_NAME}`,
        Key: key,
        Body: fileContent,
      };

      const result = await s3.upload(params).promise();
      console.log("path==>", path.basename(result.Key));

      return result;
    } else {
      return `record already exists with this key :-> ${key}`;
    }
  } catch (error) {
    return error;
  }
}

//Find all objects

/**
 *
 * @param {*} client
 * @param {*} project
 * @returns
 */

async function findAll(client, project) {
  try {
    const s3 = new AWS.S3({
      region: "eu-west-2",
      accessKeyId: process.env.Access_Key,
      secretAccessKey: process.env.Secret_Key,
    });
    var params = {
      Bucket: process.env.BUCKET_NAME,
      Prefix: `${process.env.bsaas_location}/${client}/${project}`, // Can be your folder name
    };

    let Keys = [];
    let result = await s3.listObjects(params).promise();
    for (let index = 0; index < result["Contents"].length; index++) {
      Keys.push(result["Contents"][index]["Key"]);
    }
    return Keys;
  } catch (error) {
    console.log("Error", error);
    return error;
  }
}

//Find Single object
/**
 *
 * @param {*} key
 * @returns
 */
async function findSingleObject(key) {
  try {
    const s3 = new AWS.S3({
      region: "eu-west-2",
      accessKeyId: process.env.Access_Key,
      secretAccessKey: process.env.Secret_Key,
    });
    const params = {
      Bucket: `${process.env.BUCKET_NAME}`,
      Key: `${key}`,
    };
    const response = await s3.getObject(params).promise(); // await the promise
    console.log("fileContent==>", response);

    return response;
  } catch (error) {
    console.log("Error:->", error);
  }
}

//remove objects
/**
 *
 * @param {*} client
 * @param {*} project
 * @returns
 */

async function removeObjects(client, project) {
  try {
    // const s3 = new AWS.S3();

    // var params = {
    //   Bucket: `${process.env.AWS_BUCKET_NAME}` /* required */,
    //   Prefix: `${process.env.bsaas_location}/${client}/${project}`,
    //   // it may  be your folder name also
    // };
    // let user = await s3.listObjectsV2(params).promise();
    console.log("User:", user.KeyCount);

    let Keys = [];

    user.Contents.forEach(async (element) => {
      Keys.push(element.Key);
    });

    console.log("Keys:", Keys);

    let keyObject = Keys.map((element) => ({
      Key: element,
    }));
    console.log("keyObject:->", keyObject);

    const data = await s3
      .deleteObjects({
        Bucket: `${process.env.AWS_BUCKET_NAME}`,
        Delete: { Objects: keyObject },
      })
      .promise();
    console.log(`data deleted:${data}`);
    return data;
  } catch (error) {
    console.log("Error", error);
  }
}

module.exports = {
  uploadFile,
  findAll,
  findSingleObject,
  removeObjects,
};
