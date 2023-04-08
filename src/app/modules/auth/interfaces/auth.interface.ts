export interface Error {
  title: string;
  detail: string;
}

export interface ProfileUser {
  data:    DataProfileUser;
  code:    number;
  message: string;
}

export interface DataProfileUser {
  user: User;
  employee: Employee;
  company: CompanyResp;
}

export interface JobCenter {
  id?: string,
  name?: string,
  business_name?: string,
  health_manager?: string,
  company?: Company;
  taxpayer_registration?: string,
  license_number?: string,
  email?: string,
  phone?: string,
  whatsapp?: string,
  web_page?: string,
  facebook?: string,
  messenger?: string,
  timezone?: string,
  sanitary_license: string,
  created_at?: string,
  updated_at: string,
  address?: string,
  address_latitude?: string,
  address_longitude?: string,
  recommendations?: string,
  agreement?: string
}

export interface JobTitle {
  id?: string,
  name?: string,
  job_center_id?: string
}

export interface MessageVerify {
  confirmation_code: string
}

export interface MessageDetail {
  detail?: string
}

export interface Country {
  id: string,
  name: string,
  code_country?: string,
  coin_country?: string,
  symbol_country?: string
}

export interface Company {
  id?: string,
  company_name: string,
  contact_name: string,
  contact_email: string,
  contact_phone: string,
  country_id: string,
  password: string
}

export interface CompanyResp {
  id?: string | undefined,
  folio?: string,
  name?: string,
  slug?: string,
  contact_name?: string,
  contact_email?: string,
  contact_phone?: string,
  country?: Country,
  document_logo?: string,
  document_stamp?: string,
  web_logo?: string,
  web_color?: string,
  cutoff_date?: string,
  is_active?: boolean,
  updated_at?: string,
  created_at?: string
}

export interface Login {
  data:    DataLogin;
  code:    number;
  message: string;
  error : any;
}

export interface DataLogin {
  access_token:  string;
  refresh_token: string;
  type:          string;
  user:          User;
  employee:      Employee;
}

export interface Employee {
  id?:         string;
  is_active?:  boolean;
  is_deleted?: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: Date;
  name?:       string;
  username?: string;
  avatar:      string;
  signature:  string;
  color?:      string;
  management?: string;
  payroll_number?: string;
  location?: string;
  zone?: string;
  job_title?:  JobTitle;
  job_center?: JobCenter;
}

export interface User {
  id?:                string;
  last_login?:        null;
  is_superuser?:      boolean;
  name?:              string;
  access?: string;
  first_name?:        string;
  last_name?:         null;
  email?:             null;
  username?: string;
  is_verified?:       boolean;
  is_active?:         boolean;
  confirmation_code?: null;
  device_token?:      null;
  role?:              string;
  is_staff?:          boolean;
  is_deleted?:        boolean;
  created_at?:        Date;
  updated_at?:        Date;
}

export interface SettingModule {
  id?:         string;
  is_active?:  boolean;
  is_deleted?: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  activate_inventory?: boolean;
  folio_init_quotes: number;
  folio_init_customers: number;
  folio_init_purchase_orders: number;
  folio_init_entries: number;
  folio_init_tickets: number;
  folio_init_inspections: number;
  job_center?: JobCenter;
}
