# E-Commerce Store

A modern, fully-featured e-commerce application built with React, TypeScript, and styled-components. This project demonstrates advanced React patterns, API integration, state management, and responsive design.

## 🚀 Features

### Core Functionality

**Product Catalog**: Browse products with images, prices, and ratings
**Product Details**: Detailed product pages with reviews and tags
**Shopping Cart**: Add, remove, and manage cart items
**Search & Sort**: Real-time search and sorting by name/price
**Checkout Flow**: Complete checkout process with success confirmation
**Contact Form**: TypeScript-validated contact form

### Technical Features

**TypeScript**: Full type safety throughout the application
**Responsive Design**: Mobile-first design that works on all devices
**Toast Notifications**: Custom-built notification system
**State Management**: Context API for cart and toast state
**API Integration**: RESTful API integration with error handling
**Testing**: Comprehensive test suite with React Testing Library

## 🛠️ Tech Stack

**Frontend**: React 19.1.1 with TypeScript
**Styling**: Styled-components for component-based styling
**Routing**: React Router DOM for navigation
**State Management**: React Context API
**Testing**: Jest + React Testing Library
**API**: Noroff Online Shop API
**Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Marshflair1988/ecommerce-store
   cd ecommerce-store
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Available Scripts

### Development

```bash
npm start          # Start development server
npm run type-check # Run TypeScript type checking
```

### Testing

```bash
npm test           # Run tests in watch mode
npm test -- --watchAll=false  # Run tests once
```

### Production

```bash
npm run build      # Build for production
npm run eject      # Eject from Create React App (one-way operation)
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── __tests__/       # Component tests
│   ├── CartIcon.tsx     # Shopping cart icon
│   ├── Footer.tsx       # Site footer
│   ├── Header.tsx       # Navigation header
│   ├── Layout.tsx       # Main layout wrapper
│   ├── Product.tsx      # Product card component
│   ├── SearchBar.tsx    # Search functionality
│   └── ToastContainer.tsx # Toast notifications
├── contexts/            # React Context providers
│   ├── __tests__/       # Context tests
│   ├── CartContext.tsx  # Shopping cart state
│   └── ToastContext.tsx # Toast notification state
├── pages/               # Page components
│   ├── __tests__/       # Page tests
│   ├── CartPage.tsx     # Shopping cart page
│   ├── CheckoutSuccessPage.tsx # Order confirmation
│   ├── ContactPage.tsx  # Contact form
│   ├── HomePage.tsx     # Product listing
│   └── ProductPage.tsx  # Product details
├── types/               # TypeScript type definitions
│   └── index.ts         # All type definitions
├── __mocks__/           # Jest mocks
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
└── setupTests.ts        # Test configuration
```

## 🔧 Configuration

### TypeScript

**Config**: `tsconfig.json`
**Features**: Strict type checking, JSX support, path mapping
**Types**: Comprehensive interfaces for all data structures

### Jest Testing

**Config**: `jest.config.js`
**Features**: TypeScript support, React Testing Library, coverage
**Setup**: Custom test utilities and mocks

### Styling

**Method**: Styled-components
**Features**: Component-scoped styles, theme support, responsive design
**Pattern**: CSS-in-JS with TypeScript integration

## 🌐 API Integration

The application integrates with the Noroff Online Shop API:

**Base URL**: `https://v2.api.noroff.dev/online-shop`
**Endpoints**:
`GET /online-shop` - Fetch all products
`GET /online-shop/{id}` - Fetch single product
**Error Handling**: Comprehensive error states and user feedback
**Type Safety**: Full TypeScript interfaces for API responses

## 🧪 Testing

### Test Coverage

**Components**: All major components tested
**Contexts**: State management logic tested
**Pages**: User interactions and form validation tested
**Coverage**: 91% test pass rate

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- --testPathPattern="Header.test"

# Run tests with coverage
npm test -- --coverage --watchAll=false
```

## 📱 Responsive Design

**Mobile First**: Designed for mobile devices first
**Breakpoints**: Responsive grid layouts and navigation
**Touch Friendly**: Optimized for touch interactions
**Cross Device**: Works on desktop, tablet, and mobile

## 🎨 UI/UX Features

**Modern Design**: Clean, professional interface
**Animations**: Smooth transitions and hover effects
**Loading States**: Proper loading indicators
**Error Handling**: User-friendly error messages
**Accessibility**: Semantic HTML and ARIA labels

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

**Built with ❤️ using React, TypeScript, and modern web technologies.**
