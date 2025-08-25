const express = require("express");
const router = express.Router();
const customercontrollers = require("../controllers/customer-controller");
const {registerSchema , loginSchema } = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const  authMiddleware = require("../middlewares/auth-middleware");


const multer = require("multer");
const fs = require("fs");
const path = require("path");
const bodyparser = require("body-parser");

router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static(path.resolve(__dirname,'public')))

router.route("/addcust").post(customercontrollers.addcust);
router.route("/getcustbyid/:id").get(customercontrollers.getcustbyid);
router.route("/edit/:id").patch(customercontrollers.updatecust);
router.route("/custlist").get(customercontrollers.getcust);
router.route("/delete/:id").delete(customercontrollers.deletecust);
router.route("/status/:id").patch(customercontrollers.statuscust);
router.route("/verifyotp/:id").patch(customercontrollers.otpverify);
router.route("/setpin/:id").patch(customercontrollers.setpin);
router.route("/getcustbyid2/:id").get(customercontrollers.getcustbyid2);
router.route("/editcust/:id").patch(customercontrollers.updatecust);


const storage = multer.diskStorage({
    destination: function(req,file, cb){
      if(!fs.existsSync("public")){
          fs.mkdirSync("public");
      }
      if(!fs.existsSync("public/profile")){
          fs.mkdirSync("public/profile");
      }
      cb(null, "public/profile");
    },
    filename: function(req,file,cb){
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const upload = multer({
      storage:storage,
  })

router.route("/custeditbyid/:id").get(customercontrollers.getdatabyid);
router.patch("/custeditprofile/:id",upload.single('pic'), customercontrollers.updateprofile);

module.exports = router;