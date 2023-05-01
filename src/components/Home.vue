<script setup>
  import Admin from './Admin.vue';
  import Profile from './Profile.vue';
  import { onMounted, computed, ref } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const auth = computed(() => store.state).value.auth;

  const user = ref({});
  const isAdmin = ref(false);
  const ROLES = {
    'Admin': 777,
    'User':100
  }

  onMounted(() => {
    user.value = auth.user;
    isAdmin.value = user.value.roles.includes(ROLES.Admin);
  });
</script>

<template>
  <Admin v-if="isAdmin"></Admin>
  <Profile v-else></Profile>
</template>