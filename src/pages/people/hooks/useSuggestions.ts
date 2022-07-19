import { db } from "firebase-setup/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppSelector } from "redux-setup/hooks";
import UserState from "types/userStateType";

const SUGGESTIONS_AMOUNT = 30;

const useSuggestions = () => {
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

    return suggestions
}

export default useSuggestions;