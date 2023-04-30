<script setup>

  import { onMounted, ref } from 'vue';
  import  router  from '../router';
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const auth = computed(() => store.state).value.auth;
  
  let errMsg = 'error test';
  let name = '';
  let password = '';
  let password_again = '';

  const handleSubmit = () => {
    console.log('test', name, password, password_again);
  };

  const setName = (e) => {
    console.log('setName', e)
    name = e;
  };

  const setPassword = (e) => {
    console.log('setPassword', e)
    password = e;
  };

  const setPasswordAgain = (e) => {
    console.log('setPasswordAgain', e)
    password_again = e;
  };

</script>
<template>
    <header style="display: flex; justify-content: space-between;">
        <h1>Settings</h1>
        <div style="font-size: 2em; padding-right: 0.5em;">
          <button><font-awesome-icon icon="fa-solid fa-window-close" style="color: black;"/></button>
        </div>
    </header>

    <section class="form">
        <p class="errMsg">errmsg</p>
        <form>
            <div class="form-group">
                <label for="name" class="form-label">Name</label>
                <input type="text" id="name" v-model="name" required placeholder="name" @change="(e) => setName(e.target.value)"/>
            </div>

            <div class="form-group">
                <label for="password" class="form-label">New password</label>
                <input type="password" id="password" v-model="password" required placeholder="password" @change="(e) => setPassword(e.target.value)"/>
            </div>

            <div class="form-group">
                <label for="password_again" class="form-label">Password again</label>
                <input type="password" id="password_again" v-model="password" required placeholder="password again" @change="(e) => setPasswordAgain(e.target.value)"/>
            </div>
            <button class="btn" type="submit" @click="handleSubmit">Save</button>
        </form>
    </section>
</template>