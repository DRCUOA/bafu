// multerMiddleware.js
const multer = require('multer');
const path = require('path');

// configure multer to store uploaded files in the "./public/diagram/imgs" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/diagram/imgs');
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const filename = req.body.diagram_name + extension;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
