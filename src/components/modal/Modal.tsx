import React, { useCallback, useEffect } from 'react'
import { motion } from 'framer-motion';
import Close from 'svgs/empty/Close';

type ModalProps = {
    children: React.ReactNode;
    closeEvent: () => void;
    styles: string
}

const Modal: React.FC<ModalProps> = React.memo(({ children, closeEvent, styles }) => {
    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => document.body.classList.remove("overflow-hidden");
    }, [])

    const clickHandler = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation()
        closeEvent()
    }, [])

    const stopPropagation = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation()
    }, [])

    return (
        <div
            className="w-screen h-screen bg-[rgba(0,0,0,0.6)] fixed top-0 left-0 flex items-center justify-center z-50"
            onClick={clickHandler}
        >
            <motion.div
                className={`${styles.includes("w-") ? "" : "w-64 sm:w-96"} absolute flex flex-col bg-white rounded-xl z-50 ${styles}`}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.12 }}
                onClick={stopPropagation}
            >
                {children}
            </motion.div>
            <div className="absolute top-4 right-4 cursor-pointer">
                <Close styles="w-[25px] h-[25px] text-white"/>
            </div>
        </div>
    )
})

export default Modal