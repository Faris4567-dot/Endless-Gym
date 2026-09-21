import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    }
  );
};

// =========================
// ADMIN LOGIN
// =========================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Check MongoDB connection
    console.log("========== ADMIN LOGIN ==========");
    console.log("Email:", email);
    console.log(
      "MongoDB readyState:",
      mongoose.connection.readyState
    );
    console.log(
      "MongoDB host:",
      mongoose.connection.host
    );
    console.log(
      "MongoDB database:",
      mongoose.connection.name
    );

    // Make sure database is connected
    if (mongoose.connection.readyState !== 1) {
      console.error(
        "MongoDB is not connected. readyState:",
        mongoose.connection.readyState
      );

      return res.status(503).json({
        success: false,
        message: "Database connection is unavailable",
      });
    }

    // Find admin
    const admin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    }).select("+password");

    console.log(
      "Admin found:",
      admin ? "YES" : "NO"
    );

    // Admin doesn't exist
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT
    const token = generateToken(admin._id);

    console.log("Admin login successful");
    console.log("================================");

    return res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("========== LOGIN ERROR ==========");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// REGISTER ADMIN
// =========================
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email and password",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingAdmin = await Admin.findOne({
      email: normalizedEmail,
    });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists with this email",
      });
    }

    const admin = await Admin.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
    });

    const token = generateToken(admin._id);

    return res.status(201).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// GET ADMIN PROFILE
// =========================
export const getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        phone: admin.phone,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// UPDATE ADMIN PROFILE
// =========================
export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const updateData = {};

    if (name !== undefined) {
      updateData.name = name.trim();
    }

    if (email !== undefined) {
      updateData.email = email.toLowerCase().trim();
    }

    if (phone !== undefined) {
      updateData.phone = phone;
    }

    const admin = await Admin.findByIdAndUpdate(
      req.admin.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        phone: admin.phone,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};