function getJWT (response) {
  const data = response.data
  let jwt
  if (data) {
    return data.jwt
  }
}

export {
  getJWT
}
