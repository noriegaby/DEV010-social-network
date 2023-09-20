import {handleGoogleLogin } from './lib/index';

function home(navigateTo) {
    const section = document.createElement('section');
    section.classList.add('container'); 

    const title = document.createElement('h2');
    const form = document.createElement('form');
    const inputEmail = createInput('email', 'Correo');
    const inputPass = createInput('password', 'Contraseña');
    const submitButton = createButton('Ingresa a tu cuenta', () => handleLogin());
    const googleLoginButton = createButtonWithIcon('Sign in with Google', 'G.png', () => handleGoogleLogin());
    googleLoginButton.classList.add('google-login-button'); 
    const createUserButton = createButton('Crear cuenta nueva', () => navigateTo('/createUser'));
    const resetPasswordLink = document.createElement('a');
    resetPasswordLink.textContent = '¿Olvidaste tu contraseña?';
    resetPasswordLink.addEventListener('click', () => { navigateTo('/resPass'); });

    const errorParagraph = document.createElement('p');
    errorParagraph.style.color = 'black'; // Establece el color del mensaje de error
     
    title.textContent = 'Iniciar Sesión';

    function createInput(type, placeholder) {
        const input = document.createElement('input');
        input.setAttribute('type', type);
        input.placeholder = placeholder;
        return input;
    }

    function createButton(text, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
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


    function handleLogin() {
        const email = inputEmail.value;
        const password = inputPass.value;
      
        if (email === '' || password === '') {
          // Verifica si algún campo está vacío y muestra un mensaje de error
          errorParagraph.textContent = 'Por favor, completa todos los campos.';
          return;
        }
      
        try {
          const auth = getAuth();
          signInWithEmailAndPassword(auth, email, password) // Cambiado a signInWithEmailAndPassword
            .then((userCredential) => {
              // El usuario ha iniciado sesión con éxito, puedes redirigir o actualizar la interfaz de usuario según sea necesario
              const user = userCredential.user;
              alert('Usuario ha iniciado sesión con éxito: ' + user.email);
      
              // Limpia los campos del formulario
              inputEmail.value = '';
              inputPass.value = '';
            })
            .catch((error) => {
              // Manejar errores de inicio de sesión
              console.error('Error de inicio de sesión:', error.message);
              errorParagraph.textContent = 'Error de inicio de sesión: ' + error.message;
            });
        } catch (error) {
          // Manejar otros errores
          console.error('Error:', error.message);
          errorParagraph.textContent = 'Error: ' + error.message;
        }
      }      

    
    form.append(inputEmail, document.createElement('br'), inputPass, document.createElement('br'), document.createElement('br'), submitButton);
  
    section.append(title, document.createElement('br'), form, document.createElement('br'), createUserButton, document.createElement('br'), document.createElement('br'), googleLoginButton, errorParagraph, resetPasswordLink);

    return section;
}

export default home;

