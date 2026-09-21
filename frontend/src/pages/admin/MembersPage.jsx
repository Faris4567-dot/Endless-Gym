import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import {
    memberAPI,
    membershipAPI,
} from "../../services/api";

const MembersPage = () => {
    const [members, setMembers] = useState([]);
    const [membershipPlans, setMembershipPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: 'male',
        membershipPlan: '',
        membershipStatus: 'pending',
        fitnessGoal: ''
    });

    useEffect(() => {
        fetchMembers();
        fetchMembershipPlans();
    }, []);
    const fetchMembershipPlans = async () => {
        try {
            const response = await membershipAPI.getAll({
                active: true,
            });

            if (response.data.success) {
                setMembershipPlans(response.data.plans || []);
            }
        } catch (error) {
            console.error("Error fetching membership plans:", error);
        }
    };

    const fetchMembers = async () => {
        try {
            const response = await memberAPI.getAll();
            if (response.data.success) {
                setMembers(response.data.members);
            }
        } catch (error) {
            console.error('Error fetching members:', error);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingMember) {
                await memberAPI.update(editingMember._id, formData);
            } else {
                await memberAPI.create(formData);
            }
            fetchMembers();
            setShowModal(false);
            setEditingMember(null);
            setFormData({
                name: '',
                email: '',
                phone: '',
                gender: 'male',
                membershipPlan: '',
                membershipStatus: 'pending',
                fitnessGoal: ''
            });
        } catch (error) {
            console.error('Error saving member:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this member?')) {
            try {
                await memberAPI.delete(id);
                fetchMembers();
            } catch (error) {
                console.error('Error deleting member:', error);
            }
        }
    };
    const handleRenew = async (member) => {
        const confirmed = window.confirm(
            `Renew ${member.name}'s membership using the current plan?`
        );

        if (!confirmed) {
            return;
        }

        try {
            await memberAPI.renew(member._id);

            alert("Membership renewed successfully.");

            await fetchMembers();
        } catch (error) {
            console.error("Error renewing membership:", error);

            alert(
                error.response?.data?.message ||
                "Failed to renew membership."
            );
        }
    };

    const handleEdit = (member) => {
        setEditingMember(member);
        setFormData({
            name: member.name,
            email: member.email,
            phone: member.phone,
            gender: member.gender,
            membershipPlan:
                member.membershipPlan?._id ||
                member.membershipPlan ||
                '',
            membershipStatus: member.membershipStatus,
            fitnessGoal: member.fitnessGoal || ''
        });
        setShowModal(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-heading text-2xl font-bold text-dark-900">Members Management</h2>
                    <p className="text-dark-500">Manage your gym members</p>
                </div>
                <Button onClick={() => setShowModal(true)}>
                    Add New Member
                </Button>
            </div>

            {/* Members Table */}
            <div className="bg-white rounded-xl shadow-sm border border-dark-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-dark-50 border-b border-dark-200">
                            <tr>
                                <th className="text-left py-4 px-6 font-semibold text-dark-900">Member</th>
                                <th className="text-left py-4 px-6 font-semibold text-dark-900">Contact</th>
                                <th className="text-left py-4 px-6 font-semibold text-dark-900">Plan</th>
                                <th className="text-left py-4 px-6 font-semibold text-dark-900">Status</th>
                                <th className="text-left py-4 px-6 font-semibold text-dark-900">Joined</th>
                                <th className="text-left py-4 px-6 font-semibold text-dark-900">Expires</th>
                                <th className="text-right py-4 px-6 font-semibold text-dark-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8">Loading...</td>
                                </tr>
                            ) : members.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-dark-500">No members found</td>
                                </tr>
                            ) : (
                                members.map((member, index) => (
                                    <motion.tr
                                        key={member._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b border-dark-100 hover:bg-dark-50"
                                    >
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                                    <span className="text-primary-600 font-semibold">
                                                        {member.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-dark-900">{member.name}</p>
                                                    <p className="text-sm text-dark-500 capitalize">{member.gender}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-dark-700">{member.email}</p>
                                            <p className="text-sm text-dark-500">{member.phone}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <p className="text-dark-700 font-medium">
                                                    {member.planName || 'No Plan'}
                                                </p>

                                                {member.membershipPlan?.duration && (
                                                    <p className="text-sm text-dark-500 capitalize">
                                                        {member.membershipPlan.duration === 'monthly'
                                                            ? '1 Month'
                                                            : member.membershipPlan.duration === 'quarterly'
                                                                ? '3 Months'
                                                                : member.membershipPlan.duration === 'half-yearly'
                                                                    ? '6 Months'
                                                                    : member.membershipPlan.duration === 'yearly'
                                                                        ? '12 Months'
                                                                        : member.membershipPlan.duration}
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${member.membershipStatus === 'active'
                                                ? 'bg-green-100 text-green-700'
                                                : member.membershipStatus === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}>
                                                {member.membershipStatus}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-dark-500">
                                            {member.membershipStart
                                                ? new Date(member.membershipStart).toLocaleDateString()
                                                : new Date(member.createdAt).toLocaleDateString()}
                                        </td>

                                        <td className="py-4 px-6">
                                            {member.membershipEnd ? (
                                                (() => {
                                                    const expiryDate = new Date(member.membershipEnd);

                                                    const today = new Date();

                                                    expiryDate.setHours(0, 0, 0, 0);
                                                    today.setHours(0, 0, 0, 0);

                                                    const daysLeft = Math.ceil(
                                                        (expiryDate - today) /
                                                        (1000 * 60 * 60 * 24)
                                                    );

                                                    // EXPIRED
                                                    if (daysLeft < 0) {
                                                        return (
                                                            <div>
                                                                <p className="text-red-600 font-medium">
                                                                    {expiryDate.toLocaleDateString()}
                                                                </p>

                                                                <p className="text-xs text-red-500 font-medium">
                                                                    Expired
                                                                </p>
                                                            </div>
                                                        );
                                                    }

                                                    // EXPIRES TODAY
                                                    if (daysLeft === 0) {
                                                        return (
                                                            <div>
                                                                <p className="text-red-600 font-medium">
                                                                    {expiryDate.toLocaleDateString()}
                                                                </p>

                                                                <p className="text-xs text-red-500 font-medium">
                                                                    Expires today
                                                                </p>
                                                            </div>
                                                        );
                                                    }

                                                    // 1–7 DAYS
                                                    if (daysLeft <= 7) {
                                                        return (
                                                            <div>
                                                                <p className="text-orange-600 font-medium">
                                                                    {expiryDate.toLocaleDateString()}
                                                                </p>

                                                                <p className="text-xs text-orange-500 font-medium">
                                                                    {daysLeft}{" "}
                                                                    {daysLeft === 1
                                                                        ? "day"
                                                                        : "days"}{" "}
                                                                    left
                                                                </p>
                                                            </div>
                                                        );
                                                    }

                                                    // 8–30 DAYS
                                                    if (daysLeft <= 30) {
                                                        return (
                                                            <div>
                                                                <p className="text-yellow-600 font-medium">
                                                                    {expiryDate.toLocaleDateString()}
                                                                </p>

                                                                <p className="text-xs text-yellow-600">
                                                                    {daysLeft} days left
                                                                </p>
                                                            </div>
                                                        );
                                                    }

                                                    // MORE THAN 30 DAYS
                                                    return (
                                                        <div>
                                                            <p className="text-dark-700 font-medium">
                                                                {expiryDate.toLocaleDateString()}
                                                            </p>

                                                            <p className="text-xs text-dark-500">
                                                                {daysLeft} days left
                                                            </p>
                                                        </div>
                                                    );
                                                })()
                                            ) : (
                                                <span className="text-dark-400">
                                                    Not calculated
                                                </span>
                                            )}
                                        </td>

                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleRenew(member)}
                                                    className="px-3 py-2 text-xs font-medium text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                                                >
                                                    Renew
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(member)}
                                                    className="p-2 text-dark-500 hover:text-primary-600 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(member._id)}
                                                    className="p-2 text-dark-500 hover:text-red-600 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
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
                                {editingMember ? 'Edit Member' : 'Add New Member'}
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <Input
                                label="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark-700 mb-2">Gender</label>
                                <select
                                    value={formData.gender}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    className="w-full px-4 py-3 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                <div>
                                    <label className="block text-sm font-medium text-dark-700 mb-2">
                                        Membership Plan
                                    </label>

                                    <select
                                        value={formData.membershipPlan}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                membershipPlan: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-3 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    >
                                        <option value="">Select Membership Plan</option>

                                        {membershipPlans.map((plan) => (
                                            <option key={plan._id} value={plan._id}>
                                                {plan.name} - ₹{plan.price}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <label className="block text-sm font-medium text-dark-700 mb-2">Status</label>
                                <select
                                    value={formData.membershipStatus}
                                    onChange={(e) => setFormData({ ...formData, membershipStatus: e.target.value })}
                                    className="w-full px-4 py-3 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="active">Active</option>
                                    <option value="expired">Expired</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            <Input
                                label="Fitness Goal"
                                value={formData.fitnessGoal}
                                onChange={(e) => setFormData({ ...formData, fitnessGoal: e.target.value })}
                            />
                            <div className="flex gap-3 pt-4">
                                <Button type="button" variant="secondary" onClick={() => {
                                    setShowModal(false);
                                    setEditingMember(null);
                                }} className="flex-1">
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1">
                                    {editingMember ? 'Update' : 'Add Member'}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default MembersPage;

