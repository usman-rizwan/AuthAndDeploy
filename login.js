import { signInWithEmailAndPassword, auth } from "./firebase.js";

let loginUser = () => {
  let btnText = document.getElementById("btnText");
  let loader = document.getElementById("loader");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  if (email.value && password.value) {
    btnText.style.display = "none";
    loginBtn.disabled = true;
    loader.style.display = "flex";
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // localStorage.setItem("userUid" , user.uid)
        // localStorage.setItem("status" , true)
        console.log("user ,", user.uid);
        btnText.style.display = "block";
        loginBtn.disabled = false;
        loader.style.display = "none";
        window.location = "/profile.html";
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
          },
        });
        Toast.fire({
          icon: "error",
          title: errorMessage,
        });
        btnText.style.display = "block";
        loginBtn.disabled = false;
        loader.style.display = "none";
        email.value = "";
        password.value = "";
      });
  } else {
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
      },
    });
    Toast.fire({
      icon: "error",
      title: "Enter correct email and password",
    });
  }
};

let loginBtn = document.getElementById("loginBtn");

loginBtn && loginBtn.addEventListener("click", loginUser);
