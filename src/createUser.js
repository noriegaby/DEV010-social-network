// Cambia el nombre de la función de 'new' a 'createUser' u otro nombre apropiado
function createUser(navigateTo) {
    const section = document.createElement('section');
    const title = document.createElement('h2');
    const buttonReturn = document.createElement('button');
    const form = document.createElement('form');
    const inputEmail = document.createElement('input');
    const inputPass = document.createElement('input');
    const inputName = document.createElement('input');
    const buttonLogin = document.createElement('button');
  
    inputName.placeholder = 'Nombre';
    inputEmail.placeholder = 'Correo';
    inputPass.placeholder = 'Contraseña';
  
    title.textContent = 'Regístrate';
    buttonLogin.textContent = 'Guardar';
  
    buttonReturn.textContent = 'Regresar';
    buttonReturn.addEventListener('click', () => {
      navigateTo('/');
    });
  
    form.append(inputEmail, inputPass, inputName, buttonLogin);
    section.append(title, form, buttonReturn);
  
    return section;
  }
  
  export default createUser; // Exporta la función createUser como valor predeterminado
  