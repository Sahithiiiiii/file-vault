const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
router.get("/", authMiddleware, fileController.getAllFiles);
router.get("/search", authMiddleware, fileController.searchFile);
router.get("/download/:id", authMiddleware, fileController.downloadFile);
router.post(
    "/upload",
    authMiddleware,
    upload.single("file"),
    fileController.uploadFile
);
router.get("/share/:token", fileController.getSharedFile);
router.get(
    "/share/download/:token",
    fileController.downloadSharedFile
);
router.post(
"/share/:id",
authMiddleware,
fileController.generateShareLink
);
router.put("/:id", authMiddleware, fileController.renameFile);
router.delete("/:id", authMiddleware, fileController.deleteFile);
module.exports = router;