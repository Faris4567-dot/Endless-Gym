import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import { trainerAPI } from '../../services/api';

const TrainersPage = () => {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrainers();
    }, []);

    const fetchTrainers = async () => {
        try {
            const response = await trainerAPI.getAll({ active: 'true' });
            if (response.data.success) {
                setTrainers(response.data.trainers);
            }
        } catch (error) {
            console.error('Error fetching trainers:', error);
        }
        setLoading(false);
    };

    const defaultTrainers = [
        {
            _id: '1',
            name: 'Alex Johnson',
            specialization: 'Strength & Conditioning',
            experience: 8,
            certifications: ['NASM-CPT', 'NSCA-CSCS', 'CrossFit L2'],
            bio: 'Alex specializes in strength training and has helped hundreds of members achieve their muscle-building goals.',
            image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=500&fit=crop',
            specialties: ['Weight Training', 'Powerlifting', 'Sports Conditioning']
        },
        {
            _id: '2',
            name: 'Sarah Williams',
            specialization: 'Yoga & Mindfulness',
            experience: 6,
            certifications: ['RYT-500', 'Yoga Alliance Certified', 'Meditation Coach'],
            bio: 'Sarah brings peace and balance to your fitness journey through her expertise in yoga and meditation.',
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
            specialties: ['Yoga', 'Meditation', 'Flexibility']
        },
        {
            _id: '3',
            name: 'Mike Chen',
            specialization: 'HIIT & Cardio',
            experience: 5,
            certifications: ['ACE-CPT', 'TRX Certified', 'Group Fitness Instructor'],
            bio: 'Mike is known for his high-energy workouts that push you to your limits and beyond.',
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
            specialties: ['HIIT', 'Cardio', 'Weight Loss']
        },
        {
            _id: '4',
            name: 'Emily Davis',
            specialization: 'Personal Training',
            experience: 7,
            certifications: ['NASM-CPT', 'Precision Nutrition', 'Pre/Post Natal'],
            bio: 'Emily specializes in personalized training programs tailored to individual goals and needs.',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
            specialties: ['Personal Training', 'Nutrition', 'Body Transformation']
        }
    ];

    const displayTrainers = trainers.length > 0 ? trainers : defaultTrainers;

    return (
        <>
            <Header />

            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-dark-950">
                    <div className="absolute inset-0 bg-gradient-to-r from-dark-950/95 via-dark-900/80 to-dark-950/90 z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=800&fit=crop"
                        alt="Trainers"
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
                            Our Team
                        </span>
                        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
                            Meet Our Expert <span className="gradient-text">Trainers</span>
                        </h1>
                        <p className="text-xl text-dark-300 max-w-2xl mx-auto">
                            Our certified trainers are dedicated to helping you achieve your fitness goals.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Trainers Section */}
            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="card skeleton h-96"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {displayTrainers.map((trainer, index) => (
                                <motion.div
                                    key={trainer._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="card group"
                                >
                                    <div className="relative h-72 overflow-hidden">
                                        <img
                                            src={trainer.image || 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=500&fit=crop'}
                                            alt={trainer.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                            <div className="text-white">
                                                <p className="text-sm font-medium">{trainer.specialization}</p>
                                                <p className="text-xs text-dark-300">{trainer.experience}+ Years Experience</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-heading text-xl font-semibold text-dark-900 mb-1">
                                            {trainer.name}
                                        </h3>
                                        <p className="text-primary-600 text-sm mb-3">{trainer.specialization}</p>
                                        <p className="text-dark-600 text-sm mb-4 line-clamp-2">
                                            {trainer.bio}
                                        </p>
                                        {trainer.specialties && trainer.specialties.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {trainer.specialties.slice(0, 3).map((specialty, i) => (
                                                    <span key={i} className="px-2 py-1 bg-dark-100 text-dark-600 text-xs rounded-full">
                                                        {specialty}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <Link to="/contact">
                                            <Button variant="outline" className="w-full">
                                                Book Session
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose Personal Training */}
            <section className="section-padding bg-dark-900 text-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">Personal Training</span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold mt-2">
                            Why Choose <span className="text-primary-500">Personal Training</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-dark-800 rounded-2xl p-8"
                        >
                            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-heading text-xl font-semibold mb-2">Customized Workouts</h3>
                            <p className="text-dark-400">Programs tailored specifically to your body type, goals, and preferences.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-dark-800 rounded-2xl p-8"
                        >
                            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="font-heading text-xl font-semibold mb-2">Faster Results</h3>
                            <p className="text-dark-400">Get faster results with expert guidance and accountability.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-dark-800 rounded-2xl p-8"
                        >
                            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="font-heading text-xl font-semibold mb-2">Expert Motivation</h3>
                            <p className="text-dark-400">Stay motivated with one-on-one support from certified trainers.</p>
                        </motion.div>
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
                            Start Training Today
                        </h2>
                        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                            Book a session with one of our expert trainers and take your fitness to the next level.
                        </p>
                        <Link to="/contact">
                            <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-dark-100">
                                Contact Us
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default TrainersPage;

