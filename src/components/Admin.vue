<script setup>
import { onMounted, ref } from 'vue';
import UserServices from '../services/user.service';

const users = ref([]);

onMounted(() => {
    UserServices.getAllUsers().then(
        res => users.value = res.data
    )
})

const deleteUser = (email) => {
    try {
        UserServices.deleteUser(email);
        users.value = users.value.filter(u => u.email !== email);
        alert('The user has been removed.');
    } catch (err) {
        console.error(err);
        alert('Something went wrong!');
    }
    
}
</script>

<template>
    <section>
        <h1>Users list</h1>

        <div class="list" v-if="users.length">
            <div v-for="user in users" class="item d-flex justify-content-between align-items-center">
                {{ user.name }}, {{ user.email }}
                <font-awesome-icon 
                    icon="fa-solid fa-window-close" 
                    style="color: black" 
                    class="fa-2x"
                    @click="deleteUser(user.email)"
                />
            </div>
        </div>
        <p v-else>No users to display</p>
    </section>
</template>

<style>
.list {
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    gap: 0.5em;
}

.item{
    padding: 0.7em;
    border-radius: 0.5em;
    background-color: #e0e0e0;
    gap: 1.5em;
}
</style>