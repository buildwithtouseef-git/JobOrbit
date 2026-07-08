let accessTokenMemory = null

export const setAccessToken = (token) => {
  accessTokenMemory = token || null
}

export const getAccessToken = () => accessTokenMemory

export const clearAccessToken = () => {
  accessTokenMemory = null
}
