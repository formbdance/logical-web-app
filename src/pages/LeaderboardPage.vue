<script setup lang="ts">
import { useLeaderboardSocket } from '@/composables/useLeaderboardSocket';

const { topPlayers } = useLeaderboardSocket();
</script>

<template>
  <main class="space-y-3 p-4">
    <h1 class="text-xl font-bold">Leaderboard</h1>
    <ul class="space-y-2">
      <li
        v-for="(player, i) in topPlayers"
        :key="player.name"
        class="rounded-xl bg-slate-800 p-3"
      >
        #{{ i + 1 }} {{ player.name }} — {{ player.score }}
      </li>
    </ul>
  </main>
</template>
