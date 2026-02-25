import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBPh6ILbyTmqlfklbQnN3w6fphfxJldzDQ",
    authDomain: "gestor-x-78de9.firebaseapp.com",
    projectId: "gestor-x-78de9",
    storageBucket: "gestor-x-78de9.firebasestorage.app",
    messagingSenderId: "91013861897",
    appId: "1:91013861897:web:8882118ecca0adacceded8"
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp)
