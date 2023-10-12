/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */

// Importa las funciones necesarias de Firebase Auth
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

// Definición de la función home
export function home(navigateTo) {
  // Crea un elemento de sección para el contenido
  const section = document.createElement('section');
  section.classList.add('container');

  // Crea un formulario para el inicio de sesión
  const form = document.createElement('form');

  // Crea campos de entrada para correo y contraseña
  const inputEmail = createInput('email', 'Correo');
  const inputPass = createInput('password', 'Contraseña');

  // Crea un botón para enviar el formulario de inicio de sesión
  const submitButton = createButton('Iniciar sesión', handleLogin);
  submitButton.classList.add('btn-submit'); // Agrega una clase al botón

  // Crea un botón para iniciar sesión con Google
  const googleLoginButton = createButtonWithIcon('Sign in with Google', 'G.png', () => handleGoogleLogin());
  googleLoginButton.classList.add('google-login-button'); // Agrega una clase al botón

  // Crea un botón para redirigir a la página de registro de usuario
  const createUserButton = createButton('Crear cuenta nueva', () => navigateTo('/createUser'));
  createUserButton.classList.add('btn-createU'); // Agrega una clase al botón

  // Crea un enlace para restablecer la contraseña
  const resetPasswordLink = document.createElement('a');
  resetPasswordLink.textContent = '¿Olvidaste tu contraseña?';
  resetPasswordLink.addEventListener('click', () => {
    navigateTo('/resPass');
  });
  resetPasswordLink.classList.add('reset-pass'); // Agrega una clase al enlace

  // Función para crear un campo de entrada
  function createInput(type, placeholder) {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.placeholder = placeholder;
    return input;
  }

  // Función para crear un botón con un texto y una función de clic
  function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.type = 'button'; // Configura el tipo de botón para evitar la recarga de la página
    button.addEventListener('click', onClick);
    button.classList.add('custom-button');
    return button;
  }

  // Función para crear un botón con texto y una imagen (icono)
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  // Función para manejar el inicio de sesión con correo y contraseña
  async function handleLogin() {
    const auth = getAuth();
    const email = inputEmail.value;
    const password = inputPass.value;

    if (email === '' || password === '') {
      alert('Por favor, completa todos los campos.');
      return;
    } if (!isValidEmail(email)) {
      alert('Por favor, introduce un correo electrónico válido.');
      return;
    } if (password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuario autenticado con éxito');
      const user = userCredential.user;
      alert(`Usuario ha iniciado sesión con éxito: ${user.email}`);

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
      alert(`Correo autenticado con Google: ${user.email}`);
    } catch (error) {
      console.error('Error de inicio de sesión con Google:', error);
      throw error;
    }
  }
  // Agrega elementos al formulario
  form.append(inputEmail, document.createElement('br'), document.createElement('br'), inputPass, document.createElement('br'), document.createElement('br'), submitButton, document.createElement('br'), document.createElement('br'), document.createElement('hr'));
  // Agrega elementos al elemento de sección
  section.append(document.createElement('br'), form, document.createElement('br'), createUserButton, document.createElement('br'), googleLoginButton, document.createElement('br'), resetPasswordLink);

  return section;
}
