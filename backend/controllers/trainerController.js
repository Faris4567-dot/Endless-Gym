import Trainer from "../models/Trainer.js";

// @desc    Get all trainers
// @route   GET /api/trainers
// @access  Public
export const getTrainers = async (req, res) => {
  try {
    const { active } = req.query;

    let query = {};
    if (active === "true") {
      query.isActive = true;
    }

    const trainers = await Trainer.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: trainers.length,
      trainers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single trainer
// @route   GET /api/trainers/:id
// @access  Public
export const getTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    res.json({
      success: true,
      trainer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new trainer
// @route   POST /api/trainers
// @access  Private
export const createTrainer = async (req, res) => {
  try {
    const {
      name,
      specialization,
      experience,
      certifications,
      bio,
      image,
      phone,
      email,
      specialties,
      isActive,
    } = req.body;

    const trainer = await Trainer.create({
      name,
      specialization,
      experience,
      certifications,
      bio,
      image,
      phone,
      email,
      specialties,
      isActive,
    });

    res.status(201).json({
      success: true,
      trainer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update trainer
// @route   PUT /api/trainers/:id
// @access  Private
export const updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    res.json({
      success: true,
      trainer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete trainer
// @route   DELETE /api/trainers/:id
// @access  Private
export const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    await trainer.deleteOne();

    res.json({
      success: true,
      message: "Trainer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get trainer statistics
// @route   GET /api/trainers/stats
// @access  Private
export const getTrainerStats = async (req, res) => {
  try {
    const total = await Trainer.countDocuments();
    const active = await Trainer.countDocuments({ isActive: true });

    res.json({
      success: true,
      stats: {
        total,
        active,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
