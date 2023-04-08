import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {Observable} from "rxjs";
import {DataQuotationRequest, QuotationRequest} from "../interfaces/quotation.interface";

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient,) { }

  /**
   * Get Project Types
   */
  getQuotationsPaginate(dataPaginate: any): Observable<DataQuotationRequest> {
    let params = new HttpParams();
    dataPaginate.search ? params = params.append('search',  dataPaginate.search) : null;
    dataPaginate.page ? params = params.append('page',  dataPaginate.page) : null;
    dataPaginate.page_size ? params = params.append('page_size',  dataPaginate.page_size): null;
    dataPaginate.is_active ? params = params.append('is_active',  dataPaginate.is_active): null;
    dataPaginate.project_types ? params = params.append('project_types',  dataPaginate.project_types) : null;
    dataPaginate.design_types ? params = params.append('design_types',  dataPaginate.design_types) : null;
    dataPaginate.electric_types ? params = params.append('electric_types',  dataPaginate.electric_types) : null;
    dataPaginate.energy_types ? params = params.append('energy_types',  dataPaginate.energy_types) : null;
    dataPaginate.manufacture_types ? params = params.append('manufacture_types',  dataPaginate.manufacture_types) : null;
    dataPaginate.hot_work_types ? params = params.append('hot_work_types',  dataPaginate.hot_work_types) : null;
    dataPaginate.loading_equipment_types ? params = params.append('loading_equipment_types',  dataPaginate.loading_equipment_types) : null;
    return this.http.get<DataQuotationRequest>(`${this.baseUrl}/quote-requests/`, {params});
  }

  /**
   * get Data by Id
   * @param data
   */
  getItemById(id: string) : Observable<QuotationRequest> {
    return this.http.get<QuotationRequest>(`${this.baseUrl}/quote-requests/${id}/`)
  }

  /**
   * add new data
   * @param dataForm
   */
  addItem(dataForm: {}) : Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/quote-requests/`, dataForm)
  }

  /**
   * edit with put data
   * @param dataForm
   */
  updateItem(dataForm: any) : Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/quote-requests/${dataForm.id}/`, dataForm)
  }

  /**
   * edit with put data
   * @param form
   * @param dataForm
   */
  patchItem(dataForm: any, form: FormData) : Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}//quote-requests//${dataForm.id}/`, form)
  }

  /**
   * delete
   * @param id
   */
  deleteItem(id: string) : Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/quote-requests/${id}/`)
  }

  /**
   * get Data by Id
   * @param data
   */
  getPdfById(id: string) : Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/quote-requests/${id}/pdf_rfq/`)
  }

  /**
   * add new data
   * @param dataForm
   */
  sendEmail(id: string, dataForm: {}) : Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/quote-requests/${id}/send_mail/`, dataForm)
  }

  getProjectTypes(search: string): Observable<any[]> {
    let params = new HttpParams();
    search ? (params = params.append('search', search)) : null;
    return this.http.get<any[]>(
      `${this.baseUrl}/catalogs/project-types`,
      { params }
    );
  }

  getDesignTypes(search: string): Observable<any[]> {
    let params = new HttpParams();
    search ? (params = params.append('search', search)) : null;
    return this.http.get<any[]>(
      `${this.baseUrl}/catalogs/design-types`,
      { params }
    );
  }


  getElectricTypes(search: string): Observable<any[]> {
    let params = new HttpParams();
    search ? (params = params.append('search', search)) : null;
    return this.http.get<any[]>(
      `${this.baseUrl}/catalogs/electric-types`,
      { params }
    );
  }

  getEnergyTypes(search: string): Observable<any[]> {
    let params = new HttpParams();
    search ? (params = params.append('search', search)) : null;
    return this.http.get<any[]>(
      `${this.baseUrl}/catalogs/energy-types`,
      { params }
    );
  }

  getManufactureTypes(search: string): Observable<any[]> {
    let params = new HttpParams();
    search ? (params = params.append('search', search)) : null;
    return this.http.get<any[]>(
      `${this.baseUrl}/catalogs/manufacture-types`,
      { params }
    );
  }

  getStandardTypes(search: string): Observable<any[]> {
    let params = new HttpParams();
    search ? (params = params.append('search', search)) : null;
    return this.http.get<any[]>(
      `${this.baseUrl}/catalogs/standard-types`,
      { params }
    );
  }

  getWorkHeightTypes(search: string): Observable<any[]> {
    let params = new HttpParams();
    search ? (params = params.append('search', search)) : null;
    return this.http.get<any[]>(
      `${this.baseUrl}/catalogs/work-height-types`,
      { params }
    );
  }

  getHotWorkTypes(search: string): Observable<any[]> {
    let params = new HttpParams();
    search ? (params = params.append('search', search)) : null;
    return this.http.get<any[]>(
      `${this.baseUrl}/catalogs/hot-work-types`,
      { params }
    );
  }

  getLoadingEquipment(search: string): Observable<any[]> {
    let params = new HttpParams();
    search ? (params = params.append('search', search)) : null;
    return this.http.get<any[]>(
      `${this.baseUrl}/catalogs/loading-equipment-types`,
      { params }
    );
  }

}
