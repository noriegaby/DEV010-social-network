import { addDoc, serverTimestamp } from 'firebase/firestore'; // Importamos las funciones addDoc y serverTimestamp desde la biblioteca de Firebase Firestore.
import { publishPost } from '../src/feed'; // Importamos la función publishPost desde un archivo llamado 'feed' en una ubicación relativa.

// PRIMER TEST
describe('publishPost', () => {
  it('is a function', () => {
    // Aseguramos que publishPost sea una función.
    expect(typeof publishPost).toBe('function');
  });
});

jest.mock('firebase/firestore'); // Usamos jest.mock para simular el módulo 'firebase/firestore' simula a firestore.

// SEGUNDO TEST: Probar la función publishPost
// eslint-disable-next-line jest/no-identical-title
describe('publishPost', () => {
  it('Se agregar un post si hay texto', async () => {
    // Preparamos datos de prueba
    const textPost = { value: 'Pasamos el Test!' }; // Creamos un objeto con un valor de texto de prueba.
    const user = { uid: '00001', displayName: 'Gaby' }; // Creamos un objeto de usuario de prueba.

    // Llamamos a la función publishPost con los datos de prueba
    await publishPost({}, user, textPost);

    // Verificamos que se llame a addDoc con los parámetros correctos
    expect(addDoc).toHaveBeenCalledWith({}, {
      post: 'Pasamos el Test!', // Comprobamos que se intenta agregar un documento con el texto 'Pasamos el Test!'
      owner_uid: '00001', // Verificamos el ID del propietario del post.
      displayName: 'Gaby', // Verificamos el nombre de usuario del propietario.
      likes: [], // Aseguramos que la matriz de "likes" esté vacía.
      timestamp: serverTimestamp(), // Aseguramos que se use la marca de tiempo del servidor.
    });

    // Verificamos que el valor de textPost.value se haya limpiado
    expect(textPost.value).toBe(''); // Comprobamos que el valor de textPost.value se ha restablecido a una cadena vacía después de llamar a publishPost.
  });
});
