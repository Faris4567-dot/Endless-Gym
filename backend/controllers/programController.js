import Program from "../models/Program.js";

// @desc    Get all programs
// @route   GET /api/programs
// @access  Public
export const getPrograms = async (req, res) => {
  try {
    const { category, active } = req.query;

    let query = {};
    if (category) {
      query.category = category;
    }
    if (active === "true") {
      query.isActive = true;
    }

    const programs = await Program.find(query)
      .populate("trainer", "name specialization")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: programs.length,
      programs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single program
// @route   GET /api/programs/:id
// @access  Public
export const getProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id).populate(
      "trainer",
      "name specialization experience certifications bio image",
    );

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    res.json({
      success: true,
      program,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new program
// @route   POST /api/programs
// @access  Private
export const createProgram = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      image,
      schedule,
      duration,
      trainer,
      trainerName,
      price,
      isActive,
    } = req.body;

    const program = await Program.create({
      name,
      description,
      category,
      image,
      schedule,
      duration,
      trainer,
      trainerName,
      price,
      isActive,
    });

    res.status(201).json({
      success: true,
      program,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update program
// @route   PUT /api/programs/:id
// @access  Private
export const updateProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    res.json({
      success: true,
      program,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete program
// @route   DELETE /api/programs/:id
// @access  Private
export const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    await program.deleteOne();

    res.json({
      success: true,
      message: "Program deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get program statistics
// @route   GET /api/programs/stats
// @access  Private
export const getProgramStats = async (req, res) => {
  try {
    const total = await Program.countDocuments();
    const active = await Program.countDocuments({ isActive: true });

    const categoryData = await Program.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      stats: {
        total,
        active,
        categoryData,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
