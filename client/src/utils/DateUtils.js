export function daysInMonth(year, month){
  return new Date(year, month, 0).getDate();
}

export function getNumberOfDays(year, month) {
  if(month == 0) return 0;
  if(month > 12) return 365;
  let days = 0;
  for(let i = 0; i < month; i++){
    days += daysInMonth(year, i+1);
  }
  return days;
}


