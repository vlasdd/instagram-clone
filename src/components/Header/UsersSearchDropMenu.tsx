import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebaseConfig'
import UserSearchElement from './UserSearchElement'
import UserState from '../../types/user-state-type';

const UsersSearchDropMenu: React.FC<{ wordEntering: string }> = ({ wordEntering }) => {
    const [usersInfo, setUsersInfo] = useState<UserState[]>([])

    useEffect(() => {
        const getUsers = async () => {
            if(wordEntering.length === 0){
                setUsersInfo([]);
                return;
            }
            
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", ">=", wordEntering), where("username", "<=", wordEntering + "~"));

            const querySnapshot = await getDocs(q);
            setUsersInfo(querySnapshot.docs.map(doc => doc.data()) as UserState[])
        }

        getUsers()
    }, [wordEntering])

    return (
        <div className="flex flex-col w-full mt-2 ">
            {usersInfo.map(doc => <UserSearchElement
                profileImage={doc.profileImage}
                username={doc.username}
                fullName={doc.fullName}
                userId={doc.userId}
            />)}
            <div className="w-4 h-4 absolute bg-white rotate-45 top-[-8px] right-[180px]"></div>
        </div>
    )
}

export default UsersSearchDropMenu