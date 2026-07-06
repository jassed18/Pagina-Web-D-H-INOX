export interface Product {
  id: string;
  category: 'marmita' | 'passthrough';
  name: string;
  subtitle: string;
  description: string;
  generalSpecs: string[];
  features: {
    title: string;
    items: string[];
  }[];
  specifications: {
    label: string;
    value: string;
  }[];
  images?: string[]; // Optional custom images, fallback to high-quality SVG/CSS schema
  price?: number; // Optional pricing
  status: 'disponible' | 'bajo_pedido';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  productInterest?: string;
  message: string;
  createdAt: string;
  status: 'nuevo' | 'leido';
}

export type UserRole = 'cliente' | 'admin';
