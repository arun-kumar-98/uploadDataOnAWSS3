const express = require("express");
const { uploadFile } = require("../controller/uploadController");
const { upload } = require("../middleware/uploadFile");
const router = express();

router.post("/upload", upload, uploadFile);

module.exports = router;
