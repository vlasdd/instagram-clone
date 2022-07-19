import { auth, db } from "firebase-setup/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import UserState from "types/userStateType";

const signUp = async (password: string, userDoc: UserState) => {
    const user = await createUserWithEmailAndPassword(auth, userDoc.emailAddress, password);
    await setDoc(doc(db, "users", user.user.uid), userDoc)
}

export default signUp;