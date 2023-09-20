
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

//funcion login con correo
export async function handleLogin(email, password) {
    const auth = getAuth();
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;
        console.log('Usuario autenticado con éxito:', user);
        return user;
    } catch (error) {
        console.error('Error de inicio de sesión:', error.code, error.message);
        throw error;
    }
}

//Funcion Sign in with google
export async function handleGoogleLogin() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log('Usuario autenticado con Google:', user);
        return user;
    } catch (error) {
        console.error('Error de inicio de sesión con Google:', error);
        throw error;
    }
}
