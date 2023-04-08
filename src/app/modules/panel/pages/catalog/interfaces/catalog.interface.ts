export interface DataItems {

  total:     number;
  page:      number;
  page_size: number;
  items:     ItemCatalogName[];

}

export interface ItemCatalogName {
  id?:         string;
  is_active?:  boolean;
  created_at?: string;
  updated_at?: string;
  name?: string;
}
