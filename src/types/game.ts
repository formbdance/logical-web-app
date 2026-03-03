export interface Puzzle {
  id: string;
  prompt: string;
  timeLimitSec: number;
  hintsLeft: number;
}

export interface RoundResult {
  correct: boolean;
  xpEarned: number;
  tokensEarned: number;
}
