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

  onMounted(() => {
    const loggedIn = auth.status.loggedIn;

    if (loggedIn) {
      router.push("/profile");
    }
  });

  watch(
      () => password.value,
      () => {
          password.value.length === 8 ? validatePassword.value = true : validatePassword.value = false
      }
  );

  const validatePasswords = () => {
    password.value === matchPassword.value ? validatePassword.value = true : validatePassword.value = false
  }

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

    <form @submit.prevent="handleSubmit">

      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" v-model="email" required placeholder="email"/>
      </div>

      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" v-model="password" required placeholder="password"/>
      </div>

      <div class="form-group">
        <label for="matchPassword" class="form-label">Password again</label>
        <input type="password" id="matchPassword" v-model="matchPassword" required placeholder="password" @input="validatePasswords"/>
      </div>

      <div class="form-group">
        <label for="name" class="form-label">Name</label>
        <input type="text" id="name" v-model="name" required placeholder="name"/>
      </div>
      
      <button class="btn" type="submit">Sign up</button>

    </form>

    <router-link to="/login"><p>or login!</p></router-link>

  </section>
</template>