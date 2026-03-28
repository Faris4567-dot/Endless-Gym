import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Please provide phone number"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },
  fitnessGoal: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["new", "contacted", "converted", "closed"],
    default: "new",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  notes: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;
