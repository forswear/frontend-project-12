import React from 'react'
import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
  const { t } = useTranslation()
  return (
    <div className="text-center mt-5">
      <h1>404 Not Found</h1>
      <p>{t('not_found')}</p>
    </div>
  )
}

export default NotFoundPage
