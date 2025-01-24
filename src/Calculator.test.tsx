import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calculator } from './Calculator';

describe('Calculator', () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  describe('CalculatorInputs', () => {
    it('it should render the bill input', async () => {
      const billInput = screen.getByLabelText('Bill');
      await userEvent.type(billInput, '100.25');
      expect(billInput).toHaveValue(100.25);
    });
    it('should render the different tip percentages', () => {
      const percentages = ['5%', '10%', '15%', '25%', '50%', 'Custom'];
      const tipPercentages = screen.getAllByRole('radio');
      percentages.forEach((percentage, index) => {
        expect(tipPercentages[index].nextSibling).toHaveTextContent(percentage);
      });
    });
    it('should select 15% tip percentage as default', () => {
      const defaultChecked = '15';
      const tipPercentages = screen.getAllByRole('radio');

      tipPercentages.forEach((percentage) => {
        const percentageInput = percentage as HTMLInputElement;
        if (percentageInput.value === defaultChecked) {
          expect(percentageInput).toBeChecked();
          expect(percentageInput.classList.contains('active')).toBe(true);
        } else {
          expect(percentageInput).not.toBeChecked();
          expect(percentageInput.classList.contains('active')).not.toBe(true);
        }
      });
    });
    it('when clicked it should change the tip percentage', async () => {
      const defaultChecked = screen.getByLabelText('15%');
      const tenPercentTip = screen.getByLabelText('10%');

      await userEvent.click(tenPercentTip);
      expect(tenPercentTip).toBeChecked();

      expect(tenPercentTip.classList.contains('active')).toBe(true);
      expect(defaultChecked.classList.contains('active')).not.toBe(true);
    });
    it('should render a number of people input', async () => {
      const numberOfPeopleInput = screen.getByLabelText('Number of People');
      await userEvent.clear(numberOfPeopleInput);
      await userEvent.type(numberOfPeopleInput, '2');
      expect(numberOfPeopleInput).toHaveValue(2);
    });
    it('number of people must be greater then 1', async () => {
      const numberOfPeopleInput = screen.getByLabelText('Number of People');
      await userEvent.clear(numberOfPeopleInput);
      await userEvent.type(numberOfPeopleInput, '0');
      expect(screen.getByText("Can't be zero")).toBeInTheDocument();
    });
  });

  describe('CalculatorOutput', () => {
    it('it should render the tip amount / person output', async () => {
      const tipAmount = screen.getByText('Tip Amount');
      expect(tipAmount).toBeInTheDocument();
    });
    it('it should render the total price / person output', async () => {
      const totalAmount = screen.getByText('Total');
      expect(totalAmount).toBeInTheDocument();
    });

    it('should calculate the tip amount and total amount per person', async () => {
      const billInput = screen.getByLabelText('Bill');
      await userEvent.type(billInput, '142.55');

      const tipInput = screen.getByLabelText('15%');
      await userEvent.click(tipInput);

      const numberOfPeopleInput = screen.getByLabelText('Number of People');
      await userEvent.clear(numberOfPeopleInput);
      await userEvent.type(numberOfPeopleInput, '5');

      const tipAmount = screen.getByText('Tip Amount');
      const totalAmount = screen.getByText('Total');

      expect(tipAmount.nextSibling).toHaveTextContent('$4.28');
      expect(totalAmount.nextSibling).toHaveTextContent('$32.79');
    });

    it('should reset the values when clicked on the reset button', async () => {
      const billInput = screen.getByLabelText('Bill');
      await userEvent.type(billInput, '142.55');

      const tipInput = screen.getByLabelText('15%');
      await userEvent.click(tipInput);

      const numberOfPeopleInput = screen.getByLabelText('Number of People');
      await userEvent.clear(numberOfPeopleInput);
      await userEvent.type(numberOfPeopleInput, '5');

      await userEvent.click(screen.getByText(/reset/i));

      expect(billInput).toHaveValue(0);
      expect(tipInput).toBeChecked();
      expect(numberOfPeopleInput).toHaveValue(1);
    });
  });
});
