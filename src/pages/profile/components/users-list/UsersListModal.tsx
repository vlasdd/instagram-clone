import React, { useCallback } from 'react'
import Close from 'svgs/empty/Close';
import UserLoader from 'components/other/UserLoader';
import UserSuggestion from "./UserSuggestion";
import useUserList from 'pages/profile/hooks/useUserList';

type UsersListProps = {
    usersList: {userId: string}[];
    descriptionLine: string;
    closeEvent: () => void
}

const UsersListModal: React.FC<UsersListProps> = React.memo(({ usersList, descriptionLine, closeEvent }) => {
    const allUsers = useUserList(usersList);
    
    const users = allUsers.map(data => <UserSuggestion {...data} key={data.userId} />)

    const generateSkeletons = useCallback(() => {
        const skeletons = [];
        for (let i = 0; i < 3; i++) {
            skeletons.push(
                <UserLoader
                    key={i}
                    imageStyles={{ width: 40, height: 40, borderRadius: "50%" }}
                    firstTextStyles={{ width: 150, height: 9, borderRadius: "10px" }}
                    secondTextStyles={{ width: 130, height: 9, borderRadius: "10px" }}
                />
            );
        }

        return skeletons
    }, [])

    return (
        <>
            <div className="h-10 w-full flex justify-center items-center font-medium border-b relative">
                <p>{descriptionLine}</p>
                <button
                    className="absolute right-2"
                    onClick={closeEvent}
                >
                    <Close
                        styles="h-7 w-7"
                    />
                </button>
            </div>
            {
                allUsers.length ?
                    <div className="overflow-hidden overflow-y-auto">
                        {users}
                    </div> :
                    generateSkeletons() 
            }
        </>
    )
})

export default UsersListModal