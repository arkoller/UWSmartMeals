// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCX9y6lSSzClAXx4HZcXcx4Um5ryBv6eZk",
  authDomain: "is424-uwsmartmeals.firebaseapp.com",
  projectId: "is424-uwsmartmeals",
  storageBucket: "is424-uwsmartmeals.firebasestorage.app",
  messagingSenderId: "937787418296",
  appId: "1:937787418296:web:d6b30348532c18dce4364d",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// define authentication variable
let auth = firebase.auth();
let db = firebase.firestore();

// define a storage reference
// let ref = firebase.storage().ref();
