<template>
  <div>
    <div>
      <NavBar />
    </div>
    <div>
      <img alt="Vue logo" src="./assets/logo.png">
      <router-view />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'App',
  components: {
    NavBar: defineAsyncComponent(() => import(/*webpackChunkName:*/ '@/modules/shared/components/NavBar')),
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
