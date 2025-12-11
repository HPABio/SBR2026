"use client";
import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
} from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, type SpringOptions, type Transition } from "framer-motion";

interface StarsBackgroundProps {
    factor?: number;
    speed?: number;
    transition?: SpringOptions;
    starColor?: string;
    className?: string;
    children?: React.ReactNode;
}

export const StarsBackground = ({
    factor = 0.05,
    speed = 50,
    transition = { stiffness: 50, damping: 20 },
    starColor = "#fff",
    className,
    children,
}: StarsBackgroundProps) => {
    const [boxShadow1, setBoxShadow1] = useState("");
    const [boxShadow2, setBoxShadow2] = useState("");
    const [boxShadow3, setBoxShadow3] = useState("");

    const generateStars = useCallback((count: number, color: string) => {
        const shadows: string[] = [];
        for (let i = 0; i < count; i++) {
            const x = Math.floor(Math.random() * 4000) - 2000;
            const y = Math.floor(Math.random() * 4000) - 2000;
            shadows.push(`${x}px ${y}px ${color}`);
        }
        return shadows.join(", ");
    }, []);

    useEffect(() => {
        setBoxShadow1(generateStars(1000, starColor));
        setBoxShadow2(generateStars(400, starColor));
        setBoxShadow3(generateStars(200, starColor));
    }, [starColor, generateStars]);

    const offsetX = useMotionValue(0);
    const offsetY = useMotionValue(0);

    const springX = useSpring(offsetX, transition);
    const springY = useSpring(offsetY, transition);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const newOffsetX = -(e.clientX - centerX) * factor;
        const newOffsetY = -(e.clientY - centerY) * factor;
        offsetX.set(newOffsetX);
        offsetY.set(newOffsetY);
    };

    const starLayer1Transition: Transition = {
        repeat: Infinity,
        duration: speed,
        ease: "linear",
    };

    const starLayer2Transition: Transition = {
        repeat: Infinity,
        duration: speed * 2,
        ease: "linear",
    };

    const starLayer3Transition: Transition = {
        repeat: Infinity,
        duration: speed * 3,
        ease: "linear",
    };

    return (
        <div
            className={cn(
                "relative size-full overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_#F49B2B_0%,_#E46B08_100%)]",
                className
            )}
            onMouseMove={handleMouseMove}
        >
            <motion.div style={{ x: springX, y: springY }}>
                {/* Star Layer 1 */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-[2000px]"
                    animate={{ y: [0, -2000] }}
                    transition={starLayer1Transition}
                >
                    <div
                        className="absolute bg-transparent rounded-full"
                        style={{
                            width: "1px",
                            height: "1px",
                            boxShadow: boxShadow1,
                        }}
                    />
                    <div
                        className="absolute bg-transparent rounded-full top-[2000px]"
                        style={{
                            width: "1px",
                            height: "1px",
                            boxShadow: boxShadow1,
                        }}
                    />
                </motion.div>

                {/* Star Layer 2 */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-[2000px]"
                    animate={{ y: [0, -2000] }}
                    transition={starLayer2Transition}
                >
                    <div
                        className="absolute bg-transparent rounded-full"
                        style={{
                            width: "2px",
                            height: "2px",
                            boxShadow: boxShadow2,
                        }}
                    />
                    <div
                        className="absolute bg-transparent rounded-full top-[2000px]"
                        style={{
                            width: "2px",
                            height: "2px",
                            boxShadow: boxShadow2,
                        }}
                    />
                </motion.div>

                {/* Star Layer 3 */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-[2000px]"
                    animate={{ y: [0, -2000] }}
                    transition={starLayer3Transition}
                >
                    <div
                        className="absolute bg-transparent rounded-full"
                        style={{
                            width: "3px",
                            height: "3px",
                            boxShadow: boxShadow3,
                        }}
                    />
                    <div
                        className="absolute bg-transparent rounded-full top-[2000px]"
                        style={{
                            width: "3px",
                            height: "3px",
                            boxShadow: boxShadow3,
                        }}
                    />
                </motion.div>
            </motion.div>

            {children}
        </div>
    );
};
