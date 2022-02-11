<template>
  <q-icon name="leaderboard" size="sm" @click="show = true" class="q-ml-md" />
  <q-dialog v-model="show">
    <q-card class="card">
      <q-card-section class="row q-pb-none center">
        <q-space />
        <div class="text-h6" style="margin-left: 24px;">STATISTICS</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pb-none q-pt-1">
        <table>
          <tr class="text-h4">
            <td>{{ store.state.stats.played }}</td>
            <td>{{ store.state.stats.wins > 0 ? Math.round(store.state.stats.wins / store.state.stats.played * 100) : 0 }}</td>
            <td>{{ store.state.stats.currentStreak }}</td>
            <td>{{ store.state.stats.maxStreak }}</td>
          </tr>
          <tr>
            <td>Played</td>
            <td>Win %</td>
            <td>Current Streak</td>
            <td>Max Streak</td>
          </tr>
        </table>
      </q-card-section>

      <q-card-section class="q-pb-none q-pt-1">
        <div class="text-h6 center">GUESS DISTRIBUTION</div>
      </q-card-section>
      <q-card-section class="q-pb-1">
        <div class="graph-container">
          <div class="guess">1</div>
            <div class="graph">
              <div class="graph-bar align-right" :class="isTodaysScore(1) ? 'correct' : ''" :style="{ width: getDistributionPercentage(1) + '%' }">
                <div class="num-guesses">{{ store.state.stats.guessDistribution[1] }}</div>
            </div>
          </div>
        </div>
        <div class="graph-container">
          <div class="guess">2</div>
            <div class="graph">
              <div class="graph-bar align-right" :class="isTodaysScore(2) ? 'correct' : ''" :style="{ width: getDistributionPercentage(2) + '%' }">
                <div class="num-guesses">{{ store.state.stats.guessDistribution[2] }}</div>
            </div>
          </div>
        </div>
        <div class="graph-container">
          <div class="guess">3</div>
            <div class="graph">
              <div class="graph-bar align-right" :class="isTodaysScore(3) ? 'correct' : ''" :style="{ width: getDistributionPercentage(3) + '%' }">
                <div class="num-guesses">{{ store.state.stats.guessDistribution[3] }}</div>
            </div>
          </div>
        </div>
        <div class="graph-container">
          <div class="guess">4</div>
            <div class="graph">
              <div class="graph-bar align-right" :class="isTodaysScore(4) ? 'correct' : ''" :style="{ width: getDistributionPercentage(4) + '%' }">
                <div class="num-guesses">{{ store.state.stats.guessDistribution[4] }}</div>
            </div>
          </div>
        </div>
        <div class="graph-container">
          <div class="guess">5</div>
            <div class="graph">
              <div class="graph-bar align-right" :class="isTodaysScore(5) ? 'correct' : ''" :style="{ width: getDistributionPercentage(5) + '%' }">
                <div class="num-guesses">{{ store.state.stats.guessDistribution[5] }}</div>
            </div>
          </div>
        </div>
        <div class="graph-container">
          <div class="guess">6</div>
            <div class="graph">
              <div class="graph-bar align-right" :class="isTodaysScore(6) ? 'correct' : ''" :style="{ width: getDistributionPercentage(6) + '%' }">
                <div class="num-guesses">{{ store.state.stats.guessDistribution[6] }}</div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section v-if="store.state.game.gameOver" class="q-pt-none">
        <div class="text-h6 center">NEXT WORDLE</div>
        <div class="center">
          <vue-countdown :time="timeRemaining" v-slot="{ hours, minutes, seconds }" class="countdown">
            {{ new Date(1000 * ((hours * 60 * 60) + (minutes * 60) + seconds)).toISOString().substr(11, 8) }}
          </vue-countdown>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useStore } from 'vuex'
import useEmitter from 'src/composables/useEmitter.js';

export default defineComponent({
  name: "Stats",
  setup () {
    const store = useStore();
    const show = ref(false);
    
    const emitter = useEmitter();
    emitter.on("gameOver", _ => {
      show.value = true;
    })

    let actualTime = new Date(Date.now());
    let endOfDay = new Date(actualTime.getFullYear(), actualTime.getMonth(), actualTime.getDate() + 1, 0, 0, 0);
    let timeRemaining = endOfDay.getTime() - actualTime.getTime();

    function getDistributionPercentage(number) {
      const distribution = store.state.stats.guessDistribution[number];
      const played = store.state.stats.played;
      if (distribution === 0) return 7;
      return distribution / played * 100;
    }

    function isTodaysScore(number) {
      if (!store.state.game.gameOver || !store.state.game.won) return false;
      if (store.state.game.submittedGuesses.length === number) return true;
      return false;
    }

    return {
      show,
      store,
      getDistributionPercentage,
      timeRemaining,
      isTodaysScore

    }
  }
});
</script>

<style lang="scss" scoped>
table {
  border-spacing: 20px 2px;
}

td {
  max-width: 55px;
  text-align: center;
  vertical-align: text-top;
}

.card {
  min-width: 320px;
}

.countdown {
  font-size: 32px;
}

.center {
  text-align: center;
}

.graph-container {
    width: 100%;
    height: 23px;
    display: flex;
    align-items: center;
    padding-bottom: 4px;
    font-size: 14px;
    line-height: 20px;
}

.graph-container .graph {
    width: 100%;
    height: 100%;
    padding-left: 4px;
}

.graph-container .graph .graph-bar.align-right {
    justify-content: flex-end;
    padding-right: 8px;
}

.graph-container .graph .graph-bar {
    height: 100%;
    position: relative;
    background-color: $absent;
    display: flex;
    justify-content: center;
}

.graph-container .graph .num-guesses {
    font-weight: bold;
}
</style>
