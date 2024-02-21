import { useState } from "react";
import { FormEvent } from "react";
import { calculator, calculatorProps } from "../Tools/calculator";

const CalculatorForm = () => {
  const [fee, setFee] = useState<number | undefined>(undefined);
  const formIsSubmitted = typeof fee !== "undefined";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const feeData = new FormData(event.currentTarget);
    const cartValue = feeData.get("cartValue");
    const numberOfItems = feeData.get("numberOfItems");
    const deliveryDistance = feeData.get("deliveryDistance");
    const dateAndTime = feeData.get("dateAndTime");

    const fieldData: calculatorProps = {
      cartValue: Number(cartValue),
      numberOfItems: Number(numberOfItems),
      deliveryDistance: Number(deliveryDistance),
      dateAndTime: dateAndTime ? dateAndTime.toString() : "",
    };

    const [calculatedFee, errors] = calculator(fieldData);
    console.log(calculatedFee, errors);
    setFee(calculatedFee as number);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Cart Value in €: </label>
        <input
          className="form-control"
          type="text"
          name="cartValue"
          data-test-id="cartValue"
          placeholder="€ 0.00"
        />
        <label>Number of items in cart: </label>
        <input
          className="form-control"
          type="text"
          name="numberOfItems"
          data-test-id="numberOfItems"
          placeholder="3"
        />
        <label>Delivery distance in meters </label>
        <input
          className="form-control"
          type="number"
          name="deliveryDistance"
          data-test-id="deliveryDistance"
          placeholder="1... meters"
        />
        <label>Order date & time: </label>
        <input
          className="form-control-date"
          type="datetime-local"
          name="dateAndTime"
          data-test-id="dateAndTime"
        />
        <button type="submit">Calculate fee</button>
      </form>
      {formIsSubmitted && <p className="fee">The fee is € {fee}</p>}
    </div>
  );
};

export default CalculatorForm;
