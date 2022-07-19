import React, { useEffect, useMemo, useState } from 'react'
import UserSearchElement from './UserSearchElement'
import UserState from 'types/userStateType';
import getUsers from 'helpers/other/get-users/getUsers';
import UserLoader from 'components/other/UserLoader';

const UsersSearchDropMenu: React.FC<{ wordEntering: string }> = React.memo(({ wordEntering }) => {
    const [usersInfo, setUsersInfo] = useState<UserState[]>([])

    useEffect(() => {
        const handler = setTimeout(async () => {
           await getUsers(wordEntering, setUsersInfo);
        }, 300)

        return () => clearTimeout(handler);
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

    const generateElements = useMemo(() => usersInfo.map(doc => <UserSearchElement
        profileImage={doc.profileImage}
        username={doc.username}
        fullName={doc.fullName}
        userId={doc.userId}
        key={doc.userId}
    />), [usersInfo])

    return (
        <div className="flex flex-col w-full mt-2 overflow-hidden overflow-y-auto">
            {
                usersInfo.length ?
                    generateElements :
                    generateSkeletons()
            }
            <div className="w-4 h-4 absolute bg-white rotate-45 top-[-8px] right-[180px]"></div>
        </div>
    )
})

export default UsersSearchDropMenu