export const getAuthFromStorage = () => {
  const username = localStorage.getItem('username')
  const token = localStorage.getItem('token')
  return { username, token }
}

export const setAuthToStorage = ({ username, token }) => {
  localStorage.setItem('username', username)
  localStorage.setItem('token', token)
}

export const clearAuthStorage = () => {
  localStorage.removeItem('username')
  localStorage.removeItem('token')
}
