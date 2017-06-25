/* Client app constant (ish) parameters */
export const APP_TITLE = 'Fish';

export const currentDate = () => {
  const dateObj = new Date();
  return `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;
};
