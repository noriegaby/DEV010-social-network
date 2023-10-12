/* eslint-disable no-console */
/* eslint-disable no-alert */

// Importa las funciones necesarias de Firebase Auth
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';

// Definición de la función createUser
function createUser(navigateTo) {
  // Crea un elemento de sección
  const section = document.createElement('section');

  // Crea un botón de retorno a la página de inicio
  const buttonReturn = document.createElement('button');

  // Crea un formulario para el registro de usuario
  const form = document.createElement('form');

  // Crea campos de entrada para nombre, correo electrónico y contraseña
  const inputName = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');

  // Crea un botón para registrar al usuario
  const buttonRegister = document.createElement('button');
  buttonRegister.classList.add('btn-registro'); // Agrega una clase al botón

  // Configura los placeholders de los campos de entrada
  inputName.placeholder = 'Nombre';
  inputEmail.setAttribute('type', 'email');
  inputEmail.placeholder = 'Correo';
  inputPass.setAttribute('type', 'password');
  inputPass.placeholder = 'Contraseña';

  // Función para validar el formato del correo electrónico
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Configura el texto del botón de registro y su manejador de evento
  buttonRegister.textContent = 'Registrarse';
  buttonRegister.addEventListener('click', async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    const name = inputName.value;
    const email = inputEmail.value;
    const password = inputPass.value;

    if (email === '' || password === '' || name === '') {
      alert('Por favor, completa todos los campos.');
      return;
    } if (name.length < 3) {
      alert('Por favor ingresa un nombre válido');
      return;
    } if (!isValidEmail(email)) {
      alert('Por favor, introduce un correo electrónico válido.');
      return;
    } if (password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
      const auth = getAuth();

      // Verifica si el correo electrónico ya está registrado
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods.length > 0) {
        alert('Este correo electrónico ya está registrado. Por favor, utiliza otro.');
        return;
      }

      // Si el correo no está registrado, crea la cuenta
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuario registrado con éxito:', userCredential.user);

      // Actualiza el perfil del usuario con el nombre
      await updateProfile(userCredential.user, { displayName: name });

      // Enviar correo de verificación
      await sendEmailVerification(userCredential.user);

      alert('Se ha enviado un correo de verificación a tu dirección de correo electrónico. Por favor, verifica tu correo antes de iniciar sesión.');
      inputName.value = '';
      inputEmail.value = '';
      inputPass.value = '';

      // Redirigir al usuario a la página de inicio de sesión
      navigateTo('/');
    } catch (error) {
      console.error('Error de registro:', error.message);
      alert(`Error de registro: ${error.message}`);
    }
  });

  // Configura el texto del botón de retorno y su manejador de evento
  buttonReturn.textContent = 'Regresar';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  // Agrega elementos al formulario
  form.append(inputName, document.createElement('br'), document.createElement('br'), inputEmail, document.createElement('br'), document.createElement('br'), inputPass, document.createElement('br'), document.createElement('br'), buttonRegister);

  // Agrega elementos a la sección
  section.append(document.createElement('br'), form, document.createElement('br'), buttonReturn);

  // Retorna la sección que contiene el formulario de registro de usuario
  return section;
}

// Exporta la función createUser
export default createUser;
