import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const GalleryPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const galleryImages = [
        {
            id: 1,
            src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
            category: 'gym-floor',
            title: 'Main Gym Floor'
        },
        {
            id: 2,
            src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
            category: 'training',
            title: 'Strength Training'
        },
        {
            id: 3,
            src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
            category: 'training',
            title: 'Personal Training'
        },
        {
            id: 4,
            src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop',
            category: 'cardio',
            title: 'Cardio Zone'
        },
        {
            id: 5,
            src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
            category: 'yoga',
            title: 'Yoga Studio'
        },
        {
            id: 6,
            src: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&h=600&fit=crop',
            category: 'training',
            title: 'HIIT Class'
        },
        {
            id: 7,
            src: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&h=600&fit=crop',
            category: 'cardio',
            title: 'Cardio Equipment'
        },
        {
            id: 8,
            src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
            category: 'training',
            title: 'One-on-One Training'
        },
        {
            id: 9,
            src: 'https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=800&h=600&fit=crop',
            category: 'weightlifting',
            title: 'Free Weights Area'
        },
        {
            id: 10,
            src: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=600&fit=crop',
            category: 'gym-floor',
            title: 'Training Area'
        },
        {
            id: 11,
            src: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800&h=600&fit=crop',
            category: 'training',
            title: 'CrossFit Zone'
        },
        {
            id: 12,
            src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&h=600&fit=crop',
            category: 'yoga',
            title: 'Stretching Area'
        }
    ];

    const categories = [
        { id: 'all', name: 'All' },
        { id: 'gym-floor', name: 'Gym Floor' },
        { id: 'training', name: 'Training' },
        { id: 'cardio', name: 'Cardio' },
        { id: 'yoga', name: 'Yoga' },
        { id: 'weightlifting', name: 'Weightlifting' }
    ];

    const [activeCategory, setActiveCategory] = useState('all');

    const filteredImages = activeCategory === 'all'
        ? galleryImages
        : galleryImages.filter(img => img.category === activeCategory);

    return (
        <>
            <Header />

            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-dark-950">
                    <div className="absolute inset-0 bg-gradient-to-r from-dark-950/95 via-dark-900/80 to-dark-950/90 z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=800&fit=crop"
                        alt="Gallery"
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
                            Our Gallery
                        </span>
                        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
                            Explore Our <span className="gradient-text">Facility</span>
                        </h1>
                        <p className="text-xl text-dark-300 max-w-2xl mx-auto">
                            Take a visual tour of our state-of-the-art gym facilities and equipment.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Section */}
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
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === category.id
                                        ? 'bg-primary-600 text-white shadow-lg'
                                        : 'bg-white text-dark-700 hover:bg-primary-50 hover:text-primary-600'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </motion.div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredImages.map((image, index) => (
                            <motion.div
                                key={image.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="relative group cursor-pointer overflow-hidden rounded-xl"
                                onClick={() => setSelectedImage(image)}
                            >
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="text-white text-center">
                                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                        <p className="font-medium">{image.title}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Equipment Section */}
            <section className="section-padding bg-dark-900 text-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">Equipment</span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold mt-2">
                            Top-Quality <span className="text-primary-500">Gear</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            'Free Weights',
                            'Cardio Machines',
                            'Resistance Machines',
                            'Functional Training'
                        ].map((item, index) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-dark-800 rounded-xl p-6 text-center"
                            >
                                <div className="w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                    </svg>
                                </div>
                                <h3 className="font-heading font-semibold">{item}</h3>
                            </motion.div>
                        ))}
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
                            Experience It In Person
                        </h2>
                        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                            Book a free tour today and see our facility for yourself.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-dark-100 transition-colors duration-300"
                        >
                            Schedule a Tour
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-dark-950/95 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-primary-500 transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img
                        src={selectedImage.src}
                        alt={selectedImage.title}
                        className="max-w-full max-h-[90vh] object-contain rounded-lg"
                    />
                </div>
            )}

            <Footer />
        </>
    );
};

export default GalleryPage;

