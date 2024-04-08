import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCNkjNxvexTkVQtMQ_4ry2ZJ1Pi5C9WR7g",
    authDomain: "myfirstapp-6f80f.firebaseapp.com",
    projectId: "myfirstapp-6f80f",
    storageBucket: "myfirstapp-6f80f.appspot.com",
    messagingSenderId: "702382119329",
    appId: "1:702382119329:web:179e63f5cbddf7191b93e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;