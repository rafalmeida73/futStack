import { render, screen } from '@testing-library/react'
import LoadingButton from '../../components/LoadingButton';
global.M = require('materialize-css');

describe('LoadingButton component', () => {
  it('renders correctly', () => {
    render(
      <LoadingButton  title="Hello world" loading={false} />,
    );

    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });
})