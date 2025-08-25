const {Custom, Theme, Contact} = require("../models/custom-model");
const fs = require("fs");
const path = require("path");

function createCleanUrl(title) {
    // Convert the title to lowercase
    let cleanTitle = title.toLowerCase();
    // Remove special characters, replace spaces with dashes
    cleanTitle = cleanTitle.replace(/[^\w\s-]/g, '');
    cleanTitle = cleanTitle.replace(/\s+/g, '-');
  
    return cleanTitle;
  }

const  getlist= async(req, res) => {
    try {
        const response = await Custom.find();
        if(!response){
            res.status(404).json({msg:"No Data Found"});
            return;
        }
        res.status(200).json({msg:response});
    } catch (error) {
        console.log(`Product ${error}`);
    }
};

const addcustom = async(req,res)=> {
    try {
        const { title, category,details } = req.body;
        const css=req.files?.['css']?.[0]?.filename || null;
        const js= req.files?.['js']?.[0]?.filename || null;
        const status= '1';
        const url = createCleanUrl(req.body.title);
        const userExist = await Custom.findOne({ title });
        
        if(userExist){
            return res.status(400).json({msg:"Product already exist"});
        }

        const cmCreated =  await Custom.create( { title,url, status, category, js,css,details });
        res.status(201).json({
            msg:'Created Successfully',
        });

    } catch (error) {
        console.error("Error in addcust:", error.message); // Log the error message
        res.status(500).json({ error: "Internal Server Error", details: error.message }); // Send the error message in the response
    }
};

const  getdatabyid = async(req, res) => {
    const id = req.params.id;
    try {
        const response = await Custom.find({_id:id});
        if(!response){
            res.status(404).json({msg:"No Data Found"});
            return;
        }
        res.status(200).json({msg:response});
    } catch (error) {
        console.log(`Custom data ${error}`);
    }
};

const  deletecustom = async(req, res) => {
    try {

        const id = req.params.id;
        const response = await Custom.findOneAndDelete(({_id:id}));
        if(!response){
            res.status(404).json({msg:"No Data Found"});
            return;
        }
        res.status(200).json({msg:response});
    } catch (error) {
        console.log(`Custom ${error}`);
    }
};

const updatecustom = async(req, res)=>{
    try {
        const { title, category, details} = req.body;
        const updateData = req.body;
         if(req.files['css']){
            updateData.css =req.files['css'][0].filename;
         }
         if(req.files['js']){
            updateData.js = req.files['js'][0].filename;
         }
        
         
        const id = req.params.id;
        const url = createCleanUrl(updateData.title);
        updateData.url = url;
        const userExist = await Custom.findOne({ title, _id: { $ne: id }});
        
        if(userExist){
            return res.status(400).json({msg:"Custom already exist"});

        }

        const result = await Custom.findByIdAndUpdate(id, updateData, { new: true });
        res.status(201).json({
            msg:'Updated Successfully',
        });

    } catch (error) {
        console.error("Error in updateCustom:", error.message); // Log the error message
        res.status(500).json({ error: "Internal Server Error", details: error.message }); // Send the error message in the response
    }
}

const statuscustom = async(req, res)=>{
    try {
        
        const { status } = req.body;
        const id = req.params.id;
    
        const result = await Custom.updateOne({ _id:id },{
            $set:{
                status: status,
            }
        },{
            new:true,
        });
        res.status(201).json({
            msg:'Status Updated Successfully',
        });

    } catch (error) {
     res.status(500).json(error);
    }
}


//for theme 
const  getdropdowndata= async(req, res) => {
    try {
        const header = await Custom.find({ category: 'Header' }) || [];
        const slider = await Custom.find({ category: 'Slider' }) || [];
        const usps = await Custom.find({ category: 'USPs' }) || [];
        const about = await Custom.find({ category: 'About' }) || [];
        const proser = await Custom.find({ category: 'Products/Services' }) || [];
        const testimonials = await Custom.find({ category: 'Testimonials or Post Reviews Options' }) || [];
        const gallery = await Custom.find({ category: 'Gallery' }) || [];
        const contact = await Custom.find({ category: 'Contact' }) || [];
        const footer = await Custom.find({ category: 'Footer' }) || [];
        res.status(200).json({
            header:header,
            slider:slider,
            usps:usps,
            about:about,
            proser:proser,
            testimonials:testimonials,
            gallery:gallery,
            contact:contact,
            footer:footer,
        });

    } catch (error) {
        console.log(`gettheme ${error}`);
    }

};
const  getlisttheme= async(req, res) => {
    try {
        const response = await Theme.find();
        if(!response){
            res.status(404).json({msg:"No Data Found"});
            return;
        }
        res.status(200).json({msg:response});
    } catch (error) {
        console.log(`Product ${error}`);
    }

};

