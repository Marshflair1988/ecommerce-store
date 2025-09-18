import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import styled from 'styled-components';
import { Product as ProductType, ApiResponse } from '../types';

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 0;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  background-color: #f8f9fa;
  transition: transform 0.4s ease;
  
  &:not([src]), &[src=""] {
    display: none;
  }
  
  &:hover {
    transform: scale(1.02);
  }
`;

const ProductImagePlaceholder = styled.div`
  width: 100%;
  height: 500px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 1.2rem;
  border: 2px dashed #dee2e6;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProductTitle = styled.h1`
  color: #2c3e50;
  margin: 0;
  font-size: 2.5rem;
`;

const ProductDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
  font-size: 1.1rem;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const CurrentPrice = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: #27ae60;
`;

const OriginalPrice = styled.span`
  font-size: 1.5rem;
  color: #7f8c8d;
  text-decoration: line-through;
`;

const DiscountBadge = styled.span`
  background-color: #e74c3c;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
`;

const AddToCartButton = styled.button`
  background: linear-gradient(135deg,rgb(42, 226, 112) 0%, #7f8c8d 100%);
  color: white;
  border: none;
  padding: 1.25rem 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(46, 204, 113, 0.3);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(46, 204, 113, 0.4);
  }
  
  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ReviewsSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e1e8ed;
`;

const ReviewsTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const ReviewItem = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ReviewAuthor = styled.div`
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const ReviewRating = styled.div`
  color: #f39c12;
  margin-bottom: 0.5rem;
`;

const ReviewComment = styled.div`
  color: #7f8c8d;
  line-height: 1.5;
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

const BackButton = styled.button`
  background: linear-gradient(135deg,rgb(42, 226, 112) 0%, #7f8c8d 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(149, 165, 166, 0.3);
  }
`;

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const fetchProduct = useCallback(async (): Promise<void> => {
    try {
      console.log('🚀 Fetching product details for ID:', id);
      setLoading(true);
      const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data: ApiResponse<ProductType> = await response.json();
      console.log('📦 Product fetched successfully:', { 
        id: data.data.id, 
        title: data.data.title, 
        price: data.data.discountedPrice || data.data.price,
        hasDiscount: data.data.discountedPrice !== data.data.price
      });
      setProduct(data.data);
    } catch (err) {
      console.error('❌ Error fetching product:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      console.log('✅ Product loading completed');
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = (): void => {
    if (!product) return;
    
    console.log('🛒 Adding product to cart from product page:', { 
      id: product.id, 
      title: product.title, 
      price: product.discountedPrice || product.price 
    });
    addToCart(product);
    
    addToast({
      type: 'success',
      message: `${product.title} added to cart!`,
      duration: 3000
    });
  };

  const handleImageError = (): void => {
    setImageError(true);
  };

  const hasDiscount = product && product.discountedPrice < product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  if (loading) {
    return (
      <ProductContainer>
        <LoadingMessage>Loading product...</LoadingMessage>
      </ProductContainer>
    );
  }

  if (error || !product) {
    return (
      <ProductContainer>
        <ErrorMessage>Error: {error || 'Product not found'}</ErrorMessage>
      </ProductContainer>
    );
  }

  return (
    <ProductContainer>
      <BackButton onClick={() => navigate('/')}>
        ← Back to Store
      </BackButton>
      
      <ProductGrid>
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
        
        <ProductInfo>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductDescription>{product.description}</ProductDescription>
          
          <PriceSection>
            <CurrentPrice>${product.discountedPrice}</CurrentPrice>
            {hasDiscount && (
              <>
                <OriginalPrice>${product.price}</OriginalPrice>
                <DiscountBadge>-{discountPercentage}%</DiscountBadge>
              </>
            )}
          </PriceSection>
          
          <AddToCartButton onClick={handleAddToCart}>
            Add to Cart
          </AddToCartButton>
        </ProductInfo>
      </ProductGrid>

      {product.reviews && product.reviews.length > 0 && (
        <ReviewsSection>
          <ReviewsTitle>Customer Reviews</ReviewsTitle>
          {product.reviews.map((review, index) => (
            <ReviewItem key={index}>
              <ReviewAuthor>{review.username}</ReviewAuthor>
              <ReviewRating>
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </ReviewRating>
              <ReviewComment>{review.comment}</ReviewComment>
            </ReviewItem>
          ))}
        </ReviewsSection>
      )}
    </ProductContainer>
  );
};

export default ProductPage;
