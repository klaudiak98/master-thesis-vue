<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    const props = defineProps({
        bookId:  String
    });

    const book = ref({});
    const imgSrc = ref('src/book-cover-placeholder.png');
    const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes/';

    onMounted(() => {
        const getBook = async () => {
            const response = await axios.get(`${GOOGLE_BOOKS_API}${props.bookId}`);
            book.value = response.data;
            if (response.data.volumeInfo?.imageLinks?.thumbnail.length) {
                imgSrc.value = response.data.volumeInfo?.imageLinks?.thumbnail;
            }
        };
        if (props.bookId.length) {
            getBook();
        }
    })

</script>
<template>
    <div class="item d-flex">
        <div>
            <img alt="image" :src="imgSrc"/>
        </div>
        <div style="width: 100%;">
            <h4 style="font-weight: bold; display: flex; justify-content: space-between;">
                {{book?.volumeInfo?.title}}
                <router-link :to="{ name: 'Book', params: { bookId: props.bookId } }">
                    <font-awesome-icon icon="fa-solid fa-edit" style="color: black"/>
                </router-link>
            </h4>
            <h5 style="font-weight: bold">{{ book?.volumeInfo?.subtitle }}</h5>
            <h5>{{ book?.volumeInfo?.authors.join(', ') }}</h5>
            <p>{{ book?.volumeInfo?.publisher }}, {{ book?.volumeInfo?.publishedDate }}</p>
            <br />
            <div class="truncateLongTexts">
            {{ book?.volumeInfo?.description || "Brak opisu" }}
            </div>
        </div>
    </div>
</template>

<style>
.item {
    padding: 0.7em;
    border-radius: 0.5em;
    background-color: #e0e0e0;
    gap: 1.5em;
}

img {
        max-height: 10em;
}

.truncateLongTexts {
    width: 35em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>