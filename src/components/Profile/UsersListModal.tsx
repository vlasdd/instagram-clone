import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import UserSuggestionType from '../../types/user-suggestion-type';
import UserSuggestion from "./UserSuggestion";

type UsersListProps = {
    uid: string,
    usersList: UserSuggestionType[];
    descriptionLine: string;
}

const UsersListModal: React.FC<UsersListProps> = ({ uid, usersList, descriptionLine }) => {
    const navigate = useNavigate();

    const users = usersList.map(data => <UserSuggestion {...data} key={data.userId} />)

    return (
        <>
            <div className="h-10 w-full flex justify-center items-center font-medium border-b relative">
                <p>{descriptionLine}</p>
                <button
                    className="absolute right-2"
                    onClick={() => navigate(-1)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            {users.length === 0 ?
                <div className="text-center mt-2">No {descriptionLine}s(((</div> :
                <div>
                    {users}
                </div>
            }
        </>
    )
}

export default UsersListModal