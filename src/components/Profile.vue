<script setup>
    import { onMounted, ref } from 'vue';
    import UserServices from '../services/user.service';
    
    const user = ref({})

    onMounted(() => {
        UserServices.getUser().then(
            (res) => user.value = res.data,
            (err) => console.error(err)
        );
    });
</script>

<template>
    <header class="header">
        <h1>Hi</h1>
        {{ user }}

    </header>

    <!-- <section>
        <h3>Currently reading</h3>
        <BooksList :books=books></BooksList>
    </section>
    <section>
        <h3>Want to read</h3>
        <BooksList :books=books></BooksList>
    </section>
    <section>
        <h3>Read</h3>
        <BooksList :books=books></BooksList>
    </section> -->
</template>

<style>
    .header {
        display: flex;
        justify-content: space-between;
    }
</style>