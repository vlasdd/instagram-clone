import { db } from "firebase-setup/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import random from "helpers/other/generate-random/generateRandom";
import { useEffect, useState } from "react";
import { useAppSelector } from "redux-setup/hooks";
import UserState from "types/userStateType";

const useSuggestions: (suggestionsLength: number) => UserState[] = (suggestionsLength) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);

    const [suggestionsInfo, setSuggestionsInfo] = useState<UserState[]>([]);

    useEffect(() => {
        const getSuggestions = async () => {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", ">=", ""));
            const querySnapshot = await getDocs(q);
            let docsContainer: UserState[] = [];
            let i = 0;

            while (docsContainer.length !== suggestionsLength) {
                const index = random(0, querySnapshot.docs.length);
                const currentDoc = querySnapshot.docs[index].data() as UserState;

                if (
                    docsContainer.every(user => user.userId !== currentDoc.userId) &&
                    loggedUser.following.every(user => user.userId !== currentDoc.userId) &&
                    currentDoc.userId !== loggedUser.userId
                ) {
                    setSuggestionsInfo(prevUsers => [...prevUsers, currentDoc])
                    docsContainer = [...docsContainer, currentDoc];
                }

                if(i > suggestionsLength * 100){
                    break;
                }
                i++;
            }
        }

        getSuggestions();
    }, [])

    return suggestionsInfo
}

export default useSuggestions