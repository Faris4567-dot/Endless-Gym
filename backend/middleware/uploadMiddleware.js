import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "fitpro-gym/trainers",
        allowed_formats: [
            "jpg",
            "jpeg",
            "png",
            "webp",
            "gif",
        ],
        transformation: [
            {
                width: 800,
                height: 800,
                crop: "limit",
                quality: "auto",
                fetch_format: "auto",
            },
        ],
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

export default upload;