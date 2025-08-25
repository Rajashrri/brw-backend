
const Customer = require("../models/customer-model");
const {Page, Field, Sidebar, Template, Templatefields, Usertemplatefields} = require("../models/formmodule-model");

const bcrypt = require("bcryptjs");

function createCleanUrl(title) {
    // Convert the title to lowercase
    let cleanTitle = title.toLowerCase();
    // Remove special characters, replace spaces with dashes
    cleanTitle = cleanTitle.replace(/[^\w\s-]/g, '');
    cleanTitle = cleanTitle.replace(/\s+/g, '-');
  
    return cleanTitle;
}

const addcust = async (req,res)=>{
    try {
        console.log(req.body);
        const { username, email, phone,compname,address,description,brand } = req.body;
        const password = `Admin@123`;
        const status= '1';    
        const usercount = await Customer.countDocuments({ isAdmin: { $ne: 'true' } });
       
       
        let cust_id;

        if (usercount === 0) {
            cust_id = 'Cust1';
        } else {
            cust_id = `Cust${usercount + 1}`;
        }

        const userExist = await Customer.findOne({ email });
        
        if(userExist){
            return res.status(400).json({msg:"Email ID already exist"});

        }
        const cmCreated =  await Customer.create( { username, email, phone,compname,address,description, brand ,password} );
        res.status(201).json({
            msg:cmCreated,
            busid:cmCreated._id.toString(),
        });

    } catch (error) {
        console.error("Error in addcust:", error.message); // Log the error message
        res.status(500).json({ error: "Internal Server Error", details: error.message }); // Send the error message in the response
    }
};

