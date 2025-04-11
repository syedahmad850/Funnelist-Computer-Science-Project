import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyByPCo2he3DP31YIuRtxsg0JQv3AS4SEIY",
  authDomain: "leadgendb-b2696.firebaseapp.com",
  projectId: "leadgendb-b2696",
  storageBucket: "leadgendb-b2696.firebasestorage.app",
  messagingSenderId: "919855740449",
  appId: "1:919855740449:web:804f07e3ae074ef1061560"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // auth instance created

export { app, db, auth }; // Export All
