import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function login(navigateTo) {
    const section = document.createElement('section');
    const title = document.createElement('h2');
    const buttonReturn = document.createElement('button');
    const form = document.createElement('form');
    const inputEmail = document.createElement('input');
    const inputPass = document.createElement('input');
    const buttonLogin = document.createElement('button');
  
    inputEmail.placeholder = 'Correo';
    inputPass.placeholder = 'Contraseña';
  
    title.textContent = 'Login';
    buttonLogin.textContent = 'Ingresar';
  
    buttonLogin.addEventListener('click', async (e) => {
        e.preventDefault(); // Evita que el formulario se envíe automáticamente

        const email = inputEmail.value;
        const password = inputPass.value;

        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            // Si la autenticación es exitosa, puedes redirigir o actualizar la interfaz de usuario según sea necesario
            console.log('Usuario autenticado con éxito');
        } catch (error) {
            // Manejar errores de inicio de sesión
            console.error('Error de inicio de sesión:', error.code, error.message);
            
            // Verificar si el error es debido a credenciales incorrectas
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                // Mostrar una alerta al usuario
                alert('Verifica tu correo y contraseña o regístrate si aún no lo has hecho.');
            }
        }
    });
  
    buttonReturn.textContent = 'Regresar';
    buttonReturn.addEventListener('click', () => {
        navigateTo('/');
    });
  
    form.append(inputEmail, inputPass, buttonLogin);
    section.append(title, form, buttonReturn);
  
    return section;
}

export default login;
