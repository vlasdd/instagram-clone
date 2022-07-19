import { db } from "firebase-setup/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppSelector } from "redux-setup/hooks";
import PostType from "types/postType";
import UserState from "types/userStateType";

type UsePostsToRenderType = ((postsAmount: number) => {
    postsToRender: PostType[] | null,
    setPostsToRender: React.Dispatch<React.SetStateAction<PostType[] | null>>,
})

const usePostsToRender: UsePostsToRenderType = (postsAmount) => {
    const loggedUser = useAppSelector(state => state.signedUser.user);
    const [postsToRender, setPostsToRender] = useState<PostType[] | null>(null);

    useEffect(() => {
        const getPosts = async () => {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("userId", "in", loggedUser.following.map(userObj => userObj.userId)));
            const querySnapshot = await getDocs(q);

            const users = querySnapshot.docs.map(doc => doc.data()) as UserState[]
            const allPosts = users.reduce((accum: PostType[], user: UserState) => {
                user.posts.forEach(post => accum.push(post));
                return accum
            }, [])

            const currentPosts = allPosts.sort((a, b) => b.createdAt - a.createdAt).slice(0, postsAmount);
            console.log(currentPosts)
            setPostsToRender(currentPosts)
        }

        if(loggedUser.following.length){
            getPosts();
        }
        else{
            setPostsToRender([])
        }
    }, [])

    return { postsToRender, setPostsToRender }
}

export default usePostsToRender