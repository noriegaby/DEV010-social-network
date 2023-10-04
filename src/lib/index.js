import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export function home(navigateTo) {
  const section = document.createElement('section');
  section.classList.add('container');

  const form = document.createElement('form');
  const inputEmail = createInput('email', 'Correo');
  const inputPass = createInput('password', 'Contraseña');
  const submitButton = createButton('Iniciar sesión', handleLogin);
  submitButton.classList.add('btn-submit'); // clase al botón
  const googleLoginButton = createButtonWithIcon('Sign in with Google', 'G.png', () => handleGoogleLogin());
  googleLoginButton.classList.add('google-login-button'); // clase al botón
  const createUserButton = createButton('Crear cuenta nueva', () => navigateTo('/createUser'));
  createUserButton.classList.add('btn-createU'); // clase al botón
  const resetPasswordLink = document.createElement('a');
  resetPasswordLink.textContent = '¿Olvidaste tu contraseña?';
  resetPasswordLink.addEventListener('click', () => {
    navigateTo('/resPass');
  });
  resetPasswordLink.classList.add('reset-pass'); // Clase a <a>

  function createInput(type, placeholder) {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.placeholder = placeholder;
    return input;
  }

  function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.type = 'button'; // Agregar type="button" para evitar la recarga de la página
    button.addEventListener('click', onClick);
    button.classList.add('custom-button');
    return button;
  }
  

  function createButtonWithIcon(text, iconSrc, onClick) {
    const button = createButton(text, onClick);
    const imageElement = document.createElement('img');
    imageElement.src = iconSrc;
    imageElement.classList.add('google-login-icon');
    button.insertBefore(imageElement, button.firstChild);
    return button;
  }

  // Función para validar el formato del correo electrónico
  function isValidEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function handleLogin() {
    const auth = getAuth();
    const email = inputEmail.value;
    const password = inputPass.value;

    if (email === '' || password === '') {
      alert('Por favor, completa todos los campos.');
      return;
    } else if (!isValidEmail(email)) {
      alert('Por favor, introduce un correo electrónico válido.');
      return;
    } else if (password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Usuario autenticado con éxito');
        const user = userCredential.user;
        alert('Usuario ha iniciado sesión con éxito: ' + user.email);
        
        // Redirige al usuario a la página de feed
        navigateTo('/feed');
        } catch (error) {
        console.error('Error de inicio de sesión:', error);
        console.log('Error de inicio de sesión:', error.message);
      }
    }

  // Función Sign in with Google

    async function handleGoogleLogin() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
      
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          navigateTo('/feed'); // Redirige al usuario a la página de feed
          alert('Correo autenticado con Google: ' + user.email);
        } catch (error) {
          console.error('Error de inicio de sesión con Google:', error);
          throw error;
        }
      }

  form.append(inputEmail, document.createElement('br'), document.createElement('br'), inputPass, document.createElement('br'), document.createElement('br'), submitButton, document.createElement('br'), document.createElement('br'), document.createElement('hr'),);

  section.append(document.createElement('br'), form, document.createElement('br'), createUserButton, document.createElement('br'), googleLoginButton, document.createElement('br'), resetPasswordLink);

  return section;
}
