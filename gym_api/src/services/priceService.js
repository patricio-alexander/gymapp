import { changePriceInDb, getCurrentPriceFromDb } from "../database/db.js";

const serviceGetCurrentPrice = async () => {
  const currenPrice = await getCurrentPriceFromDb();
  return currenPrice;
};

const changePriceService = async (newPrice) => {
  const changePrice = await changePriceInDb(newPrice);
  return changePrice;
};

export { serviceGetCurrentPrice, changePriceService };
