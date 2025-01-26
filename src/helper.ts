export function calculate(bill: number, numberOfPerson: number, tipPercentage: number) {
  const tipAmountPerPerson = (bill * (tipPercentage / 100)) / numberOfPerson;
  const totalAmountPerPerson = bill / numberOfPerson + tipAmountPerPerson;

  return [tipAmountPerPerson, totalAmountPerPerson];
}
