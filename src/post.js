// Post.js
function Post(post) {
    const postElement = document.createElement('div');
    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <button id="editButton">Editar</button>
      <button id="deleteButton">Eliminar</button>
    `;
  
    const editButton = postElement.querySelector('#editButton');
    const deleteButton = postElement.querySelector('#deleteButton');
  
    editButton.addEventListener('click', () => {
      // Manejar la edición de la publicación
    });
  
    deleteButton.addEventListener('click', () => {
      // Manejar la eliminación de la publicación
    });
  
    return postElement;
  }
  export default Post;