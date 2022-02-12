export function init(state) {
  state.played = parseInt(localStorage.getItem("played"));
  if (isNaN(state.played)) state.played = 0;

  state.wins = parseInt(localStorage.getItem("wins"));
  if (isNaN(state.wins)) state.wins = 0;

  state.losses = parseInt(localStorage.getItem("losses"));
  if (isNaN(state.losses)) state.losses = 0;

  state.currentStreak = parseInt(localStorage.getItem("currentStreak"));
  if (isNaN(state.currentStreak)) state.currentStreak = 0;

  state.maxStreak = parseInt(localStorage.getItem("maxStreak"));
  if (isNaN(state.maxStreak)) state.maxStreak = 0;

  state.guessDistribution = JSON.parse(
    localStorage.getItem("guessDistribution")
  ) ?? {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };
}

export function submitGameResult(state, gameResult) {
  state.played += 1;
  localStorage.setItem("played", state.played);

  if (gameResult.isWin) {
    state.wins += 1;
    localStorage.setItem("wins", state.wins);

    state.currentStreak += 1;
    localStorage.setItem("currentStreak", state.currentStreak);

    state.guessDistribution[gameResult.numberOfGuesses] += 1;
    localStorage.setItem(
      "guessDistribution",
      JSON.stringify(state.guessDistribution)
    );

    if (state.maxStreak < state.currentStreak) {
      state.maxStreak = state.currentStreak;
      localStorage.setItem("maxStreak", state.maxStreak);
    }
  } else {
    state.losses += 1;
    localStorage.setItem("losses", state.losses);

    state.currentStreak = 0;
    localStorage.setItem("currentStreak", state.currentStreak);
  }
}
