import React, { useState } from 'react'

const Saved: React.FC<{ styles: string, includeHovering: boolean }> = ({ styles, includeHovering }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
    )
}

export default Saved