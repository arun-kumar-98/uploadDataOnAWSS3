const express = require("express");
const controller = require("../controller/uploadController");
const { upload } = require("../middleware/uploadFile");
const router = express();

router.post("/upload", upload, controller.uploadFile);
router.post("/fetch", controller.getAllData);
router.post("/findAll", controller.findAllRecords);
router.delete("/delete", controller.deleteRecords);
router.delete("/all", controller.bulkRecordsDeleted);

module.exports = router;
