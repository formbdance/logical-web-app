import posthog from 'posthog-js';

export const initAnalytics = () => {
  const key = import.meta.env.VITE_POSTHOG_KEY;
  if (!key) return;

  posthog.init(key, {
    api_host: import.meta.env.VITE_POSTHOG_HOST ?? 'https://app.posthog.com',
    person_profiles: 'identified_only'
  });
};
