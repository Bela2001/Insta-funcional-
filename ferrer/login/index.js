//Inicializar la aplicacion
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
//La autenticacion
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyB0BWs2UOsFDe3xCaXtR2x8PHbNvRSqT-o",
    authDomain: "final-instagram-75a05.firebaseapp.com",
    projectId: "final-instagram-75a05",
    storageBucket: "final-instagram-75a05.appspot.com",
    messagingSenderId: "1003708379646",
    appId: "1:1003708379646:web:80060ba73ca993d72e10af"
};

// Inicializas firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


//Log in
let botonEntrar = document.getElementById('boton_entrar');
    botonEntrar.addEventListener('click', (e) => logIn(e));

    function logIn(e) {
        e.preventDefault();
        let user = [{ email: "" }, { password: "" }]


        user.email = document.getElementById('input-correo')?.value;
        user.password = document.getElementById('input-contraseña')?.value;


        iniciarSesion(user.email, user.password);
    }


function iniciarSesion(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 

            const user = userCredential.user;
            console.log("Inicio de sesión exitoso");
            window.location.href = "../principal";

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error en inicio de sesión: ", errorCode, errorMessage)
        });
}