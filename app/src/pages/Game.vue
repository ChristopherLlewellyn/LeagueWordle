<template>
  <q-page>
    <game-board ref="gameBoard" />
    <keyboard @keypress="keypress" />
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import GameBoard from "components/GameBoard.vue"
import Keyboard from "components/Keyboard.vue"

export default defineComponent({
  name: "Game",
  components: {
    GameBoard, 
    Keyboard
  },
  setup() {
    const gameBoard = ref();

    function keypress(key) {
      gameBoard.value.receiveKeypress(key);
    }

    return {
      gameBoard,
      keypress
    }
  }
});
</script>
