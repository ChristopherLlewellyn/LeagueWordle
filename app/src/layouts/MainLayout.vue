<template>
  <q-layout class="layout">
    <div class="header">
      <h1>League Wordle</h1>
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  border-bottom: solid 1px #3a3a3c;
}

.header h1 {
  font-size: 26px;
}
</style>
