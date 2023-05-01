<script setup>
  import { onMounted, ref, watch } from 'vue';
  import  router  from '../router';
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const auth = computed(() => store.state).value.auth;

  const user = ref({})
  const email = ref('');
  const name = ref('');
  const password = ref('');
  const matchPassword = ref('');
  const validatePassword = ref(false);
  const errMsg = ref('');
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  onMounted(() => {
    const loggedIn = auth.status.loggedIn;

    if (loggedIn) {
      router.push("/");
    }
  });

  watch(
      () => [password.value, matchPassword.value],
      () => {
        PWD_REGEX.test(password.value) && password.value === matchPassword.value ? validatePassword.value = true : validatePassword.value = false
      }
  );

  const handleSubmit = () => {
    if (! validatePassword.value) {
      errMsg.value = 'Passwords not match';
    } else {
      errMsg.value = '';

      user.value = {
        email: email.value,
        password: password.value,
        name: name.value
      }

      console.log('user', user.value)

      store.dispatch("register", user.value).then(
        () => {
          router.push("/login");
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
    }
  };
</script>

<template>
  <section class="form">
    <h1>Register</h1>
    <p class="errMsg">{{ errMsg }}</p>

    <form @submit.prevent="handleSubmit" >

      <div class="form-floating mb-3">
        <input type="email" id="email" v-model="email" required placeholder="email" class="form-control"/>
        <label for="email">Email</label>
      </div>

      <div class="form-floating mb-3">
        <input type="password" id="password" v-model="password" required placeholder="password" class="form-control"/>
        <label for="password" >Password</label>
      </div>

      <div class="form-floating mb-3">
        <input type="password" id="matchPassword" v-model="matchPassword" required  class="form-control" placeholder="password"/>
        <label for="matchPassword" >Password again</label>
      </div>

      <div class="form-floating mb-3">
        <input type="text" id="name" v-model="name" required placeholder="name" class="form-control"/>
        <label for="name" >Name</label>
      </div>
      
      <button class="btn" type="submit" :disabled="!email || !password || !matchPassword || !name || !validatePassword">Sign up </button>

    </form>

    <router-link to="/login">or login!</router-link>

  </section>
</template>