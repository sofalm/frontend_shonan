export interface DataQuotationRequest {

  total:     number;
  page:      number;
  page_size: number;
  items:     QuotationRequest[];

}

export interface QuotationRequest {
  id?:         string;
  folio?: string;
  is_active?:  boolean;
  is_deleted?: boolean
    deleted_at?:  string;
  created_at?: string;
  updated_at?: string;
  name?: string;
  customer: string,
  plant: string,
  plant_user: string,
  area: string,
  customer_reference: string,
  plc_mark: string,
  entrances_and_exists: string,
  voltage: number,
  amperage: string,
  psi_mpa: string,
  paint_code: string,
  paint_mark: string,
  project_requirement: string,
  cycle_time: string,
  quote_date: string,
  purchase_order_date: string,
  start_project_date: string,
  end_project_date: string,
  project_type: any,
  design_type: any,
  electric_type: any,
  energy_type: any,
  manufacture_type: any,
  standard_type: any,
  work_height_type: any,
  hot_work_type: any,
  loading_equipment_type: any,
  user: any
}
