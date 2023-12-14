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
  setDoc,
} from "./firebase.js";
let btnText = document.getElementById("btnText");
let loader = document.getElementById("loader");
let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let phoneNumberRegex = /^(\+\d{1,4}\s?)?(\(?\d{1,}\)?[\s.-]?)?\d{1,}[\s.-]?\d{1,}[\s.-]?\d{1,}$/;
let passFormat = /^[A-Za-z]\w{7,14}$/;
let regEmail = document.getElementById("reg-email");
let regPassword = document.getElementById("reg-password");
let regPhone = document.getElementById("reg-phone");
let regName = document.getElementById("reg-name");
let registerUser = () => {

  if (!regName.value.trim()) {
    // console.log("Enter Valid Name");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "error",
      title: "Enter Valid Name",
    });
  } else if (!regPhone.value.match(phoneNumberRegex)) {
    // console.log("Enetr correct number");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "error",
      title: "Enter correct phone number ",
    });
  } else if (!regEmail.value.match(mailFormat)) {
    // console.log("Incorrect Email");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "error",
      title: "Enter correct Email Address",
    });
  } else if (!regPassword.value.match(passFormat)) {
    // console.log("Pass Format Not Correct");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "error",
      title:
        "Password must be greater than 6 charachters and must contains alphabets and number",
    });
  } else {
    btnText.style.display = "none";
    registerBtn.disabled = true
    loader.style.display = "flex";
    createUserWithEmailAndPassword(auth, regEmail.value, regPassword.value)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // try {
        //   await setDoc(doc(db, "users", user.uid), {
        //     ...userData,
        //     id: user.uid,
        //   });
        //   // let userUid = user.uid;
        //   // localStorage.setItem("userUid", userUid);
        //   // localStorage.setItem("status" , true)

        //   console.log(
        //     `Document written with ID: ${user.uid} user name -- > ${userData.name}`
        //   );
        //   btnText.style.display = "block";
        //   registerBtn.disabled = false;
        //   loader.style.display = "none";
        //   // window.location = "/profile.html";
        // } catch (e) {
        //   console.error("Error adding document: ", e);
        // }
        dataToFirestore(user)


        console.log("user", user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        btnText.style.display = "block";
        registerBtn.disabled = false;
        loader.style.display = "none";
        console.log(errorMessage);
        // ..
      });
  }
};
let registerBtn = document.getElementById("registerBtn");
registerBtn.addEventListener("click", registerUser);

let dataToFirestore = async (user) => {
  let userData = {
    name: regName.value,
    phone: regPhone.value,
    email: regEmail.value,
    password: regPassword.value,
  };
  try {
    await setDoc(doc(db, "users", user.uid), {
      ...userData,
      id: user.uid,
    });
    // let userUid = user.uid;
    // localStorage.setItem("userUid", userUid);
    // localStorage.setItem("status" , true)

    console.log(
      `Document written with ID: ${user.uid} user name -- > ${userData.name}`
    );
    btnText.style.display = "block";
    registerBtn.disabled = false;
    loader.style.display = "none";
    // window.location = "/profile.html";
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

let googleSignIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("user ===>", user);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
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
