<script setup lang="ts">
import BookItem from '@/components/home/BookItem.vue';
import { useBooksStore, type Book } from '@/stores/books';
import { computed, ref } from 'vue';
import PaginationSection from '@/components/PaginationSection.vue';

const ITEMS_PER_PAGE = 3;
const store = useBooksStore();
const page = ref<number>(1);
const search = ref<string|undefined>();

function filterBySearch (item: Book) {
  const filter = search.value?.toLowerCase();
  page.value = 1;
  
  if (!filter || !filter.length || !item) {
    return true;
  }
  const foundKeyword =
    item.title.toLowerCase().includes(filter) ||
    item.author.toLowerCase().includes(filter) ||
    item.synopsis.toLowerCase().includes(filter);

  return foundKeyword;
}

const filteredResults = computed(() => {
  return store.list.filter((item) => filterBySearch(item));
});

const visibleBooks = computed(() => {
  return filteredResults.value
    .slice((page.value - 1) * ITEMS_PER_PAGE, ((page.value - 1) * ITEMS_PER_PAGE) + ITEMS_PER_PAGE);
});
</script>

<template>
  <PaginationSection
    v-model="page"
    :item-count="filteredResults.length"
    :items-per-page="ITEMS_PER_PAGE"
    class="books-list"
  >
    <div
      class="books-list__search"
    >
      Free search
      <input
        v-model="search"
        type="text"
      >
    </div>
    <div class="books-list__container">
      <BookItem 
        v-for="book, index in visibleBooks"
        :key="book.slug"
        :item="book"
        :index="index"
        :highlight="search"
      />
    </div>
  </PaginationSection>
</template>

<style lang="scss" scoped>
.books-list {
  &__container {
    display: flex;
    flex-flow: row;
    column-gap: 30px;
    padding: 30px 0;

    .book-item {
      width: 33%;
    }
  }

  &__search {
    @include title;
  }

  @include media('<=tablet') {
    &__container {
      flex-flow: row wrap;
    }

    .book-item {
      width: 100%;
    }
  }
}
</style>