<script setup>
    defineProps({
        book: {}
    });
</script>
<template>
    <div class="item" style="display: flex;">
        <div><img alt="image"></div>
        <div>
            <h4 style="font-weight: bold; display: flex; justify-content: space-between;">{{book?.title}}</h4>
            <h5>{{book?.author}}</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quos dolorum facere assumenda animi blanditiis laboriosam adipisci non voluptatibus qui.</p>
        </div>
    </div>
</template>