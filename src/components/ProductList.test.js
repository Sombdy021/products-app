import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ProductList from './ProductList';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

const products = [
  { id: 1, title: 'Product 1' },
  { id: 2, title: 'Product 2' },
  { id: 3, title: 'Product 3' },
  { id: 4, title: 'Product 4' },
  { id: 5, title: 'Product 5' },
  { id: 6, title: 'Product 6' },
  { id: 7, title: 'Product 7' },
  { id: 8, title: 'Product 8' },
  { id: 9, title: 'Product 9' },
  { id: 10, title: 'Product 10' },
  { id: 11, title: 'Product 11' },
  { id: 12, title: 'Product 12' }
];

describe('ProductList', () => {
  it('fetches and displays products', async () => {
    axios.get.mockResolvedValue({ data: { products } });

    render(<ProductList />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    products.slice(0, 10).forEach(product => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
    });
  });

  it('paginates products', async () => {
    axios.get.mockResolvedValue({ data: { products } });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    const nextPage = screen.getByText('2');
    userEvent.click(nextPage);

    await waitFor(() => {
      expect(screen.getByText('Product 11')).toBeInTheDocument();
    });
  });

  it('filters products based on search query', async () => {
    axios.get.mockResolvedValue({ data: { products } });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search products...');
    userEvent.type(searchInput, 'Product 2');

    await waitFor(() => {
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });

    products
      .filter(product => product.title.includes('Product 2'))
      .forEach(product => {
        expect(screen.getByText(product.title)).toBeInTheDocument();
      });
  });
});
