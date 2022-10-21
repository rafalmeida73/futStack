import { render, screen } from '@testing-library/react'
import Header from '../../components/Header';
global.M = require('materialize-css');

jest.mock('firebase/auth')

describe('Header component', () => {

  it('renders correctly', () => {

    render(<Header />)

    expect(screen.queryAllByText('Início'));
    expect(screen.queryAllByText('Jogos'));
    expect(screen.queryAllByText('Login'));
    expect(screen.queryAllByText('Registrar'));
  })
})