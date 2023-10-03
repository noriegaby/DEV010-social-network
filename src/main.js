import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebase.js';

// Inicializa Firebase con la configuración
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

import createUser from './createUser.js';
import error from './error.js';
import resPass from './resPass.js';
import initializeFeed from './feed.js';
import { home } from './lib/index.js';

const routes = [
  { path: '/', component: home },
  { path: '/createUser', component: createUser },
  { path: '/error', component: error },
  { path: '/resPass', component: resPass },
  { path: '/feed', component: initializeFeed },
];

const defaultRoute = '/';
const root = document.getElementById('root');

function navigateTo(hash) {
  const route = routes.find((routeFound) => routeFound.path === hash);
  
  if (route && route.component) {
    window.history.pushState({}, route.path, window.location.origin + route.path);

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
  navigateTo(window.location.pathname || defaultRoute);
});
