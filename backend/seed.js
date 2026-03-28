import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";
import Trainer from "./models/Trainer.js";
import Program from "./models/Program.js";
import MembershipPlan from "./models/MembershipPlan.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    // Clear existing data
    await Admin.deleteMany({});
    await Trainer.deleteMany({});
    await Program.deleteMany({});
    await MembershipPlan.deleteMany({});
    console.log("Cleared existing data");

    // Create Admin
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = await Admin.create({
      name: "Admin",
      email: "admin@fitpro.gym",
      password: hashedPassword,
      role: "superadmin",
    });
    console.log("Created admin:", admin.email);

    // Create Trainers
    const trainers = await Trainer.insertMany([
      {
        name: "Alex Johnson",
        specialization: "Strength & Conditioning",
        experience: 8,
        certifications: ["NASM-CPT", "NSCA-CSCS", "CrossFit L2"],
        bio: "Alex specializes in strength training and has helped hundreds of members achieve their muscle-building goals.",
        image:
          "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=500&fit=crop",
        specialties: ["Weight Training", "Powerlifting", "Sports Conditioning"],
      },
      {
        name: "Sarah Williams",
        specialization: "Yoga & Mindfulness",
        experience: 6,
        certifications: [
          "RYT-500",
          "Yoga Alliance Certified",
          "Meditation Coach",
        ],
        bio: "Sarah brings peace and balance to your fitness journey through her expertise in yoga and meditation.",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
        specialties: ["Yoga", "Meditation", "Flexibility"],
      },
      {
        name: "Mike Chen",
        specialization: "HIIT & Cardio",
        experience: 5,
        certifications: [
          "ACE-CPT",
          "TRX Certified",
          "Group Fitness Instructor",
        ],
        bio: "Mike is known for his high-energy workouts that push you to your limits and beyond.",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
        specialties: ["HIIT", "Cardio", "Weight Loss"],
      },
      {
        name: "Emily Davis",
        specialization: "Personal Training",
        experience: 7,
        certifications: ["NASM-CPT", "Precision Nutrition", "Pre/Post Natal"],
        bio: "Emily specializes in personalized training programs tailored to individual goals and needs.",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
        specialties: ["Personal Training", "Nutrition", "Body Transformation"],
      },
    ]);
    console.log("Created", trainers.length, "trainers");

    // Create Programs
    const programs = await Program.insertMany([
      {
        name: "Weight Training",
        description:
          "Build muscle and strength with our comprehensive weight training program designed for all levels.",
        category: "weight-training",
        image:
          "https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=600&h=400&fit=crop",
        schedule: "Mon-Fri 6AM-9PM",
        duration: "1 hour",
        trainerName: "Alex Johnson",
        price: 0,
      },
      {
        name: "CrossFit",
        description:
          "High-intensity functional fitness program that combines weightlifting, cardio, and gymnastics.",
        category: "crossfit",
        image:
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
        schedule: "Mon-Fri 7AM, 6PM",
        duration: "45 mins",
        trainerName: "Mike Chen",
        price: 79,
      },
      {
        name: "Yoga",
        description:
          "Find inner peace and improve flexibility with our expert-led yoga classes suitable for all levels.",
        category: "yoga",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
        schedule: "Daily 7AM, 5PM",
        duration: "1 hour",
        trainerName: "Sarah Williams",
        price: 49,
      },
      {
        name: "Cardio Blast",
        description:
          "Boost your cardiovascular fitness with our intense cardio sessions.",
        category: "cardio",
        image:
          "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&h=400&fit=crop",
        schedule: "Mon-Sat 6AM, 12PM, 5PM",
        duration: "45 mins",
        trainerName: "Mike Chen",
        price: 39,
      },
      {
        name: "Personal Training",
        description:
          "One-on-one coaching with certified trainers to help you achieve your specific fitness goals.",
        category: "personal-training",
        image:
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop",
        schedule: "By Appointment",
        duration: "1 hour",
        trainerName: "Emily Davis",
        price: 99,
      },
    ]);
    console.log("Created", programs.length, "programs");

    // Create Membership Plans
    const plans = await MembershipPlan.insertMany([
      {
        name: "Basic",
        description: "Perfect for beginners",
        duration: "monthly",
        price: 49,
        originalPrice: 59,
        features: ["Gym Access", "Locker Room", "Free Parking", "Mobile App"],
        isPopular: false,
      },
      {
        name: "Pro",
        description: "Most Popular Choice",
        duration: "monthly",
        price: 79,
        originalPrice: 99,
        features: [
          "All Basic Features",
          "Group Classes",
          "Sauna Access",
          "1 PT Session/month",
        ],
        isPopular: true,
      },
      {
        name: "Elite",
        description: "Premium Experience",
        duration: "monthly",
        price: 129,
        originalPrice: 149,
        features: [
          "All Pro Features",
          "Unlimited PT Sessions",
          "Nutrition Plan",
          "Guest Pass",
        ],
        isPopular: false,
      },
      {
        name: "Annual",
        description: "Best Value",
        duration: "yearly",
        price: 799,
        originalPrice: 999,
        features: [
          "All Elite Features",
          "Free Merchandise",
          "Priority Booking",
          "Exclusive Events",
        ],
        isPopular: false,
      },
    ]);
    console.log("Created", plans.length, "membership plans");

    console.log("\n✅ Seed data created successfully!");
    console.log("\n📝 Login Credentials:");
    console.log("Email: admin@fitpro.gym");
    console.log("Password: admin123");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
