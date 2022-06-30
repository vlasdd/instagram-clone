import React, { useEffect } from 'react'
import { motion } from 'framer-motion';

type ModalProps = {
    children: React.ReactNode;
    closeEvent: () => void;
    styles: string
}

const Modal: React.FC<ModalProps> = ({ children, closeEvent, styles }) => {
    useEffect(() => {
        document.body.classList.add("overflow-hidden")
        return () => document.body.classList.remove("overflow-hidden")
    }, [])

    return (
        <div
            className="w-screen h-screen bg-[rgba(0,0,0,0.6)] fixed top-0 left-0 flex items-center justify-center z-50"
            onClick={event => {
                event.stopPropagation()
                closeEvent()
            }}
        >
            <motion.div
                className={`${styles.includes("w-") ? "" : "w-64 sm:w-96"} absolute flex flex-col bg-white rounded-xl z-50 ${styles}`}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.12 }}
                onClick={event => event.stopPropagation()}
            >
                {children}
            </motion.div>
        </div>
    )
}

export default Modal