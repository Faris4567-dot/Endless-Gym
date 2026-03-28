import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { membershipAPI } from '../../services/api';

const MembershipsPage = () => {
    const [memberships, setMemberships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingMembership, setEditingMembership] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        duration: 'monthly',
        price: '',
        originalPrice: '',
        features: '',
        isPopular: false
    });

    const durations = [
        { id: 'monthly', name: 'Monthly' },
        { id: 'quarterly', name: 'Quarterly' },
        { id: 'half-yearly', name: 'Half Yearly' },
        { id: 'yearly', name: 'Yearly' }
    ];

    useEffect(() => {
        fetchMemberships();
    }, []);

    const fetchMemberships = async () => {
        try {
            const response = await membershipAPI.getAll();
            if (response.data.success) {
                setMemberships(response.data.plans);
            }
        } catch (error) {
            console.error('Error fetching memberships:', error);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                ...formData,
                price: parseFloat(formData.price) || 0,
                originalPrice: parseFloat(formData.originalPrice) || 0,
                features: formData.features.split('\n').filter(f => f.trim())
            };

            if (editingMembership) {
                await membershipAPI.update(editingMembership._id, data);
            } else {
                await membershipAPI.create(data);
            }
            fetchMemberships();
            setShowModal(false);
            setEditingMembership(null);
            setFormData({
                name: '',
                description: '',
                duration: 'monthly',
                price: '',
                originalPrice: '',
                features: '',
                isPopular: false
            });
        } catch (error) {
            console.error('Error saving membership:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this membership plan?')) {
            try {
                await membershipAPI.delete(id);
                fetchMemberships();
            } catch (error) {
                console.error('Error deleting membership:', error);
            }
        }
    };

    const handleEdit = (membership) => {
        setEditingMembership(membership);
        setFormData({
            name: membership.name,
            description: membership.description || '',
            duration: membership.duration,
            price: membership.price?.toString() || '',
            originalPrice: membership.originalPrice?.toString() || '',
            features: membership.features?.join('\n') || '',
            isPopular: membership.isPopular || false
        });
        setShowModal(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-heading text-2xl font-bold text-dark-900">Membership Plans</h2>
                    <p className="text-dark-500">Manage your membership plans</p>
                </div>
                <Button onClick={() => setShowModal(true)}>
                    Add New Plan
                </Button>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    [1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-xl p-6 skeleton h-80"></div>
                    ))
                ) : memberships.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-dark-500">
                        No membership plans found
                    </div>
                ) : (
                    memberships.map((plan, index) => (
                        <motion.div
                            key={plan._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-white rounded-xl shadow-sm border border-dark-100 overflow-hidden relative ${plan.isPopular ? 'ring-2 ring-primary-500' : ''
                                }`}
                        >
                            {plan.isPopular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="px-4 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                                        Popular
                                    </span>
                                </div>
                            )}
                            <div className="p-6">
                                <h3 className="font-heading text-xl font-bold text-dark-900 mb-2">
                                    {plan.name}
                                </h3>
                                <p className="text-dark-500 text-sm mb-4">{plan.description}</p>
                                <div className="mb-4">
                                    <span className="text-4xl font-heading font-bold text-dark-900">
                                        ${plan.price}
                                    </span>
                                    <span className="text-dark-500">/{plan.duration}</span>
                                </div>
                                <ul className="space-y-2 mb-6">
                                    {plan.features?.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-dark-600">
                                            <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex gap-2">
                                    <Button variant="secondary" size="sm" onClick={() => handleEdit(plan)} className="flex-1">
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handleDelete(plan._id)} className="text-red-600 border-red-200 hover:bg-red-50">
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
                                {editingMembership ? 'Edit Plan' : 'Add New Plan'}
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <Input
                                label="Plan Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g., Basic, Pro, Elite"
                                required
                            />
                            <div>
                                <label className="block text-sm font-medium text-dark-700 mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows="2"
                                    className="w-full px-4 py-3 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark-700 mb-2">Duration</label>
                                <select
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    className="w-full px-4 py-3 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    {durations.map((d) => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Price ($)"
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Original Price ($)"
                                    type="number"
                                    value={formData.originalPrice}
                                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark-700 mb-2">Features (one per line)</label>
                                <textarea
                                    value={formData.features}
                                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                    rows="5"
                                    placeholder="Gym Access&#10;Locker Room&#10;Group Classes"
                                    className="w-full px-4 py-3 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                ></textarea>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isPopular"
                                    checked={formData.isPopular}
                                    onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                                    className="w-4 h-4 text-primary-600 border-dark-300 rounded focus:ring-primary-500"
                                />
                                <label htmlFor="isPopular" className="text-sm text-dark-700">
                                    Mark as Popular
                                </label>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <Button type="button" variant="secondary" onClick={() => {
                                    setShowModal(false);
                                    setEditingMembership(null);
                                }} className="flex-1">
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1">
                                    {editingMembership ? 'Update' : 'Add Plan'}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default MembershipsPage;

