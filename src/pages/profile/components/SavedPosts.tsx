import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase/firebaseConfig';
import PostType from '../../../types/post-type'
import SavedPostType from '../../../types/save-post-type'
import UserState from '../../../types/user-state-type';
import PostsContainer from './PostsContainer';

const SavedPosts: React.FC<{ savedPosts: SavedPostType[] }> = ({ savedPosts }) => {
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

    return (
        savedPostsData.length ?
            <PostsContainer posts={savedPostsData} changePosts={setSavedPostsData}/> :
            <div className="w-[300px] sm:w-[350px] h-full flex items-center justify-center mt-8 text-center">
                <div className="flex flex-col items-center">
                    <img
                        src="../images/saved.jpg"
                        className="w-20"
                    />
                    <p className="text-3xl font-extralight">Save</p>
                    <p className="text-sm mt-3">
                        Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved.
                    </p>
                </div>
            </div>
    )
}

export default SavedPosts