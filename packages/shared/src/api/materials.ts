import { supabase } from './supabase';
import type { MaterialTemplate, JobMaterial, MaterialOrder } from '../types/material';

export async function getMaterialTemplates(
  categoryId: string
): Promise<MaterialTemplate[]> {
  const { data, error } = await supabase
    .from('material_templates')
    .select('*')
    .eq('category_id', categoryId)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return (data ?? []) as MaterialTemplate[];
}

export async function getJobMaterials(jobId: string): Promise<JobMaterial[]> {
  const { data, error } = await supabase
    .from('job_materials')
    .select(
      `
      *,
      template:material_templates(*)
    `
    )
    .eq('job_id', jobId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []) as JobMaterial[];
}

export async function updateJobMaterial(
  id: string,
  updates: Partial<
    Pick<
      JobMaterial,
      'quantity' | 'unit_price' | 'total_price' | 'status' | 'notes'
    >
  >
): Promise<JobMaterial> {
  const updateData: Record<string, unknown> = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  // Auto-calculate total if quantity and unit_price are present
  if (updates.quantity !== undefined && updates.unit_price !== undefined) {
    updateData.total_price = updates.quantity * updates.unit_price;
  }

  const { data, error } = await supabase
    .from('job_materials')
    .update(updateData)
    .eq('id', id)
    .select(
      `
      *,
      template:material_templates(*)
    `
    )
    .single();
  if (error) throw error;
  return data as JobMaterial;
}

export async function addJobMaterial(materialData: {
  job_id: string;
  material_template_id?: string;
  name: string;
  description?: string;
  unit: string;
  quantity: number;
  unit_price?: number;
  status?: string;
  notes?: string;
}): Promise<JobMaterial> {
  const totalPrice =
    materialData.quantity && materialData.unit_price
      ? materialData.quantity * materialData.unit_price
      : null;

  const { data, error } = await supabase
    .from('job_materials')
    .insert({
      ...materialData,
      total_price: totalPrice,
      status: materialData.status ?? 'estimated',
    })
    .select(
      `
      *,
      template:material_templates(*)
    `
    )
    .single();
  if (error) throw error;
  return data as JobMaterial;
}

export async function createMaterialOrder(data: {
  job_id: string;
  client_id: string;
  pro_id: string;
  items: Array<{
    material_id: string;
    name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
  delivery_address: string;
  delivery_date?: string;
  notes?: string;
}): Promise<MaterialOrder> {
  const subtotal = data.items.reduce((sum, item) => sum + item.total_price, 0);
  const tax = subtotal * 0.13; // Ontario HST
  const deliveryFee = subtotal > 200 ? 0 : 15;
  const total = subtotal + tax + deliveryFee;

  const { data: order, error } = await supabase
    .from('material_orders')
    .insert({
      job_id: data.job_id,
      client_id: data.client_id,
      pro_id: data.pro_id,
      items: data.items,
      subtotal,
      tax,
      delivery_fee: deliveryFee,
      total,
      status: 'pending',
      delivery_address: data.delivery_address,
      delivery_date: data.delivery_date ?? null,
      notes: data.notes ?? null,
    })
    .select()
    .single();
  if (error) throw error;

  // Update material statuses to confirmed
  for (const item of data.items) {
    await supabase
      .from('job_materials')
      .update({ status: 'confirmed', updated_at: new Date().toISOString() })
      .eq('id', item.material_id);
  }

  return order as MaterialOrder;
}

export async function getOrders(clientId: string): Promise<MaterialOrder[]> {
  const { data, error } = await supabase
    .from('material_orders')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as MaterialOrder[];
}
