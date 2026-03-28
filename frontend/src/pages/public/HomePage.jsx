import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { inquiryAPI, programAPI, membershipAPI, trainerAPI } from '../../services/api';

const HomePage = () => {
    const [programs, setPrograms] = useState([]);
    const [memberships, setMemberships] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [inquiryForm, setInquiryForm] = useState({
        name: '',
        phone: '',
        email: '',
        fitnessGoal: '',
        message: ''
    });
    const [formLoading, setFormLoading] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);

    useEffect(() => {
        fetchPrograms();
        fetchMemberships();
        fetchTrainers();
    }, []);

    const fetchPrograms = async () => {
        try {
            const response = await programAPI.getAll({ active: 'true' });
            if (response.data.success) {
                setPrograms(response.data.programs.slice(0, 4));
            }
        } catch (error) {
            console.error('Error fetching programs:', error);
        }
    };

    const fetchMemberships = async () => {
        try {
            const response = await membershipAPI.getAll({ active: 'true' });
            if (response.data.success) {
                setMemberships(response.data.plans.slice(0, 3));
            }
        } catch (error) {
            console.error('Error fetching memberships:', error);
        }
    };

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

    const handleInquirySubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        try {
            const response = await inquiryAPI.create(inquiryForm);
            if (response.data.success) {
                setFormSuccess(true);
                setInquiryForm({
                    name: '',
                    phone: '',
                    email: '',
                    fitnessGoal: '',
                    message: ''
                });
                setTimeout(() => setFormSuccess(false), 5000);
            }
        } catch (error) {
            console.error('Error submitting inquiry:', error);
        }
        setFormLoading(false);
    };

    const stats = [
        { value: '500+', label: 'Active Members' },
        { value: '20+', label: 'Expert Trainers' },
        { value: '50+', label: 'Fitness Programs' },
        { value: '10+', label: 'Years Experience' }
    ];

    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Member since 2022',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
            text: 'FitPro has completely transformed my fitness journey. The trainers are amazing and the facilities are top-notch!'
        },
        {
            name: 'Michael Chen',
            role: 'Member since 2021',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            text: 'Best gym I have ever been to. The community here is incredibly supportive and motivating.'
        },
        {
            name: 'Emily Davis',
            role: 'Member since 2023',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            text: 'Lost 20 pounds in 3 months! The personal training program is worth every penny.'
        }
    ];

    return (
        <>
            <Header />

            {/* Hero Section */}
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0 bg-dark-950">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/95 via-dark-900/80 to-dark-950/90 z-10"></div>
        <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop"
            alt="Gym Background"
            className="w-full h-full object-cover"
        />
    </div>

    {/* Content */}
    <div className="relative z-20 container-custom text-center text-white pt-20 -translate-y-16">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <span className="inline-block px-4 py-2 bg-primary-600/20 border border-primary-500/30 rounded-full text-primary-400 text-sm font-medium mb-6">
                Welcome to FitPro Gym
            </span>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Transform Your Body,
                <span className="block gradient-text">Transform Your Life</span>
            </h1>

            <p className="text-xl md:text-2xl text-dark-300 max-w-2xl mx-auto mb-10">
                Join the ultimate fitness experience with state-of-the-art equipment, expert trainers, and a supportive community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/membership">
                    <Button size="xl" variant="primary">
                        Join Now
                    </Button>
                </Link>

                <Link to="/programs">
                    <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-dark-900">
                        Explore Programs
                    </Button>
                </Link>
            </div>
        </motion.div>
    </div>

    {/* Stats Bar */}
    <div className="absolute bottom-0 left-0 right-0 bg-dark-950/80 backdrop-blur-md py-8 z-20">
        <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-16 gap-y-10">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="text-center px-8 py-0"
                    >
                        <div className="text-4xl md:text-5xl font-heading font-bold text-primary-500 mb-2">
                            {stat.value}
                        </div>
                        <div className="text-dark-400">{stat.label}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
</section>
            {/* Programs Section */}
            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Our Programs</span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark-900 mt-2">
                            Find Your Perfect <span className="gradient-text">Workout</span>
                        </h2>
                        <p className="text-dark-600 mt-4 max-w-2xl mx-auto">
                            From high-intensity training to mindful yoga, we have programs for every fitness goal and level.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {programs.map((program, index) => (
                            <motion.div
                                key={program._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card group"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={program.image || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop'}
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
                                    <Link
                                        to="/programs"
                                        className="text-primary-600 font-semibold text-sm hover:text-primary-700 flex items-center gap-1"
                                    >
                                        Learn More
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link to="/programs">
                            <Button variant="outline">View All Programs</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Preview Section */}
            <section className="section-padding bg-dark-900 text-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">About FitPro</span>
                            <h2 className="font-heading text-4xl md:text-5xl font-bold mt-2 mb-6">
                                More Than Just a <span className="text-primary-500">Gym</span>
                            </h2>
                            <p className="text-dark-300 text-lg mb-6">
                                At FitPro, we believe in holistic fitness. Our state-of-the-art facility combines modern equipment with expert guidance to help you achieve your personal fitness goals.
                            </p>
                            <p className="text-dark-400 mb-8">
                                Whether you're looking to build muscle, lose weight, improve flexibility, or just stay healthy, our team of certified trainers is here to support you every step of the way.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/about">
                                    <Button variant="primary">Learn More</Button>
                                </Link>
                                <Link to="/contact">
                                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-dark-900">
                                        Contact Us
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <img
                                        src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=400&fit=crop"
                                        alt="Gym Equipment"
                                        className="rounded-2xl"
                                    />
                                    <img
                                        src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=250&fit=crop"
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
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trainers Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Our Team</span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark-900 mt-2">
                            Meet Our Expert <span className="gradient-text">Trainers</span>
                        </h2>
                        <p className="text-dark-600 mt-4 max-w-2xl mx-auto">
                            Our certified trainers are passionate about helping you achieve your fitness goals with personalized guidance and support.
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
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <div className="text-white">
                                            <p className="text-sm font-medium">{trainer.specialization}</p>
                                            <p className="text-xs text-dark-300">{trainer.experience}+ Years Experience</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-heading text-lg font-semibold text-dark-900 mb-1">
                                        {trainer.name}
                                    </h3>
                                    <p className="text-primary-600 text-sm">{trainer.specialization}</p>
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

            {/* Membership Section */}
            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Membership Plans</span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark-900 mt-2">
                            Choose Your <span className="gradient-text">Plan</span>
                        </h2>
                        <p className="text-dark-600 mt-4 max-w-2xl mx-auto">
                            Flexible membership options to fit your lifestyle and fitness goals. Start your journey today!
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {memberships.map((plan, index) => (
                            <motion.div
                                key={plan._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`card relative ${plan.isPopular ? 'ring-2 ring-primary-500' : ''}`}
                            >
                                {plan.isPopular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="px-4 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                <div className="p-8">
                                    <h3 className="font-heading text-2xl font-bold text-dark-900 mb-2">
                                        {plan.name}
                                    </h3>
                                    <p className="text-dark-600 text-sm mb-4">{plan.description}</p>
                                    <div className="mb-6">
                                        <span className="text-4xl font-heading font-bold text-dark-900">
                                            ${plan.price}
                                        </span>
                                        <span className="text-dark-500">/{plan.duration}</span>
                                    </div>
                                    <ul className="space-y-3 mb-8">
                                        {plan.features?.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-dark-700">
                                                <svg className="w-5 h-5 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link to="/contact" className="block">
                                        <Button className="w-full" variant={plan.isPopular ? 'primary' : 'secondary'}>
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section-padding bg-dark-900 text-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold mt-2">
                            What Our <span className="text-primary-500">Members Say</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-dark-800 rounded-2xl p-8"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-heading font-semibold text-white">{testimonial.name}</h4>
                                        <p className="text-dark-400 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-dark-300 italic">"{testimonial.text}"</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Inquiry Form Section */}
            <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-white"
                        >
                            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                                Start Your Fitness Journey Today
                            </h2>
                            <p className="text-primary-100 text-lg mb-8">
                                Fill out the form and our team will get in touch with you within 24 hours to discuss your fitness goals.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <span className="text-primary-100">+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-primary-100">info@fitpro.gym</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-8 shadow-2xl"
                        >
                            {formSuccess ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="font-heading text-2xl font-bold text-dark-900 mb-2">Thank You!</h3>
                                    <p className="text-dark-600">We'll be in touch with you soon.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleInquirySubmit} className="space-y-4">
                                    <h3 className="font-heading text-2xl font-bold text-dark-900 mb-6">
                                        Get In Touch
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            label="Name"
                                            placeholder="Your Name"
                                            value={inquiryForm.name}
                                            onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                                            required
                                        />
                                        <Input
                                            label="Phone"
                                            placeholder="Your Phone"
                                            value={inquiryForm.phone}
                                            onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <Input
                                        label="Email"
                                        type="email"
                                        placeholder="Your Email"
                                        value={inquiryForm.email}
                                        onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                                        required
                                    />
                                    <Input
                                        label="Fitness Goal"
                                        placeholder="What's your fitness goal?"
                                        value={inquiryForm.fitnessGoal}
                                        onChange={(e) => setInquiryForm({ ...inquiryForm, fitnessGoal: e.target.value })}
                                    />
                                    <div>
                                        <label className="block text-sm font-medium text-dark-700 mb-2">Message</label>
                                        <textarea
                                            className="w-full px-4 py-3 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            rows="4"
                                            placeholder="Tell us about yourself and your fitness goals..."
                                            value={inquiryForm.message}
                                            onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <Button type="submit" className="w-full" loading={formLoading}>
                                        Submit Inquiry
                                    </Button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default HomePage;

