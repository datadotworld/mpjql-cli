/*
 * Simple example script which pulls the number of events/user for the last day
 */
import { dateToString } from './lib/date'

const settings = __SETTINGS__
let startDate, endDate

// end date defaults to today
if (settings.endDate) {
  endDate = settings.endDate
} else {
  endDate = dateToString(new Date())
}

// start date defaults to previous day
if (settings.startDate) {
  startDate = settings.startDate
} else {
  startDate = new Date(endDate)
  startDate.setDate(startDate.getDate() - 1)
  startDate = dateToString(startDate)
}

function main() {
  return Events({ from_date: startDate, to_date: endDate })
    .groupByUser((user, events) => (user || 0) + events.length)
    .map(user => `${user.key[0]}: ${user.value}`)
}
