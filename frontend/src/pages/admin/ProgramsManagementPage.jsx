import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { programAPI, trainerAPI } from '../../services/api';

const ProgramsManagementPage = () => {
    const [programs, setPrograms] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProgram, setEditingProgram] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'weight-training',
        image: '',
        schedule: '',
        duration: '',
        trainerName: '',
        price: ''
    });

    const categories = [
        { id: 'weight-training', name: 'Weight Training' },
        { id: 'crossfit', name: 'CrossFit' },
        { id: 'yoga', name: 'Yoga' },
        { id: 'cardio', name: 'Cardio' },
        { id: 'personal-training', name: 'Personal Training' },
        { id: 'spinning', name: 'Spinning' },
        { id: 'zumba', name: 'Zumba' },
        { id: 'hiit', name: 'HIIT' }
    ];

    useEffect(() => {
        fetchPrograms();
        fetchTrainers();
    }, []);

    const fetchPrograms = async () => {
        try {
            const response = await programAPI.getAll();
            if (response.data.success) {
                setPrograms(response.data.programs);
            }
        } catch (error) {
            console.error('Error fetching programs:', error);
        }
        setLoading(false);
    };

    const fetchTrainers = async () => {
        try {
            const response = await trainerAPI.getAll();
            if (response.data.success) {
                setTrainers(response.data.trainers);
            }
        } catch (error) {
            console.error('Error fetching trainers:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                ...formData,
                price: parseFloat(formData.price) || 0
            };

            if (editingProgram) {
                await programAPI.update(editingProgram._id, data);
            } else {
                await programAPI.create(data);
            }
            fetchPrograms();
            setShowModal(false);
            setEditingProgram(null);
            setFormData({
                name: '',
                description: '',
                category: 'weight-training',
                image: '',
                schedule: '',
                duration: '',
                trainerName: '',
                price: ''
            });
        } catch (error) {
            console.error('Error saving program:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this program?')) {
            try {
                await programAPI.delete(id);
                fetchPrograms();
            } catch (error) {
                console.error('Error deleting program:', error);
            }
        }
    };

    const handleEdit = (program) => {
        setEditingProgram(program);
        setFormData({
            name: program.name,
            description: program.description,
            category: program.category,
            image: program.image || '',
            schedule: program.schedule || '',
            duration: program.duration || '',
            trainerName: program.trainerName || '',
            price: program.price?.toString() || ''
        });
        setShowModal(true);
    };

    const categoryColors = {
        'weight-training': 'bg-blue-100 text-blue-700',
        'crossfit': 'bg-orange-100 text-orange-700',
        'yoga': 'bg-purple-100 text-purple-700',
        'cardio': 'bg-red-100 text-red-700',
        'personal-training': 'bg-green-100 text-green-700',
        'spinning': 'bg-pink-100 text-pink-700',
        'zumba': 'bg-yellow-100 text-yellow-700',
        'hiit': 'bg-cyan-100 text-cyan-700'
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-heading text-2xl font-bold text-dark-900">Programs Management</h2>
                    <p className="text-dark-500">Manage your fitness programs</p>
                </div>
                <Button onClick={() => setShowModal(true)}>
                    Add New Program
                </Button>
            </div>

            {/* Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    [1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-xl p-6 skeleton h-72"></div>
                    ))
                ) : programs.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-dark-500">
                        No programs found
                    </div>
                ) : (
                    programs.map((program, index) => (
                        <motion.div
                            key={program._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-sm border border-dark-100 overflow-hidden"
                        >
                            <div className="h-40 overflow-hidden">
                                <img
                                    src={program.image || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop'}
                                    alt={program.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-heading text-lg font-semibold text-dark-900">
                                        {program.name}
                                    </h3>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[program.category] || 'bg-gray-100 text-gray-700'}`}>
                                        {program.category.replace('-', ' ')}
                                    </span>
                                </div>
                                <p className="text-dark-500 text-sm mb-3 line-clamp-2">{program.description}</p>
                                <div className="flex items-center justify-between text-sm text-dark-500 mb-3">
                                    {program.schedule && <span>📅 {program.schedule}</span>}
                                    {program.price > 0 && <span>${program.price}</span>}
                                </div>
                                {program.trainerName && (
                                    <p className="text-sm text-primary-600 mb-3">👤 {program.trainerName}</p>
                                )}
                                <div className="flex gap-2">
                                    <Button variant="secondary" size="sm" onClick={() => handleEdit(program)} className="flex-1">
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handleDelete(program._id)} className="text-red-600 border-red-200 hover:bg-red-50">
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
                                {editingProgram ? 'Edit Program' : 'Add New Program'}
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <Input
                                label="Program Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <div>
                                <label className="block text-sm font-medium text-dark-700 mb-2">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark-700 mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows="3"
                                    className="w-full px-4 py-3 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    required
                                ></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Schedule"
                                    value={formData.schedule}
                                    onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                                    placeholder="Mon-Fri 6AM-8PM"
                                />
                                <Input
                                    label="Duration"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    placeholder="1 hour"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Trainer Name"
                                    value={formData.trainerName}
                                    onChange={(e) => setFormData({ ...formData, trainerName: e.target.value })}
                                />
                                <Input
                                    label="Price ($)"
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                            <Input
                                label="Image URL"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://..."
                            />
                            <div className="flex gap-3 pt-4">
                                <Button type="button" variant="secondary" onClick={() => {
                                    setShowModal(false);
                                    setEditingProgram(null);
                                }} className="flex-1">
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1">
                                    {editingProgram ? 'Update' : 'Add Program'}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ProgramsManagementPage;

