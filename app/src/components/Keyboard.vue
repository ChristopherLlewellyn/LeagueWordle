<template>
  <div class="keyboard">
    <div class="row">
      <button v-for="key in row1" :key="key" @click="keypress(key)">{{ key }}</button>
    </div>
    <div class="row">
      <button v-for="key in row2" :key="key" @click="keypress(key)">{{ key }}</button>
    </div>
    <div class="row">
      <button v-for="key in row3" :key="key" @click="keypress(key)">{{ key }}</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Keyboard",
  emits: ["keypress"],
  setup (_, {emit}) {
    const row1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
    const row2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l",];
    const row3 = ["enter", "z", "x", "c", "v", "b", "n", "m", "⬅",];

    function keypress(key) {
      emit("keypress", key);
    }

    return {
      row1,
      row2,
      row3,
      keypress
    }
  }
});
</script>

<style lang="scss" scoped>
.keyboard {
  margin: 0 8px;
}

.row {
  display: flex;
  width: 100%;
  margin: 0 auto 8px;
  touch-action: manipulation;
}

button {
    font-family: inherit;
    font-weight: bold;
    border: 0;
    padding: 0;
    margin: 0 3px 0 3px;
    height: 58px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    background-color: #818384;
    color: #d7dadc;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    -webkit-tap-highlight-color: rgba(0,0,0,0.3);
}
</style>
