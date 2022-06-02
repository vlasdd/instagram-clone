type UserSuggestion = {
    profileImage: string,
    username: string,
    fullName: string,
    additionalInfo?: string, 
    isFollowed: boolean
}

export default UserSuggestion;