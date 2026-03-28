import mongoose from "mongoose";

const membershipPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide plan name"],
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  duration: {
    type: String,
    required: [true, "Please provide duration"],
    enum: ["monthly", "quarterly", "half-yearly", "yearly"],
  },
  price: {
    type: Number,
    required: [true, "Please provide price"],
    min: 0,
  },
  originalPrice: {
    type: Number,
    default: 0,
  },
  features: [
    {
      type: String,
      trim: true,
    },
  ],
  image: {
    type: String,
    default: "",
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MembershipPlan = mongoose.model("MembershipPlan", membershipPlanSchema);

export default MembershipPlan;
