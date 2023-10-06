/* eslint-disable no-alert */
/* eslint-disable no-console */
// Importa las funciones necesarias de Firebase Firestore y Firebase Auth
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db, getAuth, signOut } from './firebase.js'; // importar signOut

// Función para crear la sección del feed
function postFeed() {
  const feedContainer = document.createElement('article');
  feedContainer.innerHTML = `
    <!-- Botón para cerrar sesión -->
    <button id="btn-logout">Cerrar sesión</button><br><br><br>
    <textarea id="text-post" placeholder="¿Qué cocinaste hoy?"></textarea><br>
    <button id="btn-submit">Publicar</button><br><br>
    <section id="sectionP"></section><br><br>
  `;

  feedContainer.classList.add('feed-container');
  return feedContainer;
}

// Función para crear el botón de "Me gusta" con funcionalidad
function createLikeButton(postId, userLikes, user) {
  const likeButton = document.createElement('button');
  likeButton.classList.add('like-button');
  likeButton.textContent = 'Me gusta';

  let likedByUser = false;
  if (userLikes && userLikes.includes(user.uid)) {
    likedByUser = true;
    likeButton.textContent = 'Te gusta';
  }

  likeButton.addEventListener('click', async () => {
    if (likedByUser) {
      // El usuario quiere quitar su "Me gusta"
      try {
        const postRef = doc(db, 'post', postId);
        await updateDoc(postRef, {
          likes: arrayRemove(user.uid),
        });
        likedByUser = false;
        likeButton.textContent = 'Me gusta';
        // eslint-disable-next-line no-console
        console.log('Me gusta quitado con éxito');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error al quitar Me gusta:', error);
      }
    } else {
      // El usuario quiere dar "Me gusta"
      try {
        const postRef = doc(db, 'post', postId);
        await updateDoc(postRef, {
          likes: arrayUnion(user.uid),
        });
        likedByUser = true;
        likeButton.textContent = 'Te gusta';
        // eslint-disable-next-line no-console
        console.log('Me gusta dado con éxito');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error al dar Me gusta:', error);
      }
    }
  });

  return likeButton;
}

// Función para publicar una nueva entrada en el feed
export async function publishPost(postCollection, user, textPost) {
  const textAreaPost = textPost.value;
  if (textAreaPost.trim() === '') {
    // eslint-disable-next-line no-alert
    alert('Por favor, ingresa algo antes de publicar.');
    return;
  }

  if (!user) {
    // eslint-disable-next-line no-alert
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
      displayName: user.displayName,
      likes: [], // Inicialmente, no hay ningún "Me gusta"
    });
    textPost.value = '';
    console.log('Publicación exitosa');
  } catch (error) {
    console.error('Error al publicar:', error);
  }
}

// Función principal para inicializar el feed
function initializeFeed() {
  const feedContainer = postFeed();
  const sectionP = feedContainer.querySelector('#sectionP');
  const textPost = feedContainer.querySelector('#text-post');
  const postCollection = collection(db, 'post');
  const user = getAuth().currentUser;
  const orderedPostsQuery = query(postCollection, orderBy('timestamp', 'desc'));
  const btnLogout = feedContainer.querySelector('#btn-logout'); // Obtén el botón de cerrar sesión
  const btnSubmit = feedContainer.querySelector('#btn-submit'); // Obtén el botón de enviar

  // Escucha cambios en la base de datos y actualiza el feed
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

      postSection.innerHTML = `<strong>${postAuthor}:</strong><br> ${postText}<br><br>`;

      if (user && user.uid === ownerId) {
        // Botones de edición y eliminación solo para el dueño del post
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
                timestamp: serverTimestamp(),
              });
              console.log('Publicación editada exitosamente');
            } catch (error) {
              console.error('Error al editar la publicación:', error);
            }
          }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Borrar';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', async () => {
          // eslint-disable-next-line no-restricted-globals, no-alert
          if (confirm('¿Seguro que quieres borrar esta publicación?')) {
            try {
              const postRef = doc(db, 'post', postId);
              await deleteDoc(postRef);
              console.log('Publicación borrada exitosamente');
            } catch (error) {
              console.error('Error al borrar la publicación:', error);
            }
          }
        });

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
        postSection.appendChild(buttonContainer);
      }

      // Agregar botón de "Me gusta"
      const likeButton = createLikeButton(postId, postData.likes, user);
      postSection.appendChild(likeButton);

      sectionP.appendChild(postSection);

      // Agregar un salto de línea después de cada publicación
      const lineBreak = document.createElement('br');
      sectionP.appendChild(lineBreak);
    });
  });

  // Manejador para cerrar sesión
  btnLogout.addEventListener('click', () => {
    signOut(getAuth())
      .then(() => {
        // Redirige al usuario a la página de inicio de sesión o a donde desees
        window.location.href = '/'; // Asegúrate de usar la URL correcta
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  });

  // Manejador para publicar una nueva entrada en el feed
  btnSubmit.addEventListener('click', async () => {
    publishPost(postCollection, user, textPost);
  });

  return feedContainer;
}

export default initializeFeed;
