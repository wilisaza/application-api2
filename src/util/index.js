export const isEmpty = arg => {
  let isEmpty = false
  if (!arg && typeof arg !== 'number') {
    isEmpty = true
  } else if (typeof arg === 'string' || Array.isArray(arg)) {
    isEmpty = arg.length === 0
  } else if (typeof arg === 'object') {
    isEmpty = Object.keys(arg).length === 0
  }
  return isEmpty
}

export const isRowId = (id) => {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  return !isEmpty(id) && regex.test(id)
}