const  addtheme = async(req, res) => {
    try {
 
        const { title, header,slider,usps,about,proser,testimonials,gallery,contact,footer } = req.body;
        if (!title || title.trim() === "") {
            return res.status(400).json({ error: "Title is required" });
        }
        const status= '1';
       
        const userExist = await Theme.findOne({ title });
        
        if(userExist){
            return res.status(400).json({msg:"Theme already exist"});
        }

        const cmCreated =  await Theme.create( {  title, header,slider,usps,about,proser,testimonials,gallery,contact,footer, status });
        res.status(201).json({
            msg:'Theme Created Successfully',
        });

    } catch (error) {
        console.error("Error in addtheme:", error.message); // Log the error message
        res.status(500).json({ error: "Internal Server Error", details: error.message }); // Send the error message in the response
    }

};

const  getthemedatabyid = async(req, res) => {
    const id = req.params.id;
    try {
        const response = await Theme.find({_id:id});
        if(!response){
            res.status(404).json({msg:"No Data Found"});
            return;
        }
        res.status(200).json({msg:response});
    } catch (error) {
        console.log(`Custom data ${error}`);
    }
};

const updatetheme = async(req, res) => {    
    try {
        const { title, header,slider,usps,about,proser,testimonials,gallery,contact,footer } = req.body;
        const updateData = req.body;

        const id = req.params.id;
        const userExist = await Theme.findOne({ title, _id: { $ne: id }});
        
        if(userExist){
            return res.status(400).json({msg:"Custom already exist"});

        }

        const result = await Theme.findByIdAndUpdate(id, updateData, { new: true });
        res.status(201).json({
            msg:'Theme Updated Successfully',
        });

    } catch (error) {
        console.error("Error in updatetheme:", error.message); // Log the error message
        res.status(500).json({ error: "Internal Server Error", details: error.message }); // Send the error message in the response
    }
}

const statustheme = async(req, res)=>{
    try {
        
        const { status } = req.body;
        const id = req.params.id;
    
        const result = await Theme.updateOne({ _id:id },{
            $set:{
                status: status,
            }
        },{
            new:true,
        });
        res.status(201).json({
            msg:'Status Updated Successfully',
        });

    } catch (error) {
     res.status(500).json(error);
    }
}

const  deletetheme = async(req, res) => {
    try {

        const id = req.params.id;
        const response = await Theme.findOneAndDelete(({_id:id}));
        if(!response){
            res.status(404).json({msg:"No Data Found"});
            return;
        }
        res.status(200).json({msg:response});
    } catch (error) {
        console.log(`Custom ${error}`);
    }
};


// const gettemplatedata= async(req,res) =>{
//     const id = req.params.id;
//     try {
//         const response = await Theme.find({_id:id});
//         if(!response){
//             res.status(404).json({msg:"No Theme Found"});
//             return;
//         }

//         const header = await Custom.find({ _id: response.header  }) || [];
//         const slider = await Custom.find({ _id: response.slider}) || [];
//         const usps = await Custom.find({ _id: response.usps }) || [];
//         const about = await Custom.find({ _id: response.about  }) || [];
//         const proser = await Custom.find({ _id: response.proser }) || [];
//         const testimonials = await Custom.find({ _id: response.testimonials }) || [];
//         const gallery = await Custom.find({ _id: response.gallery }) || [];
//         const contact = await Custom.find({ _id: response.contact }) || [];
//         const footer = await Custom.find({ _id: response.footer }) || []; 

//        res.status(200).json({
//             header:header,
//             slider:slider,
//             usps:usps,
//             about:about,
//             proser:proser,
//             testimonials:testimonials,
//             gallery:gallery,
//             contact:contact,
//             footer:footer,
//         });
//     } catch (error) {
//         console.log(`Custom data ${error}`);
//     }
// }

const mongoose = require("mongoose");

