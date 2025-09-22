import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Product as ProductType } from '../types';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

const ProductCard = styled.div`
  border: none;
  border-radius: 16px;
  padding: 1.5rem;
  background: white;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.12);
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  background-color: #f8f9fa;
  transition: transform 0.4s ease;
  
  &:not([src]), &[src=""] {
    display: none;
  }
  
  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProductImagePlaceholder = styled.div`
  width: 100%;
  height: 220px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 0.9rem;
  border: 2px dashed #dee2e6;
`;

const ProductTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  color: #1a1a1a;
  font-weight: 600;
  line-height: 1.4;
  min-height: 2.8rem;
  display: flex;
  align-items: center;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const CurrentPrice = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: #2ecc71;
  font-family: 'Inter', sans-serif;
`;

const OriginalPrice = styled.span`
  font-size: 1.1rem;
  color: #95a5a6;
  text-decoration: line-through;
  font-weight: 500;
`;

const DiscountBadge = styled.span`
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(238, 90, 36, 0.3);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const ViewButton = styled(Link)`
  flex: 1;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  text-align: center;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    
    &::before {
      left: 100%;
    }
  }
`;

const AddToCartButton = styled.button`
  width: 50px;
  padding: 1rem;
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
  
  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 25px rgba(46, 204, 113, 0.4);
    background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  }
  
  &:active {
    transform: translateY(0) scale(0.95);
  }
`;

interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const hasDiscount = product.discountedPrice < product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  const handleImageError = (): void => {
    setImageError(true);
  };

  const handleAddToCart = (): void => {
    addToCart(product);
    addToast({
      type: 'success',
      message: `${product.title} added to cart!`,
      duration: 3000
    });
  };

  return (
    <ProductCard>
      {product.image?.url && !imageError ? (
        <ProductImage 
          src={product.image.url} 
          alt={product.image.alt || product.title}
          onError={handleImageError}
        />
      ) : (
        <ProductImagePlaceholder>
          No Image Available
        </ProductImagePlaceholder>
      )}
      <ProductTitle>{product.title}</ProductTitle>
      <ProductPrice>
        <CurrentPrice>${product.discountedPrice}</CurrentPrice>
        {hasDiscount && (
          <>
            <OriginalPrice>${product.price}</OriginalPrice>
            <DiscountBadge>-{discountPercentage}%</DiscountBadge>
          </>
        )}
      </ProductPrice>
      <ButtonContainer>
        <ViewButton to={`/product/${product.id}`}>
          View Product
        </ViewButton>
        <AddToCartButton onClick={handleAddToCart} title="Add to cart">
          +
        </AddToCartButton>
      </ButtonContainer>
    </ProductCard>
  );
};

export default Product;
