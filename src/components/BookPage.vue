<script setup>
    import axios from 'axios';
    import { ref, onMounted, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import UserServices from '../services/user.service';
    import ShelfServices from '../services/shelf.service';

    const GOOGLE_API_URL = 'https://www.googleapis.com/books/v1/volumes/';
    const route = useRoute()
    const book = ref({})
    const bookState = ref('')
    const imgSrc = ref('../src/book-cover-placeholder.png');
    const userEmail = ref('');

    const getBook = async() => {
        if (route.params.bookId){
            await axios
                .get(`${GOOGLE_API_URL}${route.params.bookId}`)
                .then(response => {
                    book.value = response.data;
                    if (response.data.volumeInfo?.imageLinks?.thumbnail.length) {
                        imgSrc.value = response.data.volumeInfo?.imageLinks?.thumbnail;
                    };
                    ShelfServices.getBookState(userEmail.value, response.data.id).then(
                        res => bookState.value = res.data
                    );
                });
        }
    }

    onMounted (() => {
        UserServices.getUser().then(
        (res) => {
            userEmail.value = res.data.email
            getBook();
        }
        );
    });

    watch(
        () => route.params.bookId,
        () => getBook()
    );

    const handleSave = () => {
        try {
            ShelfServices.changeBookState(
                userEmail.value,
                book.value.id,
                bookState.value
            );
            alert('Book has been added to the shelf');
        } catch (err) {
            console.error(err)
            alert('Something went wrong')
        }
    }

    const removeFromShelves = () => {
        try {
            ShelfServices.changeBookState(
                userEmail.value,
                book.value.id,
                ''
            );
            alert('Book has been removed from your shelves');
            bookState.value = '';
        } catch (err) {
            console.error(err)
            alert('Something went wrong')
        }
    };

</script>

<template>
    <header class="header">
        <div>
            <h1>{{ book?.volumeInfo?.title }}</h1>
            <h2 style="font-weight: bold;">{{ book?.volumeInfo?.subtitle }}</h2>
            <h3>{{ book?.volumeInfo?.authors.join(', ') }}</h3>
            <p>{{ book?.volumeInfo?.publisher }}, {{ book?.volumeInfo?.publishedDate }}</p>
        </div>
        <div>
            <img :src="imgSrc" alt="cover" style="border: 1px solid #000;" >
        </div>
    </header>
    <section class="section">
        <div style="border: 1px solid #000; padding: 2em; display: inline-block">
            <h3>Your shelves</h3>
            <select v-model="bookState" class="mb-2">
                <option disabled value="">-- Select --</option>
                <option value="read">Read</option>
                <option value="currentlyReading">Currently reading</option>
                <option value="wantToRead">Want to read</option>
            </select>
            <br/>
            <div class="d-flex flex-column gap-2 align-items-center">
                <button 
                    @click="handleSave"
                    type="submit" class="btn">Save</button>
                <button
                    @click="removeFromShelves"
                    style="border-color: red; background-color: #ffa8a8"
                    class="btn"
                >
                    Remove from shelves
                </button>
            </div>
        </div>
    </section>

    <section style="padding-left: 2em; padding-right: 2em">
      <div v-html="book?.volumeInfo?.description || 'Brak opisu'"></div>
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
        text-align: center;
        margin-bottom: 1.5em;
    }
</style>