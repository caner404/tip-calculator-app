import { useEffect, useState } from 'react';
import { calculate } from '../helper';

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
    <div className='bg-white py-11 pl-12 pr-8 rounded-3xl flex gap-5 max-w-[920px]'>
      <form className='flex flex-col gap-10 flex-1'>
        <div className='flex flex-col gap-2 text-left'>
          <label
            htmlFor='billInput'
            className='text-[#5E7A7D] font-bold text-sm'
          >
            Bill
          </label>
          <input
            id='billInput'
            type='number'
            aria-label='Bill'
            value={bill}
            className='bg-[#F3F9FA] p-4 text-[#00474B] font-bold text-2xl text-right'
            onChange={(e) => {
              setBill(Number(e.target.value));
            }}
          />
        </div>

        <div className='flex flex-col flex-1 text-left gap-2'>
          <label className='text-[#5E7A7D] font-bold text-sm'>Select Tip %</label>

          <div className='flex flex-wrap items-center gap-4'>
            {percentages.map((percentage) => {
              return (
                <div
                  role='radio'
                  key={percentage}
                  id={`${percentage}%-tip`}
                  aria-checked={checked === percentage}
                  className={`rounded-md flex items-center justify-center w-[110px] h-12 font-bold text-2xl px-3 py-2 ${
                    checked === percentage ? 'active bg-[#26C2AE] text-[#00474B]' : 'bg-[#00474B] text-white'
                  }`}
                  onClick={() => setChecked(percentage)}
                >
                  <p>{percentage}%</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className='flex flex-col gap-2 text-left'>
          <label
            htmlFor='numberOfPeople'
            className='text-[#5E7A7D] font-bold text-sm'
          >
            Number of People
          </label>
          {numberOfPeople === 0 && <p>Can't be zero</p>}
          <input
            id='numberOfPeople'
            type='number'
            aria-label='Number of People'
            className='bg-[#F3F9FA] p-4 text-[#00474B] font-bold text-2xl text-right'
            value={numberOfPeople}
            onChange={(e) => {
              setNumberOfPeople(Number(e.target.value));
            }}
          />
        </div>
      </form>
      <div
        className='flex flex-col gap-10 flex-1 bg-[#00474B] rounded-2xl p-10'
        data-testid='tipAmount'
      >
        <div className='flex gap-2 text-white justify-between'>
          <div className='flex flex-col gap-1 text-left'>
            <p className='text-white text-base'>Tip Amount</p>
            <span className='text-sm text-[#7F9D9F] font-bold '>/person</span>
          </div>
          <h2 className='text-5xl text-[#26C2AE] font-bold'>${tipPerPerson.toFixed(2)}</h2>
        </div>

        <div
          className='flex gap-2 text-white text-left justify-between'
          data-testid='totalAmount'
        >
          <div className='flex flex-col gap-1'>
            <p className='text-white text-base'>Total Amount</p>
            <span className='text-sm text-[#7F9D9F] font-bold '>/person</span>
          </div>
          <h2 className='text-5xl text-[#26C2AE] font-bold'>${amountPerPerson.toFixed(2)}</h2>
        </div>

        <button
          className='mt-auto bg-[#26C2AE] rounded-md font-bold text-[#00474B] text-[20px] uppercase py-2'
          onClick={resetValues}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
