import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import RoutesTypes from '../../constants/routes-types';

const Direct: React.FC<{ styles: string, includeHovering: boolean }> = ({ styles, includeHovering }) => {
    const location = useLocation();

    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        location.pathname.includes(RoutesTypes.DIRECT) ?
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`${styles} ${includeHovering && isHovered && "text-gray-500"}`} 
                viewBox="0 0 20 20"
                fill="currentColor"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg> :
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${styles} ${includeHovering && isHovered && "text-gray-500"}`} 
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
    )
}

export default Direct