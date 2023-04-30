<script setup>
    import Book from './Book.vue';
    defineProps({
        books: []
    });
</script>

<template>
    <div class="list">
        <Book v-for="book in books" :book=book></Book>
    </div>
</template>