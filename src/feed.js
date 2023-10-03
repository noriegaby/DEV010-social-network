import { collection, addDoc, onSnapshot, serverTimestamp, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { db, app} from './firebase.js'; // Asegúrate de importar 'app' desde './firebase.js'

function postFeed() {
  const feedContainer = document.createElement('article');
  feedContainer.innerHTML = `
    <br><textarea id="text-post" placeholder="¿Qué cocinaste hoy?"></textarea><br>
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
  // ... (código existente)
  onSnapshot(orderedPostsQuery, (querySnapshot) => {
    sectionP.innerHTML = '';
    querySnapshot.forEach((docSnapshot) => {
      const postData = docSnapshot.data(); // Cambio doc a docSnapshot
      const postText = postData.post;
      const postId = docSnapshot.id; // Cambio doc a docSnapshot
      const postSection = document.createElement('section');
      postSection.classList.add('section1');
      
      postSection.textContent = postText;
  
      // Botón de Editar
      const editButton = document.createElement('button');
      editButton.textContent = 'Editar';
      editButton.classList.add('edit-button');
      editButton.addEventListener('click', async () => {
        const newText = prompt('Edita tu publicación:', postText);
        if (newText !== null) {
          try {
            const postRef = doc(db, 'post', postId); // Cambio doc a docSnapshot
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
            const postRef = doc(db, 'post', postId); // Cambio doc a docSnapshot
            await deleteDoc(postRef);
            console.log("Publicación borrada exitosamente");
          } catch (error) {
            console.error("Error al borrar la publicación:", error);
          }
        }
      });
  
      // Agregar botones al section
      postSection.appendChild(editButton);
      postSection.appendChild(deleteButton);
  
      sectionP.appendChild(postSection);
    });
  });


  return feedContainer;
}

export default initializeFeed;
