import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCRYLlgg33U-AZwL2UOCc5d8TkIXyG3e_o",
    authDomain: "instagram-clone-89723.firebaseapp.com",
    projectId: "instagram-clone-89723",
    storageBucket: "instagram-clone-89723.appspot.com",
    messagingSenderId: "646896293704",
    appId: "1:646896293704:web:e163632b420b669657c57d"
};

const app = initializeApp(firebaseConfig); 
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };