import { render, screen } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';
import { createI18n } from 'vue-i18n';
import GameWindow from '@/components/organisms/GameWindow.vue';

vi.mock('@/stores/game', () => ({
  useGameStore: () => ({
    currentPuzzle: { prompt: '2 + 2 * 2 = ?' },
    timeLeft: 25,
    progressPercent: 50,
    isRoundActive: true,
    lastResult: null,
    startRound: vi.fn(),
    submitAnswer: vi.fn(),
    syncTimer: vi.fn()
  })
}));

describe('GameWindow', () => {
  it('renders puzzle prompt and submit button', () => {
    const i18n = createI18n({
      legacy: false,
      locale: 'en',
      messages: {
        en: {
          game: { title: 'Solve', submit: 'Submit', placeholder: 'Answer' }
        }
      }
    });

    render(GameWindow, {
      global: {
        plugins: [createTestingPinia(), i18n]
      }
    });

    expect(screen.getByText('2 + 2 * 2 = ?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});
