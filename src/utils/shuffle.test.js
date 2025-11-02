import { shuffleArray } from './shuffle';

describe('shuffleArray', () => {
  it('shuffles an array', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(array);

    // Check if the length is the same
    expect(shuffled.length).toBe(array.length);

    // Check if the elements are the same
    expect(shuffled.sort()).toEqual(array.sort());
  });
});
