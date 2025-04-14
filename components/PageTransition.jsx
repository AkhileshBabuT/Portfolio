"use client";
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const PageTransition = ({children}) => {
    const pathname = usePathname();
    const [showChildren, setShowChildren] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowChildren(true);
        }, 200); // Reduced delay for smoother transitions

        return () => {
            clearTimeout(timeout);
            setShowChildren(false); // Reset when the path changes
        };
    }, [pathname]);

    return (
         <AnimatePresence>
            <div key={pathname}>
                <motion.div
                    initial={{ opacity: 1}}
                    animate={{
                        opacity: 0,
                        transition: { delay: 0, duration: 0.3, ease: "easeInOut" },
                    }}
                    className="h-screen w-screen fixed bg-primary top-0 pointer-events-none"
                />
                {showChildren && children}
            </div>
         </AnimatePresence>
    );
};

export default PageTransition;
