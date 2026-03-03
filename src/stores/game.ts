import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/services/api';
import type { Puzzle, RoundResult } from '@/types/game';

export const useGameStore = defineStore('game', () => {
  const currentPuzzle = ref<Puzzle | null>(null);
  const timeLeft = ref(0);
  const isRoundActive = ref(false);
  const roundStartedAt = ref<number | null>(null);
  const lastResult = ref<RoundResult | null>(null);

  const progressPercent = computed(() => {
    if (!currentPuzzle.value) return 0;
    return Math.max(
      0,
      Math.round((timeLeft.value / currentPuzzle.value.timeLimitSec) * 100)
    );
  });

  const startRound = async () => {
    const { data } = await api.get<Puzzle>('/game/round/start');
    currentPuzzle.value = data;
    timeLeft.value = data.timeLimitSec;
    roundStartedAt.value = Date.now();
    isRoundActive.value = true;
  };

  const submitAnswer = async (answer: string) => {
    if (!currentPuzzle.value || !isRoundActive.value) return;

    const elapsedMs = roundStartedAt.value
      ? Date.now() - roundStartedAt.value
      : 0;
    const { data } = await api.post<RoundResult>('/game/round/submit', {
      puzzleId: currentPuzzle.value.id,
      answer,
      elapsedMs,
      clientTimeLeft: timeLeft.value
    });

    lastResult.value = data;
    isRoundActive.value = false;
    return data;
  };

  const syncTimer = (serverTimestampMs: number) => {
    if (!currentPuzzle.value || !roundStartedAt.value || !isRoundActive.value)
      return;

    const driftMs = Date.now() - serverTimestampMs;
    const elapsedSec = Math.floor(
      (Date.now() - roundStartedAt.value - driftMs) / 1000
    );
    timeLeft.value = Math.max(currentPuzzle.value.timeLimitSec - elapsedSec, 0);

    if (timeLeft.value === 0) {
      isRoundActive.value = false;
    }
  };

  return {
    currentPuzzle,
    timeLeft,
    isRoundActive,
    lastResult,
    progressPercent,
    startRound,
    submitAnswer,
    syncTimer
  };
});
