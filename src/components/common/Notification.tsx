'use client';
import { useEffect, useState } from "react";

type NotifyProps = {
    text: string;
    type: "success" | "error" | "info";
    duration?: number; // milliseconds (default: 3000)
};

const Notify = ({ text, type, duration = 4000 }: NotifyProps) => {
    const [visible, setVisible] = useState(true);

    const bg =
        type === "success"
            ? "bg-green-100 text-green-700"
            : type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700";

    const icon =
        type === "success"
            ? "check_circle"
            : type === "error"
                ? "error"
                : "info";

    // Auto dismiss after duration
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);
        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    return (
        <div
            className={`flex items-center fixed top-4 right-4 w-auto p-4 mb-4 text-sm rounded-lg shadow-md transition-all duration-300 z-50 ${bg}`}
            role="alert"
        >
            <span className="material-symbols-outlined mr-2 text-lg">{icon}</span>
            <span>{text}</span>
        </div>
    );
};

export default Notify;
