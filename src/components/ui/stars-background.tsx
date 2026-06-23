"use client";
import React, {
    useState,
    useEffect,
    useCallback,
} from "react";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion, type Transition } from "framer-motion";

// Headline highlight — single use in LookingBackHeadline (~200px tall)
const SCROLL_DISTANCE = 200;
const STAR_RANGE_X = 1000;
const STAR_RANGE_Y = SCROLL_DISTANCE;

interface StarsBackgroundProps {
    speed?: number;
    starColor?: string;
    particleSize?: number;
    bgColor?: string;
    className?: string;
    children?: React.ReactNode;
}

export const StarsBackground = ({
    speed = 30,
    starColor = "#fff",
    particleSize = 5,
    bgColor = "bg-[radial-gradient(ellipse_at_bottom,#F49B2B_0%,#ff7700_70%,#ff7700_100%)]",
    className,
    children,
}: StarsBackgroundProps) => {
    const [boxShadow1, setBoxShadow1] = useState("");
    const [boxShadow2, setBoxShadow2] = useState("");
    const [boxShadow3, setBoxShadow3] = useState("");
    const shouldReduceMotion = useReducedMotion();

    const generateStars = useCallback((count: number, color: string) => {
        const shadows: string[] = [];
        for (let i = 0; i < count; i++) {
            const x = Math.floor(Math.random() * STAR_RANGE_X) - STAR_RANGE_X / 2;
            const y = Math.floor(Math.random() * STAR_RANGE_Y) - STAR_RANGE_Y / 2;
            shadows.push(`${x}px ${y}px ${color}`);
        }
        return shadows.join(", ");
    }, []);

    useEffect(() => {
        setBoxShadow1(generateStars(80, starColor));
        setBoxShadow2(generateStars(40, starColor));
        setBoxShadow3(generateStars(20, starColor));
    }, [starColor, generateStars]);

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

    const scrollAnimation = shouldReduceMotion
        ? { y: 0 }
        : { y: [0, -SCROLL_DISTANCE] };

    const renderStarLayer = (
        boxShadow: string,
        sizeMultiplier: number,
        transition: Transition,
    ) => (
        <motion.div
            className="absolute inset-0"
            animate={scrollAnimation}
            transition={transition}
        >
            <div
                className="absolute top-1/2 left-1/2 rounded-full bg-transparent -translate-x-1/2 -translate-y-1/2"
                style={{
                    width: `${sizeMultiplier * particleSize}px`,
                    height: `${sizeMultiplier * particleSize}px`,
                    boxShadow,
                }}
            />
            <div
                className="absolute top-1/2 left-1/2 rounded-full bg-transparent"
                style={{
                    width: `${sizeMultiplier * particleSize}px`,
                    height: `${sizeMultiplier * particleSize}px`,
                    boxShadow,
                    transform: `translate(-50%, calc(-50% + ${SCROLL_DISTANCE}px))`,
                }}
            />
        </motion.div>
    );

    return (
        <div
            className={cn(
                "relative mx-auto size-full max-h-[200px] max-w-9xl overflow-hidden",
                className
            )}
        >
            <div className={cn("relative size-full", bgColor)}>
                {renderStarLayer(boxShadow1, 1, starLayer1Transition)}
                {renderStarLayer(boxShadow2, 2, starLayer2Transition)}
                {renderStarLayer(boxShadow3, 3, starLayer3Transition)}
            </div>

            {children}
        </div>
    );
};
