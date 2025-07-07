import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async(req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
        });
        await createdUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
            },
        });
    } catch (error) {
        console.error("Signup error:", error);
        console.error("Signup error details:", error.stack);
        res.status(500).json({ message: "Internal server error" });
    }
};

import jwt from 'jsonwebtoken';

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt with email:", email, "and password:", password);
        const user = await User.findOne({ email });
        console.log("User found:", user);
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        console.log("Password match result:", isMatch);
        if (!isMatch) {
            console.log("Password does not match");
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const listUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // exclude password field
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
