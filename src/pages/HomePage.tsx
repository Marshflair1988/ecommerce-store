import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Product from '../components/Product';
import SearchBar from '../components/SearchBar';
import { Product as ProductType, SortOption } from '../types';

const HomeContainer = styled.div`
  padding: 2rem 0;
`;

const PageTitle = styled.h1`
  text-align: center;
  color: #1a1a1a;
  margin-bottom: 1rem;
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
`;

const PageSubtitle = styled.p`
  text-align: center;
  color: #6c757d;
  margin-bottom: 3rem;
  font-size: 1.2rem;
  font-weight: 400;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #7f8c8d;
  padding: 2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #e74c3c;
  padding: 2rem;
  font-size: 1.2rem;
`;

const SortContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SortSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const SortLabel = styled.label`
  font-weight: 500;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch('https://v2.api.noroff.dev/online-shop');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.data || []);
      setFilteredProducts(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const sortProducts = useCallback((productsToSort: ProductType[], sortBy: SortOption): ProductType[] => {
    return [...productsToSort].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'price-asc':
          return (a.discountedPrice || a.price) - (b.discountedPrice || b.price);
        case 'price-desc':
          return (b.discountedPrice || b.price) - (a.discountedPrice || a.price);
        default:
          return 0;
      }
    });
  }, []);

  const handleSearch = useCallback((searchResults: ProductType[]) => {
    console.log('🔍 Search results received:', { 
      count: searchResults.length, 
      results: searchResults.map(p => ({ id: p.id, title: p.title }))
    });
    if (searchResults.length === 0) {
      const sortedProducts = sortProducts(products, sortOption);
      setFilteredProducts(sortedProducts);
      console.log('🔄 Showing all products (no search results)');
    } else {
      const sortedResults = sortProducts(searchResults, sortOption);
      setFilteredProducts(sortedResults);
      console.log('✅ Filtering products based on search');
    }
  }, [products, sortOption, sortProducts]);

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOption = e.target.value as SortOption;
    setSortOption(newSortOption);
    const sortedProducts = sortProducts(filteredProducts, newSortOption);
    setFilteredProducts(sortedProducts);
    console.log('🔄 Sort option changed to:', newSortOption);
  }, [filteredProducts, sortProducts]);

  if (loading) {
    return (
      <HomeContainer>
        <LoadingMessage>Loading products...</LoadingMessage>
      </HomeContainer>
    );
  }

  if (error) {
    return (
      <HomeContainer>
        <ErrorMessage>Error: {error}</ErrorMessage>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer>
      <PageTitle>Welcome to Our Store</PageTitle>
      <PageSubtitle>Discover amazing products with unbeatable prices and exceptional quality</PageSubtitle>
      <SearchBar products={products} onSearch={handleSearch} />
      <SortContainer>
        <SortLabel htmlFor="sort-select">
          Sort by:
          <SortSelect
            id="sort-select"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </SortSelect>
        </SortLabel>
      </SortContainer>
      <ProductsGrid>
        {filteredProducts.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsGrid>
    </HomeContainer>
  );
};

export default HomePage;
