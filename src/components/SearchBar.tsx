import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Product as ProductType, SearchBarProps } from '../types';

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 3rem auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid #e1e8ed;
  border-radius: 50px;
  font-size: 1.1rem;
  outline: none;
  transition: all 0.3s ease;
  background: white;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15);
    transform: translateY(-2px);
  }
  
  &::placeholder {
    color: #95a5a6;
    font-weight: 400;
  }
`;

const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: none;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 0.5rem;
  backdrop-filter: blur(10px);
`;

const SearchResultItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #2c3e50;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const ResultImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;
  background-color: #f8f9fa;
  
  &:not([src]), &[src=""] {
    display: none;
  }
`;

const ResultImagePlaceholder = styled.div`
  width: 40px;
  height: 40px;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 0.7rem;
  border: 1px dashed #dee2e6;
`;

const ResultInfo = styled.div`
  flex: 1;
`;

const ResultTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const ResultPrice = styled.div`
  font-size: 0.9rem;
  color: #27ae60;
  font-weight: bold;
`;

const SearchBar: React.FC<SearchBarProps> = ({ products, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts([]);
      setShowResults(false);
      return;
    }

    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredProducts(filtered);
    setShowResults(filtered.length > 0);
  }, [searchTerm, products]);

  // Separate useEffect to call onSearch when filteredProducts change
  useEffect(() => {
    onSearch(filteredProducts);
  }, [filteredProducts, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleResultClick = (): void => {
    setSearchTerm('');
    setShowResults(false);
  };

  return (
    <SearchContainer ref={searchRef}>
      <SearchInput
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {showResults && (
        <SearchResults>
          {filteredProducts.map(product => (
            <SearchResultItem
              key={product.id}
              to={`/product/${product.id}`}
              onClick={handleResultClick}
            >
              {product.image?.url ? (
                <ResultImage src={product.image.url} alt={product.image.alt || product.title} />
              ) : (
                <ResultImagePlaceholder>
                  No Img
                </ResultImagePlaceholder>
              )}
              <ResultInfo>
                <ResultTitle>{product.title}</ResultTitle>
                <ResultPrice>${product.discountedPrice}</ResultPrice>
              </ResultInfo>
            </SearchResultItem>
          ))}
        </SearchResults>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
