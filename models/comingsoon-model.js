const { Schema, model } = require("mongoose");

const comingsoonSchema = new Schema({
    pagename: { type: String, required: true },
    title: { type: String, required: true },
    subtitle:{ type: String, required: true },
    date:{ type: String},
    bgimage: { type: String, default: null }, 
    logo: { type: String, default: null }, 
    email:{ type: String, required: true },
    contact:{ type: String, required: true },
    location:{ type: String, required: true },
    url: { type: String },
    status: { type: String },
});
const comingsoon = new model('comingsoon', comingsoonSchema);

module.exports =  comingsoon ;