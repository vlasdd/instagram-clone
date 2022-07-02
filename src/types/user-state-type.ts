import BirthdateState from "./birthdate-type";
import PostType from "./post-type";
import SavedPostType from "./save-post-type";

type UserState = {
    dateCreated: number,
    emailAddress: string,
    following: {userId: string}[],
    followers: {userId: string}[],
    fullName: string,
    userId: string,
    username: string,
    birthdate: BirthdateState,
    phoneNumber: string,
    profileImage: string,
    posts: PostType[],
    savedPosts: SavedPostType[],
}

export default UserState;
