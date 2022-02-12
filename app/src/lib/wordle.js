import { VALID_GUESSES } from "./validGuesses";
import { ANSWERS } from "./answers";

export function isValidWord(word) {
  return (
    VALID_GUESSES.includes(word.toLowerCase()) ||
    ANSWERS.includes(word.toLowerCase())
  );
}

export function getWordOfDay() {
  // February 8, 2022 Game Epoch
  const epochMs = new Date("February 8, 2022 00:00:00").valueOf();
  const now = Date.now();
  const msInDay = 86400000;
  const index = Math.floor((now - epochMs) / msInDay);
  const nextday = (index + 1) * msInDay + epochMs;

  return {
    solution: ANSWERS[index % ANSWERS.length].toUpperCase(),
    solutionIndex: index,
    tomorrow: nextday,
  };
}

export function isWinningWord(word) {
  return solution.toLowerCase() === word.toLowerCase();
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay();

export function makeGuess(word) {
  let result = {
    isValidWord: isValidWord(word),
    letters: new Array(5),
    word: word,
  };

  if (!result.isValidWord) {
    return result;
  }

  let presentLettersShownAlready = [];
  for (var i = 0; i < word.length; i++) {
    if (solution[i].toLowerCase() === word[i].toLowerCase()) {
      result.letters[i] = "correct";
    } else if (
      solution.toLowerCase().includes(word[i].toLowerCase()) &&
      !presentLettersShownAlready.includes(word[i].toLowerCase())
    ) {
      result.letters[i] = "present";
      presentLettersShownAlready.push(word[i].toLowerCase());
    } else {
      result.letters[i] = "absent";
    }
  }

  return result;
}
