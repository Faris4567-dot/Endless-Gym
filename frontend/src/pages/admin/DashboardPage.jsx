import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { memberAPI, inquiryAPI, trainerAPI, programAPI } from '../../services/api';

const DashboardPage = () => {
    const [stats, setStats] = useState({
        members: { total: 0, active: 0 },
        inquiries: { total: 0, new: 0 },
        trainers: { total: 0 },
        programs: { total: 0 }
    });
    const [loading, setLoading] = useState(true);
    const [recentMembers, setRecentMembers] = useState([]);
    const [recentInquiries, setRecentInquiries] = useState([]);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [memberRes, inquiryRes, trainerRes, programRes] = await Promise.all([
                memberAPI.getStats(),
                inquiryAPI.getStats(),
                trainerAPI.getStats(),
                programAPI.getStats()
            ]);

            if (memberRes.data.success && inquiryRes.data.success) {
                setStats({
                    members: {
                        total: memberRes.data.stats.total,
                        active: memberRes.data.stats.active
                    },
                    inquiries: {
                        total: inquiryRes.data.stats.total,
                        new: inquiryRes.data.stats.new
                    },
                    trainers: {
                        total: trainerRes.data.stats.total
                    },
                    programs: {
                        total: programRes.data.stats.total
                    }
                });
            }

            // Fetch recent data
            const [membersRes, inquiriesRes] = await Promise.all([
                memberAPI.getAll({ limit: 5 }),
                inquiryAPI.getAll()
            ]);

            if (membersRes.data.success) {
                setRecentMembers(membersRes.data.members);
            }
            if (inquiriesRes.data.success) {
                setRecentInquiries(inquiriesRes.data.inquiries.slice(0, 5));
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
        setLoading(false);
    };

    // Sample data for charts
    const monthlyData = [
        { name: 'Jan', members: 45 },
        { name: 'Feb', members: 52 },
        { name: 'Mar', members: 61 },
        { name: 'Apr', members: 58 },
        { name: 'May', members: 72 },
        { name: 'Jun', members: 85 },
    ];

    const membershipData = [
        { name: 'Active', value: stats.members.active || 65, color: '#0ea5e9' },
        { name: 'Expired', value: 20, color: '#ef4444' },
        { name: 'Pending', value: 15, color: '#f59e0b' },
    ];

    const statCards = [
        {
            title: 'Total Members',
            value: stats.members.total || 156,
            change: '+12%',
            icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
            color: 'bg-primary-500'
        },
        {
            title: 'Active Memberships',
            value: stats.members.active || 124,
            change: '+8%',
            icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
            color: 'bg-green-500'
        },
        {
            title: 'New Inquiries',
            value: stats.inquiries.new || 28,
            change: '+24%',
            icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
            color: 'bg-accent-500'
        },
        {
            title: 'Trainers',
            value: stats.trainers.total || 12,
            change: '+2',
            icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
            color: 'bg-purple-500'
        },
    ];

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl p-6 shadow-sm border border-dark-100"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-dark-500 text-sm">{stat.title}</p>
                                <p className="text-2xl font-bold text-dark-900 mt-1">{stat.value}</p>
                                <p className="text-green-600 text-sm mt-1">{stat.change} this month</p>
                            </div>
                            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Member Growth Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl p-6 shadow-sm border border-dark-100"
                >
                    <h3 className="font-heading font-semibold text-lg text-dark-900 mb-4">Member Growth</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="name" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px'
                                }}
                            />
                            <Bar dataKey="members" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Membership Status */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-xl p-6 shadow-sm border border-dark-100"
                >
                    <h3 className="font-heading font-semibold text-lg text-dark-900 mb-4">Membership Status</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={membershipData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {membershipData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-6 mt-4">
                        {membershipData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                <span className="text-sm text-dark-600">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Members */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-xl p-6 shadow-sm border border-dark-100"
                >
                    <h3 className="font-heading font-semibold text-lg text-dark-900 mb-4">Recent Members</h3>
                    <div className="space-y-4">
                        {recentMembers.length > 0 ? recentMembers.map((member) => (
                            <div key={member._id} className="flex items-center justify-between py-3 border-b border-dark-100 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                        <span className="text-primary-600 font-semibold">
                                            {member.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-dark-900">{member.name}</p>
                                        <p className="text-sm text-dark-500">{member.email}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${member.membershipStatus === 'active'
                                        ? 'bg-green-100 text-green-700'
                                        : member.membershipStatus === 'pending'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}>
                                    {member.membershipStatus}
                                </span>
                            </div>
                        )) : (
                            <p className="text-dark-500 text-center py-4">No recent members</p>
                        )}
                    </div>
                </motion.div>

                {/* Recent Inquiries */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white rounded-xl p-6 shadow-sm border border-dark-100"
                >
                    <h3 className="font-heading font-semibold text-lg text-dark-900 mb-4">Recent Inquiries</h3>
                    <div className="space-y-4">
                        {recentInquiries.length > 0 ? recentInquiries.map((inquiry) => (
                            <div key={inquiry._id} className="flex items-center justify-between py-3 border-b border-dark-100 last:border-0">
                                <div>
                                    <p className="font-medium text-dark-900">{inquiry.name}</p>
                                    <p className="text-sm text-dark-500">{inquiry.email}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${inquiry.status === 'new'
                                        ? 'bg-blue-100 text-blue-700'
                                        : inquiry.status === 'contacted'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : 'bg-green-100 text-green-700'
                                    }`}>
                                    {inquiry.status}
                                </span>
                            </div>
                        )) : (
                            <p className="text-dark-500 text-center py-4">No recent inquiries</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default DashboardPage;

