import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { trainerAPI } from "../../services/api";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

const getImageUrl = (image) => {
    if (!image) {
        return "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=300&fit=crop";
    }

    if (image.startsWith("http")) {
        return image;
    }

    return `${API_URL}${image}`;
};

const initialFormData = {
    name: "",
    specialization: "",
    experience: "",
    certifications: "",
    bio: "",
    phone: "",
    email: "",
    specialties: "",
};

const TrainersPage = () => {
    const [trainers, setTrainers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const [editingTrainer, setEditingTrainer] =
        useState(null);

    const [formData, setFormData] =
        useState(initialFormData);

    const [imageFile, setImageFile] = useState(null);

    const [imagePreview, setImagePreview] =
        useState("");

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchTrainers();
    }, []);

    const fetchTrainers = async () => {
        try {
            setLoading(true);

            const response =
                await trainerAPI.getAll();

            if (response.data.success) {
                setTrainers(
                    response.data.trainers
                );
            }
        } catch (error) {
            console.error(
                "Error fetching trainers:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Image Selection
    |--------------------------------------------------------------------------
    */

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            "image/gif",
        ];

        if (!allowedTypes.includes(file.type)) {
            alert(
                "Please select JPG, JPEG, PNG, WEBP or GIF image."
            );

            e.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert(
                "Image size must be less than 5 MB."
            );

            e.target.value = "";
            return;
        }

        setImageFile(file);

        setImagePreview(
            URL.createObjectURL(file)
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Reset Form
    |--------------------------------------------------------------------------
    */

    const resetForm = () => {
        setFormData(initialFormData);

        setImageFile(null);

        setImagePreview("");

        setEditingTrainer(null);
    };

    /*
    |--------------------------------------------------------------------------
    | Open Add Modal
    |--------------------------------------------------------------------------
    */

    const handleAddTrainer = () => {
        resetForm();

        setShowModal(true);
    };

    /*
    |--------------------------------------------------------------------------
    | Close Modal
    |--------------------------------------------------------------------------
    */

    const handleCloseModal = () => {
        if (saving) {
            return;
        }

        setShowModal(false);

        resetForm();
    };

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const data = new FormData();

            data.append(
                "name",
                formData.name
            );

            data.append(
                "specialization",
                formData.specialization
            );

            data.append(
                "experience",
                formData.experience
            );

            data.append(
                "certifications",
                JSON.stringify(
                    formData.certifications
                        .split(",")
                        .map((item) =>
                            item.trim()
                        )
                        .filter(Boolean)
                )
            );

            data.append(
                "specialties",
                JSON.stringify(
                    formData.specialties
                        .split(",")
                        .map((item) =>
                            item.trim()
                        )
                        .filter(Boolean)
                )
            );

            data.append(
                "bio",
                formData.bio
            );

            data.append(
                "phone",
                formData.phone
            );

            data.append(
                "email",
                formData.email
            );

            /*
            |--------------------------------------------------------------------------
            | Only append image when user selected a new file
            |--------------------------------------------------------------------------
            */

            if (imageFile) {
                data.append(
                    "image",
                    imageFile
                );
            }

            if (editingTrainer) {
                await trainerAPI.update(
                    editingTrainer._id,
                    data
                );
            } else {
                await trainerAPI.create(data);
            }

            await fetchTrainers();

            setShowModal(false);

            resetForm();
        } catch (error) {
            console.error(
                "Error saving trainer:",
                error
            );

            alert(
                error.response?.data?.message ||
                    "Failed to save trainer"
            );
        } finally {
            setSaving(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    const handleDelete = async (id) => {
        if (
            !window.confirm(
                "Are you sure you want to delete this trainer?"
            )
        ) {
            return;
        }

        try {
            await trainerAPI.delete(id);

            await fetchTrainers();
        } catch (error) {
            console.error(
                "Error deleting trainer:",
                error
            );

            alert(
                error.response?.data?.message ||
                    "Failed to delete trainer"
            );
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Edit
    |--------------------------------------------------------------------------
    */

    const handleEdit = (trainer) => {
        setEditingTrainer(trainer);

        setFormData({
            name: trainer.name || "",

            specialization:
                trainer.specialization || "",

            experience:
                trainer.experience?.toString() || "",

            certifications:
                trainer.certifications?.join(
                    ", "
                ) || "",

            bio: trainer.bio || "",

            phone: trainer.phone || "",

            email: trainer.email || "",

            specialties:
                trainer.specialties?.join(
                    ", "
                ) || "",
        });

        /*
        |--------------------------------------------------------------------------
        | Show existing uploaded image
        |--------------------------------------------------------------------------
        */

        setImagePreview(
            trainer.image
                ? getImageUrl(trainer.image)
                : ""
        );

        setImageFile(null);

        setShowModal(true);
    };

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>
                    <h2 className="font-heading text-2xl font-bold text-dark-900">
                        Trainers Management
                    </h2>

                    <p className="text-dark-500">
                        Manage your gym trainers
                    </p>
                </div>

                <Button
                    onClick={handleAddTrainer}
                >
                    Add New Trainer
                </Button>

            </div>

            {/* Trainers Grid */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {loading ? (
                    [1, 2, 3, 4, 5, 6].map(
                        (i) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl p-6 skeleton h-80"
                            ></div>
                        )
                    )
                ) : trainers.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-dark-500">
                        No trainers found
                    </div>
                ) : (
                    trainers.map(
                        (trainer, index) => (
                            <motion.div
                                key={
                                    trainer._id
                                }
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay:
                                        index *
                                        0.1,
                                }}
                                className="bg-white rounded-xl shadow-sm border border-dark-100 overflow-hidden"
                            >

                                {/* Image */}

                                <div className="h-48 overflow-hidden">

                                    <img
                                        src={getImageUrl(
                                            trainer.image
                                        )}
                                        alt={
                                            trainer.name
                                        }
                                        className="w-full h-full object-cover"
                                    />

                                </div>

                                {/* Content */}

                                <div className="p-6">

                                    <h3 className="font-heading text-lg font-semibold text-dark-900 mb-1">
                                        {
                                            trainer.name
                                        }
                                    </h3>

                                    <p className="text-primary-600 text-sm mb-2">
                                        {
                                            trainer.specialization
                                        }
                                    </p>

                                    <p className="text-dark-500 text-sm mb-3">
                                        {
                                            trainer.experience
                                        }
                                        + Years
                                        Experience
                                    </p>

                                    {trainer.specialties &&
                                        trainer
                                            .specialties
                                            .length >
                                            0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">

                                                {trainer.specialties
                                                    .slice(
                                                        0,
                                                        3
                                                    )
                                                    .map(
                                                        (
                                                            specialty,
                                                            i
                                                        ) => (
                                                            <span
                                                                key={
                                                                    i
                                                                }
                                                                className="px-2 py-1 bg-dark-100 text-dark-600 text-xs rounded-full"
                                                            >
                                                                {
                                                                    specialty
                                                                }
                                                            </span>
                                                        )
                                                    )}

                                            </div>
                                        )}

                                    <div className="flex gap-2">

                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() =>
                                                handleEdit(
                                                    trainer
                                                )
                                            }
                                            className="flex-1"
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleDelete(
                                                    trainer._id
                                                )
                                            }
                                            className="text-red-600 border-red-200 hover:bg-red-50"
                                        >
                                            Delete
                                        </Button>

                                    </div>

                                </div>

                            </motion.div>
                        )
                    )
                )}

            </div>

            {/* Modal */}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/50">

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.95,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                    >

                        {/* Modal Header */}

                        <div className="p-6 border-b border-dark-200">

                            <h3 className="font-heading text-xl font-bold text-dark-900">

                                {editingTrainer
                                    ? "Edit Trainer"
                                    : "Add New Trainer"}

                            </h3>

                        </div>

                        {/* Form */}

                        <form
                            onSubmit={
                                handleSubmit
                            }
                            className="p-6 space-y-4"
                        >

                            <Input
                                label="Full Name"
                                value={
                                    formData.name
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e
                                            .target
                                            .value,
                                    })
                                }
                                required
                            />

                            <Input
                                label="Specialization"
                                value={
                                    formData.specialization
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        specialization:
                                            e
                                                .target
                                                .value,
                                    })
                                }
                                placeholder="e.g., Strength & Conditioning"
                                required
                            />

                            <div className="grid grid-cols-2 gap-4">

                                <Input
                                    label="Years of Experience"
                                    type="number"
                                    min="0"
                                    value={
                                        formData.experience
                                    }
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            experience:
                                                e
                                                    .target
                                                    .value,
                                        })
                                    }
                                    required
                                />

                                <Input
                                    label="Phone"
                                    value={
                                        formData.phone
                                    }
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            phone: e
                                                .target
                                                .value,
                                        })
                                    }
                                />

                            </div>

                            <Input
                                label="Email"
                                type="email"
                                value={
                                    formData.email
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e
                                            .target
                                            .value,
                                    })
                                }
                            />

                            <Input
                                label="Certifications (comma separated)"
                                value={
                                    formData.certifications
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        certifications:
                                            e
                                                .target
                                                .value,
                                    })
                                }
                                placeholder="NASM-CPT, NSCA-CSCS"
                            />

                            <Input
                                label="Specialties (comma separated)"
                                value={
                                    formData.specialties
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        specialties:
                                            e
                                                .target
                                                .value,
                                    })
                                }
                                placeholder="Weight Training, HIIT, Cardio"
                            />

                            {/* Image Upload */}

                            <div>

                                <label className="block text-sm font-medium text-dark-700 mb-2">
                                    Trainer Image
                                </label>

                                <input
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                                    onChange={
                                        handleImageChange
                                    }
                                    className="block w-full text-sm text-dark-600
                                    file:mr-4
                                    file:py-2
                                    file:px-4
                                    file:rounded-lg
                                    file:border-0
                                    file:bg-primary-50
                                    file:text-primary-700
                                    hover:file:bg-primary-100
                                    cursor-pointer"
                                />

                                <p className="text-xs text-dark-500 mt-2">
                                    JPG, PNG, WEBP or GIF
                                    • Maximum 5 MB
                                </p>

                            </div>

                            {/* Image Preview */}

                            {imagePreview && (
                                <div className="mt-3">

                                    <p className="text-sm font-medium text-dark-700 mb-2">
                                        Image Preview
                                    </p>

                                    <div className="relative w-full h-56 rounded-xl overflow-hidden border border-dark-200 bg-dark-50">

                                        <img
                                            src={
                                                imagePreview
                                            }
                                            alt="Trainer preview"
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                    {imageFile && (
                                        <p className="text-xs text-dark-500 mt-2">
                                            Selected:{" "}
                                            {
                                                imageFile.name
                                            }
                                        </p>
                                    )}

                                </div>
                            )}

                            {/* Bio */}

                            <div>

                                <label className="block text-sm font-medium text-dark-700 mb-2">
                                    Bio
                                </label>

                                <textarea
                                    value={
                                        formData.bio
                                    }
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            bio: e
                                                .target
                                                .value,
                                        })
                                    }
                                    rows="3"
                                    className="w-full px-4 py-3 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />

                            </div>

                            {/* Buttons */}

                            <div className="flex gap-3 pt-4">

                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={
                                        handleCloseModal
                                    }
                                    className="flex-1"
                                    disabled={saving}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    className="flex-1"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingTrainer
                                        ? "Update"
                                        : "Add Trainer"}
                                </Button>

                            </div>

                        </form>

                    </motion.div>

                </div>
            )}

        </div>
    );
};

export default TrainersPage;