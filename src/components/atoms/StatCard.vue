<script setup lang="ts">
defineProps<{ label: string; value: string | number }>();
</script>

<template>
  <div class="rounded-xl bg-slate-800 p-3">
    <p class="text-xs text-slate-400">{{ label }}</p>
    <p class="text-lg font-semibold">{{ value }}</p>
  </div>
</template>
