import React, { useEffect, useState } from "react";
import { Progress } from "@/shadcn/ui/progress";
import { useLoadingStore } from "@/store";

export const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const isLoading = useLoadingStore((state) => state.isLoading);
    const [loadingUp, setLoadingUp] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (isLoading) {
            setLoadingUp(true);
            interval = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        return 0;
                    }
                    // Adjust the increment based on the current progress to slow down as it approaches 100
                    const increment =
                        prevProgress < 50 ? 5 : prevProgress < 70 ? 4 : 3;
                    return prevProgress + increment;
                });
            }, 150); // Adjust the interval as needed
        } else {
            // Ensure progress reaches 100% before resetting
            setProgress(100);
            setTimeout(() => {
                setLoadingUp(false);
            }, 500); // Adjust the delay before starting the fade-out effect
        }

        return () => {
            if (interval) clearInterval(interval);
            setProgress(0);
        };
    }, [isLoading]);

    return loadingUp ? (
        <Progress
            value={progress}
            className={`w-[100%] ${loadingUp ? "animate-loading" : ""}`}
            style={{ transition: "opacity 0.5s ease-out" }} // Add fade-out effect
        />
    ) : (
        <div className="h-2"></div>
    );
};
