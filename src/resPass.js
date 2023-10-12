/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */

// Importa las funciones necesarias de Firebase Auth
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

// Definición de la función resPass
function resPass(navigateTo) {
  // Crea un elemento de sección
  const section = document.createElement('section');

  // Crea un título para la página de restablecimiento de contraseña
  const title = document.createElement('h3');

  // Crea un botón de retorno a la página de inicio
  const buttonReturn = document.createElement('button');
  buttonReturn.classList.add('btn-return'); // Agrega una clase al botón

  // Crea un formulario para el restablecimiento de contraseña
  const form = document.createElement('form');

  // Crea un campo de entrada para el correo electrónico
  const inputEmail = document.createElement('input');

  // Crea un botón para enviar la solicitud de restablecimiento de contraseña
  const buttonRest = document.createElement('button');
  buttonRest.classList.add('btn-rest'); // Agrega una clase al botón

  // Configura el texto del título
  title.textContent = 'Ingresa tu correo para restablecer tu contraseña';

  // Configura el campo de entrada de correo
  inputEmail.setAttribute('type', 'email');
  inputEmail.placeholder = 'Correo';

  // Configura el texto del botón de restablecimiento
  buttonRest.textContent = 'Restablecer';

  // Manejador para el evento 'click' del botón de restablecimiento
  buttonRest.addEventListener('click', async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    const email = inputEmail.value;

    // Función para validar el formato del correo electrónico
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    if (email === '') {
      // Verifica si el campo está vacío y muestra un mensaje de error
      alert('Por favor, ingresa tu correo.');
      return;
    } if (!isValidEmail(email)) {
      alert('Por favor, introduce un correo electrónico válido.');
    }

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      alert('Se ha enviado un correo para restablecer la contraseña.');
    } catch (error) {
      // Maneja los errores de Firebase aquí
      console.error('Error al restablecer la contraseña:', error);
    }
  });

  // Configura el texto del botón de retorno
  buttonReturn.textContent = 'Regresar';

  // Manejador para el evento 'click' del botón de retorno
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  // Agrega elementos al formulario
  form.append(inputEmail, document.createElement('br'), document.createElement('br'), buttonRest);

  // Agrega elementos a la sección
  section.append(title, form, document.createElement('br'), buttonReturn);

  // Retorna la sección que contiene el formulario de restablecimiento de contraseña
  return section;
}

// Exporta la función resPass
export default resPass;
