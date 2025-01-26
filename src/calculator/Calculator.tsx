import { useEffect, useState } from 'react';
import { calculate } from '../helper';

export function Calculator() {
  const percentages = [5, 10, 15, 25, 50];
  const [bill, setBill] = useState(0);
  const [checked, setChecked] = useState(percentages[2]);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const [isCustom, setIsCustom] = useState(false);

  const [tipPerPerson, setTipPerPerson] = useState(0);
  const [amountPerPerson, setAmountPerPerson] = useState(0);

  const resetValues = () => {
    setBill(0);
    setNumberOfPeople(1);
    setChecked(percentages[2]);
    setIsCustom(false);
  };

  useEffect(() => {
    const [tipPerPerson, amountPerPerson] = calculate(bill, numberOfPeople, Number(checked));
    setTipPerPerson(tipPerPerson);
    setAmountPerPerson(amountPerPerson);
  }, [bill, numberOfPeople, checked]);
  return (
    <div className='bg-white py-8 sm:py-11 px-6 sm:px-0 sm:pl-12 sm:pr-8 rounded-tr-3xl rounded-tl-2xl sm:rounded-3xl flex flex-col gap-5 max-w-full sm:max-w-[920px] h-full'>
      <form className='flex flex-col gap-8 sm:gap-10 flex-1 px-2'>
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
            className='bg-[#F3F9FA] py-2 px-4 text-[#00474B] font-bold text-2xl text-right rounded-sm'
            onChange={(e) => {
              setBill(Number(e.target.value));
            }}
          />
        </div>

        <div className='flex flex-col flex-1 text-left gap-4'>
          <label className='text-[#5E7A7D] font-bold text-sm'>Select Tip %</label>

          <div className='flex flex-wrap items-center gap-4'>
            {percentages.map((percentage) => {
              return (
                <div
                  role='radio'
                  key={percentage}
                  id={`${percentage}%-tip`}
                  aria-checked={checked === percentage}
                  className={`flex items-center justify-center basis-[calc(50%-8px)] sm:w-[110px] h-12 font-bold text-2xl rounded-md hover:cursor-pointer ${
                    checked === percentage ? 'active bg-[#26C2AE] text-[#00474B]' : 'bg-[#00474B] text-white'
                  }`}
                  onClick={() => {
                    setChecked(percentage);
                    setIsCustom(false);
                  }}
                >
                  <p>{percentage}%</p>
                </div>
              );
            })}

            {isCustom ? (
              <input
                type='number'
                className={`flex items-center justify-center flex-1 rounded-md w-[110px] h-12 font-bold text-2xl text-right px-3 py-2 hover:cursor-pointer bg-[#F3F9FA] text-[#547878]`}
                onChange={(e) => {
                  setChecked(Number(e.target.value));
                }}
              />
            ) : (
              <div
                role='radio'
                key='custom'
                id='custom%-tip'
                onClick={() => setIsCustom(!isCustom)}
                className='flex items-center justify-center flex-1 w-[110px] h-12 font-bold text-2xl px-3 py-2 hover:cursor-pointer bg-[#F3F9FA] text-[#547878]'
              >
                <p>Custom</p>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-col gap-2 text-left'>
          <label
            htmlFor='numberOfPeople'
            className='text-[#5E7A7D] font-bold text-sm rounded-sm'
          >
            Number of People
          </label>
          {numberOfPeople === 0 && <p>Can't be zero</p>}
          <input
            id='numberOfPeople'
            type='number'
            aria-label='Number of People'
            className='bg-[#F3F9FA] py-2 p-4 text-[#00474B] font-bold text-2xl text-right'
            value={numberOfPeople}
            onChange={(e) => {
              setNumberOfPeople(Number(e.target.value));
            }}
          />
        </div>
      </form>
      <div
        className='flex flex-col gap-5 sm:gap-10 flex-1 bg-[#00474B] rounded-2xl p-6 sm:p-10'
        data-testid='tipAmount'
      >
        <div className='flex gap-2 text-white justify-between font-bold'>
          <div className='flex flex-col gap-1 text-left'>
            <p className='text-base'>Tip Amount</p>
            <span className='text-sm text-[#7F9D9F]'>/person</span>
          </div>
          <h2 className='text-3xl sm:text-5xl text-[#26C2AE] font-bold'>${tipPerPerson.toFixed(2)}</h2>
        </div>

        <div
          className='flex gap-2 text-white text-left justify-between font-bold'
          data-testid='totalAmount'
        >
          <div className='flex flex-col gap-1'>
            <p className='text-base'>Total Amount</p>
            <span className='text-sm text-[#7F9D9F]'>/person</span>
          </div>
          <h2 className='text-3xl sm:text-5xl text-[#26C2AE] font-bold'>${amountPerPerson.toFixed(2)}</h2>
        </div>

        <button
          className='mt-auto bg-[#26C2AE] rounded-md font-bold text-[#00474B] text-[20px] uppercase py-2 hover:cursor-pointer'
          onClick={resetValues}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
