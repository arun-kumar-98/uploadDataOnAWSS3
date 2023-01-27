const bodyParser = require("body-parser");
const express = require("express");
const router = require("./api/router/router");
const commonServices = require("./api/awsCommonServices/awsCommonServices");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", router);

async function run() {
  app.listen(process.env.port, () => {
    console.log(`server listening at port ${process.env.port}`);
  });
  // let result = await commonServices.uploadFile(
  //   "/home/arun/Downloads/pngtree.png",
  //   "C1-mamaearth",
  //   "PP1-charcoal.jpeg"
  // );
  // console.log("Result-->", result);

  //find all objects

  // let data = await commonServices.findAll("C1-mamaearth", "PP1-charcoal.jpeg");
  // console.log("Data========>", data);

  //find single object

  const resp = await commonServices.findSingleObject(
    "BSaas/Test1//arun/C1-mamaearth/PP1-charcoal.jpeg"
  );
  console.log("response:->", resp);

  //remove objects

  // const removeObjects = await commonServices.removeObjects(
  //   "C1-Dabur",
  //   "P1-Alovera"
  // );
  // console.log("objects deleted==>", removeObjects);
  //
}

run();
