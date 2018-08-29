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

function formatErrorMsg (error) {
  const errors = error.response.data.errors
  let msg = ''
  Object.keys(errors).map((key) => {
    msg += key + ': ' + errors[key] + '\n\n'
  })
  return msg
}

export {
  getJWT,
  getResource,
  formatErrorMsg
}
