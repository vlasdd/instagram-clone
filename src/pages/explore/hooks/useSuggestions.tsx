import { db } from "firebase-setup/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import random from "helpers/other/generate-random/generateRandom";
import { useEffect, useState } from "react";
import { useAppSelector } from "redux-setup/hooks";
import PostType from "types/postType";
import UserState from "types/userStateType";

const SUGGESTIONS_AMOUNT = 30;

type UseSuggestionsType = () => PostType[]

const useSuggestions: any = () => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const [postsSuggestions, setPostsSuggestions] = useState<PostType[]>([]);

    useEffect(() => {
        const getSuggestions = async () => {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", ">=", ""));
            const querySnapshot = await getDocs(q);
            let peopleContainer: UserState[] = [];
            let i = 0;

            while (peopleContainer.length !== SUGGESTIONS_AMOUNT) {
                const index = random(0, querySnapshot.docs.length);
                const currentDoc = querySnapshot.docs[index].data() as UserState;

                const isUserIncluded = peopleContainer.some(user => user.userId === currentDoc.userId);
                const isUserCurrent = currentDoc.userId === loggedUser.userId;
                const hasUserPosts = currentDoc.posts.length !== 0

                if (!isUserIncluded && !isUserCurrent && hasUserPosts) {
                    peopleContainer = [...peopleContainer, currentDoc];
                }

                if (i > SUGGESTIONS_AMOUNT * 100) {
                    break;
                }
                i++;
            }

            peopleContainer.forEach(person => {
                const index = random(0, person.posts.length);
                setPostsSuggestions(prevPosts => [...prevPosts, person.posts[index]])
            })
        }

        if(loggedUser.userId.length){
            getSuggestions();
        }
    }, [loggedUser.userId])

    return { postsSuggestions, setPostsSuggestions }
}

export default useSuggestions