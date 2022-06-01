import BirthdateState from "./birthdate-type";
import PostType from "./post-type";

type UserState = {
    dateCreated: number,
    emailAddress: string,
    following: string[],
    followers: string[],
    fullName: string,
    userId: string,
    username: string,
    birthdate: BirthdateState,
    phoneNumber: string,
    profileImage: string,
    posts: PostType[]
}

export default UserState;
