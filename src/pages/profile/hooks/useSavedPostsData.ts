import { db } from "firebase-setup/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import PostType from "types/postType";
import SavedPostType from "types/savePostType";
import UserState from "types/userStateType";

type UseSavedPostsDataType = (savedPosts: SavedPostType[]) => {
    savedPostsData: PostType[], 
    setSavedPostsData: React.Dispatch<React.SetStateAction<PostType[]>>
}

const useSavedPostsData: UseSavedPostsDataType = (savedPosts) => {
    const [savedPostsData, setSavedPostsData] = useState<PostType[]>([]);

    useEffect(() => {
        const getSavedPosts = async () => {
            await Promise.all(savedPosts.map(async savedPost => {
                const savedUserData = await getDoc(doc(db, "users", savedPost.fromId))
                const savedPostData = (savedUserData.data() as UserState).posts.find(post => post.postId === savedPost.postId)

                if(savedPostData){
                    setSavedPostsData(prevPosts => [...prevPosts, savedPostData])
                }
              }));
        } 

        getSavedPosts();
    }, [])
    
    return { savedPostsData, setSavedPostsData }
}

export default useSavedPostsData