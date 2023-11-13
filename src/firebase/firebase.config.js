// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-oFjsCFBVbPKiyxD2ek7kv-lrdcL1dPY",
  authDomain: "taskodo-app.firebaseapp.com",
  projectId: "taskodo-app",
  storageBucket: "taskodo-app.appspot.com",
  messagingSenderId: "303235856895",
  appId: "1:303235856895:web:b92ad37a58bc66d0880fca"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);