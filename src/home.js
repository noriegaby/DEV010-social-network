// file home.js finished
function home(navigateTo) {
    const section = document.createElement('section');
    const title = document.createElement('h2');
    const button = document.createElement('button');
    const button2 = document.createElement('button');
    const buttonGoogleLogin = document.createElement('button');

    button.textContent = 'Ingresa a tu cuenta';
    button.addEventListener('click', () => {
        navigateTo('/login');
    });

    button2.textContent = 'Registrarse con correo';
    button2.addEventListener('click', () => {
        navigateTo('/createUser');
    });

    buttonGoogleLogin.textContent = 'Ingresar con Google';
    buttonGoogleLogin.classList.add('google-login-button');
    buttonGoogleLogin.addEventListener('click', () => {
        navigateTo('/loginGoogle');
    });

    title.textContent = 'Bienvenido';

    // Agregar los botones y saltos de línea al elemento "section"
    section.append(title, button, document.createElement('br'),document.createElement('br'), button2, document.createElement('br'),document.createElement('br'), buttonGoogleLogin);
    
    return section;
}

export default home;
