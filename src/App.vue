<script setup>
  import Navbar from './components/Navbar.vue';
</script>

<template>
  <Navbar/>
  <div class="card">
    <router-view></router-view>
  </div>
</template>

<style>
  body {
    margin: 0;
    font-family: monospace;
    background-color: rgba(169,245,69,0.521);
  }

  section {
    margin-bottom: 1.2em;
  }

  h1 {
    font-weight: bold;
  }

  a {
    text-decoration: none;
  }

  .form {
    display: flex;
    flex-direction: column;
  }

  .form > h1 {
    align-self: center;
  }

  .form-group {
    margin-bottom: 1.5em;
  }

  .form-label {
    margin-bottom: 1.2em;
  }

  .btn {
    font-size: 1.2em;
    width: 8em;
    background-color: rgba(29,97,63,0.958);
    border-radius: 0.3em;
    border-color: rgba(28,135,82,0.958);
  }

  .btn:hover,
  .btn:active,
  .btn:focus {
    background-color: rgba(44,178,111,0.958);
    border-color: rgba(34, 161, 97, 0.958);
  }

  .card {
    margin: 1em 3em;
    background-color: lightgray;
    padding: 1em;
  }

  .errMsg {
    font-weight: bold;
  }

  .list {
    display: flex;
    flex-direction: column;
    padding: 0 0.5em;
    gap: 0.5em;
  }

  .item {
    padding: 0.7em;
    border-radius: 0.5em;
    background-color: #e0e0e0;
    gap: 1.5em;
  }

  .item img {
    max-height: 1.2em;
  }
</style>