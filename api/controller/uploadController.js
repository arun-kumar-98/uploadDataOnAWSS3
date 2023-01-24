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
        Key: process.env.bsaas_location + req.file.originalname,
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

module.exports = { uploadFile };
