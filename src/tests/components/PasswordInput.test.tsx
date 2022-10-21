import { render, screen } from '@testing-library/react'
import { PasswordInput } from '../../components/PasswordInput';
global.M = require('materialize-css');

jest.mock('firebase/auth')

describe('PasswordInput component', () => {
  it('renders correctly', () => {

    render(
      <PasswordInput id="teste" label="label teste" />,
    );

    expect(screen.getByLabelText('label teste')).toBeInTheDocument();
  });
})