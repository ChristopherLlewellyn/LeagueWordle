<template>
  <q-page>
    <game-board ref="gameBoard" />
    <keyboard @keypress="keypress" class="pin-to-bottom" />
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from 'vuex'
import GameBoard from "components/GameBoard.vue"
import Keyboard from "components/Keyboard.vue"

export default defineComponent({
  name: "Game",
  components: {
    GameBoard, 
    Keyboard
  },
  beforeCreate() {
    const store = useStore();
    store.commit("game/init");
    store.commit("stats/init");
  },
  setup() {
    const gameBoard = ref();
    const keypress = (key) => gameBoard.value.receiveKeypress(key);

    return {
      gameBoard,
      keypress
    }
  }
});
</script>

<style lang="scss">
.pin-to-bottom {
  position: absolute;
  bottom: 0;
  width: calc(100% - 16px);
}
</style>
