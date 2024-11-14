<script setup lang="ts">
import { useBooksStore, type Book } from '@/stores/books';
import { computed } from 'vue';
import highlightText from '@/utils/highlightText';

const MAX_LENGTH = 200;
const MAX_RATING = 10;

const store = useBooksStore();
const props = defineProps<{
  item: Book,
  index: number
  highlight: string|undefined
}>();

const ellipsis = computed(() => {
  const ellipsis = props.item.synopsis.length > MAX_LENGTH ? '...' : '';
  
  return props.item.synopsis.substring(0,MAX_LENGTH) + ellipsis;
});
</script>

<template>
  <div
    v-if="item"
    class="book-item"
  >
    <h2 class="book-item__title">
      <RouterLink 
        :to="'/book/' + item.slug"
      >
        <span v-html="(index + 1) + '. ' + highlightText(item.title, props.highlight)" />
      </RouterLink>
    </h2>

    
    <h3 class="book-item__tiny">
      <p v-html="highlightText(item.author, props.highlight)" />
      <p>{{ item.rating }}/{{ MAX_RATING }}</p>
    </h3>

    <RouterLink 
      :to="'/book/' + item.slug"
    >
      <img
        :src="item.cover"
        class="book-item__cover"
      >
    </RouterLink>

    
    <p
      class="book-item__synopsis"
      v-html="highlightText(ellipsis, props.highlight)"
    />

    <div class="book-item__bottom">
      <button
        :class="[
          'book-item__upvote',
          { 'book-item__upvote--disabled': props.item.upvoted }
        ]"
        :disabled="props.item.upvoted"
        @click="store.upvote(props.item.slug)"
      >
        {{ props.item.upvoted ? 'Upvoted' : 'Upvote' }}
      </button> 
      <span class="book-item__tiny">Upvoted {{ item.upvotes }} times</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .book-item {
    background-color: color('background');
    border-radius: $border-radius;
    padding: 18px;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    
    &__title  {
      margin-bottom: 6px;

      span {
        @include title(color('accent'));
      }
    }

    &__tiny {
      @include tiny(color('dark-grey'));
    }

    &__cover {
      width: auto;
      height: 300px;
      max-width: 100%;
      object-fit: cover;
      border-radius: $border-radius;
      margin: 16px 0;
      box-shadow: $box-shadow-mini;
    }

    &__synopsis {
      @include body;
      
      text-align: left;
    }

    &__bottom {
      margin-top: auto;
    }

    &__upvote {
      @include body;
      @include accent;

      border: 1px solid color('accent');
      border-radius: $border-radius-mini;
      cursor: pointer;
      margin: 12px 12px 0 0;
      width: 100px;

      &--disabled {
        background-color: color('background');
        border: 1px solid color('accent');
        cursor: not-allowed;
        color: color('accent');
      }
    }

    @include media('<=desktop') {
      &__bottom {
        display: flex;
        flex-flow: column;
        row-gap: 12px;
        align-items: center;
      }
    }
  }
</style>
