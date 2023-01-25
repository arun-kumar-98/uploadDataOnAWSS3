const { s3 } = require("../../cloudConfig/config");
const fs = require("fs");

const uploadFile = async (req, res) => {
  try {
    const filename = req.file.path;
    if (filename) {
      console.log(filename);
      const fileContent = fs.readFileSync(filename);
      console.log(fileContent);

      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: process.env.bsaas_location + /arun/ + req.file.originalname,
        Body: fileContent,
        ContentType: "image/png",
      };

      /** UPLOAD FILE USING  CALLBACK  */
      s3.upload(params, (err, data) => {
        if (err) {
          console.log("####################### ", err.message);
          res.status(400).json({
            response: err.message,
          });
        } else {
          res.status(201).json({
            response: data,
          });
        }
      });

      /** USING AWS PROMISE  */

      //   const promiseObject = s3.putObject(params).promise();
      //   promiseObject
      //     .then(function (data) {
      //       console.log(`uploaded data`, data.$response);
      //       res.status(201).json({
      //         response: data,
      //       });
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //       res.status(400).json({
      //         response: error.message,
      //       });
      //     });
    } else {
      res.status(200).json({
        response: "file uploaded failled",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(400).json({
      response: error.message,
    });
  }
};

const getAllData = async (req, res) => {
  try {
    let objectData;

    var getParams = {
      Bucket: process.env.BUCKET_NAME, // your bucket name,
      // path to the object you're looking for
      Key: "BSaas/Test1/images.jpeg",
    };

    s3.getObject(getParams, function (err, data) {
      // Handle any error and exit
      if (err) return err;

      console.log("=====================> ", data);

      // No error happened
      // Convert Body from a Buffer to a String
      objectData = data.Body.toString("base64"); // Use the encoding necessary
      console.log("#################### ", objectData);
      res.send(objectData);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      response: error.message,
    });
  }
};

//find all records

const findAllRecords = async (req, res) => {
  try {
    const getParams = {
      Bucket: process.env.BUCKET_NAME,
      //prefix: process.env.bsaas_location,
    };
    const contentList = await s3.listObjectsV2(getParams).promise();

    console.log(contentList);
    res.send(contentList);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

//delete resource

const deleteRecords = async (req, res) => {
  try {
    const getParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: req.body.keys,
    };
    s3.deleteObject(getParams, (err, data) => {
      if (err) console.log(err);
      console.log(data);
      res.send(data);
    });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

//bulk  records deleted

const bulkRecordsDeleted = async (req, res) => {
  try {
    const getParams = {
      Bucket: process.env.BUCKET_NAME,
      Prefix: process.env.bsaas_location,
    };
    const contentList = await s3.listObjectsV2(getParams).promise();
    const arr = [];
    contentList.Contents.forEach((element) => {
      arr.push(element.Key);
    });
    console.log("array  ====", arr);

    const resp = [];
    const rec = arr.map((item) => ({
      Key: item,
    }));
    console.log(rec);
    const rec1 = await s3
      .deleteObjects({
        Bucket: process.env.BUCKET_NAME,
        Delete: {
          Objects: rec,
          Quiet: false,
        },
      })
      .promise();
    res.send(resp);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

//list of folders in bucket
const folderListInBucket = async (req, res) => {
  try {
    var params = {
      Bucket: process.env.BUCKET_NAME,
      Delimiter: "/",
      Prefix: "BSaas/Test1/",
    };

    s3Bucket.listObjects(params, function (err, data) {
      if (err) {
        return "There was an error viewing your album: " + err.message;
      } else {
        console.log(data.Contents, "<<<all content");

        data.Contents.forEach(function (obj, index) {
          console.log(obj.Key, "<<<file path");
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

module.exports = {
  uploadFile,
  getAllData,
  findAllRecords,
  deleteRecords,
  bulkRecordsDeleted,
  bulkRecordsDeleted,
  folderListInBucket,
};
