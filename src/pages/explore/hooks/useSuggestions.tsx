import { db } from "firebase-setup/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import random from "helpers/other/generate-random/generateRandom";
import { useEffect, useState } from "react";
import { useAppSelector } from "redux-setup/hooks";
import PostType from "types/postType";
import UserState from "types/userStateType";

const SUGGESTIONS_AMOUNT = 30;

type UseSuggestionsType = () => PostType[]

const useSuggestions: UseSuggestionsType = () => {
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

                if (
                    peopleContainer.every(user => user.userId !== currentDoc.userId) &&
                    loggedUser.following.every(user => user.userId !== currentDoc.userId) &&
                    currentDoc.userId !== loggedUser.userId &&
                    currentDoc.posts.length !== 0
                ) {
                    peopleContainer = [...peopleContainer, currentDoc];
                }

                if(i > SUGGESTIONS_AMOUNT * 100){
                    break;
                }
                i++;
            }

            if(peopleContainer.length !== SUGGESTIONS_AMOUNT){
                peopleContainer.forEach(person => {
                    const index = random(0, person.posts.length);
                    setPostsSuggestions(prevPosts => [...prevPosts, person.posts[index]])
                })
            }
            else{
                peopleContainer.forEach(person => {
                    const index = random(0, person.posts.length);
                    setPostsSuggestions(prevPosts => [...prevPosts, person.posts[index]])
                })
            }
        }

        getSuggestions();
    }, [])

    return postsSuggestions
}

export default useSuggestions