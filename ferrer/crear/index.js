import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js"
import { getFirestore, collection,addDoc } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js"


const firebaseConfig = {
    apiKey: "AIzaSyB0BWs2UOsFDe3xCaXtR2x8PHbNvRSqT-o",
    authDomain: "final-instagram-75a05.firebaseapp.com",
    projectId: "final-instagram-75a05",
    storageBucket: "final-instagram-75a05.appspot.com",
    messagingSenderId: "1003708379646",
    appId: "1:1003708379646:web:80060ba73ca993d72e10af"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);



let nombreDeUsuario; //
let mail;

//Consigo el nombre del usuario 
onAuthStateChanged(auth, (user) => {
    if (user) {

        mail = user.email;
        console.log(mail)

        if (mail) {
            //Parto el nombre de usuario  para atras desde la arroba
            nombreDeUsuario = mail.split('@')[0];
            console.log(nombreDeUsuario);
        }

    } else {
        // ...

    }
});

//Crear un nuevo post

//Ruta de la imagen en Storage
const imgRoute = 'post-imagenes';

let ubicacionPost = document.getElementById('input-ubicacion');
let descripcionPost = document.getElementById('input-descripcion');
let botonPost = document.getElementById('input-boton');


    botonPost.addEventListener('click', () => {
        addPost();
    })

//Añadir un nuevo post
async function addPost() {
    try {
 
        //Aqui coge la imagen
        const imgInput = document.getElementById('input-img').files[0];
 
         //Aqui me da la url de la imagen
        const uploadedFileUrl = await addImage(imgInput.name, imgInput);

        const docRef = await addDoc(collection(db, "post"), {
            name: nombreDeUsuario || null,
            location: ubicacionPost.value || null,
            description: descripcionPost.value || null,
            imgUrl: uploadedFileUrl || null
        });

        ubicacionPost.value = '';
        descripcionPost.value = '';


        console.log("Document written with name:", docRef.id)

    } catch (e) {
        console.error("Error adding document", e)
    }
}

//Añadir la imagen
async function addImage(name, file) {

    //Aqui le digo donde me guarde la imagen y con que nombre
    const storageRef = ref(storage, `${imgRoute}/${name}`);

    try {
        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef);

            //Aqui le digo que me retorne la url de la imagen
        return url
    } catch (err) {
        console.error("Error uploading img: " + err.message)
    }

}