<template>
  <div class="board-container">
    <div class="board">
      <div v-for="r in numberOfRows" :key="'row'+r" class="row">
        <div v-for="t in wordLength" :key="'tile'+t" :ref="el => { tileDivs[r-1][t-1] = el }" class="tile">
          <span>{{ reactiveBoard.board[r-1][t-1] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import { useStore } from 'vuex'
import { makeGuess, isWinningWord, getWordOfDay } from "src/lib/wordle.js";
import useEmitter from 'src/composables/useEmitter.js'
import { useQuasar } from 'quasar'
import { delay } from "src/lib/helpers.js";

export default defineComponent({
  name: "GameBoard",
  setup () {
    const store = useStore();
    const emitter = useEmitter();
    const $q = useQuasar()
    const wordLength = 5;
    const numberOfRows = 6;
    let activeRow = 0;
    let activeTile = 0;
    let gameOver = false;

    // Create board 2D array
    const board = new Array(numberOfRows);
    const tileDivs = ref(new Array(numberOfRows));
    for (let i = 0; i < board.length; i++) {
      board[i] = new Array(wordLength).fill("");
      tileDivs.value[i] = new Array(wordLength);
    }

    console.log(getWordOfDay());

    const reactiveBoard = reactive({board: board})

    function receiveKeypress(key) {
      if (gameOver) return;

      if (key === "enter") {
        submitGuess();
        return;
      }

      if (key === "⬅") {
        deleteLetter();
        return;
      }

      // Otherwise
      inputLetter(key)
    }

    async function submitGuess(fromLoad = false) {
      if (gameOver) return;

      const guess = reactiveBoard.board[activeRow].join(""); // Get user's input
        
      if (guess.length !== wordLength) return;

      const result = makeGuess(guess);

      if (!result.isValidWord) {
        notify("Not in word list");
        return;
      }

      if (!fromLoad) {
        store.commit("game/submitGuess", guess);
      }

      for (var i = 0; i < result.letters.length; i++) {
        if (result.letters[i] === "correct") {
          tileDivs.value[activeRow][i].classList.add("correct");
        }
        else if (result.letters[i] === "present") {
          tileDivs.value[activeRow][i].classList.add("present");
        }
        else {
          tileDivs.value[activeRow][i].classList.add("absent");
        }
      }

      activeRow += 1;
      activeTile = 0;

      emitter.emit("resultOfGuess", result);

      if (isWinningWord(guess) || activeRow > numberOfRows - 1) {
        gameOver = true;
        const gameResult = {
          isWin: isWinningWord(guess),
          numberOfGuesses: activeRow
        };
        if (!fromLoad) {
          store.commit("stats/submitGameResult", gameResult);
          if (gameResult.isWin) {
            store.commit("game/setWon", true);
            notify("Nice!");
            await delay(2500);
          } else {
            notify("Unlucky.");
            await delay(2500);
          }
        }
        store.commit("game/setGameOver");
        emitter.emit("gameOver");
      }
    }

    function deleteLetter() {
      if (activeTile === 0) return;
      reactiveBoard.board[activeRow][activeTile-1] = "";
      activeTile -= 1;
    }

    function inputLetter(key) {
      if (activeRow < numberOfRows && activeTile < wordLength) {
        reactiveBoard.board[activeRow][activeTile] = key;
        activeTile += 1;
      }
    }

    function loadSubmittedGuesses() {
      for (let guess of [...store.state.game.submittedGuesses]) {
        for (let letter of guess) {
          inputLetter(letter);
        }
        submitGuess(true);
      }
    }

    function notify(message) {
      $q.notify({
        message: message,
        position: "center",
        timeout: 1000,
        color: "white",
        textColor: "black"
      });
    }

    return {
      wordLength,
      numberOfRows,
      tileDivs,
      reactiveBoard,
      receiveKeypress,
      loadSubmittedGuesses
    }
  },
  mounted() {
    this.loadSubmittedGuesses(); // Load guesses the player has already made for today's word
  }
});
</script>

<style lang="scss" scoped>
.board-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
}

.board {
  width: 350px;
  height: 420px;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
}

.row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;

  .tile {
    width: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    line-height: 2rem;
    font-weight: bold;
    vertical-align: middle;
    box-sizing: border-box;
    text-transform: uppercase;
    border: 2px solid $absent;
  }
}
</style>
