import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide member name"],
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
  phone: {
    type: String,
    required: [true, "Please provide phone number"],
    trim: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  address: {
    type: String,
    default: "",
  },
  emergencyContact: {
    type: String,
    default: "",
  },
  membershipPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MembershipPlan",
  },
  planName: {
    type: String,
    default: "",
  },
  membershipStart: {
    type: Date,
  },
  membershipEnd: {
    type: Date,
  },
  membershipStatus: {
    type: String,
    enum: ["active", "expired", "cancelled", "pending"],
    default: "pending",
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "pending", "failed"],
    default: "pending",
  },
  amount: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: "",
  },
  fitnessGoal: {
    type: String,
    default: "",
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

const Member = mongoose.model("Member", memberSchema);

export default Member;
