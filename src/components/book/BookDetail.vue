<script setup lang="ts">
import { useBooksStore, type Book } from '@/stores/books';

const store = useBooksStore();

const props = defineProps<{
  item: Book,
}>();
</script>

<template>
  <div
    v-if="item"
    class="book-detail"
  >
    <div class="book-detail__header">
      <div class="book-detail__header__main">
        <h1 class="book-detail__header__title">
          {{ item.title }}
        </h1>
        <h2 class="book-detail__tiny">
          <p>{{ item.author }}</p>
        </h2>
      </div>

      <div class="book-detail__header__secondary">
        <button
          :class="[
            'book-detail__upvote',
            { 'book-detail__upvote--disabled': props.item.upvoted }
          ]"
          :disabled="props.item.upvoted"
          @click="store.upvote(props.item.slug)"
        >
          {{ props.item.upvoted ? 'Upvoted' : 'Upvote' }}
        </button> 
        <span class="book-detail__tiny">Upvoted {{ item.upvotes }} times</span>
      </div>
    </div>

    <div class="book-detail__container">
      <img
        :src="item.cover"
        class="book-detail__cover"
      >
    
      <div class="book-detail__content">
        <h3 class="book-detail__title">
          Synopsys
        </h3>
        <p
          class="book-detail__synopsis"
        >
          {{ item.synopsis }}
        </p>

        <p class="book-detail__subtitle">
          Rating: {{ item.rating }}/10
        </p>
      </div>
    </div>

    <RouterLink
      class="book-detail__link"
      to="/"
    >
      Go back
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
  .book-detail {
    background-color: color('background');
    border-radius: $border-radius;
    padding: 32px;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    text-align: left;

    &__header {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: flex-start;
      text-align: left;
      margin-bottom: 32px;

      &__title {
        @include header(color('accent'));
      }
    }

    &__container {
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      text-align: left;
    }

    &__content {
      margin-left: 32px;
      display: flex;
      flex-flow: column;
      justify-content: flex-start;
      text-align: left;
      row-gap: 18px;
    }

    &__title {
      @include title(color('accent'));
    }

    &__subtitle {
      @include subtitle(color('black'));
      
      margin: 12px 0;
    }

    &__tiny {
      @include tiny(color('dark-grey'));
    }

    &__link {
      @include link;

      border: 1px solid color('black');
      width: auto;
      margin: 32px auto auto 0;
      padding: 6px;
      border-radius: $border-radius-mini;
    }

    &__cover {
      width: 400px;
      height: auto;
      max-width: 100%;
      object-fit: contain;
      border-radius: $border-radius;
      box-shadow: $box-shadow-mini;
      margin: 0 auto;
      flex-shrink: 0;
    }

    &__synopsis {
      @include body;
    }

    &__upvote {
      @include body;
      @include accent;

      border: 1px solid color('accent');
      border-radius: $border-radius-mini;
      cursor: pointer;
      margin: 12px 12px 0 0;
      padding: 6px;
      width: 100px;

      &--disabled {
        background-color: color('background');
        border: 1px solid color('accent');
        cursor: not-allowed;
        color: color('accent');
      }
    }

    @include media('<=desktop') {
      &__header {
        display: flex;
        flex-flow: column;
        row-gap: 12px;
      }
    }
    
    @include media('<=laptop') {
      &__container {
        flex-flow: column;
      }

      &__content {
        margin-left: 0;
      }

      &__title {
        margin-top: 32px;
      }
    }
  }
</style>
