export interface calculatorProps {
  cartValue: number;
  numberOfItems: number;
  deliveryDistance: number;
  dateAndTime: string;
}

export const calculator = ({
  cartValue,
  numberOfItems,
  deliveryDistance,
  dateAndTime,
}: calculatorProps) => {
  const errors: string[] = [];

  // CART VALUE SURCHARGE
  const cartValueSurcharge: number =
    Math.round(cartValue) < 10 ? 10 - cartValue : 0;

  console.log(`this is the CART VALUE surcharge ${cartValueSurcharge}`);

  const itemsSurcharge: number =
    numberOfItems >= 5 && numberOfItems <= 12
      ? (numberOfItems - 4) * 0.5
      : numberOfItems > 12
      ? (numberOfItems - 4) * 0.5 + 1.2
      : 0;

  console.log(`this is the #ITEMS surcharge ${itemsSurcharge}`);

  // DISTANCE SURCHARGE
  const distanceFee: number =
    deliveryDistance >= 0 && deliveryDistance <= 1000
      ? 2
      : deliveryDistance >= 1001
      ? 2 +
        Math.floor((deliveryDistance - 1000) / 500) * 1 +
        (deliveryDistance % 500 !== 0 ? 1 : 0)
      : 0;

  console.log(`this is the DISTANCE surcharge ${distanceFee}`);
  // FRIDAY SURCHARGE
  if (
    !dateAndTime ||
    typeof dateAndTime !== "string" ||
    !dateAndTime.includes("T")
  ) {
    console.error("Invalid dateAndTime format");
    errors.push("Invalid dateAndTime format");
  }

  const day = dateAndTime.split("T")[0];
  const weekday = new Date(day).getDay();

  const time: string = dateAndTime.split("T")[1];
  const hour: number = parseInt(time.split(":")[0], 10);

  const isFridayRushHour: boolean = weekday === 5 && hour >= 15 && hour < 19;

  console.log(`is it FRIDAY RUSH HOUR? ${isFridayRushHour}`);

  // TOTAL FEE
  const sumCalculated: number = isFridayRushHour
    ? (cartValueSurcharge + itemsSurcharge + distanceFee) * 1.2
    : cartValueSurcharge + itemsSurcharge + distanceFee;

  const fee: number =
    cartValue > 200 ? 0 : sumCalculated > 15 ? 15 : sumCalculated;

  const formattedFee: number = ((fee * 100) / 100).toFixed(2) as any;

  return [formattedFee as number, errors];
};
