// src/i18n.js
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: {
        required_field: 'Обязательное поле',
        min_max_length: 'От {{min}} до {{max}} символов',
        min_length: 'Не менее {{min}} символов',
        password_mismatch: 'Пароли должны совпадать',
        user_already_exists: 'Пользователь уже существует',
        signup_title: 'Регистрация',
        login_title: 'Вход',
        username: 'Имя пользователя',
        password: 'Пароль',
        confirm_password: 'Подтвердите пароль',
        login_button: 'Войти',
        signup_button: 'Зарегистрироваться',
        no_account: 'Нет аккаунта?',
        have_account: 'Есть аккаунт?',
        registration_link: 'Регистрация',
        login_link: 'Вход',
        channels: 'Каналы',
        send: 'Отправить',
        message_placeholder: 'Сообщение...',
        add_channel: 'Добавить канал',
        channel_name: 'Имя канала',
        cancel: 'Отменить',
        submit: 'Отправить',
        select_channel: 'Выберите канал',
        no_messages: 'Нет сообщений',
        rename_channel: 'Переименовать канал',
        delete_channel: 'Удалить канал',
        delete_confirmation:
          'Вы уверены, что хотите удалить этот канал? Все сообщения будут удалены.',
        new_channel_name: 'Введите новое имя канала:',
        not_found: 'Страница не найдена',
        hexlet_chat: 'Hexlet Chat',
        logout: 'Выйти',
        no_channels: 'Нет доступных каналов.',
      },
    },
  },
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
