"use client"

import { motion } from "framer-motion"

interface LoadingSpinnerProps {
    size?: number
    color?: string
}

export function LoadingSpinner({ size = 24, color = "text-primary" }: LoadingSpinnerProps) {
    return (
        <div className="flex items-center justify-center">
            <motion.div
                className={`rounded-full border-2 border-t-transparent ${color}`}
                style={{
                    width: size,
                    height: size,
                    borderTopColor: "transparent",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
        </div>
    )
}

