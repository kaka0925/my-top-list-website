<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
// Main App component
</script>

<style>
/* Import all CSS styles */
@import './assets/css/home.css';
@import './assets/css/ranking-page.css';

/* Global reset to ensure centered layout */
* {
  box-sizing: border-box;
}

html {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

body {
  margin: 0 !important;
  padding: 0 !important;
  width: 100%;
  overflow-x: hidden;
  position: relative;
}

/* Global app styles */
#app {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  width: 100%;
  position: relative;
}
</style>
