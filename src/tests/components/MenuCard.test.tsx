import { render, screen } from '@testing-library/react';
import MenuCard from '../../components/MenuCard';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '/',
    };
  },
}));

describe('MenuCard component', () => {
  it('renders correctly', () => {
    render(
      <MenuCard icon="attach_money" title="Financeiro" link="/menu" />,
    );

    expect(screen.getByText('Financeiro')).toBeInTheDocument();
  });
});
