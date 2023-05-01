<script setup>
  import { onMounted, ref } from 'vue';
  import  router  from '../router';
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const auth = computed(() => store.state).value.auth;

  const user = ref({})
  const email = ref('');
  const password = ref('');
  const errMsg = ref('');

  onMounted(() => {
    const loggedIn = auth.status.loggedIn;

    if (loggedIn) {
      router.push("/");
    }
  });
  
  const handleSubmit = () => {
    user.value = {
      email: email.value,
      password: password.value
    }

    store.dispatch("login", user.value).then(
      () => {
        router.push("/");
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
      <div class="form-floating mb-3">
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          required 
          placeholder="email"
          class="form-control"/>
        <label for="email">Email</label>
      </div>

      <div class="form-floating mb-3">
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required 
          placeholder="password"
          class="form-control"
        />
        <label for="password">Password</label>
      </div>
      
      <button class="btn" type="submit" :disabled="!email || !password">
        Login
      </button>
    </form>

    <router-link to="/register">or create new account!</router-link>
  </section>
</template>