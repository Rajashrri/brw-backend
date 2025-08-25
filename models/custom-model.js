const {Schema, model} = require("mongoose");

const customSchema = new Schema({
    title: {type: String, required: true},
    category:{type: String, required: true},
    // date:{type: String, required: true},
    js:{type: String},
    css:{type: String},
    details:{type: String},
    status:{type: String},
});
const Custom = new model('Custom',customSchema);

const themeSchema = new Schema({
    title: {type: String, required: true},
    header:{type: String},
    slider:{type: String},
    usps:{type: String},
    about:{type: String},
    proser:{type: String},
    testimonials:{type: String},
    gallery:{type: String},
    contact:{type: String},
    footer:{type: String},
    status:{type: String},
});
const Theme = new model('Theme',themeSchema);

const contactSchema= new Schema({
    name: {type: String},
    email:{type: String},
    subject:{type: String},
    message:{type: String},
    themename:{type: String},
});
const Contact = new model('Contactform',contactSchema);

module.exports = { Custom, Theme, Contact};
