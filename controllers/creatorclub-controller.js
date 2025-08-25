const { CreatorClub, Paynow ,CreatorClubTheme,CreateWebsite} = require("../models/creatorclub-model");

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

const register = async (req, res) => {
    try {

        console.log(req.body);
        const { username } = req.body;
       
        const usercount = await CreatorClub.countDocuments({ isUser: { $ne: 'true' } });
       
       
        let cust_id;

        if (usercount === 0) {
            cust_id = 'BRW-1';
        } else {
            cust_id = `BRW-${usercount + 1}`;
        }

            const userCreated =  await CreatorClub.create( { username} );

        if (!userCreated) {
            return res.status(500).json({ error: "User creation failed" });
        }

        // const token = await userCreated.generateToken2();
        // if (!token) {
        //     throw new Error("Token generation failed");
        // }

        // req.session.userId = userCreated._id.toString();
        res.status(201).json({
            msg: userCreated,
            // token: await userCreated.32(),
            userId: userCreated._id.toString(), // Use the correct variable
        });

    } catch (error) {
        console.error("Error in register:", error.message); // Log the error message
        res.status(500).json({ error: "Internal Server Error", details: error.message }); // Send the error message in the response
    }
};

const checkEmailExists = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await CreatorClub.findOne({ email });

        if (user) {
            return res.status(200).json({
                msg: "Email already exists",
                user: { username: user.username, phone: user.phone },
            });
        }

        // Return a 404 response, but do NOT include "error" in the response
        res.status(404).json({ msg: "Email not found" });

    } catch (error) {
        console.error("Error in checking email:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const registerupdate = async (req, res) => {
    try {
        console.log("Received body:", req.body); // ✅ Debugging log

        const { email, custid } = req.body;

        if (!custid) {
            return res.status(400).json({ msg: "Customer ID is missing." });
        }

        // Check if email exists in the database (excluding the current user)
        const userExist = await CreatorClub.findOne({ email, _id: { $ne: custid } });
        console.log("userExist User ID:", userExist);
        
        if (userExist) {

            const deleteResult = await CreatorClub.deleteMany({
                $or: [
                    { email: { $exists: false } }, // Email does not exist
                    { email: null },              // Email is explicitly null
                    { email: "" }                 // Email is an empty string
                ]
            });
            const existingUserId = userExist._id.toString(); // ✅ Get the _id of the existing user
            console.log("Existing User ID:", existingUserId);

            // Check if the user exists in the Payment table
            const paymentExist = await Paynow.findOne({ creatorclub_id: existingUserId });

            if (!paymentExist) {
                return res.status(400).json({
                    msg: "Email already in use. Redirecting to payment page.",
                    redirectTo: "/pay-now",
                    existingUserId
                });
            } else {

                return res.status(400).json({
                    msg: "Email already in use. Redirecting to Select theme.",
                    redirectTo2: "/select-theme",
                    existingUserId
                });

            }
        }


        
        // Update user email if no conflicts
        const updatedUser = await CreatorClub.findOneAndUpdate(
            { _id: custid },
            { $set: { email: email } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found." });
        }

        res.status(200).json({
            msg: "Updated Successfully",
            updatedUser
        });

    } catch (error) {
        console.error("Error in registerupdate:", error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

const registerupdatephone = async (req, res) => {
    try {
        console.log("Received body:", req.body); // ✅ Debugging log

        const { phone, custid } = req.body;
        const status= '1';    
        if (!custid) {
            return res.status(400).json({ msg: "Customer ID is missing." });
        }

        const updatedUser = await CreatorClub.findOneAndUpdate(
            { _id: custid },
            { $set: { phone: phone,status:status } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found." });
        }
        res.status(201).json({
            msg: 'Updated Successfully',
        });
       

    } catch (error) {
        console.error("Error in registerupdate:", error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};


const paynow = async (req, res) => {
    try {

        console.log(req.body);
        const { custid } = req.body;
        const status= '1';    
        const payment= '100';    
            const userCreated =  await Paynow.create( { creatorclub_id:custid,status,payment} );

        if (!userCreated) {
            return res.status(500).json({ error: "User creation failed" });
        }

       
        // req.session.userId = userCreated._id.toString();
        res.status(201).json({
            msg: userCreated,
            userId: userCreated._id.toString(), // Use the correct variable
        });

    } catch (error) {
        console.error("Error in register:", error.message); // Log the error message
        res.status(500).json({ error: "Internal Server Error", details: error.message }); // Send the error message in the response
    }
};
const checkSelectedThemes = async (req, res) => {
    try {
        const { custid } = req.body;
        console.log("Received Customer ID:", custid); // Debugging

        if (!custid) {
            return res.status(400).json({ msg: "Customer ID is missing." });
        }

        // Find **all** themes associated with the customer
        const userThemes = await CreatorClubTheme.find({ creatorclub_id: String(custid) });

        console.log("User Themes Found:", userThemes); // Debugging

        if (!userThemes || userThemes.length === 0) {
            console.log("No themes found for user.");
            return res.status(200).json({ selectedThemes: [] }); // Return empty if no themes are selected
        }

        // Extract just the themes from the results
        const selectedThemes = userThemes.map(themeObj => themeObj.theme);

        console.log("Returning themes:", selectedThemes); // Debugging
        res.status(200).json({ selectedThemes }); // Send themes as an array

    } catch (error) {
        console.error("Error checking selected themes:", error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};


const creatorclubselecttheme = async (req, res) => {
    try {
        console.log(req.body);

       
        const { custid ,selectedThemes,newdata } = req.body;
        
if(newdata=='new'){
     await CreatorClubTheme.deleteMany({ creatorclub_id: String(custid) });
    if (selectedThemes && Array.isArray(selectedThemes)) {
        const featureEntries = selectedThemes.map(feature => ({
            creatorclub_id: String(custid),  // Ensure it's a string
            theme: feature.theme,
            newdata:newdata
            
        }));
        await CreatorClubTheme.insertMany(featureEntries);  // Bulk insert
    }


}else{

       // Save multiple features with pricing
       if (selectedThemes && Array.isArray(selectedThemes)) {
        const featureEntries = selectedThemes.map(feature => ({
            creatorclub_id: String(custid),  // Ensure it's a string
            theme: feature.theme,
            newdata:newdata
            
        }));
        await CreatorClubTheme.insertMany(featureEntries);  // Bulk insert
    }

}
     


        res.status(201).json({
            msg: "Package created successfully",
          
        });

    } catch (error) {
        console.error("Error in addpackage:", error);
        res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};

const creatorclubCretewebsite = async (req, res) => {
    try {
        console.log(req.body);

        const { company,custid, industry,newdata, primary, secondary, overview, namelogo,email, phone, state, city,address } = req.body;
        const status = '1';
        const filePath = req.file ? req.file.path : null; // Save file path in DB

        const url = createCleanUrl(company || ""); // Fix potential undefined issue



        if(newdata=='new'){
            await CreateWebsite.findOneAndDelete({ creatorclub_id: custid });

        }
       

            const cmCreated = await CreateWebsite.create({ company,newdata, creatorclub_id:custid,industry,namelogo, primary, secondary, overview, email, phone, state, city,address, status, url,filePath });

        



        res.status(201).json({
            success: true,
            msg: "Webite created successfully",
            package: cmCreated,
            userId: cmCreated._id.toString(),
        });

    } catch (error) {
        console.error("Error in addpackage:", error);
        res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await CreateWebsite.findOne({ creatorclub_id: userId });

      if (!user) {
        return res.json({}); 
    }
  
      res.json(user); // Send user data as JSON response
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  


module.exports = { register ,checkEmailExists, registerupdate , registerupdatephone,paynow,creatorclubselecttheme,creatorclubCretewebsite,checkSelectedThemes,getUserById};

