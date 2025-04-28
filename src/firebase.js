import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, getFirestore, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAAaN_ZkaDGy1bYJcncz3yNsWOFzFa12i0",
  authDomain: "netflix-clone-fb542.firebaseapp.com",
  projectId: "netflix-clone-fb542",
  storageBucket: "netflix-clone-fb542.firebasestorage.app",
  messagingSenderId: "51331287866",
  appId: "1:51331287866:web:dc011336714ea288cd1e03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}


const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);

    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}


const logout =()=>{
    signOut(auth)
}

export { auth, db, signup, login, logout };