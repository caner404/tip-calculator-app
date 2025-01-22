import { render } from '@testing-library/react';
import { Calculator } from './Calculator';

describe('Calculator', () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  test('renders', () => {
    expect(document.body).toHaveTextContent('Calculator');
  });
});
