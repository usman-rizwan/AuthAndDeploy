import { signInWithEmailAndPassword, auth } from "./firebase.js";

let loginUser = ()=>{
let email  =document.getElementById("email")
let password  =document.getElementById("password")
if (email.value && password.value) {
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("user ,", user);
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    });
}else{
    // console.log("Enter correct email and password");
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Enter correct email and password"
      });
}
}


let loginBtn = document.getElementById("loginBtn")

loginBtn && loginBtn.addEventListener("click",loginUser)