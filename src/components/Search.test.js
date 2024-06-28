import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';
import '@testing-library/jest-dom/extend-expect';

describe('Search', () => {
  it('calls handleSearch function on input change', () => {
    const handleSearch = jest.fn();
    render(<Search handleSearch={handleSearch} />);

    const searchInput = screen.getByPlaceholderText('Search products...');
    userEvent.type(searchInput, 'Product 1');

    expect(handleSearch).toHaveBeenCalled();
    expect(handleSearch).toHaveBeenCalledWith('Product 1');
  });
});
