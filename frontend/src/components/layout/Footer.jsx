import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'About Us', path: '/about' },
        { name: 'Programs', path: '/programs' },
        { name: 'Trainers', path: '/trainers' },
        { name: 'Membership', path: '/membership' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
    ];

    const programs = [
        'Weight Training',
        'CrossFit',
        'Yoga',
        'Cardio',
        'Personal Training',
    ];

    const socialLinks = [
        { name: 'Facebook', icon: 'M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z' },
        { name: 'Instagram', icon: 'M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.35.2-6.78,2.62-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.36,2.62,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.35-.2,6.78-2.62,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.35-2.62-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z' },
        { name: 'Twitter', icon: 'M23.95,4.57a10,10,0,0,1-2.82.77,4.96,4.96,0,0,0,2.16-2.72,9.9,9.9,0,0,1-3.12,1.19,4.92,4.92,0,0,0-8.52,3.37,5,5,0,0,0,.11,1.12A13.98,13.98,0,0,1,1.64,3.15,4.93,4.93,0,0,0,3.2,9.72,4.86,4.86,0,0,1,.96,9.11v.06a4.93,4.93,0,0,0,3.95,4.83,4.86,4.86,0,0,1-2.22.08,4.93,4.93,0,0,0,4.6,3.42A9.87,9.87,0,0,1,0,19.54a13.94,13.94,0,0,0,7.55,2.21A13.9,13.9,0,0,0,21.56,7.67c0-.21,0-.42,0-.63A10,10,0,0,0,24,4.59Z' },
    ];

    return (
        <footer className="bg-dark-950 text-white">

            {/* Main Footer */}
            <div className="py-10 bg-dark-900">
                <div className="container-custom">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* Brand */}
                        <div className="space-y-3">
                            <Link to="/" className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">F</span>
                                </div>
                                <span className="font-heading font-bold text-2xl">Endless Fitness</span>
                            </Link>

                            <p className="text-dark-400 leading-relaxed">
                                Transform your body and mind with FitPro Gym. We provide world-class fitness facilities and expert trainers to help you achieve your goals.
                            </p>

                            <div className="flex gap-4">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href="#"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-10 h-10 bg-dark-800 rounded-full flex items-center justify-center text-dark-400 hover:text-primary-500 hover:bg-dark-700 transition-colors duration-300"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d={social.icon} />
                                        </svg>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-heading font-semibold text-lg mb-3">Quick Links</h4>
                            <ul className="space-y-2">
                                {quickLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.path}
                                            className="text-dark-400 hover:text-primary-500 transition-colors duration-300"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Programs */}
                        <div>
                            <h4 className="font-heading font-semibold text-lg mb-3">Programs</h4>
                            <ul className="space-y-2">
                                {programs.map((program) => (
                                    <li key={program}>
                                        <Link
                                            to="/programs"
                                            className="text-dark-400 hover:text-primary-500 transition-colors duration-300"
                                        >
                                            {program}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-heading font-semibold text-lg mb-3">Contact Us</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-primary-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-dark-400">123 Fitness Street, Gym City, GC 12345</span>
                                </li>

                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className="text-dark-400">+1 (555) 123-4567</span>
                                </li>

                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-dark-400">info@fitpro.gym</span>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="py-3 border-t border-dark-800">
                <div className="container-custom">

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-dark-500 text-sm">
                            © {currentYear} Endless Gym. All rights reserved.
                        </p>

                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-dark-500 hover:text-primary-500 transition-colors">Privacy Policy</a>
                            <a href="#" className="text-dark-500 hover:text-primary-500 transition-colors">Terms of Service</a>
                        </div>
                    </div>

                </div>
            </div>

        </footer>
    );
};

export default Footer;