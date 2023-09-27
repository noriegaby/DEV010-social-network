// Primero, define la función navigateTo
function navigateTo(url) {
    window.location.href = url;
}

import { db } from './firebase.js';
import { getDatabase, ref, get } from 'firebase/database';

function Feed() {
    const feedContainer = document.createElement('div');
    feedContainer.innerHTML = `
      <h4>Bienvenido</h4>
      <button id="createPostButton">Nuevo post</button>
    `;
  
    const createPostButton = feedContainer.querySelector('#createPostButton');
    createPostButton.addEventListener('click', () => {
        navigateTo('/createPost'); 
    });

    // Referencia a la ubicación de datos en tu base de datos
    const dataRef = ref(db, 'ruta/a/la/data'); // Reemplaza

    // Get para obtener los datos en esa ubicación
    get(dataRef).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            for (const postId in data) {
                if (data.hasOwnProperty(postId)) {
                    const post = data[postId];
                    const postElement = createPostElement(post);
                    feedContainer.appendChild(postElement);
                }
            }
        } else {
            // No hay datos en esa ubicación
        }
    }).catch((error) => {
        console.error('Error al obtener datos:', error);
    });
  
    return feedContainer;
}

export default Feed;
