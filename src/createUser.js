import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

function createUser(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonReturn = document.createElement('button');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const inputName = document.createElement('input');
  const buttonRegister = document.createElement('button');

  
  inputName.placeholder = 'Nombre';
  inputEmail.setAttribute('type', 'email');
  inputEmail.placeholder = 'Correo';
  inputPass.setAttribute('type', 'password');
  inputPass.placeholder = 'Contraseña';

  title.textContent = 'Regístrate';
  buttonRegister.textContent = 'Registrarse';

  buttonRegister.addEventListener('click', async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    const name = inputName.value;
    const email = inputEmail.value;
    const password = inputPass.value;

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // El usuario se ha registrado con éxito, puedes redirigir o actualizar la interfaz de usuario según sea necesario
     alert('Usuario registrado con éxito:', userCredential.user);

      // Limpia los campos del formulario
      inputName.value = '';
      inputEmail.value = '';
      inputPass.value = '';
    } catch (error) {
      // Manejar errores de registro
      console.error('Error de registro:', error.message);
    }
  });

  buttonReturn.textContent = 'Regresar';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');

  });

  form.append(inputName,document.createElement('br'), inputEmail, document.createElement('br'), inputPass,document.createElement('br'),document.createElement('br'), buttonRegister);
  section.append(title, form,document.createElement('br'), buttonReturn);

  return section;
}

export default createUser;
