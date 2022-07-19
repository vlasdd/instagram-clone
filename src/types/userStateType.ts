import BirthdateState from "types/birthdateType";
import PostType from "types/postType";
import SavedPostType from "types/savePostType";

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
