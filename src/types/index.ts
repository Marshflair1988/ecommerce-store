// API Response Types
export interface ApiResponse<T> {
  data: T;
  meta: {
    currentPage: number;
    pageCount: number;
  };
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  image?: {
    url: string;
    alt?: string;
  };
  rating?: number;
  reviews?: Review[];
  tags?: string[];
}

export interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

// Cart Types
export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

// Contact Form Types
export interface ContactFormData {
  fullName: string;
  subject: string;
  email: string;
  body: string;
}

export interface ContactFormErrors {
  fullName?: string;
  subject?: string;
  email?: string;
  body?: string;
}

// Toast Types
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

// Sort Types
export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

// Component Props Types
export interface ProductProps {
  product: Product;
}

export interface SearchBarProps {
  products: Product[];
  onSearch: (results: Product[]) => void;
}

export interface LayoutProps {
  children?: React.ReactNode;
}

export interface CartProviderProps {
  children: React.ReactNode;
}

// Context Types
export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}
