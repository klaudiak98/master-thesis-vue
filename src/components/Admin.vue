<script setup>
    const users = [
        {
            name: 'ajsdlkas',
            email: 'asjdjaks'
        },
        {
            name: 'fsdgfgh',
            email: 'dddd'
        }
    ];
</script>
<template>
    <section>
        <h1>Users list</h1>

        <div class="list" v-if="users.length">
            <div v-for="user in users" class="item" style="display: flex; justify-content: space-between; align-items: center;">
                {{ user.name }}, {{ user.email }}  X
            </div>
        </div>
        <p v-else>No users to display</p>
    </section>
</template>