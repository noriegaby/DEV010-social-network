// loginGoogle.js

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function loginGoogle(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonGoogleLogin = document.createElement('button');
  
  buttonGoogleLogin.classList.add('google-login-button');

  buttonGoogleLogin.textContent = 'Iniciar sesión con Google';
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
