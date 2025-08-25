const express = require("express");
const router = express.Router();
const Custom = require("../controllers/custom-controller");


const multer = require("multer");
const fs = require("fs");
const path = require("path");
const bodyparser = require("body-parser");

router.use(bodyparser.urlencoded({extended:true}));
router.use(express.static(path.resolve(__dirname,'public')))

const storage = multer.diskStorage({
  destination: function(req,file, cb){
    if(!fs.existsSync("public")){
        fs.mkdirSync("public");
    }
    if(!fs.existsSync("public/custom")){
        fs.mkdirSync("public/custom");
    }
    cb(null, "public/custom");
  },
  filename: function(req,file,cb){
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
    storage:storage,
})


router.post("/addcustom",upload.fields([ { name: 'js'},{ name: 'css'}]), Custom.addcustom);
router.patch("/updatecustom/:id",upload.fields([ { name: 'js', maxCount: 1 },{ name: 'css', maxCount: 1 }]), Custom.updatecustom);
router.route("/getlist").get(Custom.getlist);
router.route("/getdatabyid/:id").get(Custom.getdatabyid);
router.route("/deletecustom/:id").delete(Custom.deletecustom);
router.route("/status/:id").patch(Custom.statuscustom);

//for theme 
router.route("/getlisttheme").get(Custom.getlisttheme);
router.route("/getdropdowndata").get(Custom.getdropdowndata);
router.route("/addtheme").post(Custom.addtheme);
router.route("/getthemedatabyid/:id").get(Custom.getthemedatabyid);
router.route("/updatetheme/:id").patch(Custom.updatetheme);
router.route("/statustheme/:id").patch(Custom.statustheme);
router.route("/deletetheme/:id").delete(Custom.deletetheme);

//best rate website base front 
router.route("/gettemplatedata/:id").get(Custom.gettemplatedata);
router.route("/contactform/:id").patch(Custom.contactform);

module.exports = router;