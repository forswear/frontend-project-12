import * as yup from 'yup'

export const channelNameValidationSchema = yup
  .string()
  .trim()
  .required('Обязательное поле')
  .min(3, 'Минимальная длина — 3 символа')
  .max(20, 'Максимальная длина — 20 символов')
  .matches(/^[\w\s]+$/, 'Допускаются только буквы, цифры и пробел')
