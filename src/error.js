// Función error
function error() {
  // Crea un elemento de título (
  const title = document.createElement('h2');

  // Configura el texto del título
  title.textContent = 'Error 404 page not found, please go home';

  // Retorna el elemento de título
  return title;
}

// Exporta la función error como valor predeterminado para su uso en otros módulos
export default error;
