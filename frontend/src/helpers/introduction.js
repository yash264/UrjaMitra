import React from "react";
import { motion } from "framer-motion";
import profileImg from "../assets/electricVechile.jpg";


function Introduction() {
    return (
        <section className="max-w-6xl mx-auto px-6 py-20 md:py-32">
            <div className="flex flex-col md:flex-row items-center justify-between gap-20">
                {/* Text Section */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 text-left"
                >
                    {/* Heading */}
                    <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight text-white">
                        <span className="block text-6xl sm:text-7xl md:text-8xl text-red-400 mt-2">
                            Urja Mita
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg text-gray-300 max-w-lg mt-6">
                        A smart {" "}
                        <span className="text-sky-400 font-semibold">web-based platform</span>{" "}
                        to optimize electric vehicle (EV) journeys by combining {" "}
                        <span className="text-sky-400 font-semibold">route planning, battery intelligence, and charging optimization</span>{" "}
                        and {" "}
                        <span className="text-sky-400 font-semibold">charging optimization</span>{" "}
                        into a single system.
                    </p>

                </motion.div>

                {/* Image Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 flex justify-center md:justify-end relative"
                >
                    {/* Soft Glow Background */}
                    <div className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 blur-[120px] opacity-25"></div>

                    {/* Logo Container */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative w-[300px] h-[300px] md:w-[360px] md:h-[360px] rounded-full p-[4px] bg-gradient-to-tr from-sky-400 via-purple-500 to-pink-500 shadow-xl"
                    >
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                            <img
                                src={profileImg}
                                alt="Logo"
                                className="w-[85%] h-[85%] object-contain"
                                draggable={false}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export default Introduction;