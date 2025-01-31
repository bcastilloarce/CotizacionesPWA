# CotizacionesPWA - Conversion Guide from iOS to Next.js Progressive Web App

## Overview

This document outlines the conversion of CotizacionesiOS from a native iOS Swift application to a Progressive Web App (PWA) using Next.js, TypeScript, and modern web technologies.

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + Zustand
- **Database**: Prisma + PostgreSQL
- **Authentication**: NextAuth.js
- **PDF Generation**: react-pdf
- **Form Handling**: React Hook Form + Zod
- **UI Components**: shadcn/ui

## Project Structure

```txt
cotizaciones-pwa/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   │   ├── nueva-cotizacion/
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │       ├── ClienteForm.tsx
│   │   │       ├── VehiculoForm.tsx
│   │   │       ├── ProductosForm.tsx
│   │   │       └── PDFPreview.tsx
│   │   └── historial/
│   │       └── page.tsx
│   ├── api/
│   │   ├── auth/
│   │   ├── cotizaciones/
│   │   └── pdf/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   └── shared/
├── lib/
│   ├── db/
│   ├── pdf/
│   └── utils/
├── public/
│   ├── icons/
│   └── images/
├── styles/
│   └── globals.css
└── types/
```

## Data Models

### Product Type

```typescript
interface Product {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}
```

### Quote Type

```typescript
interface Quote {
  id: string;
  client: string;
  brand: string;
  model: string;
  year: number;
  licensePlate?: string;
  date: Date;
  duration: string;
  untilStockLasts: boolean;
  availability?: string;
  products: Product[];
  totalWithTax: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## Key Features Implementation

### 1. Progressive Web App Setup

```typescript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  // other Next.js config
});
```

### 2. PDF Generation Service

```typescript
// lib/pdf/generator.ts
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export const generateQuotePDF = async (quote: Quote) => {
  const styles = StyleSheet.create({
    // PDF styles
  });

  const QuoteDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* PDF content */}
      </Page>
    </Document>
  );

  return QuoteDocument;
};
```

### 3. Quote Form Implementation

```typescript
// app/dashboard/nueva-cotizacion/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuoteSchema } from '@/lib/validations';

export default function NewQuotePage() {
  const form = useForm<Quote>({
    resolver: zodResolver(QuoteSchema),
    defaultValues: {
      date: new Date(),
      duration: '1 día',
      untilStockLasts: true,
    },
  });

  const onSubmit = async (data: Quote) => {
    // Handle form submission
  };

  return (
    // Form implementation
  );
}
```

### 4. State Management

```typescript
// lib/store/quote.ts
import create from 'zustand';

interface QuoteStore {
  quotes: Quote[];
  addQuote: (quote: Quote) => void;
  removeQuote: (id: string) => void;
}

export const useQuoteStore = create<QuoteStore>((set) => ({
  quotes: [],
  addQuote: (quote) => set((state) => ({
    quotes: [...state.quotes, quote]
  })),
  removeQuote: (id) => set((state) => ({
    quotes: state.quotes.filter(q => q.id !== id)
  })),
}));
```

## API Routes

### 1. Quote Management

```typescript
// app/api/cotizaciones/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const quote = await prisma.quote.create({
      data: {
        ...data,
        products: {
          create: data.products,
        },
      },
    });
    return NextResponse.json(quote);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create quote' },
      { status: 500 }
    );
  }
}
```

### 2. PDF Generation

```typescript
// app/api/pdf/route.ts
import { NextResponse } from 'next/server';
import { generateQuotePDF } from '@/lib/pdf/generator';

export async function POST(req: Request) {
  try {
    const quote = await req.json();
    const pdf = await generateQuotePDF(quote);
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
```

## Progressive Enhancement Features

1. **Offline Support**
   - Service Worker for caching
   - IndexedDB for offline data storage
   - Background sync for pending changes

2. **Responsive Design**
   - Mobile-first approach
   - Adaptive UI components
   - Touch-friendly interfaces

3. **Performance Optimization**
   - Image optimization
   - Code splitting
   - Route prefetching

## Security Considerations

1. **Authentication**
   - JWT-based authentication
   - Role-based access control
   - Secure session management

2. **Data Protection**
   - Input validation
   - XSS prevention
   - CSRF protection

## Deployment

1. **Prerequisites**
   - Node.js 18+
   - PostgreSQL database
   - Environment variables setup

2. **Build Process**

    ```bash
    npm run build
    ```

3. **Deployment Platforms**

   - Vercel (recommended)
   - Railway
   - AWS/GCP/Azure

## Development Setup

1. Clone the repository

    ```bash
    git clone https://github.com/your-org/cotizaciones-pwa.git
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Set up environment variables

    ```bash
    cp .env.example .env.local
    ```

4. Run development server

    ```bash
    npm run dev
    ```

## Testing

1. **Unit Tests**

    ```bash
    npm run test
    ```

2. **E2E Tests**

    ```bash
    npm run test:e2e
    ```

## Migration Steps

1. **Data Migration**
   - Export existing iOS data
   - Transform to new schema
   - Import to PostgreSQL

2. **Feature Parity**
   - Implement core features
   - Add PWA capabilities
   - Test cross-browser compatibility

3. **User Migration**
   - Create migration guide
   - Set up user accounts
   - Provide support documentation

## Performance Metrics

- First Contentful Paint (FCP) < 1.8s
- Time to Interactive (TTI) < 3.8s
- Cumulative Layout Shift (CLS) < 0.1
- Lighthouse PWA score > 90

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- iOS Safari 13+
- Chrome for Android 80+
