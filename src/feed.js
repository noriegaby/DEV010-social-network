import { collection, addDoc } from "firebase/firestore";

  // Llama a la función Feed() para agregar su contenido al DOM
  const feedContainer = Feed();
  document.body.appendChild(feedContainer);
  
  // Agrega el evento click al botón
  const btnSubmit = document.getElementById('btn-submit');
  const textPost = document.getElementById('text-post');
  
  btnSubmit.addEventListener('click', async () => { // Agrega "async" aquí
    const textAreaPost = textPost.value;
    console.log(textAreaPost);
    
    try {
      const docRef = await addDoc(collection(db, "users"), {
        post: textAreaPost
      });
      console.log("funcionó");
    } catch (e) {
      console.error("Error", e);
    }
  });

function Feed() {
  const feedContainer = document.createElement('article');
  feedContainer.innerHTML = `
  <br><textarea id="text-post">¿Qué cocinaste hoy?</textarea><br>
  <button id="btn-submit">Post</button><br><br>
  <section id="sectionP"></section> 
`;
  return feedContainer;
}

export default Feed;
