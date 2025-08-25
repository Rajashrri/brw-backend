const  comingsoon = require("../models/comingsoon-model");

function createCleanUrl(title) {
    // Convert the title to lowercase
    let cleanTitle = title.toLowerCase();
    // Remove special characters, replace spaces with dashes
    cleanTitle = cleanTitle.replace(/[^\w\s-]/g, '');
    cleanTitle = cleanTitle.replace(/\s+/g, '-');

    return cleanTitle;
}

const add = async(req, res) => {
    try {
        console.log("Received Files:", req.file);
        
        const { pagename,title,subtitle,date,email,contact,location} = req.body;
        const bgimage=req.files?.['bgimage']?.[0]?.filename || null;
        const logo= req.files?.['logo']?.[0]?.filename || null;
        const status = '1';
        const url = createCleanUrl(req.body.pagename);
        const userExist = await comingsoon.findOne({ pagename });

        if (userExist) {
            return res.status(400).json({ msg: "Page Name  already exist" });

        }

        const cmCreated = await comingsoon.create({ pagename,title,subtitle,date,email,contact,location, bgimage ,logo, url,status });
        res.status(201).json({
            msg: cmCreated,
            userId: cmCreated._id.toString(),
        });

    } catch (error) {
        console.error("Error in add:", error.message); 
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}

const listdata = async(req, res)=> {
    try {
        const response = await comingsoon.find();
        if (!response) {
            res.status(404).json({ msg: "No Data Found" });
            return;
        }


        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`FixedItem ${error}`);
    }
}

const getdatabyid = async(req,res) => {
    const id = req.params.id;
    try {
        const response = await comingsoon.find({ _id: id });
        if (!response) {
            res.status(404).json({ msg: "No Data Found" });
            return;
        }
        res.status(200).json({ msg: response });
    } catch (error) {

        console.error("Error in getdatabyid:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.msg });
    }
}
const edit = async(req,res) =>{
    try {
        const { pagename,title,subtitle,date,email,contact,location} = req.body;
        const updateData = req.body;
        if(req.files['bgimage']){
            updateData.bgimage =req.files['bgimage'][0].filename;
         }
        if(req.files['logo']){
        updateData.logo = req.files['logo'][0].filename;
        }

       
        const id = req.params.id;
        const url = createCleanUrl(updateData.pagename);
        updateData.url = url;
        const userExist = await comingsoon.findOne({ title, _id: { $ne: id }});
        
        // if(userExist){
        //     return res.status(400).json({msg:"Page Name already exist"});

        // }

        const result = await comingsoon.findByIdAndUpdate(id, updateData, { new: true });
        res.status(201).json({
            msg:'Updated Successfully',
        });

    } catch (error) {
        console.error("Error in update comingsoon:", error.message); // Log the error message
        res.status(500).json({ error: "Internal Server Error", details: error.message }); // Send the error message in the response
    }
}

const deletedata = async(req,res) => {
    try {

        const id = req.params.id;
        const response = await comingsoon.findOneAndDelete(({ _id: id }));


        if (!response) {
            res.status(404).json({ msg: "No Data Found" });
            return;
        }
        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`Category ${error}`);
    }
}

const updateStatus = async (req, res) => {
    try {
        const { status, id } = req.body;
        const result = await comingsoon.updateOne({ _id: id }, {
            $set: {
                status: status,
            }
        }, {
            new: true,
        });
        res.status(201).json({
            msg: 'Updated Successfully',
        });

    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {add, listdata, getdatabyid,edit, deletedata, updateStatus };