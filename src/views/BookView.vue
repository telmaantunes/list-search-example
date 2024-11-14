<script setup lang="ts">
import BookDetail from '@/components/book/BookDetail.vue';
import { useBooksStore } from '@/stores/books';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const store = useBooksStore();
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  if(route.params.id === store.book?.slug) {
    return;
  }

  await store.fetchBook(route.params.id.toString()) 
    .catch(error => { 
      if(error.message === "Not Found") {
        router.push('/404');
      }
    });
});
</script>

<template>
  <BookDetail 
    v-if="store.book"
    :item="store.book"
    class="book-view"
  />
</template>
