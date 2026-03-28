import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import { trainerAPI, programAPI } from '../../services/api';

const AboutPage = () => {
    const [trainers, setTrainers] = useState([]);
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        fetchTrainers();
        fetchPrograms();
    }, []);

    const fetchTrainers = async () => {
        try {
            const response = await trainerAPI.getAll({ active: 'true' });
            if (response.data.success) {
                setTrainers(response.data.trainers.slice(0, 4));
            }
        } catch (error) {
            console.error('Error fetching trainers:', error);
        }
    };

    const fetchPrograms = async () => {
        try {
            const response = await programAPI.getAll({ active: 'true' });
            if (response.data.success) {
                setPrograms(response.data.programs);
            }
        } catch (error) {
            console.error('Error fetching programs:', error);
        }
    };

    const facilities = [
        {
            icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
            title: 'Modern Equipment',
            description: 'State-of-the-art fitness equipment from top brands'
        },
        {
            icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
            title: 'Group Classes',
            description: 'Wide variety of group fitness classes for all levels'
        },
        {
            icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
            title: '24/7 Access',
            description: 'Train anytime with our round-the-clock facility access'
        },
        {
            icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
            title: 'Personal Training',
            description: 'One-on-one coaching from certified fitness experts'
        },
        {
            icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
            title: 'Locker Rooms',
            description: 'Clean and secure locker facilities with showers'
        },
        {
            icon: 'M13 10V3L4 14h7v7l9-11h-7z',
            title: 'Cardio Zone',
            description: 'Dedicated area for cardiovascular exercises'
        }
    ];

    return (
        <>
            <Header />

            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-dark-950">
                    <div className="absolute inset-0 bg-gradient-to-r from-dark-950/95 via-dark-900/80 to-dark-950/90 z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=800&fit=crop"
                        alt="About Gym"
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
                            About FitPro
                        </span>
                        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
                            Building Stronger <span className="gradient-text">Communities</span>
                        </h1>
                        <p className="text-xl text-dark-300 max-w-2xl mx-auto">
                            We're more than a gym - we're a movement towards a healthier, stronger lifestyle.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Our Story</span>
                            <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark-900 mt-2 mb-6">
                                A Journey of <span className="gradient-text">Excellence</span>
                            </h2>
                            <div className="space-y-4 text-dark-600">
                                <p>
                                    Founded in 2014, FitPro Gym started with a simple vision: to create a fitness center that truly cares about its members' success. What began as a small local gym has grown into one of the most trusted fitness destinations in the region.
                                </p>
                                <p>
                                    Our founder, a former professional athlete, understood that achieving fitness goals requires more than just equipment - it needs community, guidance, and unwavering support. That's exactly what we've built at FitPro.
                                </p>
                                <p>
                                    Today, we're proud to serve thousands of members who have transformed their lives through fitness. Our state-of-the-art facilities, expert trainers, and diverse programs reflect our commitment to excellence.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div className="space-y-4">
                                <img
                                    src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=400&fit=crop"
                                    alt="Gym Interior"
                                    className="rounded-2xl"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=250&fit=crop"
                                    alt="Training"
                                    className="rounded-2xl"
                                />
                            </div>
                            <div className="space-y-4 pt-8">
                                <img
                                    src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=250&fit=crop"
                                    alt="Workout"
                                    className="rounded-2xl"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=300&h=400&fit=crop"
                                    alt="Training Session"
                                    className="rounded-2xl"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-8 shadow-lg"
                        >
                            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-dark-900 mb-4">Our Mission</h3>
                            <p className="text-dark-600">
                                To empower individuals to achieve their fitness goals through expert guidance, cutting-edge facilities, and a supportive community that inspires lasting transformation.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl p-8 shadow-lg"
                        >
                            <div className="w-14 h-14 bg-accent-100 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-7 h-7 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-dark-900 mb-4">Our Vision</h3>
                            <p className="text-dark-600">
                                To be the leading fitness center in the region, known for transforming lives and creating a healthier, stronger community for generations to come.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Facilities Section */}
            <section className="section-padding bg-dark-900 text-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">Our Facilities</span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold mt-2">
                            World-Class <span className="text-primary-500">Amenities</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {facilities.map((facility, index) => (
                            <motion.div
                                key={facility.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-dark-800 rounded-2xl p-6 hover:bg-dark-700 transition-colors duration-300"
                            >
                                <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={facility.icon} />
                                    </svg>
                                </div>
                                <h3 className="font-heading text-xl font-semibold mb-2">{facility.title}</h3>
                                <p className="text-dark-400">{facility.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Meet The Team</span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark-900 mt-2">
                            Our Expert <span className="gradient-text">Trainers</span>
                        </h2>
                        <p className="text-dark-600 mt-4 max-w-2xl mx-auto">
                            Our team of certified fitness professionals is dedicated to helping you achieve your goals.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {trainers.map((trainer, index) => (
                            <motion.div
                                key={trainer._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card group"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={trainer.image || 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=500&fit=crop'}
                                        alt={trainer.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-heading text-lg font-semibold text-dark-900 mb-1">
                                        {trainer.name}
                                    </h3>
                                    <p className="text-primary-600 text-sm">{trainer.specialization}</p>
                                    <p className="text-dark-500 text-sm mt-2">{trainer.experience}+ Years Experience</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link to="/trainers">
                            <Button variant="outline">View All Trainers</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800">
                <div className="container-custom text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                            Join FitPro today and experience the difference that quality facilities and expert guidance can make.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/membership">
                                <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-dark-100">
                                    View Membership Plans
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default AboutPage;

