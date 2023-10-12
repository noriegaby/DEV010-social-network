/* eslint-disable no-unused-vars */

// Importa la función 'initializeApp' de Firebase
import { initializeApp } from 'firebase/app';

// Importa la configuración de Firebase desde un módulo separado
import { firebaseConfig } from './firebase.js';

// Importa los componentes y funciones de otros módulos
import createUser from './createUser.js';
import error from './error.js';
import resPass from './resPass.js';
import initializeFeed from './feed.js';
import { home } from './lib/index.js';

// Inicializa Firebase con la configuración proporcionada
const app = initializeApp(firebaseConfig);

// Definición de las rutas y componentes asociados
const routes = [
  { path: '/', component: home }, // Ruta de la página de inicio
  { path: '/createUser', component: createUser }, // Ruta de la página de creación de usuario
  { path: '/error', component: error }, // Ruta de la página de error
  { path: '/resPass', component: resPass }, // Ruta de la página de restablecimiento de contraseña
  { path: '/feed', component: initializeFeed }, // Ruta de la página de alimentación (feed)
];

// Ruta predeterminada
const defaultRoute = '/';

// Elemento raíz en el DOM
const root = document.getElementById('root');

// Función para navegar a una ruta
export function navigateTo(hash) {
  const route = routes.find((routeFound) => routeFound.path === hash);

  if (route && route.component) {
    // Actualiza la URL en el historial del navegador
    window.history.pushState({}, route.path, window.location.origin + route.path);

    // Reemplaza el contenido en el elemento raíz con el componente correspondiente
    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    root.appendChild(route.component(navigateTo));
  } else {
    // Si la ruta no se encuentra, redirige a la página de error
    navigateTo('/error');
  }
}

// Maneja los cambios en el historial del navegador (navegación hacia adelante/atras)
window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

// Espera a que se cargue el contenido DOM antes de iniciar la navegación
document.addEventListener('DOMContentLoaded', () => {
  navigateTo(window.location.pathname || defaultRoute);
});
