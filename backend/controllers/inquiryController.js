import Inquiry from "../models/Inquiry.js";

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: inquiries.length,
      inquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new inquiry (public)
// @route   POST /api/inquiries
// @access  Public
export const createInquiry = async (req, res) => {
  try {
    const { name, phone, email, fitnessGoal, message } = req.body;

    const inquiry = await Inquiry.create({
      name,
      phone,
      email,
      fitnessGoal,
      message,
    });

    res.status(201).json({
      success: true,
      inquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single inquiry
// @route   GET /api/inquiries/:id
// @access  Private
export const getInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    res.json({
      success: true,
      inquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update inquiry status
// @route   PUT /api/inquiries/:id
// @access  Private
export const updateInquiry = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true },
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    res.json({
      success: true,
      inquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private
export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    await inquiry.deleteOne();

    res.json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get inquiry statistics
// @route   GET /api/inquiries/stats
// @access  Private
export const getInquiryStats = async (req, res) => {
  try {
    const total = await Inquiry.countDocuments();
    const newInquiries = await Inquiry.countDocuments({ status: "new" });
    const contacted = await Inquiry.countDocuments({ status: "contacted" });
    const converted = await Inquiry.countDocuments({ status: "converted" });

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const recentInquiries = await Inquiry.countDocuments({
      createdAt: { $gte: last30Days },
    });

    res.json({
      success: true,
      stats: {
        total,
        new: newInquiries,
        contacted,
        converted,
        recent30Days: recentInquiries,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
