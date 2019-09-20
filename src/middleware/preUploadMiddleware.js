exports.preUploadProfile = (req, res, next) => {
  req.imagesFolder = "profile";
  next();
};

exports.preUploadProduct = (req, res, next) => {
  req.imagesFolder = "product";
  next();
};

exports.preUploadByUser = (req, res, next) => {
  req.imagesFolder = req.user._id;
  next();
};
