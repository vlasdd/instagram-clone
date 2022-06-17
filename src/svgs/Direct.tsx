import React from 'react'
import { useLocation } from 'react-router-dom';
import RoutesTypes from '../constants/routes-types';

const Direct: React.FC = () => {
    const location = useLocation();

    return (
        location.pathname.includes(RoutesTypes.DIRECT) ?
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 rotate-[55deg]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg> :
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 rotate-[55deg]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
    )
}

export default Direct