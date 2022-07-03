import React, { useState } from 'react';
import { motion } from "framer-motion";
import useWindowWidth from 'helpers/useWindowWidth';

type NewPostModalOneProps = { 
    image: any, 
    setImage: React.Dispatch<any>,
    setCurrentPageId: React.Dispatch<React.SetStateAction<number>>,
}

const NewPostModalOne: React.FC<NewPostModalOneProps> = ({ image, setImage, setCurrentPageId }) => {
    const [drag, setDrag] = useState<boolean>(false);
    const [errorFileName, setErrorFileName] = useState<null | string>(null);
    const innerWidth = useWindowWidth();

    const onDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0]
        if(file['type'].split('/')[0] !== 'image'){
            setErrorFileName(file.name);
            setDrag(false);
            return;
        }
        
        setImage(file)
    }

    return (
        <motion.div 
            className="flex flex-col h-full w-[300px] sm:w-[450px]"
            {...(
                image && innerWidth > 640 ?
                    {
                        initial: { width: "640px" },
                        animate: { width: "450px" },
                        transition: { duration: 0.3 },
                    } :
                    {}
            )}
        >
            <div className="h-10 w-full flex justify-center items-center font-medium border-b relative">
                <p>{errorFileName ? "File couldn't be uploaded" : "Create new post"}</p>
                {
                    image ?
                        <button
                            className="absolute right-3 font-bold text-blue-500"
                            onClick={() => setCurrentPageId(prevVal => prevVal + 1)}
                        >
                            <p>Next</p>
                        </button> :
                        null
                }
            </div>
            {
                image ?
                    <img
                        src={URL.createObjectURL(image)}
                        className="h-[calc(100%-40px)] object-cover rounded-b-xl"
                    /> :
                    <div
                        className={`w-full h-full flex flex-col justify-center items-center gap-2 rounded-b-xl ${(drag || errorFileName) && "back"}`}
                        onDragStart={(event) => {
                            event.preventDefault();
                            setDrag(true);
                        }}
                        onDragLeave={(event) => {
                            event.preventDefault();
                            setDrag(false);
                        }}
                        onDragOver={(event) => {
                            event.preventDefault();
                            setDrag(true);
                        }}
                        onDrop={(event) => onDropHandler(event)}
                    >
                        <img
                            src={errorFileName ? "../images/error.jpg" : drag ? "../images/create-post-drag.jpg" : "../images/create-post.jpg"}
                            className={drag ? "w-[106px]" : "w-[100px]"}
                        />
                        <p className="text-xl sm:text-2xl font-thin">
                            {errorFileName ? "This file is not supported" : "Drag photos and videos here"}
                        </p>
                        {
                            errorFileName ?
                                <div className="flex w-5/6 text-center gap-1 justify-center">
                                    <p className="text-gray-400 text-sm font-bold">{errorFileName}</p>
                                    <p className="text-gray-400 text-sm"> could not be uploaded.</p>
                                </div> :
                                null
                        }
                        <label
                            className="mt-3 py-1 px-3 bg-blue-500 font-medium text-white rounded cursor-pointer text-sm tracking-wide flex items-center"
                        >
                            <input
                                type="file"
                                accept="image/png, image/jpg, image/jpeg"
                                className="hidden"
                                onChange={(event) => {
                                    if (event.target.files) {
                                        setImage(event.target.files[0]);
                                    }
                                }}
                            />
                            <p>{errorFileName ? "Select other files" : "Select from computer"}</p>
                        </label>
                    </div>
            }
        </motion.div>
    )
}

export default NewPostModalOne