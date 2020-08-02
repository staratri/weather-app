export const getDay = validDate => {
  const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ]
  const dayIndex = (new Date(validDate)).getDay()
  return days[dayIndex]
}

export const getTimeSuffix = number => {
  if (number === 0) {
    number = 12
  }
  if (number > 12) {
    return 12 - (24 - number) + 'pm'
  } else {
    return number + 'am'
  }
}
