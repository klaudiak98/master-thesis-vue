<script setup>
  import { onMounted, ref } from 'vue';
  import { auth } from '../store/auth.module';
  import  router  from '../router';
  // import store from '../store/index';

  const user = ref({})
  const email = ref('');
  const password = ref('');
  const errMsg = ref('');

  onMounted(() => {
    const loggedIn = auth.status?.loggedIn;

    if (loggedIn) {
      router.push("/profile");
    }
  });
  
  const handleSubmit = () => {
    user.value = {
      email: email.value,
      password: password.value
    }
    console.log('user', user.value)

    auth.dispatch("login", user.value).then(
      () => {
        router.push("/home");
      },
      (err) => {
        errMsg.value =
          (err.response &&
          err.response.data &&
            err.response.data.message) ||
            err.message ||
            err.toString();
      }
    );
  };
</script>

<template>
  <section class="form">
    <h1>Login</h1>
    <p class="errMsg">{{ errMsg }}</p>

    <form @submit.prevent="handleSubmit">

      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" v-model="email" required placeholder="email"/>
      </div>

      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" v-model="password" required placeholder="password"/>
      </div>
      
      <button class="btn" type="submit">
        <span>Login</span>
      </button>
    </form>

    <router-link to="/register"><p>or create new account!</p></router-link>
  </section>
</template>