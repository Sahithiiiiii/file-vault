const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema(
    {
        originalName: {
            type: String,
            required: true
        },
        storedName: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            required: true
        },
        path: {
            type: String,
            required: true
        },
        uploadedAt: {
            type: Date,
            default: Date.now
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("File", fileSchema);