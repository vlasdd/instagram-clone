import BirthdateState  from "./birthdate-type";

type UserData = {
    username: string,
    fullName: string,
    emailOrPhoneNumber: string,
    password: string,
    birthdate: BirthdateState,
}

export default UserData;