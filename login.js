import { signInWithEmailAndPassword, auth } from "./firebase.js";

let loginUser = ()=>{
  let btnText = document.getElementById("btnText");
  let loader = document.getElementById("loader");
let email  =document.getElementById("email")
let password  =document.getElementById("password")
if (email.value && password.value) {
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        localStorage.setItem("userUid" , user.uid)
        console.log("user ,", user.uid);
        window.location = "/profile.html"
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
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
          title: "User Not Found"
        });
        email.value = ""
        password.value = ""
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