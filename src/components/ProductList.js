import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import Search from './Search';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://dummyjson.com/products');  // Выполняем HTTP-запрос для получения продуктов
        setProducts(res.data.products);  // Устанавливаем состояние products
        setFilteredProducts(res.data.products);  // Устанавливаем состояние filteredProducts
      } catch (error) {
        console.error('Error fetching products:', error);  // Обрабатываем возможные ошибки
      } finally {
        setLoading(false);  // Устанавливаем состояние загрузки в false
      }
    };

    fetchProducts();  // Вызываем функцию получения продуктов
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleSearch = query => {
    if (query === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
    setCurrentPage(1);
  };

  return (
    <div>
      <Search handleSearch={handleSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {currentProducts.map(product => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      )}
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default ProductList;
