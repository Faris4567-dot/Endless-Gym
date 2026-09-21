import Trainer from "../models/Trainer.js";
import cloudinary from "../config/cloudinary.js";

/*
|--------------------------------------------------------------------------
| Helper: Parse array fields
|--------------------------------------------------------------------------
*/

const parseArrayField = (value) => {
  if (!value) {
    return [];
  }

  // Already an array
  if (Array.isArray(value)) {
    return value;
  }

  // JSON string
  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    // Not JSON - continue
  }

  // Comma-separated string
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

/*
|--------------------------------------------------------------------------
| Helper: Delete Cloudinary image
|--------------------------------------------------------------------------
*/

const deleteCloudinaryImage = async (imageUrl) => {
  try {
    if (!imageUrl || !imageUrl.includes("res.cloudinary.com")) {
      return;
    }

    const uploadIndex = imageUrl.indexOf("/upload/");

    if (uploadIndex === -1) {
      return;
    }

    let publicIdWithExtension = imageUrl.substring(
      uploadIndex + "/upload/".length
    );

    // Remove transformations if present
    const parts = publicIdWithExtension.split("/");

    const versionIndex = parts.findIndex((part) =>
      /^v\d+$/.test(part)
    );

    if (versionIndex !== -1) {
      publicIdWithExtension = parts
        .slice(versionIndex + 1)
        .join("/");
    }

    // Remove file extension
    publicIdWithExtension = publicIdWithExtension.replace(
      /\.(jpg|jpeg|png|webp|gif)$/i,
      ""
    );

    if (!publicIdWithExtension) {
      return;
    }

    await cloudinary.uploader.destroy(publicIdWithExtension);

    console.log(
      `Cloudinary image deleted: ${publicIdWithExtension}`
    );
  } catch (error) {
    console.error(
      "CLOUDINARY IMAGE DELETE ERROR:",
      error.message
    );
  }
};

/*
|--------------------------------------------------------------------------
| GET ALL TRAINERS
|--------------------------------------------------------------------------
*/

export const getTrainers = async (req, res) => {
  try {
    const filter = {};

    if (req.query.active !== undefined) {
      filter.isActive = req.query.active === "true";
    }

    const trainers = await Trainer.find(filter).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: trainers.length,
      trainers,
    });
  } catch (error) {
    console.error("GET TRAINERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET SINGLE TRAINER
|--------------------------------------------------------------------------
*/

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
    console.error("GET TRAINER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| CREATE TRAINER
|--------------------------------------------------------------------------
*/

export const createTrainer = async (req, res) => {
  try {
    const {
      name,
      specialization,
      experience,
      certifications,
      bio,
      phone,
      email,
      specialties,
    } = req.body;

    const trainer = await Trainer.create({
      name,
      specialization,
      experience: Number(experience) || 0,
      certifications: parseArrayField(certifications),
      bio: bio || "",
      phone: phone || "",
      email: email || "",
      specialties: parseArrayField(specialties),

      // Cloudinary URL
      image: req.file ? req.file.path : "",
    });

    res.status(201).json({
      success: true,
      message: "Trainer created successfully",
      trainer,
    });
  } catch (error) {
    console.error("CREATE TRAINER ERROR:", error);

    // If database creation fails, remove uploaded Cloudinary image
    if (req.file?.path) {
      await deleteCloudinaryImage(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| UPDATE TRAINER
|--------------------------------------------------------------------------
*/

export const updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    const {
      name,
      specialization,
      experience,
      certifications,
      bio,
      phone,
      email,
      specialties,
      isActive,
    } = req.body;

    /*
    |--------------------------------------------------------------------------
    | Update normal fields
    |--------------------------------------------------------------------------
    */

    trainer.name = name ?? trainer.name;

    trainer.specialization =
      specialization ?? trainer.specialization;

    trainer.experience =
      experience !== undefined
        ? Number(experience) || 0
        : trainer.experience;

    trainer.bio = bio ?? trainer.bio;

    trainer.phone = phone ?? trainer.phone;

    trainer.email = email ?? trainer.email;

    trainer.isActive =
      isActive !== undefined
        ? isActive === true || isActive === "true"
        : trainer.isActive;

    if (certifications !== undefined) {
      trainer.certifications =
        parseArrayField(certifications);
    }

    if (specialties !== undefined) {
      trainer.specialties =
        parseArrayField(specialties);
    }

    /*
    |--------------------------------------------------------------------------
    | Replace image only if a new image was uploaded
    |--------------------------------------------------------------------------
    */

    const oldImage = trainer.image;

    if (req.file) {
      // New Cloudinary URL
      trainer.image = req.file.path;
    }

    await trainer.save();

    /*
    |--------------------------------------------------------------------------
    | Delete old Cloudinary image AFTER successful database save
    |--------------------------------------------------------------------------
    */

    if (req.file && oldImage) {
      await deleteCloudinaryImage(oldImage);
    }

    res.json({
      success: true,
      message: "Trainer updated successfully",
      trainer,
    });
  } catch (error) {
    console.error("UPDATE TRAINER ERROR:", error);

    // Remove newly uploaded Cloudinary image if DB update fails
    if (req.file?.path) {
      await deleteCloudinaryImage(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| DELETE TRAINER
|--------------------------------------------------------------------------
*/

export const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    const image = trainer.image;

    await trainer.deleteOne();

    /*
    |--------------------------------------------------------------------------
    | Delete Cloudinary image
    |--------------------------------------------------------------------------
    */

    if (image) {
      await deleteCloudinaryImage(image);
    }

    res.json({
      success: true,
      message: "Trainer deleted successfully",
    });
  } catch (error) {
    console.error("DELETE TRAINER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| TRAINER STATS
|--------------------------------------------------------------------------
*/

export const getTrainerStats = async (req, res) => {
  try {
    const total = await Trainer.countDocuments();

    const active = await Trainer.countDocuments({
      isActive: true,
    });

    res.json({
      success: true,
      stats: {
        total,
        active,
      },
    });
  } catch (error) {
    console.error("GET TRAINER STATS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};