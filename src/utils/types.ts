export type Color = string;

export interface Quote {
  id: string;
  clientName: string;
  date: string;
  brand: string;
  model: string;
  year?: string;
  licensePlate?: string;
  availability: string;
  duration: string;
  products: QuoteProduct[];
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteProduct {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface VehicleModel {
  id: string;
  name: string;
  years?: string[];
}

export interface VehicleBrand {
  id: string;
  name: string;
  models: VehicleModel[];
}
