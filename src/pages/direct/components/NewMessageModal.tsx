import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RoutesTypes from '../../../constants/routes-types';
import { db } from '../../../firebase/firebaseConfig';
import getUsers from '../../../helpers/getUsers';
import { useAppSelector } from '../../../redux/hooks';
import Close from '../../../svgs/Close'
import UserState from '../../../types/user-state-type';
import UserSuggestion from '../../../types/user-suggestion-type';
import UserToWriteTo from './UserToWriteTo';

const NewMessageModal: React.FC<{ closeEvent: () => void }> = ({ closeEvent }) => {
  const signedUser = useAppSelector(state => state.signedUser.user);
  const navigate = useNavigate();

  const [wordEntering, setWordEntering] = useState<string>("");
  const [chosenUsers, setChosenUsers] = useState<UserSuggestion[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserState[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleUsers = async () => {
      await getUsers(wordEntering, setFilteredUsers);
      setFilteredUsers(prevUsers => prevUsers.filter(user => user.username !== signedUser.username));
    }

    handleUsers();
  }, [wordEntering])

  const createChatRoom = async () => {
    const userToChatTo = chosenUsers[0];
    const chatId = signedUser.userId + "-" + userToChatTo.userId;
    const reversedChatId = userToChatTo.userId + "-" + signedUser.userId;

    const allChats = await getDocs(collection(db, "chats"));

    let chatToNavigateTo: string = "";
    allChats.forEach(doc => {
      const docResult = doc.data().firstUserId + "-" + doc.data().secondUserId;
      if(docResult === chatId){
        chatToNavigateTo = chatId;
        return 
      }
      
      if(docResult === reversedChatId){
        chatToNavigateTo = reversedChatId;
        return;
      }
    })

    if(chatToNavigateTo.length !== 0){
      closeEvent();
      navigate(RoutesTypes.DIRECT + "/" + chatToNavigateTo);
      return;
    }

    await setDoc(doc(db, "chats", chatId), {
      firstUserId: signedUser.userId,
      secondUserId: userToChatTo.userId,
      messages: [],
      lastMessage: {
        text: "",
        userId: "",
      },
      lastEdited: new Date().getTime() / 1000
    });

    closeEvent();
    navigate(RoutesTypes.DIRECT + "/" + chatId)
  }

  return (
    <>
      <div className="h-11 w-full flex justify-center items-center font-medium border-b relative ">
        <button
          className="absolute left-2"
          onClick={closeEvent}
        >
          <Close 
            styles="w-7 h-7"
          />
        </button>
        <p>New message</p>
        <button
          className={`absolute right-3 font-bold ${chosenUsers.length === 0 ? "text-blue-300" : "text-blue-500"}`}
          disabled={chosenUsers.length === 0}
          onClick={createChatRoom}
        >
          <p>Next</p>
        </button>
      </div>
      <div className="w-full max-h-[175px] flex border-b p-3 items-start gap-5">
        <p className="font-medium mt-[6px]">To:</p>
        <div className="w-full h-full flex flex-col items-start gap-2 overflow-hidden overflow-y-auto">
          {
            chosenUsers.map(chosenUser => (
              <div
                className="bg-blue-100 flex rounded p-2"
                key={chosenUser.userId}
              >
                <button
                  className="flex gap-1"
                  onClick={() => {
                    setChosenUsers(prevUsers => prevUsers.filter(user => user.username !== chosenUser.username))
                    if (inputRef.current !== null) {
                      inputRef.current.focus();
                    }
                  }}
                >
                  <p className="text-cyan-500 text-sm ">{chosenUser.username}</p>
                  <Close
                    styles="w-5 h-5 text-cyan-500"
                  />
                </button>
              </div>
            ))
          }
          <input
            className="w-full p-2 rounded-lg placeholder:font-light placeholder:text-gray-400 placeholder:text-sm relative text-sm"
            type="text"
            placeholder="Search..."
            value={wordEntering}
            onChange={(event) => setWordEntering(event.target.value)}
            ref={inputRef}
          />
        </div>
      </div>
      <div className="flex flex-col overflow-hidden overflow-y-auto">
        {
          !filteredUsers.length ?
            <p className="font-medium text-sm pl-3 mt-2">Suggested</p> :
            filteredUsers.map(doc => <UserToWriteTo
              addUserToList={() => {
                setChosenUsers(prevUsers => [...prevUsers, doc]);
                setWordEntering("");
                if (inputRef.current !== null) {
                  inputRef.current.focus();
                }
              }}
              removeUserFromList={() => {
                setChosenUsers(prevUsers => prevUsers.filter(user => user.username !== doc.username))
                if (inputRef.current !== null) {
                  inputRef.current.focus();
                }
              }}
              isUserInList={chosenUsers.some(user => user.username === doc.username)}
              profileImage={doc.profileImage}
              username={doc.username}
              fullName={doc.fullName}
              userId={doc.userId}
              key={doc.userId}
            />)
        }
      </div>
    </>
  )
}

export default NewMessageModal