<template>
  <div class="keyboard">
    <div class="row">
      <button v-for="(key, i) in row1" :key="key" @click="keypress(key)" :class="row1Classes[i]">{{ key }}</button>
    </div>
    <div class="row">
      <button v-for="(key, i) in row2" :key="key" @click="keypress(key)" :class="row2Classes[i]">{{ key }}</button>
    </div>
    <div class="row">
      <button v-for="(key, i) in row3" :key="key" @click="keypress(key)" :class="row3Classes[i]">{{ key }}</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import useEmitter from 'src/composables/useEmitter.js'

export default defineComponent({
  name: "Keyboard",
  emits: ["keypress"],
  setup (_, {emit}) {
    const emitter = useEmitter();

    const row1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
    const row2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l",];
    const row3 = ["enter", "z", "x", "c", "v", "b", "n", "m", "⬅",];

    const row1Classes = ref(new Array(row1.length));
    const row2Classes = ref(new Array(row2.length));
    const row3Classes = ref(new Array(row3.length));

    emitter.on("resultOfGuess", result => {
      for (let i = 0; i < result.letters.length; i++) {
        let letter = result.word[i];
        let correctPresentAbsent = result.letters[i];
        let rowIndex = row1.indexOf(letter) > -1 ? {row: 1, index: row1.indexOf(letter)} 
          : row2.indexOf(letter) > -1 ? {row: 2, index: row2.indexOf(letter)}
          : row3.indexOf(letter) > -1 ? {row: 3, index: row3.indexOf(letter)}
          : {row: 1, index: 0};

        // This bit is really bad but I can't be bothered to sort it out rn
        if (rowIndex.row === 1) {
          let currentClass = row1Classes.value[rowIndex.index];
          if (currentClass === "correct") continue;
          else if (correctPresentAbsent === "correct") row1Classes.value[rowIndex.index] = "correct";
          else if (correctPresentAbsent === "present") row1Classes.value[rowIndex.index] = "present";
          else row1Classes.value[rowIndex.index] = "absent";
        }

        else if (rowIndex.row === 2) {
          let currentClass = row2Classes.value[rowIndex.index];
          if (currentClass === "correct") continue;
          else if (correctPresentAbsent === "correct") row2Classes.value[rowIndex.index] = "correct";
          else if (correctPresentAbsent === "present") row2Classes.value[rowIndex.index] = "present";
          else row2Classes.value[rowIndex.index] = "absent";
        }

        else {
          let currentClass = row3Classes.value[rowIndex.index];
          if (currentClass === "correct") continue;
          else if (correctPresentAbsent === "correct") row3Classes.value[rowIndex.index] = "correct";
          else if (correctPresentAbsent === "present") row3Classes.value[rowIndex.index] = "present";
          else row3Classes.value[rowIndex.index] = "absent";
        }
      }
    })

    function keypress(key) {
      emit("keypress", key);
    }

    return {
      row1,
      row2,
      row3,
      row1Classes,
      row2Classes,
      row3Classes,
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
