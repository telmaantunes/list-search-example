<script setup lang="ts">
import BooksList from '@/components/home/BooksList.vue';
import { useBooksStore } from '@/stores/books';
import { onMounted } from 'vue';

const store = useBooksStore();

onMounted( () => {
  if(store.list.length) {
    return;
  }

  store.fetchBooks()
    .catch(error => console.log(error)); 
});
</script>

<template>
  <div class="home-page">
    <h1 class="home-page__title">
      Top books of all time
    </h1>
    <BooksList />
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  &__title {
    @include header(color('accent'))
  }

  .books-list {
    margin-top: 30px;
  }
}
</style>
