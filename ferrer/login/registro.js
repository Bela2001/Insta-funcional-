import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js"



const firebaseConfig = {
    apiKey: "AIzaSyB0BWs2UOsFDe3xCaXtR2x8PHbNvRSqT-o",
    authDomain: "final-instagram-75a05.firebaseapp.com",
    projectId: "final-instagram-75a05",
    storageBucket: "final-instagram-75a05.appspot.com",
    messagingSenderId: "1003708379646",
    appId: "1:1003708379646:web:80060ba73ca993d72e10af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log(auth)

//Registro

let botonRegistro = document.getElementById('boton_registrarse');
botonRegistro.addEventListener('click', (e) => register(e));

function register(e) {
    e.preventDefault();
    let user = [{ email: "" }, { password: "" }]

    user.email = document.getElementById('registro-correo')?.value;
    user.password = document.getElementById('registro-contraseña')?.value;

    
    nuevoUsuario(user.email, user.password);

    document.getElementById('registro-correo').value = "";
    document.getElementById('registro-contraseña').value = "";
    document.getElementById('registro-usuario').value = "";
    document.getElementById('registro-nombre').value = "";
}

function nuevoUsuario(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("Registro con exito")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}