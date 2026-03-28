import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import { inquiryAPI } from '../../services/api';

const InquiriesPage = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const response = await inquiryAPI.getAll();
            if (response.data.success) {
                setInquiries(response.data.inquiries);
            }
        } catch (error) {
            console.error('Error fetching inquiries:', error);
        }
        setLoading(false);
    };

    const handleStatusChange = async (id, status) => {
        try {
            await inquiryAPI.updateStatus(id, { status });
            fetchInquiries();
        } catch (error) {
            console.error('Error updating inquiry:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this inquiry?')) {
            try {
                await inquiryAPI.delete(id);
                fetchInquiries();
            } catch (error) {
                console.error('Error deleting inquiry:', error);
            }
        }
    };

    const filteredInquiries = filter === 'all'
        ? inquiries
        : inquiries.filter(i => i.status === filter);

    const statusColors = {
        new: 'bg-blue-100 text-blue-700',
        contacted: 'bg-yellow-100 text-yellow-700',
        converted: 'bg-green-100 text-green-700',
        closed: 'bg-gray-100 text-gray-700'
    };

    const stats = {
        total: inquiries.length,
        new: inquiries.filter(i => i.status === 'new').length,
        contacted: inquiries.filter(i => i.status === 'contacted').length,
        converted: inquiries.filter(i => i.status === 'converted').length
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-heading text-2xl font-bold text-dark-900">Inquiries Management</h2>
                    <p className="text-dark-500">Manage customer inquiries and leads</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-dark-100">
                    <p className="text-dark-500 text-sm">Total Inquiries</p>
                    <p className="text-2xl font-bold text-dark-900">{stats.total}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-dark-100">
                    <p className="text-dark-500 text-sm">New</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-dark-100">
                    <p className="text-dark-500 text-sm">Contacted</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.contacted}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-dark-100">
                    <p className="text-dark-500 text-sm">Converted</p>
                    <p className="text-2xl font-bold text-green-600">{stats.converted}</p>
                </div>
            </div>

            {/* Filter */}
            <div className="flex gap-2">
                {['all', 'new', 'contacted', 'converted', 'closed'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === status
                                ? 'bg-primary-600 text-white'
                                : 'bg-white text-dark-700 hover:bg-dark-50 border border-dark-200'
                            }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            {/* Inquiries List */}
            <div className="bg-white rounded-xl shadow-sm border border-dark-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-dark-50 border-b border-dark-200">
                            <tr>
                                <th className="text-left py-4 px-6 font-semibold text-dark-900">Customer</th>
                                <th className="text-left py-4 px-6 font-semibold text-dark-900">Contact</th>
                                <th className="text-left py-4 px-6 font-semibold text-dark-900">Goal</th>
                                <th className="text-left py-4 px-6 font-semibold text-dark-900">Status</th>
                                <th className="text-left py-4 px-6 font-semibold text-dark-900">Date</th>
                                <th className="text-right py-4 px-6 font-semibold text-dark-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8">Loading...</td>
                                </tr>
                            ) : filteredInquiries.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-dark-500">No inquiries found</td>
                                </tr>
                            ) : (
                                filteredInquiries.map((inquiry, index) => (
                                    <motion.tr
                                        key={inquiry._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b border-dark-100 hover:bg-dark-50"
                                    >
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                                    <span className="text-primary-600 font-semibold">
                                                        {inquiry.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-dark-900">{inquiry.name}</p>
                                                    {inquiry.message && (
                                                        <p className="text-sm text-dark-500 line-clamp-1">{inquiry.message}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-dark-700">{inquiry.email}</p>
                                            <p className="text-sm text-dark-500">{inquiry.phone}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-dark-600 capitalize">
                                                {inquiry.fitnessGoal?.replace('-', ' ') || '-'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <select
                                                value={inquiry.status}
                                                onChange={(e) => handleStatusChange(inquiry._id, e.target.value)}
                                                className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${statusColors[inquiry.status]}`}
                                            >
                                                <option value="new">New</option>
                                                <option value="contacted">Contacted</option>
                                                <option value="converted">Converted</option>
                                                <option value="closed">Closed</option>
                                            </select>
                                        </td>
                                        <td className="py-4 px-6 text-dark-500">
                                            {new Date(inquiry.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {inquiry.status === 'new' && (
                                                    <button
                                                        onClick={() => handleStatusChange(inquiry._id, 'contacted')}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Mark as Contacted"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                        </svg>
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(inquiry._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
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
        </div>
    );
};

export default InquiriesPage;

