import React, { useEffect, useState } from 'react'
import UserSearchElement from './UserSearchElement'
import UserState from 'types/user-state-type';
import getUsers from 'helpers/other/getUsers';
import UserLoader from 'components/other/UserLoader';

const UsersSearchDropMenu: React.FC<{ wordEntering: string }> = ({ wordEntering }) => {
    const [usersInfo, setUsersInfo] = useState<UserState[]>([])

    useEffect(() => {
        getUsers(wordEntering, setUsersInfo);
    }, [wordEntering])

    const generateSkeletons = () => {
        const skeletons = [];
        for (let i = 0; i < 3; i++) {
            skeletons.push(
                <UserLoader
                    key={i}
                    imageStyles={{ width: 40, height: 40, borderRadius: "50%" }}
                    firstTextStyles={{ width: 160, height: 9, borderRadius: "10px" }}
                    secondTextStyles={{ width: 140, height: 9, borderRadius: "10px" }}
                />
            );
        }

        return skeletons
    }

    return (
        <div className="flex flex-col w-full mt-2 overflow-hidden overflow-y-auto">
            {
                usersInfo.length ?
                    usersInfo.map(doc => <UserSearchElement
                        profileImage={doc.profileImage}
                        username={doc.username}
                        fullName={doc.fullName}
                        userId={doc.userId}
                        key={doc.userId}
                    />) :
                    generateSkeletons()
            }
            <div className="w-4 h-4 absolute bg-white rotate-45 top-[-8px] right-[180px]"></div>
        </div>
    )
}

export default UsersSearchDropMenu