<template>
  <q-layout class="layout">
    <div class="header">
      <q-space />
      <h1>League Wordle</h1>
      <q-space />
      <stats />
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import Stats from "src/components/Stats.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    Stats
  }
});
</script>

<style lang="scss">
.layout {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
}

.header {
  height: 51px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: solid 1px $absent;
}

.header h1 {
  font-size: 26px;
  padding-left: 24px; // same size as the stats icon
}
</style>
