import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Product from "../Product";
import { CartProvider } from "../../contexts/CartContext";
import { ToastProvider } from "../../contexts/ToastContext";

// Mock the ToastProvider for tests
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>
    <ToastProvider>{children}</ToastProvider>
  </CartProvider>
);

describe("Product Component", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 100,
    discountedPrice: 80,
    image: {
      url: "https://example.com/image.jpg",
      alt: "Test product image",
    },
  };

  const mockProductNoDiscount = {
    id: 2,
    title: "Test Product No Discount",
    price: 100,
    discountedPrice: 100,
    image: {
      url: "https://example.com/image2.jpg",
      alt: "Test product image 2",
    },
  };

  const mockProductNoImage = {
    id: 3,
    title: "Test Product No Image",
    price: 50,
    discountedPrice: 50,
  };

  test("renders product with all details", () => {
    render(<Product product={mockProduct} />, { wrapper: TestWrapper });

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$80")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("-20%")).toBeInTheDocument();
    expect(screen.getByText("View Product")).toBeInTheDocument();
  });

  test("renders product without discount", () => {
    render(<Product product={mockProductNoDiscount} />, {
      wrapper: TestWrapper,
    });

    expect(screen.getByText("Test Product No Discount")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.queryByText("-0%")).not.toBeInTheDocument();
    // Check that there's only one $100 visible (no original price)
    const priceElements = screen.getAllByText("$100");
    expect(priceElements).toHaveLength(1);
  });

  test("renders product image when available", () => {
    render(<Product product={mockProduct} />, { wrapper: TestWrapper });

    const image = screen.getByAltText("Test product image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  test("renders placeholder when no image", () => {
    render(<Product product={mockProductNoImage} />, { wrapper: TestWrapper });

    expect(screen.getByText("No Image Available")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("handles image error and shows placeholder", async () => {
    render(<Product product={mockProduct} />, { wrapper: TestWrapper });

    const image = screen.getByAltText("Test product image");

    // Simulate image error
    Object.defineProperty(image, "complete", { value: false });
    Object.defineProperty(image, "naturalHeight", { value: 0 });

    // Trigger error event wrapped in act
    await act(async () => {
      const errorEvent = new Event("error");
      image.dispatchEvent(errorEvent);
    });

    // Check placeholder is shown
    expect(screen.getByText("No Image Available")).toBeInTheDocument();
  });

  test("calculates discount percentage correctly", () => {
    const productWithDiscount = {
      ...mockProduct,
      price: 200,
      discountedPrice: 150,
    };

    render(<Product product={productWithDiscount} />);

    expect(screen.getByText("$150")).toBeInTheDocument();
    expect(screen.getByText("$200")).toBeInTheDocument();
    expect(screen.getByText("-25%")).toBeInTheDocument();
  });

  test("renders correct link to product page", () => {
    render(<Product product={mockProduct} />, { wrapper: TestWrapper });

    const viewButton = screen.getByText("View Product");
    expect(viewButton).toHaveAttribute("href", "/product/1");
  });

  test("handles product with empty image url", () => {
    const productWithEmptyImage = {
      ...mockProduct,
      image: {
        url: "",
        alt: "Empty image",
      },
    };

    render(<Product product={productWithEmptyImage} />);

    expect(screen.getByText("No Image Available")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("handles product with null image", () => {
    const productWithNullImage = {
      ...mockProduct,
      image: null,
    };

    render(<Product product={productWithNullImage} />);

    expect(screen.getByText("No Image Available")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("handles product with undefined image", () => {
    const productWithUndefinedImage = {
      ...mockProduct,
      image: undefined,
    };

    render(<Product product={productWithUndefinedImage} />);

    expect(screen.getByText("No Image Available")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("uses image alt text when available", () => {
    render(<Product product={mockProduct} />, { wrapper: TestWrapper });

    const image = screen.getByAltText("Test product image");
    expect(image).toBeInTheDocument();
  });

  test("uses product title as alt text when image alt is not available", () => {
    const productWithoutImageAlt = {
      ...mockProduct,
      image: {
        url: "https://example.com/image.jpg",
        // No alt text
      },
    };

    render(<Product product={productWithoutImageAlt} />);

    const image = screen.getByAltText("Test Product");
    expect(image).toBeInTheDocument();
  });
});
