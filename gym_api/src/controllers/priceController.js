import {
  changePriceService,
  serviceGetCurrentPrice,
} from "../services/priceService.js";

const currentPrice = async (req, res) => {
  const currenPrice = await serviceGetCurrentPrice();
  res.json(currenPrice);
};

const changePrice = async (req, res) => {
  const newPrice = await changePriceService(req.body);
  res.json(newPrice);
  // console.log
  //   res.json(req.body);
};

export { currentPrice, changePrice };
