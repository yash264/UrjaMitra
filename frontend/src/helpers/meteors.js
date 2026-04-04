import { useState, useEffect, useMemo, useRef } from "react";
import { cn } from "../utils";
// import { motion } from "motion/react";
import { motion } from "framer-motion";

function Meteors({ className }) {
    const containerRef = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    // get the size of the container instead of the whole window
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setSize({ width: rect.width, height: rect.height });
            }
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const number = useMemo(() => {
        if (size.width < 340) return 30; // mobile
        if (size.width < 640) return 50; // tablet
        if (size.width < 1440) return 80; // desktop
        return 100;
    }, [size]);

    const meteors = useMemo(() => Array.from({ length: number }, (_, i) => i), [number]);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="pointer-events-none"
            >
                {meteors.map((idx) => {
                    const top = Math.random() * (size.height - 20);
                    const left = Math.random() * (size.width - 20);

                    return (
                        <span
                            key={`meteor-${idx}`}
                            className={cn(
                                "animate-meteor-effect absolute h-0.5 w-0.5 rounded-full bg-slate-400 shadow-[0_0_0_1px_#ffffff10]",
                                "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
                                className
                            )}
                            style={{
                                top: `${top}px`,
                                left: `${left}px`,
                                animationDelay: `${Math.random() * 0.5}s`,
                                animationDuration: `${Math.floor(Math.random() * 3 + 2)}s`,
                            }}
                        ></span>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default Meteors;