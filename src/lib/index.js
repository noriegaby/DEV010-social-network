import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { db } from '../firebase.js';

export function home(navigateTo) {
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
    errorParagraph.style.color = 'black';

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

    // Función Login con correo y contraseña
    function handleLogin() {
        const email = inputEmail.value;
        const password = inputPass.value;

        if (email === '' || password === '') {
            setTimeout(() => {
                errorParagraph.textContent = 'Por favor, completa todos los campos.';
            }, 5000);
            return;
        }

        try {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    alert('Usuario ha iniciado sesión con éxito: ' + user.email);
                    inputEmail.value = '';
                    inputPass.value = '';
                })

        } catch (error) {
            console.error('Error:', error.message);
            errorParagraph.textContent = 'Error: ' + error.message;
        }
    };

    // Función Sign in with Google
    async function handleGoogleLogin() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            navigateTo('/feed');
            console.log('Usuario autenticado con Google:', user);

        } catch (error) {
            console.error('Error de inicio de sesión con Google:', error);
            throw error;
        }
    }

    form.append(inputEmail, document.createElement('br'), document.createElement('br'), inputPass, document.createElement('br'), document.createElement('br'), submitButton);

    section.append(title, document.createElement('br'), form, document.createElement('br'), createUserButton, document.createElement('br'), googleLoginButton, errorParagraph, resetPasswordLink);

    return section;
}
