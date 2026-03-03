<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
const { t } = useI18n();

const answer = ref('');
let tick: ReturnType<typeof setInterval> | null = null;

const timerLabel = computed(() => `${gameStore.timeLeft}s`);
const canSubmit = computed(
  () => gameStore.isRoundActive && answer.value.trim().length > 0
);

const handleSubmit = async () => {
  await gameStore.submitAnswer(answer.value);
  answer.value = '';
};

onMounted(async () => {
  await gameStore.startRound();

  tick = setInterval(() => {
    gameStore.syncTimer(Date.now());
  }, 1000);
});

onUnmounted(() => {
  if (tick) clearInterval(tick);
});
</script>

<template>
  <section
    class="space-y-4 rounded-2xl border border-slate-700 bg-slate-800/80 p-4 shadow-xl"
  >
    <header class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">{{ t('game.title') }}</h2>
      <span
        class="rounded-full bg-cyan-500/20 px-3 py-1 text-sm font-semibold text-cyan-300"
        >{{ timerLabel }}</span
      >
    </header>

    <div class="h-2 overflow-hidden rounded-full bg-slate-700">
      <div
        class="h-full bg-brand-500 transition-all duration-500"
        :style="{ width: `${gameStore.progressPercent}%` }"
      />
    </div>

    <p
      class="min-h-16 rounded-xl bg-slate-900 p-3 text-sm leading-relaxed text-slate-200"
    >
      {{ gameStore.currentPuzzle?.prompt }}
    </p>

    <form class="space-y-3" @submit.prevent="handleSubmit">
      <input
        v-model="answer"
        class="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2 outline-none ring-cyan-500 focus:ring"
        :placeholder="t('game.placeholder')"
      />
      <button
        class="w-full rounded-xl bg-cyan-500 px-3 py-2 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
        type="submit"
        :disabled="!canSubmit"
      >
        {{ t('game.submit') }}
      </button>
    </form>

    <p v-if="gameStore.lastResult" class="text-sm text-emerald-300">
      +{{ gameStore.lastResult.xpEarned }} XP • +{{
        gameStore.lastResult.tokensEarned
      }}
      tokens
    </p>
  </section>
</template>
