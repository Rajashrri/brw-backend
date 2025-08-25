const {knowledgeCategory, knowledgebase  }= require("../models/knowledgebase-model");

function createCleanUrl(title) {
    // Convert the title to lowercase
    let cleanTitle = title.toLowerCase();
    // Remove special characters, replace spaces with dashes
    cleanTitle = cleanTitle.replace(/[^\w\s-]/g, '');
    cleanTitle = cleanTitle.replace(/\s+/g, '-');

    return cleanTitle;
}

const addcategory = async (req, res) => {
    try {
        console.log(req.body);
        const { name } = req.body;
        const status = '1';
        const url = createCleanUrl(req.body.name);
        const userExist = await knowledgeCategory.findOne({ name });

        if (userExist) {
            return res.status(400).json({ msg: "Category already exist" });

        }

        const cmCreated = await knowledgeCategory.create({ name, status, url });
        res.status(201).json({
            msg: cmCreated,
            userId: cmCreated._id.toString(),
        });

    } catch (error) {
        console.error("Error in addcategory:", error.message); // Log the error message
        res.status(500).json({ error: "Internal Server Error", details: error.message }); // Send the error message in the response
    }
};

const getdatacategory = async (req, res) => {
    try {
        const response = await knowledgeCategory.find();
        if (!response) {
            res.status(404).json({ msg: "No Data Found" });
            return;
        }


        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`FixedItem ${error}`);
    }
};


const getcategoryByid = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await knowledgeCategory.find({ _id: id });
        if (!response) {
            res.status(404).json({ msg: "No Data Found" });
            return;
        }
        res.status(200).json({ msg: response });
    } catch (error) {

        console.error("Error in getdata:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.msg });
    }
};
const updateCategory = async (req, res) => {
    try {
        console.log(req.body);
        const { name } = req.body;
        const url = createCleanUrl(req.body.name);
        const id = req.params.id;

        const userExist = await knowledgeCategory.findOne({ name, _id: { $ne: id } });

        if (userExist) {
            return res.status(400).json({ msg: "Category already exist" });

        }
        const result = await knowledgeCategory.updateOne({ _id: id }, {
            $set: {
                name: name,
                url: url,
              
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

const updateStatusCategory = async (req, res) => {
    try {

        const { status, id } = req.body;

        const result = await knowledgeCategory.updateOne({ _id: id }, {
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



const deletecategory = async (req, res) => {
    try {

        const id = req.params.id;
        const response = await knowledgeCategory.findOneAndDelete(({ _id: id }));


        if (!response) {
            res.status(404).json({ msg: "No Data Found" });
            return;
        }
        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`Category ${error}`);
    }
};


const categoryOptions = async (req, res) => {
    try {
        const item = await knowledgeCategory.find({ status: 1 });
        if (!item) {
            res.status(404).json({ msg: "No Data Found" });
            return;
        }

        res.status(200).json({
            msg: item,

        });
    } catch (error) {
        console.log(`Category ${error}`);
    }
};

const add = async(req, res) => {
    try {
        console.log(req.body);
        const { title, keywords, answer,category_id } = req.body;
        const status = '1';
        const url = createCleanUrl(req.body.title);
        const userExist = await knowledgebase.findOne({ title });

        if (userExist) {
            return res.status(400).json({ msg: "Knowlegde Base already exist" });

        }

        const cmCreated = await knowledgebase.create({ title, keywords, answer,category_id, status, url });
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
        const response = await knowledgebase.find();
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
        const response = await knowledgebase.find({ _id: id });
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
        console.log(req.body);
        const { title, keywords, answer,category_id } = req.body;
        const url = createCleanUrl(req.body.title);
        const id = req.params.id;

        const userExist = await knowledgebase.findOne({ title, _id: { $ne: id } });

        if (userExist) {
            return res.status(400).json({ msg: "Title already exist" });

        }
        const result = await knowledgebase.updateOne({ _id: id }, {
            $set: {
                title: title,
                keywords: keywords,
                answer: answer,
                category_id: category_id,
                url: url,           
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
}

const deletedata = async(req,res) => {
    try {

        const id = req.params.id;
        const response = await knowledgebase.findOneAndDelete(({ _id: id }));


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
        const result = await knowledgebase.updateOne({ _id: id }, {
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

module.exports = { addcategory,getdatacategory,getcategoryByid,updateCategory,updateStatusCategory, deletecategory, categoryOptions, add, listdata, getdatabyid,edit, deletedata, updateStatus };