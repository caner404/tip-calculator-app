import { useEffect, useState } from 'react';
import { calculate } from './helper';

export function Calculator() {
  const percentages = ['5', '10', '15', '25', '50', 'Custom'];
  const [bill, setBill] = useState(0);
  const [checked, setChecked] = useState(percentages[2]);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const [tipPerPerson, setTipPerPerson] = useState(0);
  const [amountPerPerson, setAmountPerPerson] = useState(0);

  const resetValues = () => {
    setBill(0);
    setNumberOfPeople(1);
    setChecked(percentages[2]);
  };

  useEffect(() => {
    const [tipPerPerson, amountPerPerson] = calculate(bill, numberOfPeople, Number(checked));
    setTipPerPerson(tipPerPerson);
    setAmountPerPerson(amountPerPerson);
  }, [bill, numberOfPeople, checked]);
  return (
    <div>
      <form>
        <label htmlFor='billInput'>Bill</label>
        <input
          id='billInput'
          type='number'
          aria-label='Bill'
          value={bill}
          onChange={(e) => {
            setBill(Number(e.target.value));
          }}
        />
        <label htmlFor='billInput'>Select Tip %</label>

        {percentages.map((percentage) => {
          return (
            <div key={percentage}>
              <input
                type='radio'
                id={`${percentage}%-tip`}
                value={percentage}
                aria-checked={checked === percentage}
                checked={checked === percentage}
                className={checked === percentage ? 'active' : ''}
                onChange={(e) => {
                  setChecked(e.target.value);
                }}
              />
              <label htmlFor={`${percentage}%-tip`}>{percentage}%</label>
            </div>
          );
        })}
        <label htmlFor='numberOfPeople'>Number of People</label>
        {numberOfPeople === 0 && <p>Can't be zero</p>}
        <input
          id='numberOfPeople'
          type='number'
          aria-label='Number of People'
          value={numberOfPeople}
          onChange={(e) => {
            setNumberOfPeople(Number(e.target.value));
          }}
        />
      </form>
      <div>
        <div>
          <p>Tip Amount </p>
          <h2>${tipPerPerson.toFixed(2)}</h2>
        </div>
        <div>
          <p>Total </p>
          <h2>${amountPerPerson.toFixed(2)}</h2>
        </div>

        <button onClick={resetValues}>Reset</button>
      </div>
    </div>
  );
}
