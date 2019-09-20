import multer from "multer";
import fs from "fs";
import mime from "mime";
import uuidV4 from "uuid/v4";

const multerStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    const path = `${rootPath}/public/uploads/${req.imagesFolder}/`;
    file.path = path;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    cb(null, path);
  },
  filename: function(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${uuidV4()}.${mime.getExtension(file.mimetype)}`
    );
  }
});

const multerLimit = {
  fileSize: 1024 * 1024 * 5,
  fieldNameSize: 100
};

const multerFilterFile = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

exports.UploadFileDisk = multer({
  limits: multerLimit,
  fileFilter: multerFilterFile,
  storage: multerStorage
});

exports.UploadFileToS3 = () => {
  // code
};
