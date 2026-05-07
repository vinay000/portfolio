import { useEffect, useRef, useState } from 'react';

export const useAutoHideControls = (enabled: boolean, delay = 2000) => {
    const [showControls, setShowControls] = useState(true);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (enabled) {
            setShowControls(true);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, delay);
        } else {
            setShowControls(true);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        }

        return () => {
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        };
    }, [enabled, delay]);

    useEffect(() => {
        if (!enabled) return;

        const handleMouseMove = () => {
            setShowControls(true);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, delay);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [enabled, delay]);

    return {
        showControls,
        forceShow: () => setShowControls(true),
        forceHide: () => setShowControls(false),
    };
};
