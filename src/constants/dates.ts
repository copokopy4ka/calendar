export const YEARS = new Array(200).fill(0).map((_, index) => 1900 + index);

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const WEEK_DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export const HOURS = new Array(24).fill(0).map((item, index) => {
  if (index < 10) return `${item}${index}`;
  return `${index}`;
});

export const MINUTES = new Array(60).fill(0).map((item, index) => {
  if (index < 10) return `${item}${index}`;
  return `${index}`;
});
