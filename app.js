import {
  onAuthStateChanged,
  auth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  provider,
  deleteUser,
  deleteDoc,
  doc,
  db,
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
    console.log("not logged in");
    if ( localStorage.getItem("status") &&
    (  location.pathname !== "/index.html" &&
      location.pathname !== "/register.html")
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

let deleteAcc = () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        const user = auth.currentUser;
        localStorage.clear();
        deleteUser(user)
        .then(async () => {
          // User deleted.
         let status =  localStorage.setItem("status", true)
          console.log("Auth wala user delete");
            try {
              await deleteDoc(doc(db, "users", localUid));
            } catch (error) {
              console.log(error);
            }
            console.log("User Deleted");
            window.location= "./index.html"
         
          })
          .catch((error) => {
            // An error ocurred
            console.log("An unkown error occurred. Try Again", error);
            // ...
          });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your account is safe :)",
          icon: "error",
        });
      }
    });
};
let deleteAccBtn = document.getElementById("deleteAccBtn");

deleteAccBtn && deleteAccBtn.addEventListener("click", deleteAcc);
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
