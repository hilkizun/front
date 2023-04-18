import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
    format,
  } from 'date-fns';
  
  export const daysRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    return differenceInDays(end, now);
  };
  
  export const timeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
  
    const days = differenceInDays(end, now);
    const hours = differenceInHours(end, now) % 24;
    const minutes = differenceInMinutes(end, now) % 60;
    const seconds = differenceInSeconds(end, now) % 60;
  
    return { days, hours, minutes, seconds };
  };
  
  export const formattedEndDate = (endDate) => {
    return format(new Date(endDate), "EEEE', 'dd 'de' MMMM");
  };
  