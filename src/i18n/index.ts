import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    game: {
      title: 'Solve before time runs out',
      submit: 'Submit',
      placeholder: 'Your answer'
    }
  },
  ru: {
    game: {
      title: 'Реши задачу до конца времени',
      submit: 'Ответить',
      placeholder: 'Твой ответ'
    }
  }
};

export default createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'en',
  messages
});
