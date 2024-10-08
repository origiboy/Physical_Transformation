<template>
  <div class="app">
    <header>
      <h1>Персонажи Рика и Морти</h1>
      <nav>
        <router-link to="/">Все персонажи</router-link>
        <router-link to="/search-location">Поиск по локации</router-link>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style scoped lang="scss">
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
header {
  margin-bottom: 20px;
  color: lightblue;
}
nav {
  a {
    color: #42b983;
    font-weight: bold;
    text-decoration: none;

    &:not(:last-child) {
      margin-right: 15px;
    }
  }
}
nav a:hover {
  text-decoration: underline;
}
</style>