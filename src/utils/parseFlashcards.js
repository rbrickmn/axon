export const parseFlashcards = (text) => {
  const flashcards = [];
  const blocks = text.split(/\n\n|---|\r\n\r\n/);

  for (const block of blocks) {
    const trimmedBlock = block.trim();
    if (trimmedBlock) {
      let question;
      let answer;

      const qaDelimiterIndex = trimmedBlock.search(/[:\-?]/);
      const newlineIndex = trimmedBlock.indexOf('\n');

      if (qaDelimiterIndex !== -1) {
        question = trimmedBlock.substring(0, qaDelimiterIndex).trim();
        answer = trimmedBlock.substring(qaDelimiterIndex + 1).trim();
      } else if (newlineIndex !== -1) {
        question = trimmedBlock.substring(0, newlineIndex).trim();
        answer = trimmedBlock.substring(newlineIndex + 1).trim();
      } else {
        // If no delimiter is found, we can skip this block or handle it as an error.
        // For now, we'll skip it.
        continue;
      }

      if (question && answer) {
        flashcards.push({ question, answer });
      }
    }
  }

  return flashcards;
};
