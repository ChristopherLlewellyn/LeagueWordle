import { VALID_GUESSES } from "./validGuesses";
import { ANSWERS } from "./answers";

// February 8, 2022 Game Epoch
const epochMs = new Date("February 8, 2022 00:00:00").valueOf();

export function isValidWord(word) {
  return (
    VALID_GUESSES.includes(word.toLowerCase()) ||
    ANSWERS.includes(word.toLowerCase())
  );
}

export function getWordOfDay() {
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

export function getCurrentGameNumber() {
  const now = Date.now();
  const daysElapsed = (now.valueOf() - epochMs) / (1000 * 60 * 60 * 24);
  return Math.floor(daysElapsed) + 1;
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

  let correctLetters = [];
  let presentLetters = [];
  for (var i = 0; i < word.length; i++) {
    if (solution[i].toLowerCase() === word[i].toLowerCase()) {
      result.letters[i] = "correct";
      correctLetters.push(word[i].toLowerCase());
    }
  }

  for (var i = 0; i < word.length; i++) {
    if (
      solution.toLowerCase().includes(word[i].toLowerCase()) &&
      !presentLetters.includes(word[i].toLowerCase()) &&
      !correctLetters.includes(word[i].toLowerCase())
    ) {
      result.letters[i] = "present";
      presentLetters.push(word[i].toLowerCase());
    } else if (!solution.toLowerCase().includes(word[i].toLowerCase())) {
      result.letters[i] = "absent";
    }
  }

  return result;
}
