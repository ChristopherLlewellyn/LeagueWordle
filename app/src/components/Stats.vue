<template>
  <q-icon name="font_download" @click="show = true" class="q-ml-md" />
  <q-dialog v-model="show">
    <q-card class="card">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Statistics</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-1">
        <table>
          <tr class="text-h4">
            <td>{{ store.state.stats.played }}</td>
            <td>{{ Math.round(store.state.stats.wins / store.state.stats.played * 100) }}</td>
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

      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Guess Distribution</div>
      </q-card-section>
      <q-card-section class="row items-center q-pb-1">
        <div class="graph-container">
          <div class="guess">1</div>
            <div class="graph">
              <div class="graph-bar align-right" :style="{ width: getDistributionPercentage(1) + '%' }">
                <div class="num-guesses">{{ store.state.stats.guessDistribution[1] }}</div>
            </div>
          </div>
        </div>
        <div class="graph-container">
          <div class="guess">2</div>
            <div class="graph">
              <div class="graph-bar align-right" :style="{ width: getDistributionPercentage(2) + '%' }">
                <div class="num-guesses">{{ store.state.stats.guessDistribution[2] }}</div>
            </div>
          </div>
        </div>
        <div class="graph-container">
          <div class="guess">3</div>
            <div class="graph">
              <div class="graph-bar align-right" :style="{ width: getDistributionPercentage(3) + '%' }">
                <div class="num-guesses">{{ store.state.stats.guessDistribution[3] }}</div>
            </div>
          </div>
        </div>
        <div class="graph-container">
          <div class="guess">4</div>
            <div class="graph">
              <div class="graph-bar align-right" :style="{ width: getDistributionPercentage(4) + '%' }">
                <div class="num-guesses">{{ store.state.stats.guessDistribution[4] }}</div>
            </div>
          </div>
        </div>
        <div class="graph-container">
          <div class="guess">5</div>
            <div class="graph">
              <div class="graph-bar align-right" :style="{ width: getDistributionPercentage(5) + '%' }">
                <div class="num-guesses">{{ store.state.stats.guessDistribution[5] }}</div>
            </div>
          </div>
        </div>
        <div class="graph-container">
          <div class="guess">6</div>
            <div class="graph">
              <div class="graph-bar align-right" :style="{ width: getDistributionPercentage(6) + '%' }">
                <div class="num-guesses">{{ store.state.stats.guessDistribution[6] }}</div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from 'vuex'

export default defineComponent({
  name: "Stats",
  setup () {
    const store = useStore();

    function getDistributionPercentage(number) {
      const distribution = store.state.stats.guessDistribution[number];
      const played = store.state.stats.played;
      if (distribution === 0) return 7;
      return distribution / played * 100;
    }

    return {
      show: ref(false),
      store,
      getDistributionPercentage
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
    background-color: #3a3a3c;
    display: flex;
    justify-content: center;
}

.graph-container .graph .num-guesses {
    font-weight: bold;
}
</style>
