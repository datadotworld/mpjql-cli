export const dateToString = e => {
  return new Date(Number(e)).toISOString().substr(0, 10)
}
