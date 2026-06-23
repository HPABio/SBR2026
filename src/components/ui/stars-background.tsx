"use client";
import React, {
    useState,
    useEffect,
    useCallback,
} from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useReducedMotion, useSpring, type SpringOptions, type Transition } from "framer-motion";

interface StarsBackgroundProps {
    interactive?: boolean;
    factor?: number;
    speed?: number;
    transition?: SpringOptions;
    starColor?: string;
    particleSize?: number;
    bgColor?: string;
    className?: string;
    children?: React.ReactNode;
    compact?: boolean;
}

export const StarsBackground = ({
    interactive = false,
    factor = 0.05, //factor of the mouse movement
    speed = 50,
    transition = { stiffness: 50, damping: 20 },
    starColor = "#fff",
    particleSize = 5,
    bgColor = "bg-[radial-gradient(ellipse_at_bottom,#F49B2B_0%,#ff7700_70%,#ff7700_100%)]",
    className,
    children,
    compact = false,
}: StarsBackgroundProps) => {
    const [boxShadow1, setBoxShadow1] = useState("");
    const [boxShadow2, setBoxShadow2] = useState("");
    const [boxShadow3, setBoxShadow3] = useState("");
    const shouldReduceMotion = useReducedMotion();
    const starRange = compact ? 900 : 4000;
    const starOffset = starRange / 2;
    const scrollDistance = compact ? 160 : 2000;
    const starLayerClassName = compact
        ? "absolute top-0 left-0 size-full"
        : "absolute top-0 left-1/3 w-screen h-[2000px]";
    const starParticleClassName = compact
        ? "absolute top-1/2 left-1/2 bg-transparent rounded-full -translate-x-1/2 -translate-y-1/2"
        : "absolute bg-transparent rounded-full";
    const duplicateLayerClassName = compact
        ? "absolute top-1/2 left-1/2 bg-transparent rounded-full -translate-x-1/2"
        : "absolute bg-transparent rounded-full top-[2000px]";
    const duplicateLayerStyle = compact
        ? { transform: `translate(-50%, calc(-50% + ${starRange}px))` }
        : undefined;
    const starCount1 = compact ? 120 : 1000;
    const starCount2 = compact ? 50 : 400;
    const starCount3 = compact ? 25 : 200;

    const generateStars = useCallback((count: number, color: string) => {
        const shadows: string[] = [];
        for (let i = 0; i < count; i++) {
            const x = Math.floor(Math.random() * starRange) - starOffset;
            const y = Math.floor(Math.random() * starRange) - starOffset;
            shadows.push(`${x}px ${y}px ${color}`);
        }
        return shadows.join(", ");
    }, [starOffset, starRange]);

    useEffect(() => {
        setBoxShadow1(generateStars(starCount1, starColor));
        setBoxShadow2(generateStars(starCount2, starColor));
        setBoxShadow3(generateStars(starCount3, starColor));
    }, [starColor, generateStars, starCount1, starCount2, starCount3]);

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
                "relative size-full max-w-9xl mx-auto overflow-hidden bg-primary ",
                className
            )}
            onMouseMove={interactive ? handleMouseMove : undefined}
        >
            <motion.div style={{ x: springX, y: springY }}
            className={cn("max-w-9xl mx-auto w-full h-full", bgColor, compact ? "" : "mt-12")}
            >
                {/* Star Layer 1 */}
                <motion.div
                    className={starLayerClassName}
                    animate={shouldReduceMotion ? { y: 0 } : { y: [0, -scrollDistance] }}
                    transition={starLayer1Transition}
                >
                    <div
                        className={starParticleClassName}
                        style={{
                            width: `${1 * particleSize}px`,
                            height: `${1 * particleSize}px`,
                            boxShadow: boxShadow1,
                        }}
                    />
                    <div
                        className={duplicateLayerClassName}
                        style={{
                            width: `${1 * particleSize}px`,
                            height: `${1 * particleSize}px`,
                            boxShadow: boxShadow1,
                            ...duplicateLayerStyle,
                        }}
                    />
                </motion.div>

                {/* Star Layer 2 */}
                <motion.div
                    className={starLayerClassName}
                    animate={shouldReduceMotion ? { y: 0 } : { y: [0, -scrollDistance] }}
                    transition={starLayer2Transition}
                >
                    <div
                        className={starParticleClassName}
                        style={{
                            width: `${2 * particleSize}px`,
                            height: `${2 * particleSize}px`,
                            boxShadow: boxShadow2,
                        }}
                    />
                    <div
                        className={duplicateLayerClassName}
                        style={{
                            width: `${2 * particleSize}px`,
                            height: `${2 * particleSize}px`,
                            boxShadow: boxShadow2,
                            ...duplicateLayerStyle,
                        }}
                    />
                </motion.div>

                {/* Star Layer 3 */}
                <motion.div
                    className={starLayerClassName}
                    animate={shouldReduceMotion ? { y: 0 } : { y: [0, -scrollDistance] }}
                    transition={starLayer3Transition}
                >
                    <div
                        className={starParticleClassName}
                        style={{
                            width: `${3 * particleSize}px`,
                            height: `${3 * particleSize}px`,
                            boxShadow: boxShadow3,
                        }}
                    />
                    <div
                        className={duplicateLayerClassName}
                        style={{
                            width: `${3 * particleSize}px`,
                            height: `${3 * particleSize}px`,
                            boxShadow: boxShadow3,
                            ...duplicateLayerStyle,
                        }}
                    />
                </motion.div>
            </motion.div>

            {children}
        </div>
    );
};
