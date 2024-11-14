<script setup lang="ts">
import { computed } from 'vue';
defineEmits(['changePage']);

const currentPage = defineModel<number>({ default: 1 });

const props = defineProps<{
    itemCount: number;
    itemsPerPage?: number;
}>();

const pageCount = computed(() =>
  Math.ceil(props.itemCount / (props.itemsPerPage ?? 10))
);

const pages = computed(() =>
  Array.from({ length: pageCount.value }, (_, i) => i + 1)
);

function changePage(value: number) {
  currentPage.value = value;
}
</script>

<template>
  <div class="pagination-section">
    <slot />
    <div>
      <button
        :disabled="1 === currentPage"
        :class="[
          'pagination-section__button',
          { 'pagination-section__button--disabled': 1 === currentPage }
        ]"
        @click="changePage(currentPage - 1)"
      >
        Previous
      </button>

      <button
        v-for="page in pages"
        :key="page"
        :disabled="page === currentPage"
        :class="[
          'pagination-section__button',
          { 'pagination-section__button--active': page === currentPage }
        ]"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
      
      <button
        :disabled="pageCount === currentPage"
        :class="[
          'pagination-section__button',
          { 'pagination-section__button--disabled': pageCount === currentPage }
        ]"
        @click="changePage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pagination-section {
  &__button {
      @include body;

      margin-left: 6px;
      background-color: color('background');
      border: 1px solid color('accent');
      border-radius: $border-radius-mini;
      cursor: pointer;

      &:first-child {
          margin-left: 0;
      }

      &--active {
          @include accent;
      }

      &--disabled {
          background-color: color('grey');
          border: 1px solid color('grey');
          color: color('dark-grey');
          cursor: not-allowed;
      }
  }
}
</style>