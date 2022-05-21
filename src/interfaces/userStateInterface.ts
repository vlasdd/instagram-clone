export default interface IUserStateInterface{
    currentUser: {
        dateCreated: number;
        emailAddress: string;
        following: string[]
        fullName: string
        userId: string
        username: string
    }
}