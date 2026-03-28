import MembershipPlan from "../models/MembershipPlan.js";

// @desc    Get all membership plans
// @route   GET /api/memberships
// @access  Public
export const getMembershipPlans = async (req, res) => {
  try {
    const { active, duration } = req.query;

    let query = {};
    if (active === "true") {
      query.isActive = true;
    }
    if (duration) {
      query.duration = duration;
    }

    const plans = await MembershipPlan.find(query).sort({ price: 1 });

    res.json({
      success: true,
      count: plans.length,
      plans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single membership plan
// @route   GET /api/memberships/:id
// @access  Public
export const getMembershipPlan = async (req, res) => {
  try {
    const plan = await MembershipPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Membership plan not found",
      });
    }

    res.json({
      success: true,
      plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new membership plan
// @route   POST /api/memberships
// @access  Private
export const createMembershipPlan = async (req, res) => {
  try {
    const {
      name,
      description,
      duration,
      price,
      originalPrice,
      features,
      image,
      isPopular,
      isActive,
    } = req.body;

    const plan = await MembershipPlan.create({
      name,
      description,
      duration,
      price,
      originalPrice,
      features,
      image,
      isPopular,
      isActive,
    });

    res.status(201).json({
      success: true,
      plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update membership plan
// @route   PUT /api/memberships/:id
// @access  Private
export const updateMembershipPlan = async (req, res) => {
  try {
    const plan = await MembershipPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Membership plan not found",
      });
    }

    res.json({
      success: true,
      plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete membership plan
// @route   DELETE /api/memberships/:id
// @access  Private
export const deleteMembershipPlan = async (req, res) => {
  try {
    const plan = await MembershipPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Membership plan not found",
      });
    }

    await plan.deleteOne();

    res.json({
      success: true,
      message: "Membership plan deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get membership statistics
// @route   GET /api/memberships/stats
// @access  Private
export const getMembershipStats = async (req, res) => {
  try {
    const total = await MembershipPlan.countDocuments();
    const active = await MembershipPlan.countDocuments({ isActive: true });

    const durationData = await MembershipPlan.aggregate([
      {
        $group: {
          _id: "$duration",
          count: { $sum: 1 },
          avgPrice: { $avg: "$price" },
        },
      },
    ]);

    res.json({
      success: true,
      stats: {
        total,
        active,
        durationData,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
