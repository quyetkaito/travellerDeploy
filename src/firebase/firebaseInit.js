// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDz8Bjcpn0Il62sS8qBdqRTaKcmfTsR_dM",
    authDomain: "traveller-df010.firebaseapp.com",
    projectId: "traveller-df010",
    storageBucket: "traveller-df010.appspot.com",
    messagingSenderId: "746894901226",
    appId: "1:746894901226:web:6a5b61d9468879ecde3c93",
    measurementId: "G-4YSGKBKC7W"
};

export default firebase.initializeApp(firebaseConfig);