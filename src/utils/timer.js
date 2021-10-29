const timeFormat = (time) => {
  if (!time) {
    return "00";
  }

  if (time < 10) {
    return `0${time}`;
  }

  return time;
};

export const getTimer = (date) => {
  const now = new Date();
  const distance = Math.abs(date - now);
  const hoursDiff = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesDiff = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secondsDiff = Math.floor((distance % (1000 * 60)) / 1000);

  return `${timeFormat(hoursDiff)}:${timeFormat(minutesDiff)}:${timeFormat(
    secondsDiff
  )}`;
};

