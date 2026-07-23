require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/files", fileRoutes);
app.get("/", (req, res) => {
    res.send("Secure File Vault API Running");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});