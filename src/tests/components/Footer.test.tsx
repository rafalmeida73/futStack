import { render, screen } from '@testing-library/react'
import { Footer } from '../../components/Footer';
global.M = require('materialize-css');

jest.mock('firebase/auth')

describe('Footer component', () => {

  it('renders correctly', () => {

    render(<Footer />)

    expect(screen.getByText('Início').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Jogos').closest('a')).toHaveAttribute('href', '/games');
    expect(screen.getByText('Login').closest('a')).toHaveAttribute('href', '/login');
    expect(screen.getByText('Registrar').closest('a')).toHaveAttribute('href', '/register');
  })
})