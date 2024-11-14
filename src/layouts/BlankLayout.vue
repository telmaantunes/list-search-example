<script setup lang="ts">
</script>

<template>
  <main class="blank-layout">
    <slot />
  </main>
</template>

<style lang="scss" scoped>
.blank-layout {
  @include layout;
}
</style>
