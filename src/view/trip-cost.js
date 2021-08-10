export const createSiteTripCostTemplate = (dataArray) => {
  const totalPrice = dataArray.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.basePrice)
    , 0);
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>`;
};
