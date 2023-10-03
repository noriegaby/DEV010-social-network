import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from './firebase.js'; // Importa db desde donde esté definida

// Define la función postFeed() primero
function postFeed() {
  const feedContainer = document.createElement('article');
  feedContainer.innerHTML = `
    <br><textarea id="text-post">¿Qué cocinaste hoy?</textarea><br>
    <button id="btn-submit">Post</button><br><br>
    <section id="sectionP"></section> 
  `;
  return feedContainer;
}

function initializeFeed() {
  // Llama a la función postFeed() para crear el feed
  const feedContainer = postFeed();

  // Obtén una referencia a la sección donde mostrarás los mensajes
  const sectionP = feedContainer.querySelector('#sectionP');

  // Agrega el evento click al botón
  const btnSubmit = feedContainer.querySelector('#btn-submit');
  const textPost = feedContainer.querySelector('#text-post');

  // Obtén una referencia a la colección en Firestore donde se almacenarán los mensajes
  const messagesCollection = collection(db, "messages");

  // Escucha en tiempo real los cambios en la colección de mensajes
  onSnapshot(messagesCollection, (querySnapshot) => {
    // Limpia la sección para evitar duplicaciones
    sectionP.innerHTML = '';

    // Recorre los documentos en la colección y agrega los mensajes al feed
    querySnapshot.forEach((doc) => {
      const messageData = doc.data();
      const messageText = messageData.post;
      const messageElement = document.createElement('p');
      messageElement.textContent = messageText;
      sectionP.appendChild(messageElement);
    });
  });

  btnSubmit.addEventListener('click', async () => {
    const textAreaPost = textPost.value;

    if (textAreaPost.trim() === '') {
      alert('Por favor, ingresa un mensaje antes de publicar.');
      return;
    }

    try {
      // Agrega el mensaje a Firestore
      await addDoc(messagesCollection, {
        post: textAreaPost,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      // Limpia el campo de texto después de la publicación
      textPost.value = '';

      console.log("Publicación exitosa");
    } catch (e) {
      console.error("Error", e);
    }
  });

  return feedContainer;
}

export default initializeFeed;
