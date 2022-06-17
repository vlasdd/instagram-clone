import React, { useEffect, useState } from 'react'
import UserSearchElement from './UserSearchElement'
import UserState from '../../types/user-state-type';
import getUsers from '../../helpers/getUsers';

const UsersSearchDropMenu: React.FC<{ wordEntering: string }> = ({ wordEntering }) => {
    const [usersInfo, setUsersInfo] = useState<UserState[]>([])

    useEffect(() => {
        getUsers(wordEntering, setUsersInfo);
    }, [wordEntering])

    return (
        <div className="flex flex-col w-full mt-2 overflow-hidden overflow-y-auto">
            {usersInfo.length ?
                usersInfo.map(doc => <UserSearchElement
                    profileImage={doc.profileImage}
                    username={doc.username}
                    fullName={doc.fullName}
                    userId={doc.userId}
                    key={doc.userId}
                />) :
                <div className="flex justify-center font-medium"><p>No results</p></div>
            }
            <div className="w-4 h-4 absolute bg-white rotate-45 top-[-8px] right-[180px]"></div>
        </div>
    )
}

export default UsersSearchDropMenu