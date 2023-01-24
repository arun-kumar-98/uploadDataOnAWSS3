const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./api/uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

//apply filter for type of file and limit the size of file

//create multer constructor to initialize storage
//MULTER FOR SINGLE IMAGE STORAGE

const filter = function (req, file, callback) {
  console.log(file.mimetype);
  if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
    callback(null, true);
  } else {
    callback(new Error("file extension is not image "));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filter,
}).single("image");

module.exports = { upload };
