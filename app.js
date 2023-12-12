// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// import {
//     getAuth,
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     onAuthStateChanged,
//     sendEmailVerification,
// } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
// import {
//     getFirestore,
//     collection,
//     addDoc,
//     getDocs,
//     doc,
//     setDoc,
// } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyD7pvJuZOX2O-tZJRfcuhPSUyZDZyi1Wbs",
//     authDomain: "fir-users-auth-fc835.firebaseapp.com",
//     projectId: "fir-users-auth-fc835",
//     storageBucket: "fir-users-auth-fc835.appspot.com",
//     messagingSenderId: "240085089487",
//     appId: "1:240085089487:web:e18821a8d60a10123b4bba",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const db = getFirestore(app);

// let regBtn = document.getElementById("regBtn");
// console.log(regBtn);

// regBtn.addEventListener("click", () => {
//     let email = document.getElementById("email");
//     let password = document.getElementById("password");
//     let name = document.getElementById("name");
//     let number = document.getElementById("number");
//     let userData = {
//         name: name.value,
//         email: email.value,
//         password: password.value,
//         number: number.value,
//     };

//     createUserWithEmailAndPassword(auth, userData.email, userData.password)
//         .then(async (userCredential) => {
//             // Signed up
//             const user = userCredential.user;
//             try {
//                 await setDoc(doc(db, "users", user.uid), {
//                     ...userData,
//                     id: user.uid,
//                 });
//                 console.log(
//                     `Document written with ID: ${user.id} user name -- > ${userData.name}`
//                 );
//                 window.location = "profile.html";
//             } catch (e) {
//                 console.error("Error adding document: ", e);
//             }
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log("error --> " + errorMessage);
//         });
// });

// let loginBtn = document.getElementById("loginBtn");
// console.log(loginBtn);
// loginBtn.addEventListener("click", () => {
//     let loginEmail = document.getElementById("loginEmail");
//     let loginPassword = document.getElementById("loginPassword");
//     signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
//         .then((userCredential) => {
//             // Signed in
//             const user = userCredential.user;
//             console.log("user-- > ", user);
//             window.location = "profile.html";
//             // ...
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log("error ", errorMessage);
//         });
// });
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         const uid = user.uid;
//         console.log("user --<>", user);
//         window.location = "/profile.html"
//         // ...
//     } else {
//         // User is signed out
//         // ...
//         if (location.pathname !== "/index.html") {

//             window.location = "index.html";
//         }
//         console.log("Not Login");
//     }
// });

// let getUserData = async () => {
//     const querySnapshot = await getDocs(collection(db, "users"));
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} => `, doc.data());
//     });
//     console.log("Current User -- >", auth.currentUser);
// };
// getUserData()

import {
  onAuthStateChanged,
  auth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  provider,
} from "./firebase.js";
let localUid = localStorage.getItem("userUid");
onAuthStateChanged(auth, (user) => {
  if (user && localUid) {
 
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log("user logged in ", user);
    if (location.pathname !== "/profile.html") {
      window.location = "/profile.html";
    }
    let userImage = document.getElementById("userImage");
    let userName = document.getElementById("userName");
    let userEmail = document.getElementById("userEmail");
    if (!user.photoURL || !user.displayName || !user.email) {
      userName.innerHTML = user.email.slice(0, user.email.indexOf("@"));
      userEmail.innerHTML = user.email;
      console.log("ho gaya");
    } else {
      userName.innerHTML = user.displayName;
      userEmail.innerHTML = user.email;
      userImage.src = user.photoURL;
      console.log("google se hua hai ");
    }
    // ...
  } else {
    // User is signed out
    console.log("not logged in ");
    if (
      location.pathname !== "/index.html" &&
      location.pathname !== "/register.html"
    ) {
      window.location = "/index.html";
    }
    // ...
  }
});

let logOutUser = () => {
  signOut(auth)
    .then(() => {
      localStorage.clear();
      console.log("Log out Successfully");
      window.location = "/index.html";
    })
    .catch((error) => {
      console.log(error);
      // An error happened.
    });
};
let logoutBtn = document.getElementById("logoutBtn");

logoutBtn && logoutBtn.addEventListener("click", logOutUser);

let googleSignIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
let googleBtn = document.getElementById("googleBtn");
googleBtn && googleBtn.addEventListener("click", googleSignIn);
