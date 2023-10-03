import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

function resPass(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h3');
  const buttonReturn = document.createElement('button');
  buttonReturn.classList.add('btn-return');/// clase al btn
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const buttonRest = document.createElement('button');
  buttonRest.classList.add('btn-rest');//// Clase al btn
 

  title.textContent = 'Ingresa tu correo para restablecer tu contraseña';

  inputEmail.setAttribute('type', 'email');
  inputEmail.placeholder = 'Correo';

  buttonRest.textContent = 'Restablecer';
  

  buttonRest.addEventListener('click', async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    const email = inputEmail.value;

        // Función para validar el formato del correo electrónico
        function isValidEmail(email) {
          let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
      }
    if (email === '') {
      // Verifica si el campo está vacío y muestra un mensaje de error
      alert ('Por favor, ingresa tu correo.');
      return;
    } else if (!isValidEmail(email)) {
      alert('Por favor, introduce un correo electrónico válido.');
    }
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      alert ('Se ha enviado un correo para restablecer la contraseña.');
    } catch (error) {
      // Maneja los errores de Firebase aquí
      console.error('Error al restablecer la contraseña:', error);
      
    }
  });

  buttonReturn.textContent = 'Regresar';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  form.append(inputEmail,document.createElement('br'),document.createElement('br'), buttonRest);
  section.append(title, form ,document.createElement('br'), buttonReturn);

  return section;
}

export default resPass;
