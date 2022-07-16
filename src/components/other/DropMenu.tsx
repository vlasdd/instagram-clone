import React from 'react';
import { motion } from 'framer-motion';

type DropMenuProps = {
  children: React.ReactNode;
  closeEvent: (() => void) | ((event: any) => void);
  styles: string;
  noAnimation?: boolean;
}

const DropMenu: React.FC<DropMenuProps> = React.memo(({ children, closeEvent, styles, noAnimation }) => {
  return (
    <>
      <div
        className="w-screen h-screen fixed top-0 left-0"
        onClick={closeEvent}
      ></div>
      <motion.div
        className={`bg-white flex items-center rounded-lg drop-shadow-md absolute flex-col ${styles}`}
        {...(
          !noAnimation ?
            {
              initial: { y: -50 },
              animate: { y: 0 },
              exit: { y: 50 }
            } :
            {}
        )}
      >
        {children}
      </motion.div>
    </>
  )
})

export default DropMenu