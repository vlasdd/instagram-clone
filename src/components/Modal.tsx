import React from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Modal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div
            className="w-screen h-screen bg-[rgba(0,0,0,0.6)] fixed flex items-center justify-center"
            onClick={() => navigate(-1)}
        >
            <motion.div
                className="w-64 sm:w-96 h-96 absolute top-[20%] flex flex-col bg-white rounded-xl z-50"
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