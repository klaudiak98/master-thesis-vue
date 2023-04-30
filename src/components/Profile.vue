<script setup>
import BooksList from './BooksList.vue';

const books = [
    {
      title: 'book1',
      author: 'asdas',
      id: 1,
      img: 'asda'
    },
    {
      title: 'book2',
      author: 'asdasdfsds',
      id: 2,
      img: 'asdfssda'
    },    
  ];
</script>

<template>
    <header class="header">
        <h1>Hi</h1>
    </header>

    <section>
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
    </section>
</template>

<style>
    .header {
        display: flex;
        justify-content: space-between;
    }
</style>