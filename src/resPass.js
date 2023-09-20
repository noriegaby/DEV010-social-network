//Pendiente cambiar de boton a <a>  

import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

function resPass(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonReturn = document.createElement('button');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const buttonRest = document.createElement('button');
  const errorParagraph = document.createElement('p');

  title.textContent = 'Restablece tu contraseña';
  inputEmail.setAttribute('type', 'email');
  inputEmail.placeholder = 'Correo';

  buttonRest.textContent = 'Restablecer contraseña';

  buttonRest.addEventListener('click', async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    const email = inputEmail.value;

    if (email === '') {
      // Verifica si el campo está vacío y muestra un mensaje de error
      errorParagraph.textContent = 'Por favor, ingresa tu correo.';
      return;
    }
    // AGREGAR EL setTimeout
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      errorParagraph.textContent = 'Se ha enviado un correo para restablecer la contraseña.';
    } catch (error) {
      // Maneja los errores de Firebase aquí
      console.error('Error al restablecer la contraseña:', error);
      errorParagraph.textContent = 'Hubo un error al intentar restablecer la contraseña. Por favor, inténtalo de nuevo.';
    }
  });

  buttonReturn.textContent = 'Regresar';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  form.append(inputEmail, buttonRest);
  section.append(title, form, errorParagraph, buttonReturn);

  return section;
}

export default resPass;
