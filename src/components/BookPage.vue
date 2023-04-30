<script setup>
    import axios from 'axios';
    import { ref, onMounted, watch } from 'vue';
    import { useRoute } from 'vue-router';

    const GOOGLE_API_URL = 'https://www.googleapis.com/books/v1/volumes/';
    const route = useRoute()
    const book = ref({})
    const bookState = ref('')

    onMounted(async () => {
        await axios
            .get(`${GOOGLE_API_URL}${route.params.id}`)
            .then(response => {
            book.value = response.data
        })
    });

    watch(
        () => route.params.id,
        async () => {
            await axios
            .get(`${GOOGLE_API_URL}${route.params.id}`)
            .then(response => {
                book.value = response.data
            })
        }
    );

</script>

<template>
    <header class="header">
        <div>
            <h1>{{ book?.volumeInfo?.title }}</h1>
            <h2 style="font-weight: bold;">{{ book?.volumeInfo?.subtitle }}</h2>
            <h3>{{ book?.volumeInfo?.authors }}</h3>
            <p>{{ book?.volumeInfo?.publisher }}, {{ book?.volumeInfo?.publishedDate }}</p>
        </div>
        <div>
            <img :src="book?.volumeInfo?.imageLinks?.thumbnail" alt="cover" height="192px" style="border: 1px solid #000;">
        </div>
    </header>

    <section class="section">
        <div style="border: 1px solid #000; padding: 2em;">
            <h3>Your shelves</h3>
            <select v-model="bookState">
                <option disabled value="">-- Select --</option>
                <option value="wantToRead">Want to read</option>
                <option value="currentlyReading">Currently reading</option>
                <option value="read">Read</option>
            </select>
            {{ bookState }}
        </div>
    </section>
   
</template>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2em;
        padding-left: 2em;
        padding-right: 2em;
    }

    .section {
        padding-left: 2em;
        padding-right: 2em;
    }
</style>