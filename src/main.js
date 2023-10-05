/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app';

import { firebaseConfig } from './firebase.js';

import createUser from './createUser.js';
import error from './error.js';
import resPass from './resPass.js';
import initializeFeed from './feed.js';
import { home } from './lib/index.js';

// Inicializa Firebase con la configuración
const app = initializeApp(firebaseConfig);

const routes = [
  { path: '/', component: home },
  { path: '/createUser', component: createUser },
  { path: '/error', component: error },
  { path: '/resPass', component: resPass },
  { path: '/feed', component: initializeFeed },
];

const defaultRoute = '/';
const root = document.getElementById('root');

export function navigateTo(hash) {
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

document.addEventListener('DOMContentLoaded', () => {
  navigateTo(window.location.pathname || defaultRoute);
});
