// file home.js finished
function home(navigateTo) {
    const section = document.createElement('section');
    const title = document.createElement('h2');
    const button = document.createElement('button');
    const button2 = document.createElement('button');

    button.textContent = 'Ingresar';
    button.addEventListener('click', () => {
      navigateTo('/login');
    });
    button2.textContent = 'Registrarse';
    button2.addEventListener('click', () => {
      navigateTo('/createUser');
    });
  
    title.textContent = 'Bienvenido';
  
    section.append(title, button, button2);
    return section;
  }
  
  export default home;
  