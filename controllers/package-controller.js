const { Category,FixedItem, Addons, Package, PackageItem } = require("../models/package-model");

function createCleanUrl(title) {
    // Convert the title to lowercase
    let cleanTitle = title.toLowerCase();
    // Remove special characters, replace spaces with dashes
    cleanTitle = cleanTitle.replace(/[^\w\s-]/g, '');
    cleanTitle = cleanTitle.replace(/\s+/g, '-');

    return cleanTitle;
}


// -----------Category Features------------------
//add fixed item
const addcategory = async (req, res) => {
    try {
        console.log(req.body);
        const { name } = req.body;
        const status = '1';
        const url = createCleanUrl(req.body.name);
        const userExist = await Category.findOne({ name });

        if (userExist) {
            return res.status(400).json({ msg: "Category already exist" });

        }

        const cmCreated = await Category.create({ name, status, url });
        res.status(201).json({
            msg: cmCreated,
            userId: cmCreated._id.toString(),
        });

    } catch (error) {
        res.status(500).json(error);
    }
};
const getdatacategory = async (req, res) => {
    try {
        const response = await Category.find();
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
        const response = await Category.find({ _id: id });
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

        const userExist = await Category.findOne({ name, _id: { $ne: id } });

        if (userExist) {
            return res.status(400).json({ msg: "Category already exist" });

        }
        const result = await Category.updateOne({ _id: id }, {
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

        const result = await Category.updateOne({ _id: id }, {
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
        const response = await Category.findOneAndDelete(({ _id: id }));


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
        const item = await Category.find({ status: 1 });
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
// -----------Fixed item master------------------
//add fixed item

const getCategoryOptionsTable = async (req, res) => {
    try {
      const categories = await Category.find({}, "_id name"); // Fetch only ID & name
  
      res.status(200).json({
        success: true,
        msg: categories, // Return category data
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({
        success: false,
        msg: "Internal Server Error",
      });
    }
  };
const additem = async (req, res) => {
    try {
        console.log(req.body);
        const { name, details, actualinr,category, membersinr, brcoinsinr, actualusd, membersusd, brcoinsusd } = req.body;
        const status = '1';
        const url = createCleanUrl(req.body.name);
        const userExist = await FixedItem.findOne({ name });

        if (userExist) {
            return res.status(400).json({ msg: "Fixed Item name already exist" });

        }

        const cmCreated = await FixedItem.create({ name, details, actualinr, category,membersinr, brcoinsinr, actualusd, membersusd, brcoinsusd, status, url });
        res.status(201).json({
            msg: cmCreated,
            userId: cmCreated._id.toString(),
        });

    } catch (error) {
        res.status(500).json(error);
    }
};

//update status

const updateStatus = async (req, res) => {
    try {

        const { status, id } = req.body;

        const result = await FixedItem.updateOne({ _id: id }, {
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

//update

const updateItem = async (req, res) => {
    try {
        console.log(req.body);
        const { name, details, actualinr,category, membersinr, brcoinsinr, actualusd, membersusd, brcoinsusd } = req.body;
        const url = createCleanUrl(req.body.name);
        const id = req.params.id;

        const userExist = await FixedItem.findOne({ name, _id: { $ne: id } });

        if (userExist) {
            return res.status(400).json({ msg: "Fixed Item name already exist" });

        }
        const result = await FixedItem.updateOne({ _id: id }, {
            $set: {
                name: name,
                category:category,
                url: url,
                details: details,
                actualinr: actualinr,
                membersinr: membersinr,
                brcoinsinr: brcoinsinr,
                actualusd: actualusd,
                membersusd: membersusd,
                brcoinsusd: brcoinsusd,
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

//get table data

const getdata = async (req, res) => {
    try {
        const response = await FixedItem.find();
        if (!response) {
            res.status(404).json({ msg: "No Data Found" });
            return;
        }


        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`FixedItem ${error}`);
    }
};


//delete

const deleteitem = async (req, res) => {
    try {

        const id = req.params.id;
        const response = await FixedItem.findOneAndDelete(({ _id: id }));

        const response1 = await PackageItem.deleteMany({ itemid: id });

        if (!response) {
            res.status(404).json({ msg: "No Data Found" });
            return;
        }
        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`FixedItem ${error}`);
    }
};


//for edit

const getitemByid = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await FixedItem.find({ _id: id });
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


//----------- addons ----------- ---------------

//add

const addaddons = async (req, res) => {
    try {
        console.log(req.body);
        const { name, details, quantity, template, actualinr, membersinr, brcoinsinr, actualusd, membersusd, brcoinsusd } = req.body;
        const status = '1';
        const url = createCleanUrl(req.body.name);
        const userExist = await Addons.findOne({ name });

        if (userExist) {
            return res.status(400).json({ msg: "Fixed Item name already exist" });

        }

        const cmCreated = await Addons.create({ name, details, quantity, template, actualinr, membersinr, brcoinsinr, actualusd, membersusd, brcoinsusd, status, url });
        res.status(201).json({
            msg: cmCreated,
            userId: cmCreated._id.toString(),
        });

    } catch (error) {
        res.status(500).json(error);
    }
};
//get table data

const getdataaddons = async (req, res) => {
    try {
        const response = await Addons.find();
        if (!response) {
            res.status(404).json({ msg: "No Data Found" });
            return;
        }


        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`Addons ${error}`);
    }
};

//for edit

const getaaddonsByid = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await Addons.find({ _id: id });
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

//update

const updateAddons = async (req, res) => {
    try {
        console.log(req.body);
        const { name, details, quantity, template, actualinr, membersinr, brcoinsinr, actualusd, membersusd, brcoinsusd } = req.body;
        const url = createCleanUrl(req.body.name);
        const id = req.params.id;

        const userExist = await Addons.findOne({ name, _id: { $ne: id } });

        if (userExist) {
            return res.status(400).json({ msg: "Fixed Item name already exist" });

        }
        const result = await Addons.updateOne({ _id: id }, {
            $set: {
                name: name,
                url: url,

                quantity: quantity,
                template: template,

                details: details,
                actualinr: actualinr,
                membersinr: membersinr,
                brcoinsinr: brcoinsinr,
                actualusd: actualusd,
                membersusd: membersusd,
                brcoinsusd: brcoinsusd,
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

//delete

const deleteaddons = async (req, res) => {
    try {

        const id = req.params.id;
        const response = await Addons.findOneAndDelete(({ _id: id }));
        if (!response) {
            res.status(404).json({ msg: "No Data Found" });
            return;
        }
        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`Addons ${error}`);
    }
};

//for status

const updateStatusAddons = async (req, res) => {
    try {

        const { status, id } = req.body;

        const result = await Addons.updateOne({ _id: id }, {
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


//---------------------- package ---------------------------------

//get fixed item dropdown'

const getdataByidcat = async (req, res) => {
    try {
        const item = await FixedItem.find({ status: 1 });
        if (!item) {
            res.status(404).json({ msg: "No Data Found" });
            return;
        }


        res.status(200).json({
            msg: item,

        });
    } catch (error) {
        console.log(`FixedItem ${error}`);
    }
};

const multer = require("multer");
const upload = multer();
//Add package

const addpackage = async (req, res) => {
    try {
        console.log(req.body);

        const { name, task, actualinr, membersinr,description, brcoinsinr, actualusd, membersusd, brcoinsusd, featureDetails } = req.body;
        const status = '1';
        const features = Array.isArray(req.body.features) ? req.body.features.join(",") : ""; // Fix potential undefined issue

        const url = createCleanUrl(name || ""); // Fix potential undefined issue

        const userExist = await Package.findOne({ name });
        if (userExist) {
            return res.status(400).json({ msg: "Fixed Item name already exists" });
        }

        const cmCreated = await Package.create({ name, features, task, actualinr,description, membersinr, brcoinsinr, actualusd, membersusd, brcoinsusd, status, url });

        // Save multiple features with pricing
        if (featureDetails && Array.isArray(featureDetails)) {
            const featureEntries = featureDetails.map(feature => ({
                packageid: cmCreated._id,
                itemid: feature.id,
                itemname: feature.itemname,
                actualinrpackage: feature.actualinr,
                membersinrpackage: feature.membersinr,
                brcoinsinrpackage: feature.brcoinsinr,
                actualusdpackage: feature.actualusd,
                membersusdpackage: feature.membersusd,
                brcoinsusdpackage: feature.brcoinsusd,
            }));
            await PackageItem.insertMany(featureEntries);  // Bulk insert
        }
        res.status(201).json({
            msg: "Package created successfully",
            package: cmCreated,
            userId: cmCreated._id.toString(),
        });

    } catch (error) {
        console.error("Error in addpackage:", error);
        res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};

// const addpackage = async (req, res) => {
//     try {
//         console.log(req.body);
//         const { name, task, actualinr, membersinr, brcoinsinr, actualusd, membersusd, brcoinsusd } = req.body;
//         const status = '1';
//         const features = req.body.features ? (req.body.features).join(",") : "";
//         const url = createCleanUrl(name);

//         const userExist = await Package.findOne({ name });
//         if (userExist) {
//             return res.status(400).json({ msg: "Fixed Item name already exists" });
//         }

//         // Create package
//         const cmCreated = await Package.create({
//             name, features, task, actualinr, membersinr, brcoinsinr, actualusd, membersusd, brcoinsusd, status, url
//         });

//         // Save associated features
//         // if (req.body.features && Array.isArray(req.body.features)) {
//         //     console.log("Saving features: ", req.body.features);

//         //     for (const feature of req.body.features) {
//         //         const newFeature = new PackageItem({
//         //             packageid: cmCreated._id.toString(),
//         //             itemid: feature.itemid,  // Feature ID
//         //             actualinrpackage: feature.actualinrpackage,  // INR Price
//         //             actualusdpackage: feature.actualusdpackage,  // USD Price
//         //         });

//         //         await newFeature.save();
//         //     }
//         // }

//         res.status(201).json({
//             msg: "Package created successfully",
//             userId: cmCreated._id.toString(),
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ msg: "Internal Server Error", error });
//     }
// };



// for edit 

const getpackageByid = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await Package.find({ _id: id });
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

//for table package

const getdatpackage = async (req, res) => {
    try {
        const response = await Package.find();
        if (!response) {
            res.status(404).json({ msg: "No Data Found" });
            return;
        }


        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`Package ${error}`);
    }
};

// update package

const editpackage = async (req, res) => {
    try {
        console.log("Received Update Request for ID:", req.params.id);
        console.log("Request Body:", req.body); // Debugging

        const { name, task, actualinr, membersinr, brcoinsinr,description, actualusd, membersusd, brcoinsusd, featureData, featureData2 } = req.body;
        const id = req.params.id;

        // Validate ID
        if (!id) {
            return res.status(400).json({ msg: "Invalid Package ID" });
        }

        // Ensure `features` is always an array
        let features = req.body.features;
        if (!Array.isArray(features)) {
            console.warn("Invalid features format. Setting empty array.");
            features = [];
        }

        // Check if package exists before updating
        const existingPackage = await Package.findById(id);
        if (!existingPackage) {
            return res.status(404).json({ msg: "Package not found" });
        }

        // Check if another package already has the same name
        const userExist = await Package.findOne({ name, _id: { $ne: id } });
        if (userExist) {
            return res.status(400).json({ msg: "Package name already exists" });
        }

        // Perform update
        const result = await Package.findByIdAndUpdate(
            id,
            {
                $set: {
                    name: name,
                    task: task,
                    features: features.join(","), // Convert array to comma-separated string
                    actualinr: actualinr,
                    membersinr: membersinr,
                    brcoinsinr: brcoinsinr,
                    actualusd: actualusd,
                    membersusd: membersusd,
                    brcoinsusd: brcoinsusd,
                    description:description,
                },
            },
            { new: true, runValidators: true }
        );


        const response = await PackageItem.deleteMany({ packageid: id });

        if (featureData && Array.isArray(featureData)) {
            const featureEntries = featureData.map(feature => ({
                packageid: id,
                itemid: feature.itemid,
                itemname: feature.itemname,
                actualinrpackage: feature.actualinrpackage,
                membersinrpackage: feature.membersinrpackage,
                brcoinsinrpackage: feature.brcoinsinrpackage,
                actualusdpackage: feature.actualusdpackage,
                membersusdpackage: feature.membersusdpackage,
                brcoinsusdpackage: feature.brcoinsusdpackage,
            }));
            await PackageItem.insertMany(featureEntries);  // Bulk insert
        }
        if (featureData2 && Array.isArray(featureData2)) {
            const featureEntries2 = featureData2.map(feature3 => ({
                packageid: id,
                itemid: feature3.itemid,
                itemname: feature3.itemname,
                actualinrpackage: feature3.actualinrpackage,
                membersinrpackage: feature3.membersinrpackage,
                brcoinsinrpackage: feature3.brcoinsinrpackage,
                actualusdpackage: feature3.actualusdpackage,
                membersusdpackage: feature3.membersusdpackage,
                brcoinsusdpackage: feature3.brcoinsusdpackage,
            }));
            await PackageItem.insertMany(featureEntries2);  // Bulk insert
        }
        if (!result) {
            return res.status(500).json({ msg: "Failed to update package" });
        }

        res.status(200).json({ msg: "Updated Successfully", package: result });

    } catch (error) {
        console.error("Error in editpackage:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

//get items for package

const getItempackges = async (req, res) => {

    const id = req.params.id;

    try {

        const response = await PackageItem.find({ packageid: id });

        if (!response) {
            res.status(404).json({ msg: "No Data Found" });
            return;
        }


        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`Package ${error}`);
    }
};

const additemForpackagee = async (req, res) => {
    try {
        console.log(req.body);
        const { actualinr, membersinr, brcoinsinr, actualusd, membersusd, brcoinsusd, itemid } = req.body;


        const cmCreated = await additemForpackagee.create({ actualinr, membersinr, brcoinsinr, actualusd, membersusd, brcoinsusd, itemid });
        res.status(201).json({
            msg: cmCreated,
            userId: cmCreated._id.toString(),
        });

    } catch (error) {
        res.status(500).json(error);
    }
};
// items for dropdown

const getdataOptionsedit = async (req, res) => {
    try {

        const { itemIds } = req.body;

        const item = await FixedItem.find({ _id: { $nin: itemIds } });

        if (!item) {
            res.status(404).json({ msg: "No Data Found" });
            return;
        }


        res.status(200).json({
            msg: item,

        });
    } catch (error) {
        console.log(`FixedItem ${error}`);
    }
};

//delete package

const deletepackage = async (req, res) => {
    try {

        const id = req.params.id;
        const response = await Package.findOneAndDelete(({ _id: id }));
        const response1 = await PackageItem.deleteMany({ packageid: id });

        if (!response) {
            res.status(404).json({ msg: "No Data Found" });
            return;
        }
        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`Package ${error}`);
    }

}

//for status

const updateStatusPackage = async (req, res) => {
    try {

        const { status, id } = req.body;

        const result = await Package.updateOne({ _id: id }, {
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

const frontlistpackage = async (req, res) =>{
    const response = await Package.find({ status: 1 });
    if (!response || response.length === 0) {
        return res.status(404).json({ msg: "No Data Found" });
    }
    
    // Use Promise.all to fetch features asynchronously
    const formattedPackages = await Promise.all(response.map(async (pkg) => {
        const packageItems = await PackageItem.find({ packageid: pkg._id });
    
        return {
            title: pkg.name,
            description: 'Best for organizations or personalities looking for a dynamic presence', 
            price: pkg.actualinr,
            features: packageItems.map(item => item.itemname || "Unknown Feature") 
        };
    }));
    
    res.json({ ok: true, msg: formattedPackages });
}

const frontlistfeaturewithcat = async (req,res) =>{
    // const response = await Package.find({ status: 1 });
    // if (!response || response.length === 0) {
    //     return res.status(404).json({ msg: "No Data Found" });
    // }
    // // const cat = await Category.find({ status: 1 });
    // // const formattedPackages = await Promise.all(cat.map(async (pkg) => {
    // //     const packageItems = await FixedItem.find({ category: pkg._id });
    // //     return {
    // //         packages:response,
    // //         category: pkg.name,
    // //         price: pkg.actualinr,
    // //         features: packageItems, 
    // //     };
    // // }));
    // const cat = await Category.find({ status: 1 });
    // const formattedPackages = await Promise.all(cat.map(async (pkg) => {
    //     const packageItems = await FixedItem.find({ category: pkg._id });
    //     return {
    //         category: pkg.name,
    //         price: pkg.actualinr,
    //         features: packageItems, 
    //     };
    // }));
    
    // res.json({ ok: true, msg: formattedPackages });


    const categories = await Category.find({ status: 1 });

    const formattedData = await Promise.all(categories.map(async (cat) => {
        // Get all packages for this category
        const packages = await Package.find({ status: 1 });

        // For each package, get its features
        const formattedPackages = await Promise.all(packages.map(async (pkg) => {
            const packageItems = await FixedItem.find({ category: cat._id });

            return {
                id: pkg._id,
                title: pkg.name,
                description: 'Best for organizations or personalities looking for a dynamic presence',
                price: pkg.actualinr,
                features: packageItems.map(item => item.name || "Unknown Feature")
            };
        }));

        return {
            category: cat.name,
            packages: formattedPackages
        };
    }));

    res.json({ ok: true, msg: formattedData });
}
module.exports = { frontlistfeaturewithcat, frontlistpackage, addcategory,getdatacategory,getcategoryByid,updateCategory,getCategoryOptionsTable,deletecategory,categoryOptions,updateStatusCategory,additem, updateStatus, updateItem, getdata, getitemByid, deleteitem, addaddons, getdataaddons, updateStatusAddons, getdataOptionsedit, getaaddonsByid, deleteaddons, updateAddons, getdataByidcat, addpackage, getItempackges, editpackage, getdatpackage, getpackageByid, deletepackage, additemForpackagee, updateStatusPackage };