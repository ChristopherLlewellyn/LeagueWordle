export function getPlayed(state) {
  return state.played;
}

export function getWins(state) {
  return state.wins;
}

export function getLosses(state) {
  return state.losses;
}

export function getCurrentStreak(state) {
  return state.currentStreak;
}

export function getMaxStreak(state) {
  return state.maxStreak;
}

export function getGuessDistribution(state) {
  return state.guessDistribution;
}
