<script setup>
    import BooksList from './BooksList.vue';
    import { onMounted, ref } from 'vue';
    import UserServices from '../services/user.service';
    import ShelfServices from '../services/shelf.service';
    
    const user = ref({})
    const shelf = ref([])

    onMounted(() => {
        UserServices.getUser().then(
            (res) => {
                user.value = res.data
                ShelfServices.getShelf(user.value.email).then(
                    (res) => {
                        shelf.value= res.data
                    },
                    (err) => console.error(err)
                )
            },
            (err) => console.error(err)
        );
    });
</script>

<template>
    <header class="header">
        <h1>Hi {{ user.name }}</h1>
    </header>

    <section>
        <h3>Currently reading</h3>
        <BooksList :booksList=shelf?.currentlyReading></BooksList>
    </section>
    <section>
        <h3>Want to read</h3>
        <BooksList :booksList=shelf?.wantToRead></BooksList>
    </section>
    <section>
        <h3>Read</h3>
        <BooksList :booksList=shelf?.read></BooksList>
    </section>
</template>

<style>
    .header {
        display: flex;
        justify-content: space-between;
    }
</style>