// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5H_Wo1V1iMXUnIew5QQ-9B9I1l0fqvog",
  authDomain: "pcdaco-61cb6.firebaseapp.com",
  projectId: "pcdaco-61cb6",
  storageBucket: "pcdaco-61cb6.firebasestorage.app",
  messagingSenderId: "595190135675",
  appId: "1:595190135675:web:d344cc62a30c956ec05bde",
  measurementId: "G-TX1DTWWL1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);