import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebase.js'; // Importa la configuración de Firebase primero

// Inicializa Firebase con la configuración
const app = initializeApp(firebaseConfig);

// Obtén la autenticación de Firebase
const auth = getAuth(app);

import createUser from './createUser.js'; // Importa otros componentes que necesites
import error from './error.js';
import resPass from './resPass.js';
import postFeed from './feed.js'; // Importa tu componente Feed


const routes = [
  { path: '/', component: home },
  { path: '/createUser', component: createUser },
  { path: '/error', component: error },
  { path: '/resPass', component: resPass },
  { path: '/feed', component: postFeed}, // Agrega una ruta para el feed
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

// Importa la función home después de declarar navigateTo
import { home } from './lib/index.js';
