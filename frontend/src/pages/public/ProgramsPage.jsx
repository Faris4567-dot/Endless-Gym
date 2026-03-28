import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import { programAPI } from '../../services/api';

const ProgramsPage = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const response = await programAPI.getAll({ active: 'true' });
            if (response.data.success) {
                setPrograms(response.data.programs);
            }
        } catch (error) {
            console.error('Error fetching programs:', error);
        }
        setLoading(false);
    };

    const categories = [
        { id: 'all', name: 'All Programs' },
        { id: 'weight-training', name: 'Weight Training' },
        { id: 'crossfit', name: 'CrossFit' },
        { id: 'yoga', name: 'Yoga' },
        { id: 'cardio', name: 'Cardio' },
        { id: 'personal-training', name: 'Personal Training' },
    ];

    const filteredPrograms = selectedCategory === 'all'
        ? programs
        : programs.filter(p => p.category === selectedCategory);

    const programImages = {
        'weight-training': 'https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=600&h=400&fit=crop',
        'crossfit': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
        'yoga': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
        'cardio': 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&h=400&fit=crop',
        'personal-training': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop',
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
                        alt="Programs"
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
                            Our Programs
                        </span>
                        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
                            Find Your Perfect <span className="gradient-text">Workout</span>
                        </h1>
                        <p className="text-xl text-dark-300 max-w-2xl mx-auto">
                            From high-intensity training to mindful yoga, we have programs for every fitness goal.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Programs Section */}
            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-4 mb-12"
                    >
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category.id
                                        ? 'bg-primary-600 text-white shadow-lg'
                                        : 'bg-white text-dark-700 hover:bg-primary-50 hover:text-primary-600'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </motion.div>

                    {/* Programs Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="card skeleton h-96"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPrograms.map((program, index) => (
                                <motion.div
                                    key={program._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="card group"
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={program.image || programImages[program.category] || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop'}
                                            alt={program.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full capitalize">
                                                {program.category.replace('-', ' ')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-heading text-xl font-semibold text-dark-900 mb-2">
                                            {program.name}
                                        </h3>
                                        <p className="text-dark-600 text-sm mb-4 line-clamp-2">
                                            {program.description}
                                        </p>
                                        {program.schedule && (
                                            <div className="flex items-center gap-2 text-sm text-dark-500 mb-3">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {program.schedule}
                                            </div>
                                        )}
                                        {program.trainerName && (
                                            <div className="flex items-center gap-2 text-sm text-dark-500 mb-4">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                {program.trainerName}
                                            </div>
                                        )}
                                        <Link to="/contact">
                                            <Button variant="outline" className="w-full">
                                                Enroll Now
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {filteredPrograms.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <p className="text-dark-500">No programs found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-padding bg-dark-900 text-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">Why FitPro</span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold mt-2">
                            Why Choose Our <span className="text-primary-500">Programs</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-heading text-xl font-semibold mb-2">Certified Trainers</h3>
                            <p className="text-dark-400">All programs are led by certified fitness professionals with years of experience.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="font-heading text-xl font-semibold mb-2">Modern Equipment</h3>
                            <p className="text-dark-400">State-of-the-art facilities and equipment to support your fitness journey.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="font-heading text-xl font-semibold mb-2">Supportive Community</h3>
                            <p className="text-dark-400">Join a community of like-minded individuals on their fitness journey.</p>
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
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                            Contact us today to learn more about our programs and find the perfect fit for your fitness goals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact">
                                <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-dark-100">
                                    Contact Us
                                </Button>
                            </Link>
                            <Link to="/membership">
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                                    View Membership Plans
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

export default ProgramsPage;

