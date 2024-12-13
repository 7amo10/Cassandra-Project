export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const formatName = (firstName, lastName) => {
  return `${firstName} ${lastName}`.trim();
};