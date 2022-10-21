import { render, screen } from '@testing-library/react'
import GoogleButton from '../../components/GoogleButton';
global.M = require('materialize-css');

jest.mock('firebase/auth')

describe('GoogleButton component', () => {
  it('renders correctly', async () => {

    const { getByAltText } = await render(<GoogleButton />);

    const image = getByAltText("Logo do google (Letra G)");

    expect(image).toHaveAttribute('src', '/google.svg')
  })
})