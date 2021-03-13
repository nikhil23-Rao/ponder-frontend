export const GetDate = () => {
  const months = [
    "Janurary",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};
