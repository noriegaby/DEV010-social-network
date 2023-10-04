import { collection, addDoc, onSnapshot, serverTimestamp, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { db, app} from './firebase.js'; // Asegúrate de importar 'app' desde './firebase.js'

function postFeed() {
  const feedContainer = document.createElement('article');
  feedContainer.innerHTML = `
    <br><textarea id="text-post" placeholder="¿Qué cocinaste hoy?"></textarea><br>
    <button id="btn-submit">Publicar</button><br><br>
    <section id="sectionP"></section> 
  `;

  // Agrega una clase al contenedor principal si lo necesitas
  feedContainer.classList.add('feed-container');

  return feedContainer;
}
function initializeFeed() {
  const feedContainer = postFeed();
  const sectionP = feedContainer.querySelector('#sectionP');
  const btnSubmit = feedContainer.querySelector('#btn-submit');
  const textPost = feedContainer.querySelector('#text-post');
  const postCollection = collection(db, "post");

  const orderedPostsQuery = query(postCollection, orderBy("timestamp", "desc")); // Ordena por fecha descendente

  onSnapshot(orderedPostsQuery, (querySnapshot) => {
    sectionP.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const postData = doc.data();
      const postText = postData.post;
      const postId = doc.id;
      const postSection = document.createElement('section');

        // Agrega una clase a todos los section
    postSection.classList.add('section1'); 

    postSection.textContent = postText;

      sectionP.appendChild(postSection);
    });
  });

  btnSubmit.addEventListener('click', async () => {
    const textAreaPost = textPost.value;
    if (textAreaPost.trim() === '') {
      alert('Por favor, ingresa algo antes de publicar.');
      return;
    }
    try {
      await addDoc(postCollection, {
        post: textAreaPost,
        timestamp: serverTimestamp()
      });
      textPost.value = '';
      console.log("Publicación exitosa");
    } catch (error) {
      console.error("Error al publicar:", error);
    }
  });
  

onSnapshot(orderedPostsQuery, (querySnapshot) => {
  sectionP.innerHTML = '';
  querySnapshot.forEach((docSnapshot, index) => {
    const postData = docSnapshot.data();
    const postText = postData.post;
    const postId = docSnapshot.id;
    
    const postSection = document.createElement('section');
    postSection.classList.add('section1');
    postSection.textContent = postText;

    const lineBreak = document.createElement('br');


    // Botón de Editar
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', async () => {
      const newText = prompt('Edita tu publicación:', postText);
      if (newText !== null) {
        try {
          const postRef = doc(db, 'post', postId);
          await updateDoc(postRef, {
            post: newText,
            timestamp: serverTimestamp()
          });
          console.log("Publicación editada exitosamente");
        } catch (error) {
          console.error("Error al editar la publicación:", error);
        }
      }
    });

    // Botón de Borrar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', async () => {
      if (confirm('¿Seguro que quieres borrar esta publicación?')) {
        try {
          const postRef = doc(db, 'post', postId);
          await deleteDoc(postRef);
          console.log("Publicación borrada exitosamente");
        } catch (error) {
          console.error("Error al borrar la publicación:", error);
        }
      }
    });

    // Contenedor para los botones
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    // Agregar botones y texto al section
    postSection.appendChild(buttonContainer);

    sectionP.appendChild(postSection);
    sectionP.appendChild(lineBreak);
  });
});

  return feedContainer;
}

export default initializeFeed;
