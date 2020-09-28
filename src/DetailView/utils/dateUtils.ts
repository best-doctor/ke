import type { OptionalDate } from '../../typing'

const datesAreOnSameDay = (first: Date, second: Date): boolean =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate()

const getNewDateRange = (
  dateKind: string,
  choosedDate: OptionalDate,
  startDate: OptionalDate,
  endDate: OptionalDate,
  oneDayInterval?: boolean | undefined
): [OptionalDate, OptionalDate] => {
  let newStartDate = null
  let newEndDate = null

  if (dateKind === 'start') {
    newStartDate = choosedDate
    newEndDate = endDate || choosedDate
  } else {
    newStartDate = startDate || choosedDate
    newEndDate = choosedDate
  }

  if (newStartDate && newEndDate) {
    if ((oneDayInterval && !datesAreOnSameDay(newStartDate, newEndDate)) || newEndDate < newStartDate) {
      if (dateKind === 'start') {
        newEndDate = newStartDate
      } else {
        newStartDate = newEndDate
      }
    }
  }

  return [newStartDate, newEndDate]
}

export { getNewDateRange, datesAreOnSameDay }
