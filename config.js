// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getFirestore,collection,getDocs} from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUlSvlgpXiGItDzo6I7_dOKypNXG5onMo",
  authDomain: "davagenieassign2.firebaseapp.com",
  projectId: "davagenieassign2",
  storageBucket: "davagenieassign2.appspot.com",
  messagingSenderId: "630265607931",
  appId: "1:630265607931:web:279256bb37f1af4dea225e",
  measurementId: "G-W2EZSS8KM1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore;
export const db = getFirestore(app);