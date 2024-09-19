export const formatDateToYYYYMMDD = (date: Date): string => {
  if (!(date instanceof Date)) {
    throw new Error('Invalid date input');
  }
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
