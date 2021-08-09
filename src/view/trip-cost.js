export const createSiteTripCostTemplate = (dataArray) => {
  const initialValue = 0;
  const totalPrice = dataArray.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.basePrice)
    , initialValue);
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>`;
};
