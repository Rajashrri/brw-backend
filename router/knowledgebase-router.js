const express = require("express");
const router = express.Router();
const Knowledgebase = require("../controllers/knowledgebase-controller");

//category 
router.route("/addcategory").post(Knowledgebase.addcategory);
router.route("/getdatacategory").get(Knowledgebase.getdatacategory);
router.route("/getcategoryByid/:id").get(Knowledgebase.getcategoryByid);
router.route("/updateCategory/:id").patch(Knowledgebase.updateCategory);

router.route("/deletecategory/:id").delete(Knowledgebase.deletecategory);
router.route("/update-statuscategory").patch(Knowledgebase.updateStatusCategory);
router.route("/categoryOptions").get(Knowledgebase.categoryOptions);

//knowledge base
router.route("/add").post(Knowledgebase.add);
router.route("/listdata").get(Knowledgebase.listdata);
router.route("/getdata/:id").get(Knowledgebase.getdatabyid);       
router.route("/delete/:id").delete(Knowledgebase.deletedata);
router.route("/update-status").patch(Knowledgebase.updateStatus);



module.exports = router;