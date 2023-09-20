// loginGoogle.js

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function loginGoogle(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonGoogleLogin = document.createElement('button');
  

buttonGoogleLogin.classList.add('google-login-button');
buttonGoogleLogin.textContent = 'Sign in with Google';

// Crea una etiqueta <img> y establece la ruta de la imagen
const imageElement = document.createElement('img');
imageElement.src = 'G.png';

// Agrega una clase CSS a la imagen para aplicar estilos adicionales
imageElement.classList.add('google-login-icon');

// Agrega la etiqueta <img> al botón antes del texto
buttonGoogleLogin.insertBefore(imageElement, buttonGoogleLogin.firstChild);

buttonGoogleLogin.addEventListener('click', () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // El usuario ha iniciado sesión con Google
      const user = result.user;
      console.log('Usuario autenticado con Google:', user);
      // Redirige o actualiza la interfaz de usuario según sea necesario
    })
    .catch((error) => {
      // Manejar errores de inicio de sesión con Google
      console.error('Error de inicio de sesión con Google:', error);
    });
});

section.append(title, buttonGoogleLogin);
return section;

}

export default loginGoogle;
