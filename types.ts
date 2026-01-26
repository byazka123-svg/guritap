
import React from 'react';

export interface ProductPlan {
  id?: number;
  duration: string;
  price: number;
}

export interface Product {
  id: number;
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  features: string[];
  plans: ProductPlan[];
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedPlan: ProductPlan;
}
