import BirthdateState  from "types/birthdate-type";

type UserData = {
    username: string,
    fullName: string,
    emailOrPhoneNumber: string,
    password: string,
    birthdate: BirthdateState,
}

export default UserData;