import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';

// Test component to access cart context
const TestComponent = () => {
  const cart = useCart();
  return (
    <div>
      <div data-testid="item-count">{cart.getCartItemCount()}</div>
      <div data-testid="cart-total">{cart.getCartTotal()}</div>
      <div data-testid="items-length">{cart.items.length}</div>
    </div>
  );
};

// Test component that uses cart actions
const TestActionsComponent = () => {
  const cart = useCart();
  
  const handleAddToCart = () => {
    cart.addToCart({
      id: 1,
      title: 'Test Product',
      price: 100,
      discountedPrice: 80
    });
  };

  const handleRemoveFromCart = () => {
    cart.removeFromCart(1);
  };

  const handleUpdateQuantity = () => {
    cart.updateQuantity(1, 3);
  };

  const handleClearCart = () => {
    cart.clearCart();
  };

  return (
    <div>
      <button data-testid="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
      <button data-testid="remove-from-cart" onClick={handleRemoveFromCart}>Remove from Cart</button>
      <button data-testid="update-quantity" onClick={handleUpdateQuantity}>Update Quantity</button>
      <button data-testid="clear-cart" onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
};

describe('CartContext', () => {
  test('provides initial empty cart state', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('item-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
    expect(screen.getByTestId('items-length')).toHaveTextContent('0');
  });

  test('adds item to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
        <TestActionsComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByTestId('add-to-cart').click();
    });

    expect(screen.getByTestId('item-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('80');
    expect(screen.getByTestId('items-length')).toHaveTextContent('1');
  });

  test('adds multiple quantities of same item', () => {
    render(
      <CartProvider>
        <TestComponent />
        <TestActionsComponent />
      </CartProvider>
    );

    // Add same item twice
    act(() => {
      screen.getByTestId('add-to-cart').click();
      screen.getByTestId('add-to-cart').click();
    });

    expect(screen.getByTestId('item-count')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('160'); // 80 * 2
    expect(screen.getByTestId('items-length')).toHaveTextContent('1'); // Still 1 unique item
  });

  test('removes item from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
        <TestActionsComponent />
      </CartProvider>
    );

    // Add item first
    act(() => {
      screen.getByTestId('add-to-cart').click();
    });

    expect(screen.getByTestId('item-count')).toHaveTextContent('1');

    // Remove item
    act(() => {
      screen.getByTestId('remove-from-cart').click();
    });

    expect(screen.getByTestId('item-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
    expect(screen.getByTestId('items-length')).toHaveTextContent('0');
  });

  test('updates item quantity', () => {
    render(
      <CartProvider>
        <TestComponent />
        <TestActionsComponent />
      </CartProvider>
    );

    // Add item first
    act(() => {
      screen.getByTestId('add-to-cart').click();
    });

    expect(screen.getByTestId('item-count')).toHaveTextContent('1');

    // Update quantity to 3
    act(() => {
      screen.getByTestId('update-quantity').click();
    });

    expect(screen.getByTestId('item-count')).toHaveTextContent('3');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('240'); // 80 * 3
  });

  test('clears entire cart', () => {
    render(
      <CartProvider>
        <TestComponent />
        <TestActionsComponent />
      </CartProvider>
    );

    // Add item first
    act(() => {
      screen.getByTestId('add-to-cart').click();
    });

    expect(screen.getByTestId('item-count')).toHaveTextContent('1');

    // Clear cart
    act(() => {
      screen.getByTestId('clear-cart').click();
    });

    expect(screen.getByTestId('item-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
    expect(screen.getByTestId('items-length')).toHaveTextContent('0');
  });

  test('calculates total with discounted price', () => {
    render(
      <CartProvider>
        <TestComponent />
        <TestActionsComponent />
      </CartProvider>
    );

    // Add item with discount
    act(() => {
      screen.getByTestId('add-to-cart').click();
    });

    expect(screen.getByTestId('cart-total')).toHaveTextContent('80'); // Uses discountedPrice
  });

  test('calculates total with regular price when no discount', () => {
    const TestComponentNoDiscount = () => {
      const cart = useCart();
      
      const handleAddToCart = () => {
        cart.addToCart({
          id: 2,
          title: 'Test Product No Discount',
          price: 100
          // No discountedPrice
        });
      };

      return (
        <div>
          <div data-testid="cart-total">{cart.getCartTotal()}</div>
          <button data-testid="add-no-discount" onClick={handleAddToCart}>Add No Discount</button>
        </div>
      );
    };

    render(
      <CartProvider>
        <TestComponentNoDiscount />
      </CartProvider>
    );

    act(() => {
      screen.getByTestId('add-no-discount').click();
    });

    expect(screen.getByTestId('cart-total')).toHaveTextContent('100'); // Uses regular price
  });

  test('throws error when useCart is used outside CartProvider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useCart must be used within a CartProvider');

    console.error = originalError;
  });
});
