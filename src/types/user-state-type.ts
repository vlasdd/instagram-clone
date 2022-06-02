import BirthdateState from "./birthdate-type";
import PostType from "./post-type";
import UserSuggestion from "./user-suggestion-type";

type UserState = {
    dateCreated: number,
    emailAddress: string,
    following: UserSuggestion[],
    followers: UserSuggestion[],
    fullName: string,
    userId: string,
    username: string,
    birthdate: BirthdateState,
    phoneNumber: string,
    profileImage: string,
    posts: PostType[]
}

export default UserState;
