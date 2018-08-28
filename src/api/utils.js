function getJWT (response) {
  const data = response.data
  if (data) {
    return data.jwt
  }
}

function getResource (response) {
  const data = response.data
  if (data) {
    return data.resource
  }
}

export {
  getJWT,
  getResource
}
