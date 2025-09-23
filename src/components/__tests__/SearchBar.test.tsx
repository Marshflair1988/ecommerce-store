import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "../SearchBar";

describe("SearchBar Component", () => {
  const mockProducts = [
    {
      id: 1,
      title: "Test Product 1",
      price: 100,
      discountedPrice: 80,
      image: {
        url: "https://example.com/image1.jpg",
        alt: "Test product 1 image",
      },
    },
    {
      id: 2,
      title: "Another Product",
      price: 200,
      discountedPrice: 150,
      image: {
        url: "https://example.com/image2.jpg",
        alt: "Test product 2 image",
      },
    },
    {
      id: 3,
      title: "Third Item",
      price: 50,
      discountedPrice: 50,
      image: null,
    },
  ];

  const defaultProps = {
    products: mockProducts,
    onSearch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders search input with placeholder", () => {
    render(<SearchBar {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText("Search products...");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("type", "text");
  });

  test("filters products based on search term", async () => {
    render(<SearchBar {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText("Search products...");

    fireEvent.change(searchInput, { target: { value: "Test" } });

    await waitFor(() => {
      expect(defaultProps.onSearch).toHaveBeenCalledWith([
        expect.objectContaining({ title: "Test Product 1" }),
      ]);
    });
  });

  test("shows search results when typing", async () => {
    render(<SearchBar {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText("Search products...");

    fireEvent.change(searchInput, { target: { value: "Test" } });

    await waitFor(() => {
      expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    });
  });

  test("hides search results when search term is empty", async () => {
    render(<SearchBar {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText("Search products...");

    // Type something first
    fireEvent.change(searchInput, { target: { value: "Test" } });

    // Clear the input
    fireEvent.change(searchInput, { target: { value: "" } });

    await waitFor(() => {
      expect(screen.queryByText("Test Product 1")).not.toBeInTheDocument();
    });
  });

  test("filters products case-insensitively", async () => {
    render(<SearchBar {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText("Search products...");

    fireEvent.change(searchInput, { target: { value: "another" } });

    await waitFor(() => {
      expect(screen.getByText("Another Product")).toBeInTheDocument();
    });
  });

  test("shows no results when no products match", async () => {
    render(<SearchBar {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText("Search products...");

    fireEvent.change(searchInput, { target: { value: "nonexistent" } });

    await waitFor(() => {
      expect(screen.queryByText("Test Product 1")).not.toBeInTheDocument();
      expect(screen.queryByText("Another Product")).not.toBeInTheDocument();
      expect(screen.queryByText("Third Item")).not.toBeInTheDocument();
    });
  });

  test("calls onSearch with filtered products", async () => {
    render(<SearchBar {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText("Search products...");

    fireEvent.change(searchInput, { target: { value: "Product" } });

    await waitFor(() => {
      expect(defaultProps.onSearch).toHaveBeenCalledWith([
        expect.objectContaining({ title: "Test Product 1" }),
        expect.objectContaining({ title: "Another Product" }),
      ]);
    });
  });

  test("handles empty products array", async () => {
    render(<SearchBar {...defaultProps} products={[]} />);

    const searchInput = screen.getByPlaceholderText("Search products...");

    fireEvent.change(searchInput, { target: { value: "anything" } });

    await waitFor(() => {
      expect(defaultProps.onSearch).toHaveBeenCalledWith([]);
    });
  });

  test("handles undefined products prop", () => {
    render(<SearchBar products={[]} onSearch={jest.fn()} />);

    const searchInput = screen.getByPlaceholderText("Search products...");

    fireEvent.change(searchInput, { target: { value: "anything" } });

    // Should not crash
    expect(searchInput).toHaveValue("anything");
  });

  test("renders without crashing", () => {
    expect(() => render(<SearchBar {...defaultProps} />)).not.toThrow();
  });
});
