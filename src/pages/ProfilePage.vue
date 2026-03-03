<script setup lang="ts">
import StatCard from '@/components/atoms/StatCard.vue';
</script>

<template>
  <main class="space-y-4 p-4">
    <h1 class="text-xl font-bold">Profile</h1>
    <div class="grid grid-cols-2 gap-3">
      <StatCard label="Wins" :value="42" />
      <StatCard label="Avg Time" value="9.4s" />
      <StatCard label="Streak" :value="7" />
      <StatCard label="Badges" :value="12" />
    </div>
  </main>
</template>
