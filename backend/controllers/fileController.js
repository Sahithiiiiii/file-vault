const File = require("../models/File");
const path = require("path");
const fs = require("fs").promises;
const crypto=require("crypto");
const Share=require("../models/Share");
async function getAllFiles(req, res) {
    try {
        const files = await File.find({ user: req.user.id });

        res.status(200).json(files);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to fetch files"
        });
    }
}

async function uploadFile(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const newFile = await File.create({
            originalName: req.file.originalname,
            storedName: req.file.filename,
            size: req.file.size,
            path: path.join("uploads", req.file.filename),
            user: req.user.id
        });

        res.status(201).json({
            message: "File uploaded successfully",
            file: newFile
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Upload failed"
        });
    }
}

async function downloadFile(req, res) {
    try {
        const file = await File.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!file) {
            return res.status(404).json({
                message: "File not found"
            });
        }

        const filePath = path.join(__dirname, "..", file.path);

        return res.download(filePath, file.originalName);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Download failed"
        });
    }
}
async function renameFile(req, res) {
    try {
        const { newName } = req.body;

        const file = await File.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!file) {
            return res.status(404).json({
                message: "File not found"
            });
        }

        const extension = path.extname(file.originalName);

        const newStoredName = Date.now() + "-" + newName + extension;

        const oldPath = path.join(__dirname, "..", file.path);

        const newPath = path.join(
            __dirname,
            "..",
            "uploads",
            newStoredName
        );

        await fs.rename(oldPath, newPath);

        file.originalName = newName + extension;
        file.storedName = newStoredName;
        file.path = path.join("uploads", newStoredName);

        await file.save();

        res.status(200).json({
            message: "File renamed successfully",
            file
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Rename failed"
        });
    }
}
async function deleteFile(req, res) {
    try {
        const file = await File.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!file) {
            return res.status(404).json({
                message: "File not found"
            });
        }

        const filePath = path.join(__dirname, "..", file.path);

        try {
            await fs.unlink(filePath);
        } catch (err) {
            console.log("Physical file not found");
        }

        await File.findByIdAndDelete(file._id);

        return res.status(200).json({
            message: "File deleted successfully"
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Delete failed"
        });
    }
}


async function searchFile(req, res) {
    try {
        const { name } = req.query;

        const files = await File.find({
            user: req.user.id,
            originalName: {
                $regex: name,
                $options: "i"
            }
        });

        res.status(200).json(files);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Search failed"
        });
    }
}
async function generateShareLink(req,res){
    try{
        const file=await File.findOne({
            _id:req.params.id,
            user:req.user.id
        });
        if(!file){
            return res.status(404).json({
                message:"File not found"
            });
        }
        const token=crypto.randomBytes(32).toString("hex");
        const expiresAt=new Date();
        expiresAt.setDate(expiresAt.getDate()+1);
        const share=new Share({
            file:file._id,
            owner:req.user.id,
            token,
            expiresAt
        });
        await share.save();
        return res.status(200).json({
            message:"Share link generated",
            link:`http://localhost:5173/share/${token}`
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Failed to generate link"
        });
    }
}
async function getSharedFile(req, res) {
    try {
        const share = await Share.findOne({
            token: req.params.token
        }).populate("file");
        if (!share) {
            return res.status(404).json({
                message: "Invalid Link"
            });
        }
        if (!share.active) {
            return res.status(403).json({
                message: "Link Disabled"
            });
        }
        if (new Date() > share.expiresAt) {
            return res.status(403).json({
                message: "Link Expired"
            });
        }
        return res.status(200).json({
            id: share.file._id,
            originalName: share.file.originalName,
            size: share.file.size
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}
async function downloadSharedFile(req, res) {

    try {

        const share = await Share.findOne({
            token: req.params.token
        }).populate("file");

        if (!share) {

            return res.status(404).json({
                message: "Invalid Link"
            });

        }

        if (!share.active) {

            return res.status(403).json({
                message: "Link Disabled"
            });

        }

        if (new Date() > share.expiresAt) {

            return res.status(403).json({
                message: "Link Expired"
            });

        }

        share.downloads++;

        await share.save();

        const filePath = path.join(
            __dirname,
            "..",
            share.file.path
        );

        return res.download(
            filePath,
            share.file.originalName
        );

    }

    catch(err){

        console.log(err);

        return res.status(500).json({

            message:"Download Failed"

        });

    }

}
module.exports = {
    getAllFiles,
    uploadFile,
    downloadFile,
    renameFile,
    deleteFile,
    searchFile,
    generateShareLink,
    getSharedFile,
    downloadSharedFile
};