import dayjs from 'dayjs'
export function generateDatesFromYearBeginning() {
    const firsDayOfTheYear = dayjs().startOf('year')
    const today = new Date()

    const dates = []
    let compareDate = firsDayOfTheYear

    while (compareDate.isBefore(today)) {
        dates.push(compareDate.toDate())
        compareDate = compareDate.add(1, 'day')
    }

    return dates
}