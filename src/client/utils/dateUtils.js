export const getUserTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
export const FORMAT_OPTIONS = {
  DDofMofYEAR: {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: getUserTimezone(),
  },
};

export const formatDate = (date, formatOptions) => {
  return date.toLocaleString("es-MX", formatOptions);
};

export const setDateToEndOfDay = (date) => {
  let newDate = new Date(date);
  newDate.setHours(23);
  newDate.setMinutes(59);
  newDate.setSeconds(59);
  newDate.setMilliseconds(999);
  return newDate;
};

export const compareDates = (date1, date2)=> {
  const dateOne = setDateToEndOfDay(date1);
  const dateTwo = setDateToEndOfDay(date2);
  if (dateOne.getTime() > dateTwo.getTime()) return 1;
  if (dateOne.getTime() < dateTwo.getTime()) return -1;
  return 0;
};
