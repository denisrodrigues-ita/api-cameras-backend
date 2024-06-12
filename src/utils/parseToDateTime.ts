export const parseToDateTime = (
  datetimeStr: string,
  addSeconds: number = 0
): Date => {
  const year = parseInt(datetimeStr.substring(0, 4), 10);
  const month = parseInt(datetimeStr.substring(4, 6), 10) - 1;
  const day = parseInt(datetimeStr.substring(6, 8), 10);
  const hour = parseInt(datetimeStr.substring(8, 10), 10);
  const minute = parseInt(datetimeStr.substring(10, 12), 10);

  if (addSeconds < 0 || addSeconds > 59) {
    addSeconds = 0;
  }

  const date = new Date(Date.UTC(year, month, day, hour, minute, addSeconds));

  return date;
};
