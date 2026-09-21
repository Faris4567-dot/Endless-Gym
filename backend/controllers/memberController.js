import Member from "../models/Member.js";
import MembershipPlan from "../models/MembershipPlan.js";

/*
 * Automatically mark memberships as expired
 * when their membershipEnd date has passed.
 */
const updateExpiredMembers = async () => {
  await Member.updateMany(
    {
      membershipEnd: {
        $lt: new Date(),
      },
      membershipStatus: "active",
    },
    {
      $set: {
        membershipStatus: "expired",
      },
    },
  );
};

/*
 * Calculate membership end date from
 * start date + membership plan duration.
 */
const calculateMembershipEndDate = (startDate, duration) => {
  if (!startDate || !duration) {
    return null;
  }

  const endDate = new Date(startDate);

  switch (duration) {
    case "monthly":
      endDate.setMonth(endDate.getMonth() + 1);
      break;

    case "quarterly":
      endDate.setMonth(endDate.getMonth() + 3);
      break;

    case "half-yearly":
      endDate.setMonth(endDate.getMonth() + 6);
      break;

    case "yearly":
      endDate.setFullYear(endDate.getFullYear() + 1);
      break;

    default:
      return null;
  }

  return endDate;
};

/*
 * GET ALL MEMBERS
 * GET /api/members
 */
export const getMembers = async (req, res) => {
  try {
    // Automatically update expired memberships first
    await updateExpiredMembers();

    const { status, search, page = 1, limit = 10 } = req.query;

    const query = {};

    // Filter by membership status
    if (status) {
      query.membershipStatus = status;
    }

    // Search by name, email, or phone
    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const members = await Member.find(query)
      .populate("membershipPlan", "name duration price")
      .sort({ createdAt: -1 })
      .limit(limitNumber)
      .skip((pageNumber - 1) * limitNumber);

    const total = await Member.countDocuments(query);

    res.json({
      success: true,
      members,
      totalPages: Math.ceil(total / limitNumber),
      currentPage: pageNumber,
      total,
    });
  } catch (error) {
    console.error("GET MEMBERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
      error: error.name,
    });
  }
};

/*
 * GET SINGLE MEMBER
 * GET /api/members/:id
 */
