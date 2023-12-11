import {
    createUserWithEmailAndPassword,
    auth,
    signInWithPopup,
    GoogleAuthProvider,
    provider,
    collection,
    doc,
    db,
    addDoc,
    setDoc
} from "./firebase.js";

let registerUser = () => {
    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let phoneNumberRegex = /^(\+\d{1,4}\s?)?(\(?\d{1,}\)?[\s.-]?)?\d{1,}[\s.-]?\d{1,}[\s.-]?\d{1,}$/;
    let passFormat = /^[A-Za-z]\w{7,14}$/;
    let regEmail = document.getElementById("reg-email");
    let regPassword = document.getElementById("reg-password");
    let regPhone = document.getElementById("reg-phone");
    let regName = document.getElementById("reg-name");
    let userData = {
        name: regName.value,
        phone: regPhone.value,
        email: regEmail.value,
        password: regPassword.value

    }
    if (!regName.value.trim()) {
        console.log("Enter Valid Name");
    } else if (!regPhone.value.match(phoneNumberRegex)) {
        console.log("Enetr correct number");
    }  else if (!regEmail.value.match(mailFormat)) {
        console.log("Incorrect Email");
    }  else if (!regPassword.value.match(passFormat)) {
        console.log("Pass Format Not Correct");
    } 
    else {
        createUserWithEmailAndPassword(auth, regEmail.value, regPassword.value)
            .then(async (userCredential) => {
                // Signed up
                const user = userCredential.user;
                try {
                    await setDoc(doc(db, "users", user.uid), {
                        ...userData,
                        id: user.uid,
                    });
                    console.log(
                        `Document written with ID: ${user.uid} user name -- > ${userData.name}`
                    );
                }
                catch (e) {
                    console.error("Error adding document: ", e);
                }

                console.log("user", user);

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
                // ..
            });
    }
};
let registerBtn = document.getElementById("registerBtn");
registerBtn.addEventListener("click", registerUser);

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
googleBtn.addEventListener("click", googleSignIn);
