import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js"
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyB0BWs2UOsFDe3xCaXtR2x8PHbNvRSqT-o",
    authDomain: "final-instagram-75a05.firebaseapp.com",
    projectId: "final-instagram-75a05",
    storageBucket: "final-instagram-75a05.appspot.com",
    messagingSenderId: "1003708379646",
    appId: "1:1003708379646:web:80060ba73ca993d72e10af"
};

// Draw post
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let mail;
let userName;

//Aqui bajo cada post de la base de datos
async function getpostsDeBD() {
    const querySnapshot = await getDocs(collection(db, "post"));
    const mappedArray = [];
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        mappedArray.push(doc.data());
    });
    return mappedArray;
}


let postsDeBD = await getpostsDeBD();
console.log(postsDeBD)

displayPost();

//Asignar el nombre de usuario
onAuthStateChanged(auth, (user) => {
    if (user) {

        mail = user.email;
        if (mail) {
            userName = mail.split('@')[0];
            console.log(userName);
        }
        let usuario = document.getElementById("nombre_de_usuario");
        if (usuario) {
            usuario.innerText = userName;
        }
    }
});



function displayPost() {

    const seccionPosts = document.getElementById('post-container');
    seccionPosts.innerHTML = '';

    //Aqui creo un post con la informacion de cada uno
    postsDeBD.forEach(postInfo => {
            const post = document.createElement('section');
            post.className = `post`;
            post.innerHTML = `<div class="post-head">
                    <img src="../imgs/usuario.png" alt="">
                    <div class="informacion-post">
                        <span>  ${postInfo.name} </span>
                        <p>${postInfo.location}</p>
                    </div>
                </div>

                <!-- Imagen principal-->
                <div class="imagen-principal">
                    <img src="${postInfo.imgUrl}" alt="">
                </div>

                <div class="descripcion-post"> 
                    <div class="interacciones">
                        <div class="interacciones-i">
                            <img src="../imgs/interacciones/corazon.JPG" alt="">
                            <img src="../imgs/interacciones/comentario.JPG" alt="">
                            <img src="../imgs/interacciones/mensaj.JPG" alt="">
                        </div>
                        <div class="interacciones-d">
                            <img src="../imgs/interacciones/guardar.JPG" alt="">
                        </div>
                    </div>

                    <div class="likes_descripcion">
                        <span> 111 Me gusta </span>
                        <p> <span> ${postInfo.name} </span> ${postInfo.description} </p>
                    </div>

                    <div class="comentarios">
                        <p> Ver más comentarios...</p>
                        <span> HACE DOS DIÁS</span>
                    </div>
                
                    <div class="comentar">
                        <img src="../imgs/interacciones/comentar.JPG" alt="">
                        <p>Añade un comentario</p>
                        <span> Publicar</span>
                    </div>
                </div>`
        
    //Aqui creo un post con la informacion de cada uno
            seccionPosts.append(post);
        })

}

    //Con esto me salgo de la sesion
    
let botonLogOut = document.getElementById('log-out');
console.log(botonLogOut);
botonLogOut.addEventListener('click', (e) => {
    logOut(e);
})


function logOut(e) {
    e.preventDefault();
    signOut(auth)
        .then(() => {
            console.log('Log Out succesfully');
            window.location.href = "../login";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}