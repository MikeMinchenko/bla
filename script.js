'use strict';

const calculation = function (priceAll, count, promoCode) {
  let result;
  // просчет скидки по количеству товаров
  if (count >= 10 && count > 5) {
    result = priceAll - ((priceAll / 100) * 10);
  } else if (count < 10 && count >= 5) {
    result = priceAll - ((priceAll / 100) * 5);
  } else {
    result = priceAll;
  }
  // просчет скидки если сумма больше 100000
  if (result > 100000) {
    result = 100000 + ((result - 100000) - (((result - 100000) / 100) * 20));
  }
  // просчет скидки по промокоду
  if (promoCode) {
    if (promoCode === 15 && result >= 25000) {
      result = result - ((result / 100) * 15);
    } else if (promoCode === 100) {
      if (result > 100) {
        result = result - 100;
      } else {
        result = 0;
      }

    }
  }

  return result;
};

console.log(calculation(27000, 5, 15));