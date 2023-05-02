<script setup>
  import axios from 'axios';
  import { ref, watch } from 'vue';
  const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes?q=';

  const books = ref([]);
  const searchInput = ref('');

  watch(
    () => searchInput.value,
    () => searchBook()
  )

  const searchBook = async () => {
    const search = searchInput.value.replace(/\s+/g, '_');

    if (search.length) 
    {
      const response = await axios.get(`${GOOGLE_BOOKS_API}${search}`);
      searchInput.value.length ? 
        books.value = response.data?.items : 
        books.value = [];
    } else {
      books.value = [];
    }
  }

  const clear = () => {
    searchInput.value = ''
    books.value = [];
  }
</script>

<template>
  <nav class="navbar">
    <router-link to="/">
      <img src="../logo.svg" style="height: 90px;"/>
    </router-link>

    <div>
      <input 
        type="text" 
        placeholder="Search book" 
        v-model="searchInput" 
        style="width: 20em;"
        class="form-control"
      />
      <div class="searchBarList">
        <div v-for="book in books" class="box" @click="clear">
          <router-link :to="{ name: 'Book', params: { bookId: book.id }}" style="color: black;">
            <p class="title" >{{ book?.volumeInfo?.title}}</p>
            <p v-if="book?.volumeInfo?.authors" class="author" >{{ book?.volumeInfo?.authors.join(', ') }}</p>
          </router-link>
        </div>
      </div>
    </div>

    <router-link to="/settings">
      <font-awesome-icon icon="fa-solid fa-cogs" style="color: black" class="fa-2x"/>
    </router-link>
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

  .searchBarList {
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
    box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.6);
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