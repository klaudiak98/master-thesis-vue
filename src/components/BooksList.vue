<script setup>
    import Book from './Book.vue';
    defineProps({
        booksList: Array
    });
</script>

<template>
    <div class="list">
        <Book v-for="bookId in booksList" :bookId=bookId></Book>
    </div>
</template>

<style>
    .list {
        display: flex;
        flex-direction: column;
        padding: 0.5em;
        gap: 0.5em;
    }
</style>