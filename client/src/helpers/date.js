export const planDuration = ({ initialDate = "", price, currentPrice }) => {
  const initial = new Date(initialDate);
  // const formattedDateInitial = `${initial.getUTCDate()}/${
  //   initial.getUTCMonth() + 1
  // }/${initial.getUTCFullYear()}`;

  const formattedDateInitial = `${initial.getUTCFullYear()}/${
    initial.getUTCMonth() + 1
  }/${initial.getUTCDate()}`;
  const durationInDays = Math.trunc((price * 30) / currentPrice);

  const dateFinal = new Date(
    initial.getFullYear(),
    initial.getMonth(),
    initial.getDate() + durationInDays
  );

  // const formattedDateFinal = `${dateFinal.getDate()}/${dateFinal.getMonth() + 1}/${dateFinal.getFullYear()}`;
  const formattedDateFinal = `${dateFinal.getFullYear()}/${
    dateFinal.getMonth() + 1
  }/${dateFinal.getDate()}`;

  return { formattedDateFinal, formattedDateInitial, durationInDays };
};
