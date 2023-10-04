import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, fetchSignInMethodsForEmail } from 'firebase/auth';

function createUser(navigateTo) {
  const section = document.createElement('section');
  const buttonReturn = document.createElement('button');
  const form = document.createElement('form');
  const inputName = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const buttonRegister = document.createElement('button');
  buttonRegister.classList.add('btn-registro');

  inputName.placeholder = 'Nombre';
  inputEmail.setAttribute('type', 'email');
  inputEmail.placeholder = 'Correo';
  inputPass.setAttribute('type', 'password');
  inputPass.placeholder = 'Contraseña';

  function isValidEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  buttonRegister.textContent = 'Registrarse';
  buttonRegister.addEventListener('click', async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    const name = inputName.value;
    const email = inputEmail.value;
    const password = inputPass.value;

    if (email === '' || password === '' || name === '') {
      alert('Por favor, completa todos los campos.');
      return;
    } else if (name.length < 3) {
      alert('Por favor ingresa un nombre válido');
      return;
    } else if (!isValidEmail(email)) {
      alert('Por favor, introduce un correo electrónico válido.');
      return;
    } else if (password.length < 8) {
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
      alert('Error de registro: ' + error.message); 
    }
  });

  buttonReturn.textContent = 'Regresar';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  form.append(inputName, document.createElement('br'), document.createElement('br'), inputEmail, document.createElement('br'), document.createElement('br'), inputPass, document.createElement('br'), document.createElement('br'), buttonRegister);
  section.append(document.createElement('br'), form, document.createElement('br'), buttonReturn);

  return section;
}

export default createUser;
