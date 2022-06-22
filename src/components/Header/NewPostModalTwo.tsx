import React from 'react';
import ReturnBack from '../../svgs/ReturnBack';
import { motion } from "framer-motion";
import useWindowWidth from "../../helpers/useWindowWidth";

type NewPostModalTwoProps = {
    setCurrentPageId: React.Dispatch<React.SetStateAction<number>>
}

const NewPostModalTwo: React.FC<NewPostModalTwoProps> = ({ setCurrentPageId }) => {
    const innerWidth = useWindowWidth();
    console.log(innerWidth)

    return (
        <motion.div
            className="flex flex-col h-full w-[300px] sm:w-[610px]"
            {...(
                innerWidth > 640 ?
                    {
                        initial: { width: "450px" },
                        animate: { width: "610px" },
                        transition: { duration: 0.3 },
                    } :
                    {}
            )}
        >
            <div className="h-10 w-full flex justify-center items-center font-medium border-b relative">
                <div className="w-full h-12 flex justify-between items-center px-4">
                    <button onClick={() => setCurrentPageId(prevVal => prevVal - 1)}>
                        <ReturnBack />
                    </button>
                    <p>Create new post</p>
                    <button
                        className="font-bold text-blue-500"
                    >
                        <p>Share</p>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default NewPostModalTwo