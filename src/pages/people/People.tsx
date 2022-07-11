import Header from 'components/header/Header'
import { db } from 'firebase-setup/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import Loading from 'pages/loading/Loading'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from 'redux-setup/hooks'
import UserState from 'types/user-state-type'
import PersonSuggestion from './PersonSuggestion'

const SUGGESTIONS_AMOUNT = 30;

const People: React.FC = () => {
  const loggedUser = useAppSelector(state => state.signedUser.user);
  const [suggestions, setSuggestions] = useState<UserState[]>([]);

  useEffect(() => {
    const getSuggestions = async () => {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", ">=", ""));
      const querySnapshot = (await getDocs(q)).docs.map(doc => doc.data());

      const users = querySnapshot
        .filter(user =>
          user.userId !== loggedUser.userId &&
          loggedUser.following.every(fol => fol.userId !== user.userId)
        )
        .sort((a, b) => 0.5 - Math.random())
        .slice(0, SUGGESTIONS_AMOUNT) as UserState[];

      setSuggestions(users);
    }

    getSuggestions();
  }, [])

  const users = useMemo(() => suggestions.map(data => (
    <PersonSuggestion
      {...data}
      key={data.userId}
    />
  )), [suggestions])

  return (
    users.length === 0 ?
      <Loading /> :
      <>
        <div className="back flex flex-col items-center">
          <Header />
          <div className={`min-h-[calc(100vh-60px)] w-full max-w-[550px] bg-blue-700 flex flex-col items-center back sm:pt-16 pb-16`}>
            <div className="w-full flex justify-start font-medium h-8 flex items-center bg-white sm:bg-inherit px-4">
              Suggested
            </div>
            <div className="w-full flex flex-col bg-white py-2 px-1">
              {users}
            </div>
          </div>
        </div>
        <div className="flex w-full fixed bottom-3 justify-center back text-xs text-gray-300 font-medium back">
          © 2022 INSTAGRAM FROM META
        </div>
      </>
  )
}

export default People