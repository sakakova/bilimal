// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getStorage} from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABOo5WjrXqbtv-KeUgxrv_5szMa8U3Kvc",
  authDomain: "onoyku-61a1f.firebaseapp.com",
  projectId: "onoyku-61a1f",
  storageBucket: "onoyku-61a1f.appspot.com",
  messagingSenderId: "137835802741",
  appId: "1:137835802741:web:cca307458e35db2134883c",
  measurementId: "G-4BQXQF350R",
  databaseURL: "onoyku-61a1f.firebaseapp.com"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

// Authorization
export const auth  = getAuth(app);

export const storage = getStorage(app);


