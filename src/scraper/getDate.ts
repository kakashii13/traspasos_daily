export const getDate = () => {
  // Get yesterday's date
  const currentDate = new Date();
  const yesterdayDate = new Date(currentDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  const day =
    yesterdayDate.getUTCDate().toString().length == 1
      ? `0${yesterdayDate.getUTCDate()}`
      : yesterdayDate.getUTCDate().toString();
  const month =
    (yesterdayDate.getUTCMonth() + 1).toString().length == 1
      ? `0${yesterdayDate.getUTCMonth() + 1}`
      : (yesterdayDate.getUTCMonth() + 1).toString();
  const year = yesterdayDate.getUTCFullYear();

  return { day, month, year };
};
