import React, { useCallback, useState } from 'react';
import { motion } from "framer-motion";
import useWindowWidth from 'helpers/hooks/useWindowWidth';
import Copy from 'svgs/empty/Copy';
import DropMenu from 'components/other/DropMenu';

type NewPostModalOneProps = { 
    image: any[], 
    setImage: React.Dispatch<React.SetStateAction<any[]>>,
    setCurrentPageId: React.Dispatch<React.SetStateAction<number>>,
}

const NewPostModalOne: React.FC<NewPostModalOneProps> = React.memo(({ 
    image, 
    setImage, 
    setCurrentPageId, 
}) => {
    const [drag, setDrag] = useState<boolean>(false);
    const [errorFileName, setErrorFileName] = useState<null | string>(null);
    const innerWidth = useWindowWidth();

    const incrementPageId = useCallback(() => {
        setCurrentPageId(prevVal => prevVal + 1)
    }, [])

    const onDropHandler = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0]
        if(file['type'].split('/')[0] !== 'image'){
            setErrorFileName(file.name);
            setDrag(false);
            return;
        }
        
        setImage(prevFiles => [...prevFiles, file])
    }, [])

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target
        if (files && files[0]) {
            setImage(prevFiles => [...prevFiles, files[0]]);
        }
    }, [])

    const onDragStartHandler = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDrag(true);
    }, [])
    
    const onDragLeaveHandler = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDrag(false);
    }, [])

    return (
        <motion.div
            className="flex flex-col h-full w-[300px] sm:w-[450px]"
            {...(
                image.length && innerWidth > 640 ?
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
                    image.length ?
                        <button
                            className="absolute right-3 font-bold text-blue-500"
                            onClick={incrementPageId}
                        >
                            <p>Next</p>
                        </button> :
                        null
                }
            </div>
            {
                image.length ?
                    <div className="h-[calc(100%-40px)] w-full">
                        <img
                            src={URL.createObjectURL(image[0])}
                            className="h-full w-full object-cover rounded-b-xl"
                        />
                    </div> :
                    <div
                        className={`
                            w-full h-full flex flex-col justify-center items-center gap-2 rounded-b-xl 
                            ${(drag || errorFileName) ? "back": ""}
                        `}
                        onDragStart={onDragStartHandler}
                        onDragLeave={onDragLeaveHandler}
                        onDragOver={onDragStartHandler}
                        onDrop={onDropHandler}
                    >
                        <img
                            src={
                                errorFileName ?
                                    process.env.PUBLIC_URL + "/images/error.jpg" :
                                    drag ?
                                        process.env.PUBLIC_URL + "/images/create-post-drag.jpg" :
                                        process.env.PUBLIC_URL + "/images/create-post.jpg"
                            }
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
                                onChange={handleChange}
                            />
                            <p>{errorFileName ? "Select other files" : "Select from computer"}</p>
                        </label>
                    </div>
            }
        </motion.div>
    )
})

export default NewPostModalOne