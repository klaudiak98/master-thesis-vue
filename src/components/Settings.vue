<script setup>
  import { onMounted, ref, watch } from 'vue';
  import UserServices from '../services/user.service';
  import  router  from '../router';
  import { useStore } from 'vuex'

  const store = useStore()
  const errMsg = ref('');
  const user = ref({});
  const name = ref('');
  const password = ref('');
  const matchPassword = ref('');
  const validatePassword = ref(false);
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  onMounted(() => {
    UserServices.getUser().then(
      (res) => {
        user.value = res.data
      },
      (err) => console.error(err)
    );
  });
  
  watch(
    () => [password.value, matchPassword.value],
    () => {
      PWD_REGEX.test(password.value) && password.value === matchPassword.value ? validatePassword.value = true : validatePassword.value = false
    }
  );

  const handleSubmit = () => {
    if (password.length && !validatePassword.value) {
      errMsg.value = 'Passwords not match';
    } else {
      errMsg.value = '';
      
      try {
        UserServices.updateUser(user.value.email, name.value, password.value);
        alert('Your account has been updated');
      } catch (err) {
        console.error(err);
        alert('Something went wrong');
      }
    }
  };

  const signOut = () => {
    store.dispatch("logout").then(
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

</script>
<template>
    <header class="d-flex justify-content-between">
        <h1>Settings</h1>
          <button 
            style="font-size: 2em; padding-right: 0.5em; border: none"
            class="bg-light"
            @click="signOut"
          >
            <font-awesome-icon icon="fa-solid fa-window-close" style="color: black;"/>
          </button>
    </header>

    <section class="form">
        <p class="errMsg">{{ errMsg }}</p>
        <form>
          <div class="form-floating mb-3">
            <input type="text" id="name" v-model="name" 
           placeholder="name" class="form-control"/>
            <label for="name" >Name</label>
          </div>

          <div class="form-floating mb-3">
            <input type="password" id="password" v-model="password" placeholder="password" class="form-control"/>
            <label for="password" >New password</label>
          </div>

          <div class="form-floating mb-3">
            <input type="password" id="matchPassword" v-model="matchPassword" class="form-control" placeholder="password"/>
            <label for="matchPassword" >Password again</label>
          </div>

          <button class="btn" type="submit" @click="handleSubmit">Save</button>
        </form>
    </section>
</template>