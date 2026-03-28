import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide trainer name"],
    trim: true,
  },
  specialization: {
    type: String,
    required: [true, "Please provide specialization"],
    trim: true,
  },
  experience: {
    type: Number,
    required: [true, "Please provide years of experience"],
    default: 0,
  },
  certifications: [
    {
      type: String,
      trim: true,
    },
  ],
  bio: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    lowercase: true,
  },
  specialties: [
    {
      type: String,
      trim: true,
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Trainer = mongoose.model("Trainer", trainerSchema);

export default Trainer;
