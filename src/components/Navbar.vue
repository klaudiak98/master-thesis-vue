<script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const GOOGLE_API_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
  const books = ref([]);
  const router = useRouter()

  // zmienic na stan -> vuex
  let searchInput = '';

  const setBooks = (bookslist) => {
    books.value = bookslist;
  };

  const showBook = (bookId) => {
    setBooks([]);
    router.push(`/book/${bookId}`);
  };

  const searchBook = async () => {
    const search = searchInput.replace(/\s+/g, '_');

    if (search.length) 
    {
      const response = await axios.get(`${GOOGLE_API_URL}${search}`);
      searchInput.length ? 
        setBooks(response?.data?.items) :
        setBooks([])
    } else {
      setBooks([]);
    }
  }
</script>

<template>
    <nav class="navbar">
      <router-link to="/">Logo</router-link>
      <div>
        <input type="text" placeholder="Search book" v-model="searchInput" @input="searchBook" style="width: 20em;"/>
        <div class="searchList">
          <div v-for="book in books" class="box" @click="showBook(book.id)">
            <p class="title" >{{ book?.volumeInfo?.title }}</p>
            <p v-if="book?.volumeInfo?.authors" class="author" >{{ book?.volumeInfo?.authors.join(', ') }}</p>
          </div>
        </div>
      </div>
      <router-link to="/settings"><font-awesome-icon icon="fa-solid fa-cogs" style="color: black"/></router-link>
    </nav>
</template>

<style>
  .navbar {
    font-size: 1.3em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 1.5em;
  }

  .searchList {
    position: absolute;
    top: 3.5em;
    z-index: 100;
  }

  .box {
    text-align: left;
    border: black ridge 1px;
    border-radius: 0.375rem;
    margin: 2px;
    width: 20rem;
    padding-left: 5px;
    background-color: #ffffffde;
    cursor: pointer;
  }

  .box:active,
  .box:focus,
  .box:hover {
    background-color: #abababcf;
    box-shadow: 0 0 5px -1px rgba(0,0,0,0.6);
  }

  .title {
    font-weight: bold;
    font-size: medium;
    margin-bottom: 1px;
  }

  .author {
    font-size: small;
    margin-bottom: 1px;
  }
</style>