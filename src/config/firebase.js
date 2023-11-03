// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpf36KGM-viSOFwKyXCqFy1pTq4Kp-XZo",
  authDomain: "travel-advisor-4u.firebaseapp.com",
  projectId: "travel-advisor-4u",
  storageBucket: "travel-advisor-4u.appspot.com",
  messagingSenderId: "464109177537",
  appId: "1:464109177537:web:1c27d37a68038846b46240",
  measurementId: "G-W8NPE3NEMN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);