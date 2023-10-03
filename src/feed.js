import { collection, addDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db, app } from './firebase.js'; // Asegúrate de importar 'app' desde './firebase.js'

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
  const feedContainer = postFeed();
  const sectionP = feedContainer.querySelector('#sectionP');
  const btnSubmit = feedContainer.querySelector('#btn-submit');
  const textPost = feedContainer.querySelector('#text-post');
  const postCollection = collection(db, "post");

  onSnapshot(postCollection, (querySnapshot) => {
    sectionP.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const postData = doc.data();
      const postText = postData.post;
      const postElement = document.createElement('p');
      postElement.textContent = postText;
      sectionP.appendChild(postElement);
    });
  });

  btnSubmit.addEventListener('click', async () => {
    const textAreaPost = textPost.value;
    if (textAreaPost.trim() === '') {
      alert('Por favor, ingresa un mensaje antes de publicar.');
      return;
    }
    try {
      await addDoc(postCollection, {
        post: textAreaPost,
        timestamp: serverTimestamp()
      });
      textPost.value = '';
      console.log("Publicación exitosa");
    } catch {
      console.log("Error");
    }
  });

  return feedContainer;
}

export default initializeFeed;
