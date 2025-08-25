const express = require("express");
const router = express.Router();
const creatorclubcontrollers = require("../controllers/creatorclub-controller");
const {registerSchema , loginSchema } = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const  authMiddleware = require("../middlewares/auth-middleware");


const multer = require("multer");
const fs = require("fs");
const path = require("path");
const bodyparser = require("body-parser");

router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static(path.resolve(__dirname,'public')))

router.route("/creatorclub-register").post(creatorclubcontrollers.register);
router.route("/creatorclub-update").patch(creatorclubcontrollers.registerupdate);
router.route("/creatorclub-updatephone").patch(creatorclubcontrollers.registerupdatephone);
router.route("/pay-now").post(creatorclubcontrollers.paynow);
router.route("/creatorclub-selecttheme").post(creatorclubcontrollers.creatorclubselecttheme);

router.route("/check-email").post(creatorclubcontrollers.checkEmailExists);
router.route("/check-themes").post(creatorclubcontrollers.checkSelectedThemes);
router.route("/getthemedata/:id").get(creatorclubcontrollers.getUserById);



router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static(path.resolve(__dirname,'public')))

const storage = multer.diskStorage({
    destination: function(req,file, cb){
      if(!fs.existsSync("public")){
          fs.mkdirSync("public");
      }
      if(!fs.existsSync("public/creatorclub")){
          fs.mkdirSync("public/creatorclub");
      }
      cb(null, "public/creatorclub");
    },
    filename: function(req,file,cb){
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const upload = multer({
      storage:storage,
      
  })

router.post("/creatorclub-cretewebsite",upload.single('file'),creatorclubcontrollers.creatorclubCretewebsite);



module.exports = router;