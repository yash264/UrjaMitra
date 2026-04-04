import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export const navItems = [
    { name: "About", link: "#header" },
    { name: "Features", link: "#features" },
    { name: "Contact", link: "#contact" },
];


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleNavClick = (link) => {
        const isRoute = link.startsWith("/");

        if (isOpen) {
            if (isRoute) navigate(link);
            else document.querySelector(link)?.scrollIntoView({ behavior: "smooth" });

            setTimeout(() => setIsOpen(false), 500);
        }
        else {
            if (isRoute) navigate(link);
            else document.querySelector(link)?.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
                    ? "bg-slate-900/70 backdrop-blur-xl border-b border-white/20 shadow-lg"
                    : "bg-black/40 backdrop-blur-md border-b border-white/10"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* NAVBAR CONTAINER — full width now */}
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex items-center justify-between h-16 gap-4">

                    {/* LOGO */}
                    <motion.a
                        href="#"
                        className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent select-none"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Urja Mitra
                    </motion.a>

                    {/* DESKTOP NAVIGATION */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item, index) => (
                            <motion.button
                                key={item.name}
                                onClick={() => handleNavClick(item.link)}
                                className="text-yellow-300 hover:text-white font-medium relative group"
                                whileHover={{ scale: 1.07 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                {item.name}

                                <span className="absolute left-0 bottom-0 h-[3px] w-0 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                            </motion.button>
                        ))}
                    </div>

                    {/* DESKTOP RESUME BUTTON */}
                    <Link to="/mapView">
                        <motion.div
                            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full 
                            bg-gradient-to-r from-emerald-500 to-teal-600 
                            text-white font-semibold shadow-lg 
                            hover:shadow-emerald-500/40 transition-all duration-300"
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Get Started
                        </motion.div>
                    </Link>

                    {/* MOBILE MENU BUTTON */}
                    <motion.button
                        onClick={toggleMenu}
                        className="md:hidden text-gray-300 hover:text-white p-2"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
                    </motion.button>
                </div>

                {/* MOBILE MENU */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="md:hidden"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="px-4 pt-3 pb-4 space-y-2 
                bg-slate-900/95 backdrop-blur-xl rounded-lg mt-2 shadow-lg border border-white/10">

                                {navItems.map((item, index) => (
                                    <motion.button
                                        key={item.name}
                                        onClick={() => handleNavClick(item.link)}
                                        className="w-full text-left text-yellow-300 hover:text-white 
                      px-3 py-2 rounded-md text-base font-medium"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        {item.name}
                                    </motion.button>
                                ))}

                                {/* MOBILE RESUME BUTTON */}
                                <Link to="/mapView">
                                    <motion.div
                                        className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full 
                                        bg-gradient-to-r from-emerald-500 to-teal-600 
                                        text-white font-semibold shadow-lg 
                                        hover:shadow-emerald-500/40 transition-all duration-300"
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        Get Started
                                    </motion.div>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;