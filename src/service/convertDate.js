export const convertUnixDate = (unixDate) => {
  const milliseconds = unixDate * 1000;
  const dateObject = new Date(milliseconds);
  const humanDateFormat = dateObject.toLocaleString();
  return humanDateFormat.slice(10);
};

export const convertDatePicker = (unixDate) => {
  const date = convertUnixDate(unixDate);
  const arr = date.split("/");
  return arr[2] + "/" + arr[1] + "/" + arr[0];
};
