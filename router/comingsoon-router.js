const express = require("express");
const router = express.Router();
const comingsoon = require("../controllers/comingsoon-controller");

const multer = require("multer");
const fs = require("fs");
const path = require("path");
const bodyparser = require("body-parser");

router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static(path.resolve(__dirname,'public')))

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadPath = path.resolve(__dirname, "..", "public", "comingsoon"); 
  
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true }); 
      }
  
      cb(null, uploadPath);
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });
router.post("/add",upload.fields([ { name: 'bgimage'},{ name: 'logo'}]), comingsoon.add);
// router.patch("/edit/:id",upload.single('bgimage'), );
router.patch("/edit/:id",upload.fields([ { name: 'bgimage', maxCount: 1 },{ name: 'logo', maxCount: 1 }]), comingsoon.edit);
router.route("/listdata").get(comingsoon.listdata);
router.route("/getdata/:id").get(comingsoon.getdatabyid);
router.route("/delete/:id").delete(comingsoon.deletedata);
router.route("/update-status").patch(comingsoon.updateStatus);

module.exports = router;