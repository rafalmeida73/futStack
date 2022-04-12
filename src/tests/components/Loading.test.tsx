import { render, screen } from '@testing-library/react'
import Loading from '../../components/Loading';
global.M = require('materialize-css');

jest.mock('firebase/auth')

describe('Loading component', () => {
  it('Renders correctly ', () => {
    const { container } = render(<Loading />)
    expect(container.getElementsByClassName('circle').length).toBe(3);
  });
})