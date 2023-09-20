import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebase.js'; // Importa la configuración de Firebase primero

// Inicializa Firebase con la configuración
const app = initializeApp(firebaseConfig);

// Obtén la autenticación de Firebase
const auth = getAuth(app);

import home from './home.js'; // Importa la función home como valor predeterminado
import createUser from './createUser.js'; 



const routes = [
  { path: '/', component: home },
  { path: '/createUser', component: createUser },

];

const defaultRoute = '/';
const root = document.getElementById('root');

function navigateTo(hash) {
  const route = routes.find((routeFound) => routeFound.path === hash);
  
  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );

    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    root.appendChild(route.component(navigateTo));
   } else {
    navigateTo('/error');
  }
}

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

document.addEventListener('DOMContentLoaded', function () {
    // Este código se ejecutará después de que se haya cargado completamente el DOM.
  
    navigateTo(window.location.pathname || defaultRoute);
  });