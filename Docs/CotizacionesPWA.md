# CotizacionesPWA - PDF Quote Generator Web Application

## Primary Objective

This Progressive Web Application (PWA) is specifically designed to generate standardized PDF quotations for Repuestos Oyarce, following strict formatting specifications. The application transforms user input into professional automotive parts quotations that include client information, vehicle details, product listings, and commercial terms.

## Project Structure Analysis

### Core Functionality Folders

- **/app/dashboard/nueva-cotizacion/**
  - Main quotation form interface
  - Implements all PDF requirements including client data, vehicle information, and product listing
  - Handles real-time PDF preview
  - Contains form validation for required fields

- **/lib/pdf/**
  - PDF generation logic
  - Implements exact spacing specifications (40 units logo to title, etc.)
  - Handles dynamic content adjustment
  - Manages page breaks and headers
  - Controls font specifications (Helvetica, CustomTitle, etc.)

- **/components/quotation/**
  - Reusable form components aligned with PDF requirements
  - Client information section
  - Vehicle details section
  - Product table with automatic calculations
  - Preview component showing real-time PDF generation

### Supporting Structure

- **/public/assets/**
  - Corporate logo storage
  - Signature images
  - Required fonts

- **/lib/validation/**
  - Form validation rules ensuring PDF requirements are met
  - Required field checks
  - Format validation (Chilean peso, dates, etc.)

- **/types/**
  - TypeScript interfaces matching PDF data requirements
  - Ensures data consistency throughout the application

## Areas Needing Improvement

1. **Form-PDF Alignment**
   - Current form structure doesn't fully mirror PDF layout
   - Need to add specific spacing controls matching PDF requirements
   - Missing validation for optional fields behavior

2. **Price Formatting**
   - Inconsistent thousand separator implementation
   - Chilean peso format needs standardization across components

3. **Dynamic Content Handling**
   - Current implementation doesn't fully address variable content length
   - Need better handling of optional fields in PDF generation
   - Page break logic needs refinement

4. **PDF Preview Performance**
   - Real-time preview generation may impact performance
   - Consider implementing preview throttling

## Required Enhancements

1. **PDF Specifications Compliance**
   - Implement exact spacing measurements from GenerarPDF.md
   - Add proper font handling (CustomTitle, Helvetica-Bold, etc.)
   - Ensure correct table column widths (40% for products, etc.)

2. **Form Interface Improvements**
   - Add clear visual separation between sections matching PDF layout
   - Implement proper handling of optional fields
   - Add preview toggle functionality

3. **Data Validation**
   - Enhance validation rules to match PDF requirements
   - Add proper error messages aligned with PDF specifications
   - Implement format validation for monetary values

4. **File Naming System**
   - Implement sequential numbering (N001_clientname.pdf)
   - Add proper character sanitization for client names
   - Ensure correct file storage structure

## Development Priorities

1. Ensure 100% compliance with PDF specifications
2. Implement robust form validation
3. Optimize PDF generation performance
4. Add proper error handling
5. Implement automated testing for PDF output

## Quality Assurance Checklist

- [ ] PDF output matches all specifications in GenerarPDF.md
- [ ] Form captures all required data correctly
- [ ] Proper handling of optional fields
- [ ] Correct implementation of spacing requirements
- [ ] Proper font usage throughout PDF
- [ ] Correct monetary format implementation
- [ ] Proper file naming and storage
- [ ] Mobile responsiveness
- [ ] Offline functionality

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
