import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import { membershipAPI } from '../../services/api';

const MembershipPage = () => {
    const [memberships, setMemberships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMemberships();
    }, []);

    const fetchMemberships = async () => {
        try {
            const response = await membershipAPI.getAll({ active: 'true' });
            if (response.data.success) {
                setMemberships(response.data.plans);
            }
        } catch (error) {
            console.error('Error fetching memberships:', error);
        }
        setLoading(false);
    };

    const defaultPlans = [
        {
            _id: '1',
            name: 'Basic',
            description: 'Perfect for beginners',
            duration: 'monthly',
            price: 49,
            features: ['Gym Access', 'Locker Room', 'Free Parking', 'Mobile App']
        },
        {
            _id: '2',
            name: 'Pro',
            description: 'Most Popular Choice',
            duration: 'monthly',
            price: 79,
            isPopular: true,
            features: ['All Basic Features', 'Group Classes', 'Sauna Access', '1 PT Session/month']
        },
        {
            _id: '3',
            name: 'Elite',
            description: 'Premium Experience',
            duration: 'monthly',
            price: 129,
            features: ['All Pro Features', 'Unlimited PT Sessions', 'Nutrition Plan', 'Guest Pass']
        }
    ];

    const displayPlans = memberships.length > 0 ? memberships : defaultPlans;

    const faqs = [
        {
            question: 'What is included in my membership?',
            answer: 'Each membership tier includes different features. Basic includes gym access and locker room, Pro adds group classes and sauna access, while Elite includes unlimited personal training sessions.'
        },
        {
            question: 'Can I cancel my membership anytime?',
            answer: 'Yes, you can cancel your membership at any time with 30 days notice. No long-term contracts required.'
        },
        {
            question: 'Do you offer trial passes?',
            answer: 'Yes! We offer a free 3-day trial pass for new members to experience our facilities before committing.'
        },
        {
            question: 'Are there any joining fees?',
            answer: 'There is a one-time joining fee of $50 for new members, which is waived if you join during promotional periods.'
        },
        {
            question: 'Can I upgrade my plan later?',
            answer: 'Absolutely! You can upgrade or downgrade your membership at any time. The price difference will be adjusted accordingly.'
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
                        alt="Membership"
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
                            Membership Plans
                        </span>
                        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
                            Choose Your <span className="gradient-text">Plan</span>
                        </h1>
                        <p className="text-xl text-dark-300 max-w-2xl mx-auto">
                            Flexible plans to fit your lifestyle and fitness goals. Start your journey today!
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Pricing</span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark-900 mt-2">
                            Simple, Transparent <span className="gradient-text">Pricing</span>
                        </h2>
                        <p className="text-dark-600 mt-4 max-w-2xl mx-auto">
                            No hidden fees. No long-term contracts. Just great fitness.
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="card skeleton h-96"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {displayPlans.map((plan, index) => (
                                <motion.div
                                    key={plan._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`card relative ${plan.isPopular ? 'ring-2 ring-primary-500 transform scale-105' : ''}`}
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
                                            <span className="text-5xl font-heading font-bold text-dark-900">
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
                                        <Link to="/contact">
                                            <Button className="w-full" variant={plan.isPopular ? 'primary' : 'secondary'}>
                                                Get Started
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Comparison Table */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark-900">
                            Compare <span className="gradient-text">Plans</span>
                        </h2>
                    </motion.div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-dark-200">
                                    <th className="text-left py-4 px-4 font-heading font-semibold text-dark-900">Features</th>
                                    <th className="text-center py-4 px-4 font-heading font-semibold text-dark-900">Basic</th>
                                    <th className="text-center py-4 px-4 font-heading font-semibold text-primary-600">Pro</th>
                                    <th className="text-center py-4 px-4 font-heading font-semibold text-dark-900">Elite</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    'Gym Access',
                                    'Locker Room',
                                    'Group Classes',
                                    'Sauna & Steam Room',
                                    'Personal Training',
                                    'Nutrition Plan',
                                    'Guest Pass',
                                    'Recovery Zone'
                                ].map((feature, index) => (
                                    <tr key={index} className="border-b border-dark-100">
                                        <td className="py-4 px-4 text-dark-700">{feature}</td>
                                        <td className="text-center py-4 px-4">
                                            {index < 2 ? (
                                                <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : index < 4 ? (
                                                <svg className="w-6 h-6 text-primary-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg className="w-6 h-6 text-primary-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </td>
                                        <td className="text-center py-4 px-4">
                                            {index < 4 ? (
                                                <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : index < 6 ? (
                                                <svg className="w-6 h-6 text-primary-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg className="w-6 h-6 text-primary-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </td>
                                        <td className="text-center py-4 px-4">
                                            <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="section-padding bg-dark-50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">FAQ</span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark-900 mt-2">
                            Frequently Asked <span className="gradient-text">Questions</span>
                        </h2>
                    </motion.div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl p-6 shadow-md"
                            >
                                <h3 className="font-heading text-lg font-semibold text-dark-900 mb-2">
                                    {faq.question}
                                </h3>
                                <p className="text-dark-600">{faq.answer}</p>
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
                            Still Have Questions?
                        </h2>
                        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                            Our team is here to help you choose the right plan for your fitness goals.
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

export default MembershipPage;

