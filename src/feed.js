import { collection, addDoc, onSnapshot, serverTimestamp, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { db, getAuth } from './firebase.js';


function postFeed() {
  const feedContainer = document.createElement('article');
  feedContainer.innerHTML = `
    <textarea id="text-post" placeholder="¿Qué cocinaste hoy?"></textarea><br>
    <button id="btn-submit">Publicar</button><br><br>
    <section id="sectionP"></section> 
  `;

  feedContainer.classList.add('feed-container');
  return feedContainer;
}

function initializeFeed() {
  const feedContainer = postFeed();
  const sectionP = feedContainer.querySelector('#sectionP');
  const btnSubmit = feedContainer.querySelector('#btn-submit');
  const textPost = feedContainer.querySelector('#text-post');
  const postCollection = collection(db, "post");
  const user = getAuth().currentUser;
  const orderedPostsQuery = query(postCollection, orderBy("timestamp", "desc"));
  
  onSnapshot(orderedPostsQuery, (querySnapshot) => {
    sectionP.innerHTML = '';
    querySnapshot.forEach((docSnapshot) => {
      const postData = docSnapshot.data();
      const postText = postData.post;
      const ownerId = postData.owner_uid;
      const postId = docSnapshot.id;
      const postSection = document.createElement('section');

      postSection.classList.add('section1');

      let postAuthor = 'Usuario Desconocido';
      if (postData.displayName) {
        postAuthor = postData.displayName;
      }

      postSection.innerHTML = `<strong>${postAuthor}:</strong><br> ${postText}`;

      if (user && user.uid === ownerId) {
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

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
        postSection.appendChild(buttonContainer);
      }

      sectionP.appendChild(postSection);

      // Agregar un salto de línea después de cada publicación
      const lineBreak = document.createElement('br');
      sectionP.appendChild(lineBreak);
    });
  });

  btnSubmit.addEventListener('click', async () => {
    const textAreaPost = textPost.value;
    if (textAreaPost.trim() === '') {
      alert('Por favor, ingresa algo antes de publicar.');
      return;
    }

    if (!user) {
      alert('Debes iniciar sesión para publicar.');
      // Redirige al usuario a la página de inicio de sesión
      window.location.href = '/';
      return;
    }


    try {
      await addDoc(postCollection, {
        post: textAreaPost,
        timestamp: serverTimestamp(),
        owner_uid: user.uid,
        displayName: user.displayName
      });
      textPost.value = '';
      console.log("Publicación exitosa");
    } catch (error) {
      console.error("Error al publicar:", error);
    }
  });
  
    
  document.addEventListener('DOMContentLoaded', function () {
    const auth = getAuth();
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Si el usuario está autenticado, redirige a la página de feed
        window.location.href = '/feed'; // Asegúrate de usar la URL completa
      } else {
        // Si el usuario no está autenticado, redirige a la página de inicio de sesión
        window.location.href = '/';
      }
    });
  });


  return feedContainer;
}

export default initializeFeed;
