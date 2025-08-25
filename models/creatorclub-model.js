const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const creatorclubSchema = new mongoose.Schema({
    cust_id:{
        type:String,
    },
    username:{
        type:String,
       
    },
    email:{
        type:String,
       
    },
    phone:{
        type:String,
       
    },
    
    status:{
        type:String,
    },
    

});

creatorclubSchema.methods.generateToken2 = async function () {
    try {
        console.log("Generating token for:", this.email);
        console.log("Using secret key:", process.env.JWT_SECRET_KEY3 ? "Loaded" : "Not Loaded");

        const token = jwt.sign(
            {
                userId: this.id.toString(),
                email: this.email,
                isUser: this.isUser,
            },
            process.env.JWT_SECRET_KEY3, 
            { expiresIn: "30d" }
        );

        console.log("Generated Token:", token);
        return token;
    } catch (error) {
        console.error("Token generation error:", error.message);
        throw new Error("Token generation failed");
    }
};

const CreatorClub = new mongoose.model("creatorclub", creatorclubSchema);


const paynowSchema = new mongoose.Schema({
    creatorclub_id:{
        type:String,
    },
    payment:{
        type:String,
       
    },
    
    status:{
        type:String,
    },
    

});

const Paynow = new mongoose.model("creatorclubpayment", paynowSchema);



const creatorclubthemeSchema = new mongoose.Schema({
    creatorclub_id:{
        type:String,
    },
    theme:{
        type:String,
       
    },
    
    newdata:{
        type:String,
       
    },

});

const CreatorClubTheme = new mongoose.model("creatorclubtheme", creatorclubthemeSchema);
const creatorclubWebiteSchema = new mongoose.Schema({
    creatorclub_id:{
        type:String,
    },
    company:{
        type:String,
    },
    namelogo:{
        type:String,
    },
    industry:{
        type:String,
       
    },
    primary:{
        type:String,
       
    },

    filePath:{
        type:String,
       
    },
  
    newdata:{
        type:String,
       
    },
    secondary:{
        type:String,
       
    },
    overview:{
        type:String,
       
    },
    address:{
        type:String,
       
    },
    email:{
        type:String,
       
    },
    phone:{
        type:String,
       
    },
    state:{
        type:String,
       
    },
    city:{
        type:String,
       
    },

    status:{
        type:String,
    },
    

});
const CreateWebsite = new mongoose.model("creatorclubWebite", creatorclubWebiteSchema);

module.exports = { CreatorClub,Paynow, CreatorClubTheme ,CreateWebsite};


               