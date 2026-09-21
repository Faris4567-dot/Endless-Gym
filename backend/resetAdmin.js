import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "./models/Admin.js";

dotenv.config();

const resetPassword = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const admin = await Admin.findOne({
            email: "admin@fitpro.gym"
        }).select("+password");

        if (!admin) {
            console.log("Admin account not found.");
            process.exit(1);
        }

        admin.password = "Admin@12345";
        await admin.save();

        console.log("================================");
        console.log("Admin password reset successfully");
        console.log("Email: admin@fitpro.gym");
        console.log("Password: Admin@12345");
        console.log("================================");

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("Password reset failed:", error.message);
        process.exit(1);
    }
};

resetPassword();
