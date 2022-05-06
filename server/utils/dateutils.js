function daysInMonth(year, month){
  return new Date(year, month, 0).getDate();
}

function getNumberOfDays(year, month) {
  if(month == 0) return 0;
  if(month > 12) return 365;
  let days = 0;
  for(let i = 0; i < month; i++){
    days += daysInMonth(year, i+1);
  }
  return days;
}

function getMonthFromNumDays(year, days){
  if(days == 0) return 1;
  if(days > 365) return 12;
  let checkDays;
  for(let i = 0; i < 366; i++){
    checkDays += daysInMonth(year, i+1);
    if(checkDays > days) return i;
  }
  return 12;
}


module.exports =  { daysInMonth, getNumberOfDays, getMonthFromNumDays };
