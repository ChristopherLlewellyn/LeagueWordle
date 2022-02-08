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
import { makeGuess, isWinningWord, getWordOfDay } from "src/game/wordle.js";

export default defineComponent({
  name: "GameBoard",
  setup () {
    const wordLength = 5;
    const numberOfRows = 6;
    let activeRow = 0;
    let activeTile = 0;
    let inputDisabled = false;

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
      if (inputDisabled) return;

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

    function submitGuess() {
      const guess = reactiveBoard.board[activeRow].join("");
      if (guess.length !== 5) return;

      const result = makeGuess(guess);
      console.log(result);

      if (!result.isValidWord) {
        // show "is not valid word" popup
        return;
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

      if (isWinningWord(guess)) {
        // Game over
        inputDisabled = true;
        return;
      }

      activeRow += 1;
      activeTile = 0;
    }

    function deleteLetter() {
      if (activeTile === 0) return;
      reactiveBoard.board[activeRow][activeTile-1] = "";
      activeTile -= 1;
      console.log(tileDivs);
    }

    function inputLetter(key) {
      if (activeRow < numberOfRows && activeTile < wordLength) {
        reactiveBoard.board[activeRow][activeTile] = key;
        activeTile += 1;
      }
    }

    return {
      wordLength,
      numberOfRows,
      tileDivs,
      reactiveBoard,
      receiveKeypress
    }
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
    border: 2px solid #3a3a3c;
  }

  .correct {
      background-color: #538d4e;
    }

    .present {
      background-color: #b59f3b;
    }

    .absent {
      background-color: #3a3a3c;
    }
}
</style>
