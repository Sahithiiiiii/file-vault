const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
         const user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();
        console.log("User saved",user);
        return res.status(201).json({
            message: "User Registered Successfully",
            user : {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server Error"
        });
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and Password are required"
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }
        const token = jwt.sign(
        {
        id: user._id,
        email: user.email
        },
        process.env.JWT_SECRET,
        {
        expiresIn: "1d"
        }
        );
        return res.status(200).json({
            message: "Login Successful",
            token
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server Error"
        });
    }
}
module.exports = {
    register,
    login
};