import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { trainerAPI } from '../../services/api';

const TrainersPage = () => {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingTrainer, setEditingTrainer] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        specialization: '',
        experience: '',
        certifications: '',
        bio: '',
        image: '',
        phone: '',
        email: '',
        specialties: ''
    });

    useEffect(() => {
        fetchTrainers();
    }, []);

    const fetchTrainers = async () => {
        try {
            const response = await trainerAPI.getAll();
            if (response.data.success) {
                setTrainers(response.data.trainers);
            }
        } catch (error) {
            console.error('Error fetching trainers:', error);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                ...formData,
                experience: parseInt(formData.experience),
                certifications: formData.certifications.split(',').map(c => c.trim()).filter(c => c),
                specialties: formData.specialties.split(',').map(s => s.trim()).filter(s => s)
            };

            if (editingTrainer) {
                await trainerAPI.update(editingTrainer._id, data);
            } else {
                await trainerAPI.create(data);
            }
            fetchTrainers();
            setShowModal(false);
            setEditingTrainer(null);
            setFormData({
                name: '',
                specialization: '',
                experience: '',
                certifications: '',
                bio: '',
                image: '',
                phone: '',
                email: '',
                specialties: ''
            });
        } catch (error) {
            console.error('Error saving trainer:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this trainer?')) {
            try {
                await trainerAPI.delete(id);
                fetchTrainers();
            } catch (error) {
                console.error('Error deleting trainer:', error);
            }
        }
    };

    const handleEdit = (trainer) => {
        setEditingTrainer(trainer);
        setFormData({
            name: trainer.name,
            specialization: trainer.specialization,
            experience: trainer.experience.toString(),
            certifications: trainer.certifications?.join(', ') || '',
            bio: trainer.bio || '',
            image: trainer.image || '',
            phone: trainer.phone || '',
            email: trainer.email || '',
            specialties: trainer.specialties?.join(', ') || ''
        });
        setShowModal(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-heading text-2xl font-bold text-dark-900">Trainers Management</h2>
                    <p className="text-dark-500">Manage your gym trainers</p>
                </div>
                <Button onClick={() => setShowModal(true)}>
                    Add New Trainer
                </Button>
            </div>

            {/* Trainers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    [1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-xl p-6 skeleton h-80"></div>
                    ))
                ) : trainers.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-dark-500">
                        No trainers found
                    </div>
                ) : (
                    trainers.map((trainer, index) => (
                        <motion.div
                            key={trainer._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-sm border border-dark-100 overflow-hidden"
                        >
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={trainer.image || 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=300&fit=crop'}
                                    alt={trainer.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="font-heading text-lg font-semibold text-dark-900 mb-1">
                                    {trainer.name}
                                </h3>
                                <p className="text-primary-600 text-sm mb-2">{trainer.specialization}</p>
                                <p className="text-dark-500 text-sm mb-3">{trainer.experience}+ Years Experience</p>
                                {trainer.specialties && trainer.specialties.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {trainer.specialties.slice(0, 3).map((specialty, i) => (
                                            <span key={i} className="px-2 py-1 bg-dark-100 text-dark-600 text-xs rounded-full">
                                                {specialty}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    <Button variant="secondary" size="sm" onClick={() => handleEdit(trainer)} className="flex-1">
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handleDelete(trainer._id)} className="text-red-600 border-red-200 hover:bg-red-50">
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                    >
                        <div className="p-6 border-b border-dark-200">
                            <h3 className="font-heading text-xl font-bold text-dark-900">
                                {editingTrainer ? 'Edit Trainer' : 'Add New Trainer'}
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <Input
                                label="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <Input
                                label="Specialization"
                                value={formData.specialization}
                                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                placeholder="e.g., Strength & Conditioning"
                                required
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Years of Experience"
                                    type="number"
                                    value={formData.experience}
                                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <Input
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            <Input
                                label="Certifications (comma separated)"
                                value={formData.certifications}
                                onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                                placeholder="NASM-CPT, NSCA-CSCS"
                            />
                            <Input
                                label="Specialties (comma separated)"
                                value={formData.specialties}
                                onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                                placeholder="Weight Training, HIIT, Cardio"
                            />
                            <Input
                                label="Image URL"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://..."
                            />
                            <div>
                                <label className="block text-sm font-medium text-dark-700 mb-2">Bio</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    rows="3"
                                    className="w-full px-4 py-3 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                ></textarea>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <Button type="button" variant="secondary" onClick={() => {
                                    setShowModal(false);
                                    setEditingTrainer(null);
                                }} className="flex-1">
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1">
                                    {editingTrainer ? 'Update' : 'Add Trainer'}
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

