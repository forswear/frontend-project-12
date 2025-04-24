import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      required_field: 'Обязательное поле',
      min_max_length: 'От {{min}} до {{max}} символов',
      min_length: 'Не менее {{min}} символов',
      password_mismatch: 'Пароли должны совпадать',
      user_already_exists: 'Неверные имя пользователя или пароль',
      signup_title: 'Регистрация',
      login_title: 'Войти',
      login_username: 'Ваш ник',
      signup_username: 'Имя пользователя',
      password: 'Пароль',
      confirm_password: 'Подтвердите пароль',
      login_button: 'Войти',
      signup_button: 'Зарегистрироваться',
      no_account: 'Нет аккаунта?',
      have_account: 'Есть аккаунт?',
      registration_link: 'Регистрация',
      login_link: 'Вход',
      user_already_exists2: 'Такой пользователь уже существует',
      registration_error: 'Произошла ошибка при регистрации',
      channels: 'Каналы',
      send: 'Отправить',
      message_placeholder: 'Введите сообщение...',
      add_channel: 'Добавить канал',
      channel_name: 'Имя канала',
      cancel: 'Отменить',
      submit: 'Отправить',
      select_channel: 'Выберите канал',
      no_messages: 'Нет сообщений',
      edit_channel: 'Переименовать канал',
      rename_channel: 'Переименовать',
      delete_channel: 'Удалить',
      delete_confirmation:
        'Вы уверены, что хотите удалить этот канал? Все сообщения будут удалены.',
      new_channel_name: 'Введите новое имя канала:',
      not_found: 'Страница не найдена',
      hexlet_chat: 'Hexlet Chat',
      logout: 'Выйти',
      no_channels: 'Нет доступных каналов.',
      error_loading_messages: 'Ошибка при загрузке сообщений.',
      error_renaming_channel: 'Ошибка при переименовании канала.',
      error_deleting_channel: 'Ошибка при удалении канала.',
      profanity_not_allowed: 'Название содержит недопустимые слова',
      channel_created: 'Канал создан',
      channel_renamed: 'Канал переименован',
      channel_removed: 'Канал удалён',
      error_creating_channel: 'Ошибка при создании канала',
      error_loading_channels: 'Ошибка при загрузке каналов',
      network_error: 'Ошибка сети. Проверьте подключение',
      unknown_error: 'Неизвестная ошибка',
      remove_channel: 'Удалить канал',
      remove_channel_confirmation: 'Уверены?',
      remove: 'Удалить',
    },
  },
};

export const initI18n = () => {
  return i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });
};

export const i18nInstance = i18n;