const updatecust = async (req, res) => {
    try {

        const { username, email, phone, compname, address, description, brand, password, cpassword } = req.body;
        const id = req.params.id;
         
        const existingUser = await Customer.findById(id);
        if (!existingUser) {
            return res.status(404).json({ msg: "Customer not found" });
        }

        const emailExists = await Customer.findOne({ email, _id: { $ne: id } });
        if (emailExists) {
            return res.status(400).json({ msg: "Email ID already exists" });
        }
        let rand = '';
        // Ensure password and confirm password match
        // if (password && cpassword) {
        //     if (password !== cpassword) {
        //         return res.status(400).json({ msg: "Password and Confirm Password do not match" });
        //     }else{
        //         rand = Math.floor(100000 + Math.random() * 900000);
        //     }
        // }

        // let hashedPassword = existingUser.password; // Default to old password

        // if (password) { // Only hash password if it's provided
        //     const saltRound = await bcrypt.genSalt(10);
        //     hashedPassword = await bcrypt.hash(password, saltRound);
        // }

        const updatedUser = await Customer.findByIdAndUpdate(
            id,
            {
                username,
                email,
                // password: hashedPassword,
                // otp:rand,
                phone,
                compname,
                address,
                description,
                brand,       
                // loginotpcount: 1,
            },
            { new: true } 
        );


             

 res.status(200).json({
        type: true,
        msg: "Updated Successfully",
      
        busid: id,
      })


    } catch (error) {
        console.error("Error in updatecust:", error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

const setpin = async(req,res)=>{
    try {

        const { email, pin } = req.body;
        const id = req.params.id;
         
        const existingUser = await Customer.findById(id);
        if (!existingUser) {
            return res.status(404).json({ msg: "Customer not found" });
        }

        const emailExists = await Customer.findOne({ email, _id: { $ne: id } });
        if (emailExists) {
            return res.status(400).json({ msg: "Email ID already exists" });
        }
      

        const updatedUser = await Customer.findByIdAndUpdate(
            id,
            {
              pin:pin
            },
            { new: true } 
        );

        const token = await existingUser.generateToken();

        res.status(200).json({ 
            msg: "Registered Successfully",  
            token: token,
        });

    } catch (error) {
        console.error("Error in setpin:", error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}
const otpverify = async (req, res) => {
    try {
        const { otp } = req.body;
    
        const id = req.params.id;
        const userExist = await Customer.findOne({_id:id});
        if (!userExist) {
            return res.status(400).json({ message: "User does not exist." });
        }

        if (!otp) {
            return res.status(400).json({ message: "OTP must be 6 digits." });
        }

        if (userExist.otp !== otp) {
            return   res.status(200).json({
                msg: 'Invalid OTP',
              
            });
        }else{
            return  res.status(200).json({
                msg: 'Otp is valid',
            });
        }

       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};


//resend otp 

const resendverify = async (req,res)=>{
    try {
        const {email} = req.body;
        const id = req.params.id;
        const userExist = await User.findOne({_id:id});
        console.log(userExist);
        if(!userExist){
            return res.status(400).json({message:"User not exist"});
        }

        if(userExist.loginotpcount != 4){
            const rand = Math.floor(100000 + Math.random() * 900000);
            const result = await User.updateOne({email},{
                $set:{
                    otp:rand,
                    loginotpcount: userExist.loginotpcount + 1,
                }
            },{
                new:true,
            });

            res.status(200).json({
                msg:"Otp Sent Successfully",
                userId:userExist._id.toString(),
            });
        }else{
            res.status(401).json({message:"Limit exceeded Try after Some time"});
        }
  
    } catch (error) {
     res.status(500).json(error);
    }
};

const  getcust = async(req, res) => {
    try {
        const response = await Customer.find();
        if(!response){
            res.status(404).json({msg:"No Data Found"});
            return;
        }
        res.status(200).json({msg:response});
    } catch (error) {
        console.log(`Customer ${error}`);
    }
};


const getcustbyid2 = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Customer.findById(id);

    if (!response) {
      return res.status(404).json({ success: false, msg: "No Data Found" });
    }

    res.status(200).json({
      success: true,
      data: response,   // 👈 matches frontend expectation
    });
  } catch (error) {
    console.log(`Customer ${error}`);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

const  getcustbyid = async(req, res) => {
    try {
        const id = req.params.id;
        const response = await await Customer.findOne({ _id: id });
        if(!response){
            res.status(404).json({msg:"No Data Found"});
            return;
        }
        res.status(200).json({msg:response});
    } catch (error) {
        console.log(`Customer ${error}`);
    }
};

const deletecust = async (req, res) => {
  try {
    const id = req.params.id;

    // 1️⃣ Delete the Customer
    const customer = await Customer.findOneAndDelete({ _id: id });
    if (!customer) {
      return res.status(404).json({ msg: "Customer not found" });
    }
  const deletedata = await Usertemplatefields.deleteMany(({user_id:id}));
    // 2️⃣ Delete all user templates related to this customer

    return res.status(200).json({ msg: "Customer and related templates deleted successfully" });
  } catch (error) {
    console.error("Delete customer error:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const statuscust = async (req,res)=>{
    try {
        
        const { status } = req.body;
        const id = req.params.id;
    
        const result = await Customer.updateOne({ _id:id },{
            $set:{
                status: status,
            }
        },{
            new:true,
        });
        res.status(201).json({
            msg:'Updated Successfully',
        });

    } catch (error) {
     res.status(500).json(error);
    }
};


const updateprofile = async (req,res)=>{
    try {
        console.log(req.body);
    
         const id = req.params.id;
        
        const updateData = req.body;
        const email = updateData.email;
        const userExist = await Customer.findOne({ email, _id: { $ne: id }});
        
        const saltRound = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, saltRound);
        if(userExist){
            return res.status(400).json({msg:"Email id already exist"});

        }

        if (req.file) {
            updateData.pic = req.file.filename; 
        }

        const updatedProfile = await Customer.findByIdAndUpdate(id, updateData, { new: true });

        res.status(201).json({
            msg:'Updated Successfully',
        });

    } catch (error) {
        console.error("Error in updateprofile:", error.message); // Log the error message
        res.status(500).json({ error: "Internal Server Error", details: error.message }); // Send the error message in the response
    }
};
const getdatabyid = async(req, res) => {
    try {
        const id = req.params.id;
        const response = await await Customer.findOne({ _id: id });
        if(!response){
            res.status(404).json({msg:"No Data Found"});
            return;
        }
        res.status(200).json({msg:response});
    } catch (error) {
        console.error("Error in updateprofile:", error.message); // Log the error message
        res.status(500).json({ error: "Internal Server Error", details: error.message }); // Send the error message in the response
    }
};



module.exports = { addcust , updatecust , getcust, getcustbyid,getcustbyid2, deletecust , statuscust,otpverify,setpin,  updateprofile,getdatabyid};

