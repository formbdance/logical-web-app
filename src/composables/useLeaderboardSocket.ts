import { onMounted, onUnmounted, ref } from 'vue';
import { getSocket } from '@/services/socket';

export const useLeaderboardSocket = () => {
  const topPlayers = ref<{ name: string; score: number }[]>([]);

  onMounted(() => {
    const socket = getSocket();
    socket.emit('leaderboard:subscribe', { scope: 'daily' });

    socket.on(
      'leaderboard:update',
      (payload: { name: string; score: number }[]) => {
        topPlayers.value = payload;
      }
    );
  });

  onUnmounted(() => {
    const socket = getSocket();
    socket.off('leaderboard:update');
  });

  return { topPlayers };
};
