import { datesAreOnSameDay } from "src/lib/helpers";

export function init(state) {
  state.submittedGuesses =
    JSON.parse(localStorage.getItem("submittedGuesses")) ?? [];

  state.lastReset = new Date(localStorage.getItem("lastReset"));
  if (
    isNaN(state.lastReset) ||
    !datesAreOnSameDay(new Date(), state.lastReset)
  ) {
    resetGuesses(state);
  }
}

export function submitGuess(state, guess) {
  state.submittedGuesses.push(guess);
  localStorage.setItem(
    "submittedGuesses",
    JSON.stringify(state.submittedGuesses)
  );
}

export function resetGuesses(state) {
  state.submittedGuesses = [];
  state.lastReset = new Date();

  localStorage.setItem(
    "submittedGuesses",
    JSON.stringify(state.submittedGuesses)
  );
  localStorage.setItem("lastReset", state.lastReset);
}

export function setGameOver(state) {
  state.gameOver = true;
}
