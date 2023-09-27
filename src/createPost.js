
// CreatePost.js
function CreatePost() {
    const createPostContainer = document.createElement('div');
    createPostContainer.innerHTML = `
      <h4>Crear Nueva Publicación</h4>
      <form id="postForm">
        <input type="text" placeholder="Título" id="postTitle" />
        <textarea placeholder="Contenido" id="postContent"></textarea>
        <button type="submit">Crear</button>
      </form>
    `;
    const postForm = createPostContainer.querySelector('#postForm');
    const postTitle = createPostContainer.querySelector('#postTitle');
    const postContent = createPostContainer.querySelector('#postContent');
  
    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const newPost = {
        title: postTitle.value,
        content: postContent.value,
      };
  
    });
  
    return createPostContainer;
}

export default CreatePost;
