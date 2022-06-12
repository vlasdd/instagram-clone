import React from 'react'
import { motion } from 'framer-motion';

type ModalProps = {
    children: React.ReactNode;
    closeEvent: () => void;
    styles: string
}

const Modal: React.FC<ModalProps> = ({ children, closeEvent, styles }) => {
    return (
        <div
            className="w-screen h-screen bg-[rgba(0,0,0,0.6)] fixed top-0 left-0 flex items-center justify-center"
            onClick={(event) => {
                event.stopPropagation()
                closeEvent()
            }}
        >
            <motion.div
                className={`w-64 sm:w-96 absolute flex flex-col bg-white rounded-xl z-50 ${styles}`}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.07 }}
                onClick={event => event.stopPropagation()}
            >
                {children}
            </motion.div>
        </div>
    )
}

export default Modal