const gettemplatedata = async (req, res) => {
    const id = req.params.id;

    try {
        // Validate the main ID
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     return res.status(400).json({ msg: "Invalid Theme ID" });
        // }

        const response = await Theme.findOne({ title: id });
        if (!response) {
            return res.status(404).json({ msg: "No Theme Found" });
        }

        // Helper function to safely query by ID
        const fetchCustomData = async (field) => {
            if (field && mongoose.Types.ObjectId.isValid(field)) {
                return await Custom.findOne({ _id: field });
            }
            return null;
        };

        // Fetch related data
        const header = await fetchCustomData(response.header);
        const slider = await fetchCustomData(response.slider);
        const usps = await fetchCustomData(response.usps);
        const about = await fetchCustomData(response.about);
        const proser = await fetchCustomData(response.proser);
        const testimonials = await fetchCustomData(response.testimonials);
        const gallery = await fetchCustomData(response.gallery);
        const contact = await fetchCustomData(response.contact);
        const footer = await fetchCustomData(response.footer);

        res.status(200).json({
            header: header || null,
            slider: slider || null,
            usps: usps || null,
            about: about || null,
            proser: proser || null,
            testimonials: testimonials || null,
            gallery: gallery || null,
            contact: contact || null,
            footer: footer || null,
        });

        const header1 = header.details;
        const headerPath = path.join(__dirname, "../../brw-theme/src/layout/Header/Header.jsx");
        fs.writeFile(headerPath, header1, "utf8", (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                    return res.status(500).json({ message: "Error writing file", error: err });
                }
                // res.status(200).json({ message: "File saved successfully!", filePath });
            });

        const slider1 = slider.details;
        const sliderPath = path.join(__dirname, "../../brw-theme/src/components/Hero/Hero.jsx");
        fs.writeFile(sliderPath, slider1, "utf8", (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                    return res.status(500).json({ message: "Error writing file", error: err });
                }
                // res.status(200).json({ message: "File saved successfully!", filePath });
            }); 

        const usps1 = usps.details; 
        const uspsPath = path.join(__dirname, "../../brw-theme/src/components/USPS/USPS.jsx"); 
        fs.writeFile(uspsPath, usps1, "utf8", (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                    return res.status(500).json({ message: "Error writing file", error: err });
                }
                // res.status(200).json({ message: "File saved successfully!", filePath });
            });    

        const about1 = about.details; 
        const aboutPath = path.join(__dirname, "../../brw-theme/src/components/About/About.jsx");  
        fs.writeFile(aboutPath, about1, "utf8", (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                    return res.status(500).json({ message: "Error writing file", error: err });
                }
                // res.status(200).json({ message: "File saved successfully!", filePath });
            });

        const proser1 = proser.details; 
        const proserPath = path.join(__dirname, "../../brw-theme/src/components/Products/Products.jsx");
        fs.writeFile(proserPath, proser1, "utf8", (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                    return res.status(500).json({ message: "Error writing file", error: err });
                }
                // res.status(200).json({ message: "File saved successfully!", filePath });
            });

        const testimonials1 = testimonials.details;
        const testimonialsPath = path.join(__dirname, "../../brw-theme/src/components/Testimonials/Testimonials.jsx"); 
        fs.writeFile(testimonialsPath, testimonials1, "utf8", (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                    return res.status(500).json({ message: "Error writing file", error: err });
                }
                // res.status(200).json({ message: "File saved successfully!", filePath });
            });

        const gallery1 = gallery.details; 
        const galleryPath = path.join(__dirname, "../../brw-theme/src/components/Gallery/Gallery.jsx"); 
        fs.writeFile(galleryPath, gallery1, "utf8", (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                    return res.status(500).json({ message: "Error writing file", error: err });
                }
                // res.status(200).json({ message: "File saved successfully!", filePath });
            });

        const contact1 = contact.details; 
        const contactPath = path.join(__dirname, "../../brw-theme/src/components/Contact/Contact.jsx");
        fs.writeFile(contactPath, contact1, "utf8", (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                    return res.status(500).json({ message: "Error writing file", error: err });
                }
                // res.status(200).json({ message: "File saved successfully!", filePath });
            });
           
        const footer1 = footer.details; 
        const footerPath = path.join(__dirname, "../../brw-theme/src/layout/Footer/Footer.jsx");
        fs.writeFile(footerPath, footer1, "utf8", (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                    return res.status(500).json({ message: "Error writing file", error: err });
                }
                // res.status(200).json({ message: "File saved successfully!", filePath });
            });  

        // const filePath = path.join(__dirname, "../client/src/savedFiles/generatedPage.html");

        // fs.writeFile(filePath, codeContent, "utf8", (err) => {
        //     if (err) {
        //         console.error("Error writing file:", err);
        //         return res.status(500).json({ message: "Error writing file", error: err });
        //     }
            // res.status(200).json({ message: "File saved successfully!", filePath });
        // });

    } catch (error) {
        console.error("Error in gettemplatedata:", error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

const contactform = async(req, res)=>{
    try {
        
        const { name, email, subject,message } = req.body;
        const themename = req.params.id;
     
        const cmCreated =  await Contact.create( { name, email, subject,message, themename });
        res.status(201).json({
            msg:'Contact Form Submitted Successfully',
        });

    } catch (error) {
     res.status(500).json(error);
    }
}


module.exports = { getlist, addcustom , getdatabyid, deletecustom, updatecustom, statuscustom ,getdropdowndata, getlisttheme, addtheme, getthemedatabyid, updatetheme, statustheme ,deletetheme, gettemplatedata, contactform};