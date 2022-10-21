import { render, screen } from '@testing-library/react'
import { TextInput } from '../../components/TextInput';
global.M = require('materialize-css');

jest.mock('firebase/auth')

describe('TextInput component', () => {
  it('renders correctly', () => {

  render(
      <TextInput id="teste" label="label teste" icon="email"/>,
    );

    expect(screen.getByLabelText('label teste')).toBeInTheDocument();
    expect(screen.getByText('email')).toBeInTheDocument();
  });
})