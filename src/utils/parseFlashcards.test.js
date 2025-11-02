import { parseFlashcards } from './parseFlashcards';

describe('parseFlashcards', () => {
  it('parses flashcards with colon delimiter', () => {
    const text = 'Q1: A1\n\nQ2: A2';
    const expected = [
      { question: 'Q1', answer: 'A1' },
      { question: 'Q2', answer: 'A2' },
    ];
    expect(parseFlashcards(text)).toEqual(expected);
  });

  it('parses flashcards with hyphen delimiter', () => {
    const text = 'Q1 - A1\n\nQ2 - A2';
    const expected = [
      { question: 'Q1', answer: 'A1' },
      { question: 'Q2', answer: 'A2' },
    ];
    expect(parseFlashcards(text)).toEqual(expected);
  });

  it('parses flashcards with question mark delimiter', () => {
    const text = 'Q1? A1\n\nQ2? A2';
    const expected = [
      { question: 'Q1', answer: 'A1' },
      { question: 'Q2', answer: 'A2' },
    ];
    expect(parseFlashcards(text)).toEqual(expected);
  });

  it('parses flashcards with newline delimiter', () => {
    const text = 'Q1\nA1\n\nQ2\nA2';
    const expected = [
      { question: 'Q1', answer: 'A1' },
      { question: 'Q2', answer: 'A2' },
    ];
    expect(parseFlashcards(text)).toEqual(expected);
  });

  it('handles mixed delimiters', () => {
    const text = 'Q1: A1\n\nQ2 - A2\n\nQ3?\nA3';
    const expected = [
      { question: 'Q1', answer: 'A1' },
      { question: 'Q2', answer: 'A2' },
      { question: 'Q3', answer: 'A3' },
    ];
    expect(parseFlashcards(text)).toEqual(expected);
  });

  it('handles extra whitespace', () => {
    const text = '  Q1 : A1  \n\n  Q2 - A2  ';
    const expected = [
      { question: 'Q1', answer: 'A1' },
      { question: 'Q2', answer: 'A2' },
    ];
    expect(parseFlashcards(text)).toEqual(expected);
  });

  it('ignores empty blocks', () => {
    const text = 'Q1: A1\n\n\n\nQ2: A2';
    const expected = [
      { question: 'Q1', answer: 'A1' },
      { question: 'Q2', answer: 'A2' },
    ];
    expect(parseFlashcards(text)).toEqual(expected);
  });
});
