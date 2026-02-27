export type MaterialStatus = 'estimated' | 'confirmed' | 'purchased' | 'used';
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface MaterialTemplate {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  unit: string;
  estimated_unit_price: number;
  is_required: boolean;
  sort_order: number;
  created_at: string;
}

export interface JobMaterial {
  id: string;
  job_id: string;
  material_template_id: string | null;
  name: string;
  description: string | null;
  unit: string;
  quantity: number;
  unit_price: number | null;
  total_price: number | null;
  status: MaterialStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  template?: MaterialTemplate;
}

export interface MaterialOrder {
  id: string;
  job_id: string;
  client_id: string;
  pro_id: string;
  items: MaterialOrderItem[];
  subtotal: number;
  tax: number;
  delivery_fee: number;
  total: number;
  status: OrderStatus;
  delivery_address: string;
  delivery_date: string | null;
  tracking_number: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface MaterialOrderItem {
  material_id: string;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface MaterialFormula {
  materialName: string;
  unit: string;
  formula: (details: Record<string, unknown>) => number;
  isRequired: boolean;
  estimatedUnitPrice: number;
  notes?: string;
}

export interface ToolRequirement {
  id: string;
  category_id: string;
  tool_id: string;
  is_required: boolean;
  tool?: Tool;
}

export interface Tool {
  id: string;
  name: string;
  description: string | null;
  daily_rental_price: number | null;
  purchase_url: string | null;
  image_url: string | null;
  created_at: string;
}

export interface ToolRental {
  id: string;
  job_id: string;
  tool_id: string;
  pro_id: string;
  rental_start: string;
  rental_end: string;
  daily_rate: number;
  total_cost: number;
  status: 'reserved' | 'active' | 'returned' | 'cancelled';
  created_at: string;
  // Joined fields
  tool?: Tool;
}
