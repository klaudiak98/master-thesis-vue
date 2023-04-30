<script setup>
  import Navbar from './components/Navbar.vue';

</script>

<template>
  <Navbar/>
  <div class="card mx-5 bg-light">
    <div class="card-body" style="text-align: left">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
  body {
    margin: 0;
    font-family: monospace;
    background-color: rgba(169, 245, 69, 0.521);
  }

  a {
    text-decoration: none;
  }

  .btn {
    font-size: 1.2em;
    width: 8em;
    background-color: rgba(29, 97, 63, 0.958);
    border-radius: 0.3em;
    border-color: rgba(28, 135, 82, 0.958);
  }

  .btn:hover,
  .btn:active,
  .btn:focus {
    background-color: rgba(44, 178, 111, 0.958);
    border-color: rgba(34, 161, 97, 0.958);
  }

  .form {
    display: flex;
    flex-direction: column;
  }

  .form > h1 {
    align-self: center;
  }

  .list {
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    gap: 0.5em;
  }

  .item {
    padding: 0.7em;
    border-radius: 0.5em;
    background-color: #e0e0e0;
    gap: 1.5em;
  }

  .item img {
    max-height: 10em;
  }

  section {
    margin-bottom: 1.2em;
  }

  h1 {
    font-weight: bold;
  }

  .errMsg {
    font-weight: bold;
  }

  .truncateLongTexts {
    width: 35em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

</style>