export const getMember = async (req, res) => {
  try {
    // Keep member status up to date
    await updateExpiredMembers();

    const member = await Member.findById(req.params.id).populate(
      "membershipPlan",
      "name duration price",
    );

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
    console.error("GET MEMBER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
 * CREATE MEMBER
 * POST /api/members
 */
export const createMember = async (req, res) => {
  try {
    console.log("=================================");
    console.log("CREATE MEMBER REQUEST");
    console.log("BODY:", req.body);
    console.log("=================================");

    const {
      name,
      email,
      phone,
      gender,
      dateOfBirth,
      address,
      emergencyContact,
      membershipPlan,
      membershipStart,
      membershipStatus,
      paymentStatus,
      amount,
      image,
      fitnessGoal,
      notes,
    } = req.body;

    // Find selected membership plan
    let selectedPlan = null;

    if (membershipPlan) {
      selectedPlan = await MembershipPlan.findById(membershipPlan);

      if (!selectedPlan) {
        return res.status(400).json({
          success: false,
          message: "Selected membership plan not found",
        });
      }
    }

    // -----------------------------------------
    // MEMBERSHIP START DATE
    // -----------------------------------------

    const calculatedStart = membershipStart
      ? new Date(membershipStart)
      : new Date();

    if (isNaN(calculatedStart.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid membership start date",
      });
    }

    // -----------------------------------------
    // MEMBERSHIP END DATE
    // -----------------------------------------

    let calculatedEnd = null;

    if (selectedPlan) {
      calculatedEnd = calculateMembershipEndDate(
        calculatedStart,
        selectedPlan.duration,
      );
    }

    // -----------------------------------------
    // MEMBERSHIP STATUS
    // -----------------------------------------

    let finalStatus = membershipStatus || "pending";

    if (calculatedEnd) {
      if (calculatedEnd <= new Date()) {
        finalStatus = "expired";
      } else {
        finalStatus = "active";
      }
    }

    // -----------------------------------------
    // AMOUNT
    // -----------------------------------------

    const finalAmount =
      amount !== undefined && amount !== null && amount !== ""
        ? Number(amount)
        : selectedPlan?.price || 0;

    // -----------------------------------------
    // CREATE MEMBER
    // -----------------------------------------

    const member = await Member.create({
      name,
      email,
      phone,
      gender,
      dateOfBirth,
      address,
      emergencyContact,

      membershipPlan: selectedPlan?._id || undefined,

      planName: selectedPlan?.name || "",

      membershipStart: calculatedStart,

      membershipEnd: calculatedEnd,

      membershipStatus: finalStatus,

      paymentStatus: paymentStatus || "pending",

      amount: finalAmount,

      image,
      fitnessGoal,
      notes,
    });

    // Populate membership plan before sending response
    const populatedMember = await Member.findById(member._id).populate(
      "membershipPlan",
      "name duration price",
    );

    console.log("MEMBER CREATED:");
    console.log(populatedMember);

    res.status(201).json({
      success: true,
      member: populatedMember,
    });
  } catch (error) {
    console.error("=================================");
    console.error("CREATE MEMBER ERROR:");
    console.error(error);
    console.error("MESSAGE:", error.message);
    console.error("NAME:", error.name);
    console.error("=================================");

    res.status(500).json({
      success: false,
      message: error.message,
      error: error.name,
    });
  }
};

/*
 * UPDATE MEMBER
 * PUT /api/members/:id
 */
export const updateMember = async (req, res) => {
  try {
    const existingMember = await Member.findById(req.params.id);

    if (!existingMember) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    const updateData = {
      ...req.body,
    };

    // -----------------------------------------
    // DETERMINE MEMBERSHIP PLAN
    // -----------------------------------------

    let selectedPlan = null;

    const planId = updateData.membershipPlan || existingMember.membershipPlan;

    if (planId) {
      selectedPlan = await MembershipPlan.findById(planId);

      if (!selectedPlan) {
        return res.status(400).json({
          success: false,
          message: "Selected membership plan not found",
        });
      }

      updateData.membershipPlan = selectedPlan._id;
      updateData.planName = selectedPlan.name;

      // Use plan price if no amount was provided
      if (
        updateData.amount === undefined ||
        updateData.amount === null ||
        updateData.amount === ""
      ) {
        updateData.amount = selectedPlan.price;
      }
    }

    // -----------------------------------------
    // DETERMINE START DATE
    // -----------------------------------------

    let startDate;

    if (updateData.membershipStart) {
      startDate = new Date(updateData.membershipStart);
    } else if (existingMember.membershipStart) {
      startDate = new Date(existingMember.membershipStart);
    } else {
      startDate = new Date();
    }

    if (isNaN(startDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid membership start date",
      });
    }

    // -----------------------------------------
    // CALCULATE MEMBERSHIP END DATE
    // -----------------------------------------

    if (selectedPlan) {
      const endDate = calculateMembershipEndDate(
        startDate,
        selectedPlan.duration,
      );

      if (!endDate) {
        return res.status(400).json({
          success: false,
          message: `Invalid membership duration: ${selectedPlan.duration}`,
        });
      }

      updateData.membershipStart = startDate;
      updateData.membershipEnd = endDate;

      // Automatically update status
      updateData.membershipStatus =
        endDate <= new Date() ? "expired" : "active";

      console.log("MEMBERSHIP CALCULATION");
      console.log("Plan:", selectedPlan.name);
      console.log("Duration:", selectedPlan.duration);
      console.log("Start:", startDate);
      console.log("End:", endDate);
    }

    // -----------------------------------------
    // UPDATE MEMBER
    // -----------------------------------------

    const member = await Member.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate("membershipPlan", "name duration price");

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    console.log("UPDATED MEMBER:");
    console.log(member);

    res.json({
      success: true,
      member,
    });
  } catch (error) {
    console.error("=================================");
    console.error("UPDATE MEMBER ERROR:");
    console.error(error);
    console.error("=================================");

    res.status(500).json({
      success: false,
      message: error.message,
      error: error.name,
    });
  }
};

/*
 * RENEW MEMBER
 * POST /api/members/:id/renew
 */
export const renewMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    // Member must have a membership plan
    if (!member.membershipPlan) {
      return res.status(400).json({
        success: false,
        message: "Member does not have a membership plan",
      });
    }

    // Get the actual membership plan
    const plan = await MembershipPlan.findById(member.membershipPlan);

    if (!plan) {
      return res.status(400).json({
        success: false,
        message: "Membership plan not found",
      });
    }

    // Renewal starts from today
    const newStartDate = new Date();

    // Calculate new expiry using plan duration
    const newEndDate = calculateMembershipEndDate(newStartDate, plan.duration);

    if (!newEndDate) {
      return res.status(400).json({
        success: false,
        message: "Invalid membership duration",
      });
    }

    // Update member
    member.membershipStart = newStartDate;
    member.membershipEnd = newEndDate;
    member.membershipStatus = "active";
    member.planName = plan.name;
    member.amount = plan.price;

    // Keep payment pending until payment is recorded
    member.paymentStatus = "pending";

    await member.save();

    // Return populated member
    const updatedMember = await Member.findById(member._id).populate(
      "membershipPlan",
      "name duration price",
    );

    res.json({
      success: true,
      message: "Membership renewed successfully",
      member: updatedMember,
    });
  } catch (error) {
    console.error("RENEW MEMBER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
      error: error.name,
    });
  }
};
/*
 * DELETE MEMBER
 * DELETE /api/members/:id
 */
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
    console.error("DELETE MEMBER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
 * MEMBER STATISTICS
 * GET /api/members/stats
 */
export const getMemberStats = async (req, res) => {
  try {
    /*
     * Make sure expired memberships
     * are updated before calculating
     * dashboard statistics.
     */
    await updateExpiredMembers();

    const total = await Member.countDocuments();

    const active = await Member.countDocuments({
      membershipStatus: "active",
    });

    const expired = await Member.countDocuments({
      membershipStatus: "expired",
    });

    const pending = await Member.countDocuments({
      membershipStatus: "pending",
    });

    /*
     * Member growth for the
     * last 12 months.
     */
    const twelveMonthsAgo = new Date();

    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const monthlyData = await Member.aggregate([
      {
        $match: {
          createdAt: {
            $gte: twelveMonthsAgo,
          },
        },
      },
      {
        $group: {
          _id: {
            $month: "$createdAt",
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    /*
     * Total revenue from paid memberships.
     */
    const revenueData = await Member.aggregate([
      {
        $match: {
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$amount",
          },
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
    console.error("GET MEMBER STATS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
