import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function login(navigateTo) {
    const section = document.createElement('section');
    const title = document.createElement('h2');
    const buttonReturn = document.createElement('button');
    const form = document.createElement('form');
    const inputEmail = document.createElement('input');
    const inputPass = document.createElement('input');
    const buttonLogin = document.createElement('button');
    const errorParagraph = document.createElement('p');
    errorParagraph.style.color = 'black'; // Estilo para el mensaje de error
    errorParagraph.textContent = ''; // Inicialmente, no hay mensaje de error

    inputEmail.setAttribute('type', 'email');
    inputEmail.placeholder = 'Correo';
    inputPass.setAttribute('type', 'password');
    inputPass.placeholder = 'Contraseña';

    title.textContent = 'Login';
    buttonLogin.textContent = 'Ingresar';

    buttonLogin.addEventListener('click', async (e) => {
        e.preventDefault(); // Evita que el formulario se envíe automáticamente

        const email = inputEmail.value;
        const password = inputPass.value;

        if (email === '') {
            errorParagraph.textContent = 'No ingresaste correo';
            return; // Detener la función si no ingresaste correo
        }

        if (password === '') {
            errorParagraph.textContent = 'No ingresaste contraseña';
            return; // Detener la función si no ingresaste contraseña
        }

        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            // Si la autenticación es exitosa, puedes redirigir o actualizar la interfaz de usuario según sea necesario
            errorParagraph.textContent = 'Usuario autenticado con éxito';
        } catch (error) {
            // Manejar errores de inicio de sesión
            console.error('Error de inicio de sesión:', error.code, error.message);

            // Verificar si el error es debido a credenciales incorrectas
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                // Mostrar un mensaje de error al usuario
                errorParagraph.textContent = 'El correo es incorrecto';
            } else {
                // Otros errores
                errorParagraph.textContent = 'Ha ocurrido un error. Inténtalo de nuevo más tarde.';
            }
        }
    });

    buttonReturn.textContent = 'Regresar';
    buttonReturn.addEventListener('click', () => {
        navigateTo('/');
    });

    form.append(inputEmail, document.createElement('br'), inputPass, document.createElement('br'), document.createElement('br'), buttonLogin, document.createElement('br'), document.createElement('br'), errorParagraph);
    section.append(title, document.createElement('br'), form, document.createElement('br'), buttonReturn);

    return section;
}

export default login;
