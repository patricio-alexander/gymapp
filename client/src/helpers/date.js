export const planDuration = ({ initialDate = "", price, currentPrice }) => {
  const initial = new Date(initialDate);
  // const formattedDateInitial = `${initial.getUTCDate()}/${
  //   initial.getUTCMonth() + 1
  // }/${initial.getUTCFullYear()}`;

  const formattedDateInitial = `${initial.getUTCFullYear()}/${
    initial.getUTCMonth() + 1
  }/${initial.getUTCDate()}`;
  const durationInDays = Math.ceil((price * 30) / currentPrice);

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

export const checkExpiration = (expirationDate) => {
  const currentDate = new Date();
  const expirationDateObj = new Date(expirationDate);

  // Establecer la hora a las 00:00:00 para ignorar la hora del día actual
  currentDate.setHours(0, 0, 0, 0);
  expirationDateObj.setHours(0, 0, 0, 0);

  const timeDifference = expirationDateObj.getTime() - currentDate.getTime();

  const expired = timeDifference < 0;
  const elapsedDays = Math.abs(
    Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  );

  let remainingTime = null;
  if (!expired) {
    const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    if (!remainingDays) {
      remainingTime = "Hoy es el último día";
    } else {
      remainingTime = ` 
      Quedan ${remainingDays} día${remainingDays !== 1 ? "s" : ""}
      `;
    }
  }

  let elapsedAfterExpiration = null;
  if (expired) {
    const elapsedDaysAfterExpiration = Math.abs(
      Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
    );
    elapsedAfterExpiration = `Expiró hace ${elapsedDaysAfterExpiration} día${
      elapsedDaysAfterExpiration !== 1 ? "s" : ""
    }`;
  }
  // console.log({ expired, remainingTime, elapsedAfterExpiration })
  return { expired, remainingTime, elapsedAfterExpiration };
};
