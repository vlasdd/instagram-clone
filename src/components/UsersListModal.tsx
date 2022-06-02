import React from 'react'
import { useNavigate } from 'react-router-dom';
import RoutesTypes from '../constants/routes-types';
import { setIsModalOpen } from '../redux/features/isModalOpen';
import { useAppDispatch } from '../redux/hooks';
import UserSuggestionType from '../types/user-suggestion-type';
import UserSuggestion from "./UserSuggestion";
import { motion } from "framer-motion";

/*type UserSuggestion = {
    profileImage: string,
    username: string,
    fullName: string,
    additionalInfo?: string, 
}*/

type UsersListProps = {
    username: string,
    usersList: UserSuggestionType[];
    descriptionLine: string;
}

const UsersListModal: React.FC<UsersListProps> = ({ username, usersList, descriptionLine }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const users = usersList.map(data => <UserSuggestion {...data} />)

    return (
        <motion.div 
            className="w-64 sm:w-96 h-96 absolute top-[20%] flex flex-col bg-white rounded-xl enabled-page"
            /*initial={{ width: 600, height: 1000 }}
            animate={{ width: 384, height: 384 }}
            exit={{width: 600, height: 1000 }}*/
        >
            <div className="h-10 w-full flex justify-center items-center font-medium border-b relative">
                <p>{descriptionLine}</p>
                <button 
                    className="absolute right-2"
                    onClick={() => {
                        navigate(RoutesTypes.DASHBOARD + username);
                        dispatch(setIsModalOpen(false))
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div>
                {users}
            </div>
        </motion.div>
    )
}

export default UsersListModal