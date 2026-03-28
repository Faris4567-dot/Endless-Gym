import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide program name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide program description"],
  },
  category: {
    type: String,
    required: [true, "Please provide program category"],
    enum: [
      "weight-training",
      "crossfit",
      "yoga",
      "cardio",
      "personal-training",
      "spinning",
      "zumba",
      "HIIT",
    ],
  },
  image: {
    type: String,
    default: "",
  },
  schedule: {
    type: String,
    default: "",
  },
  duration: {
    type: String,
    default: "",
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer",
  },
  trainerName: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
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

const Program = mongoose.model("Program", programSchema);

export default Program;
