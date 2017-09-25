export function getErrors (request) {
  let errors = request.response

  if (typeof errors === 'string') {
    errors = JSON.parse(errors)
  }

  console.log(errors)

  let messages = []

  Object.keys(errors).map((key) => {
    messages.push({
      field: errors[key].param,
      message: errors[key].msg
    })
  })

  return messages
}
