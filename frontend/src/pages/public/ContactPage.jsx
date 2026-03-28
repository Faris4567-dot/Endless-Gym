import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { inquiryAPI } from '../../services/api';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        fitnessGoal: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await inquiryAPI.create(formData);
            if (response.data.success) {
                setSuccess(true);
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    fitnessGoal: '',
                    message: ''
                });
                setTimeout(() => setSuccess(false), 5000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        }
        setLoading(false);
    };

    return (
        <>
            <Header />

            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-dark-950">
                    <div className="absolute inset-0 bg-gradient-to-r from-dark-950/95 via-dark-900/80 to-dark-950/90 z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=800&fit=crop"
                        alt="Contact"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-20 container-custom text-center text-white pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-2 bg-primary-600/20 border border-primary-500/30 rounded-full text-primary-400 text-sm font-medium mb-6">
                            Contact Us
                        </span>
                        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
                            Get In <span className="gradient-text">Touch</span>
                        </h1>
                        <p className="text-xl text-dark-300 max-w-2xl mx-auto">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-8 shadow-lg"
                        >
                            <h2 className="font-heading text-2xl font-bold text-dark-900 mb-6">
                                Send Us a Message
                            </h2>

                            {success ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="font-heading text-xl font-bold text-dark-900 mb-2">Thank You!</h3>
                                    <p className="text-dark-600">We've received your message and will be in touch soon.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {error && (
                                        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                                            {error}
                                        </div>
                                    )}
                                    <Input
                                        label="Full Name"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            label="Phone Number"
                                            name="phone"
                                            placeholder="+1 (555) 000-0000"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                        <Input
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-dark-700 mb-2">
                                            Fitness Goal
                                        </label>
                                        <select
                                            name="fitnessGoal"
                                            value={formData.fitnessGoal}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        >
                                            <option value="">Select your goal</option>
                                            <option value="weight-loss">Weight Loss</option>
                                            <option value="muscle-gain">Muscle Gain</option>
                                            <option value="strength">Strength Training</option>
                                            <option value="cardio">Cardio Fitness</option>
                                            <option value="flexibility">Flexibility</option>
                                            <option value="general-fitness">General Fitness</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-dark-700 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            rows="4"
                                            placeholder="Tell us about yourself and your fitness goals..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                        ></textarea>
                                    </div>
                                    <Button type="submit" className="w-full" loading={loading}>
                                        Send Message
                                    </Button>
                                </form>
                            )}
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h3 className="font-heading text-xl font-bold text-dark-900 mb-6">
                                    Contact Information
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-dark-900">Address</h4>
                                            <p className="text-dark-600">123 Fitness Street, Gym City, GC 12345</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-dark-900">Phone</h4>
                                            <p className="text-dark-600">+1 (555) 123-4567</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-dark-900">Email</h4>
                                            <p className="text-dark-600">info@fitpro.gym</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-dark-900">Hours</h4>
                                            <p className="text-dark-600">Mon - Fri: 5:00 AM - 11:00 PM</p>
                                            <p className="text-dark-600">Sat - Sun: 6:00 AM - 9:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h3 className="font-heading text-xl font-bold text-dark-900 mb-4">
                                    Find Us
                                </h3>
                                <div className="h-64 bg-dark-100 rounded-xl flex items-center justify-center">
                                    <div className="text-center text-dark-500">
                                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <p>Google Map Integration</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default ContactPage;

