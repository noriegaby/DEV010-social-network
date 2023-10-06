import { addDoc, serverTimestamp } from 'firebase/firestore';
import { publishPost } from '../src/feed';

// PRIMER TEST
describe('publishPost', () => {
  it('is a function', () => {
    expect(typeof publishPost).toBe('function');
  });
});

jest.mock('firebase/firestore');

// SEGUNDO TEST: Probar la función publishPost
// eslint-disable-next-line jest/no-identical-title
describe('publishPost', () => {
  it('Se agregar un post si hay texto', async () => {
    // Preparar datos de prueba
    const textPost = { value: 'Pasamos el Test!' };
    const user = { uid: '00001', displayName: 'Gaby' };

    // Llamar a la función publishPost con los datos de prueba
    await publishPost({}, user, textPost);

    // Verificar que se llame a addDoc con los parámetros correctos
    expect(addDoc).toHaveBeenCalledWith({}, {
      post: 'Pasamos el Test!',
      owner_uid: '00001',
      displayName: 'Gaby',
      likes: [],
      timestamp: serverTimestamp(),
    });

    // Verificar que el valor de textPost.value se haya limpiado
    expect(textPost.value).toBe('');
  });
});
