export const convertUnixDate = (unixDate) => {
  const milliseconds = unixDate * 1000;
  const dateObject = new Date(milliseconds);
  const humanDateFormat = dateObject.toLocaleString();
  return humanDateFormat.slice(10);
};
