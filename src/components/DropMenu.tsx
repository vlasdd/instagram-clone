import React from 'react';
import { motion } from 'framer-motion';

type DropMenuProps = {
  children: React.ReactNode;
  closeEvent: () => void
  styles: string
}

const DropMenu: React.FC<DropMenuProps> = ({ children, closeEvent, styles }) => {
  return (
    <>
      <div
        className="w-screen h-screen fixed top-0 left-0"
        onClick={closeEvent}
      ></div>
      <motion.div
        className={`bg-white flex items-center rounded-md drop-shadow-md absolute flex-col ${styles}`}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
      >
        {children}
      </motion.div>
    </>
  )
}

export default DropMenu