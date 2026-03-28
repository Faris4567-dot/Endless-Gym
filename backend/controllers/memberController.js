import Member from "../models/Member.js";

// @desc    Get all members
// @route   GET /api/members
// @access  Private
export const getMembers = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;

    let query = {};

    if (status) {
      query.membershipStatus = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const members = await Member.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Member.countDocuments(query);

    res.json({
      success: true,
      members,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single member
// @route   GET /api/members/:id
// @access  Private
export const getMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.json({
      success: true,
      member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new member
// @route   POST /api/members
// @access  Private
export const createMember = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      gender,
      dateOfBirth,
      address,
      emergencyContact,
      membershipPlan,
      planName,
      membershipStart,
      membershipEnd,
      membershipStatus,
      paymentStatus,
      amount,
      image,
      fitnessGoal,
      notes,
    } = req.body;

    const member = await Member.create({
      name,
      email,
      phone,
      gender,
      dateOfBirth,
      address,
      emergencyContact,
      membershipPlan,
      planName,
      membershipStart,
      membershipEnd,
      membershipStatus,
      paymentStatus,
      amount,
      image,
      fitnessGoal,
      notes,
    });

    res.status(201).json({
      success: true,
      member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update member
// @route   PUT /api/members/:id
// @access  Private
export const updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.json({
      success: true,
      member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete member
// @route   DELETE /api/members/:id
// @access  Private
export const deleteMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    await member.deleteOne();

    res.json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get member statistics
// @route   GET /api/members/stats
// @access  Private
export const getMemberStats = async (req, res) => {
  try {
    const total = await Member.countDocuments();
    const active = await Member.countDocuments({ membershipStatus: "active" });
    const expired = await Member.countDocuments({
      membershipStatus: "expired",
    });
    const pending = await Member.countDocuments({
      membershipStatus: "pending",
    });

    // Get monthly data for last 12 months
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const monthlyData = await Member.aggregate([
      {
        $match: {
          createdAt: { $gte: twelveMonthsAgo },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Calculate revenue
    const revenueData = await Member.aggregate([
      {
        $match: { paymentStatus: "paid" },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);

    res.json({
      success: true,
      stats: {
        total,
        active,
        expired,
        pending,
        monthlyData,
        totalRevenue: revenueData[0]?.totalRevenue || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
