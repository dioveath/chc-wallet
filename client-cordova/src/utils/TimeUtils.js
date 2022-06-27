
export function getGameSessionRemainingTime({createdAt, startTime, duration}){
  let sessionDate = new Date(createdAt);
  
  let splitted = startTime.split(/:|\s+/g);
  let hour = parseInt(splitted[0]) + (splitted[3] == 'pm' ? (splitted[0] == 12) ? 0 : 12 : (splitted[0] == 12) ? -12 : 0); 
  let minutes = splitted[1];
  let seconds = splitted[2];

  sessionDate.setHours(hour);
  sessionDate.setMinutes(minutes);
  sessionDate.setSeconds(seconds);

  let endSessionDate = new Date(sessionDate);
  endSessionDate.setHours(hour + duration);

  let remainingTime = endSessionDate.getTime() - Date.now();
  let overflow = false;

  if(remainingTime < 0) {
    overflow = true;
    remainingTime = Math.abs(remainingTime);
  }

  const remainingMilis = remainingTime % 1000;
  const remainingSeconds = Math.floor(remainingTime/1000) % 60;
  const remainingMinutes = Math.floor(remainingTime/(1000*60) % 60);
  const remainingHours = Math.floor(remainingTime/(1000*60*60) % 60);

  const remainingTimeStr = `${String(remainingHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

  return {
    overflow,
    remainingTimeStr
  };
}
