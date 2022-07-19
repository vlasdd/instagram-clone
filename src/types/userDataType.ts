import BirthdateState  from "types/birthdateType";

type UserData = {
    username: string,
    fullName: string,
    emailOrPhoneNumber: string,
    password: string,
    birthdate: BirthdateState,
}

export default UserData;