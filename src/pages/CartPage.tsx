import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import styled from "styled-components";

const CartContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 0;
`;

const PageTitle = styled.h1`
  color: #1a1a1a;
  margin-bottom: 3rem;
  text-align: center;
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr auto auto;
  gap: 1.5rem;
  align-items: center;
  padding: 1.5rem;
  border: none;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  background: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    grid-template-columns: 100px 1fr;
    gap: 1rem;
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  background-color: #f8f9fa;

  &:not([src]),
  &[src=""] {
    display: none;
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const ItemImagePlaceholder = styled.div`
  width: 100px;
  height: 100px;
  background-color: #f8f9fa;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 0.8rem;
  border: 1px dashed #dee2e6;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemTitle = styled.h3`
  margin: 0;
  color: #2c3e50;
  font-size: 1.1rem;
`;

const ItemPrice = styled.div`
  color: #27ae60;
  font-weight: bold;
  font-size: 1.1rem;
`;

const ItemSavings = styled.div`
  color: #27ae60;
  font-size: 0.9rem;
  font-weight: 600;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    grid-column: 2;
    justify-self: start;
  }
`;

const QuantityButton = styled.button`
  background-color: #95a5a6;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;

  &:hover {
    background-color: #7f8c8d;
  }
`;

const QuantityInput = styled.input`
  width: 50px;
  text-align: center;
  border: 1px solid #e1e8ed;
  border-radius: 4px;
  padding: 0.25rem;
`;

const RemoveButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }

  @media (max-width: 768px) {
    grid-column: 2;
    justify-self: end;
  }
`;

const CartSummary = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 3rem;
  border-radius: 20px;
  margin-top: 3rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const TotalAmount = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 2rem;
  font-family: "Inter", sans-serif;
`;

const SavingsAmount = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #27ae60;
  margin-top: -1rem;
  margin-bottom: 1.5rem;
`;

const CheckoutButton = styled.button`
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
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

const ContinueShoppingButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #7f8c8d;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  margin: 2rem 0;
`;

const EmptyCartTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const EmptyCartMessage = styled.p`
  font-size: 1.3rem;
  color: #6c757d;
  margin-bottom: 2.5rem;
  font-weight: 500;
  line-height: 1.6;
`;

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { addToast } = useToast();

  const handleQuantityChange = (
    productId: string,
    newQuantity: number,
  ): void => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      addToast({
        type: "info",
        message: "Item removed from cart",
        duration: 3000,
      });
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string, productTitle: string): void => {
    removeFromCart(productId);
    addToast({
      type: "info",
      message: `${productTitle} removed from cart`,
      duration: 3000,
    });
  };

  const handleCheckout = (): void => {
    addToast({
      type: "success",
      message: "Order placed successfully! Thank you for your purchase.",
      duration: 5000,
    });
    navigate("/checkout-success");
  };

  if (items.length === 0) {
    return (
      <CartContainer>
        <EmptyCart>
          <EmptyCartTitle>Your cart is empty</EmptyCartTitle>
          <EmptyCartMessage>Add some products to get started!</EmptyCartMessage>
          <ContinueShoppingButton onClick={() => navigate("/")}>
            Continue Shopping
          </ContinueShoppingButton>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <PageTitle>Shopping Cart</PageTitle>

      {items.map((item) => (
        <CartItem key={item.id}>
          {item.image?.url ? (
            <ItemImage
              src={item.image.url}
              alt={item.image.alt || item.title}
            />
          ) : (
            <ItemImagePlaceholder>No Img</ItemImagePlaceholder>
          )}

          <ItemInfo>
            <ItemTitle>{item.title}</ItemTitle>
            <ItemPrice>${item.discountedPrice || item.price}</ItemPrice>
            {(() => {
              const original = item.price;
              const discounted = item.discountedPrice ?? item.price;
              const diff = Math.max(0, original - discounted);
              const lineSavings = diff * item.quantity;
              return lineSavings > 0 ? (
                <ItemSavings>You save: ${lineSavings.toFixed(2)}</ItemSavings>
              ) : null;
            })()}
          </ItemInfo>

          <QuantityControl>
            <QuantityButton
              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
            >
              -
            </QuantityButton>
            <QuantityInput
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(item.id, parseInt(e.target.value) || 1)
              }
            />
            <QuantityButton
              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
            >
              +
            </QuantityButton>
          </QuantityControl>

          <RemoveButton onClick={() => handleRemoveItem(item.id, item.title)}>
            Remove
          </RemoveButton>
        </CartItem>
      ))}

      <CartSummary>
        {(() => {
          const savingsTotal = items.reduce((sum, item) => {
            const original = item.price;
            const discounted = item.discountedPrice ?? item.price;
            const diff = Math.max(0, original - discounted);
            return sum + diff * item.quantity;
          }, 0);
          return (
            <>
              <TotalAmount>Total: ${getCartTotal().toFixed(2)}</TotalAmount>
              {savingsTotal > 0 && (
                <SavingsAmount>
                  You save: ${savingsTotal.toFixed(2)}
                </SavingsAmount>
              )}
            </>
          );
        })()}
        <ButtonContainer>
          <CheckoutButton onClick={handleCheckout}>
            Proceed to Checkout
          </CheckoutButton>
          <ContinueShoppingButton onClick={() => navigate("/")}>
            Continue Shopping
          </ContinueShoppingButton>
        </ButtonContainer>
      </CartSummary>
    </CartContainer>
  );
};

export default CartPage;
