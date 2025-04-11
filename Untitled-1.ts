// Import the functions you need from the Firebase SDKs
import { initializeApp, FirebaseOptions } from "firebase/app";


// Your Firebase project's configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyByPCo2he3DP31YIuRtxsg0JQv3AS4SEIY",
  authDomain: "leadgendb-b2696.firebaseapp.com",
  projectId: "leadgendb-b2696",
  storageBucket: "leadgendb-b2696.firebasestorage.app",
  messagingSenderId: "919855740449",
  appId: "1:919855740449:web:804f07e3ae074ef1061560"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
