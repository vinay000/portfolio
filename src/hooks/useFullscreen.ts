import { useCallback, useEffect, useRef, useState } from 'react';

export const useFullscreen = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isShrinking, setIsShrinking] = useState(false);
    const [isExpanding, setIsExpanding] = useState(false);

    const enter = async () => {
        if (elementRef.current && !document.fullscreenElement) {
            // Start zoom-in animation
            setIsExpanding(true);

            // Wait a tick before requesting fullscreen
            setTimeout(async () => {
                await elementRef.current?.requestFullscreen();
                setIsFullscreen(true);
                setTimeout(() => setIsExpanding(false), 500);
            }, 10); // slight delay for animation to apply
        }
    };

    const exit = async () => {
        if (document.fullscreenElement) {
            setIsShrinking(true);
            await document.exitFullscreen();
            setIsFullscreen(false);
            setTimeout(() => setIsShrinking(false), 500);
        }
    };

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            enter();
        } else {
            exit();
        }
    }, []);

    useEffect(() => {
        const onChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', onChange);
        return () => document.removeEventListener('fullscreenchange', onChange);
    }, []);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'f' || e.key === 'F11') {
                e.preventDefault();
                toggleFullscreen();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [toggleFullscreen]);

    return {
        isFullscreen,
        isShrinking,
        isExpanding,
        toggleFullscreen,
        fullscreenProps: { ref: elementRef },
    };
};
