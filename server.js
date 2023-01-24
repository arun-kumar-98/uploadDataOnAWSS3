const bodyParser = require("body-parser");
const express = require("express");
const router = require("./api/router/router");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", router);

function init() {
  app.listen(process.env.port, () => {
    console.log(`server listening at port ${process.env.port}`);
  });
}
init();
