import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';
import '@testing-library/jest-dom/extend-expect';

describe('Pagination', () => {
  it('renders pagination links', () => {
    render(<Pagination productsPerPage={10} totalProducts={100} paginate={jest.fn()} />);

    for (let i = 1; i <= 10; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('calls paginate function when page number is clicked', () => {
    const paginate = jest.fn();
    render(<Pagination productsPerPage={10} totalProducts={100} paginate={paginate} />);

    const pageLink = screen.getByText('2');
    userEvent.click(pageLink);

    expect(paginate).toHaveBeenCalledWith(2);
  });
});
