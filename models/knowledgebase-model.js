const { Schema, model } = require("mongoose");

//category


const categorySchema = new Schema({
    name: { type: String, required: true },
   
    url: { type: String },
    status: { type: String },
   

});

const knowledgeCategory = new model('knowledgeCategory', categorySchema);


const knowledgebaseSchema = new Schema({
    title: { type: String, required: true },
    answer:{ type: String, required: true },
    category_id:{ type: String, required: true },
    keywords:{ type: String, required: true },
    url: { type: String },
    status: { type: String },
});
const knowledgebase = new model('knowledgebase', knowledgebaseSchema);

module.exports =  {knowledgeCategory,knowledgebase } ;