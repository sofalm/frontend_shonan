import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {Observable} from "rxjs";
import {DataItems} from "../interfaces/catalog.interface";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient,) { }

  /**
   * Get Project Types
   */
  getProjectTypesPaginate(dataPaginate: any): Observable<DataItems> {
    console.log(dataPaginate)
    let params = new HttpParams();
    dataPaginate.search ? params = params.append('search',  dataPaginate.search) : null;
    dataPaginate.page ? params = params.append('page',  dataPaginate.page) : null;
    dataPaginate.page_size ? params = params.append('page_size',  dataPaginate.page_size): null;
    dataPaginate.is_active ? params = params.append('is_active',  dataPaginate.is_active): null;
    return this.http.get<DataItems>(`${this.baseUrl}/catalogs/project-types/`, {params});
  }

  /**
   * Get Design Types
   */
  getDesignsPaginate(dataPaginate: any): Observable<DataItems> {
    let params = new HttpParams();
    dataPaginate.search ? params = params.append('search',  dataPaginate.search) : null;
    dataPaginate.page ? params = params.append('page',  dataPaginate.page) : null;
    dataPaginate.page_size ? params = params.append('page_size',  dataPaginate.page_size): null;
    dataPaginate.is_active ? params = params.append('is_active',  dataPaginate.is_active): null;
    return this.http.get<DataItems>(`${this.baseUrl}/catalogs/design-types/`, {params});
  }

  /**
   * Get Electric Types
   */
  getElectricsPaginate(dataPaginate: any): Observable<DataItems> {
    let params = new HttpParams();
    dataPaginate.search ? params = params.append('search',  dataPaginate.search) : null;
    dataPaginate.page ? params = params.append('page',  dataPaginate.page) : null;
    dataPaginate.page_size ? params = params.append('page_size',  dataPaginate.page_size): null;
    dataPaginate.is_active ? params = params.append('is_active',  dataPaginate.is_active): null;
    return this.http.get<DataItems>(`${this.baseUrl}/catalogs/electric-types/`, {params});
  }

  /**
   * Get Energy Types
   */
  getEnergiesPaginate(dataPaginate: any): Observable<DataItems> {
    let params = new HttpParams();
    dataPaginate.search ? params = params.append('search',  dataPaginate.search) : null;
    dataPaginate.page ? params = params.append('page',  dataPaginate.page) : null;
    dataPaginate.page_size ? params = params.append('page_size',  dataPaginate.page_size): null;
    dataPaginate.is_active ? params = params.append('is_active',  dataPaginate.is_active): null;
    return this.http.get<DataItems>(`${this.baseUrl}/catalogs/energy-types/`, {params});
  }


  /**
   * Get Manufacture Types
   */
  getManufacturesPaginate(dataPaginate: any): Observable<DataItems> {
    let params = new HttpParams();
    dataPaginate.search ? params = params.append('search',  dataPaginate.search) : null;
    dataPaginate.page ? params = params.append('page',  dataPaginate.page) : null;
    dataPaginate.page_size ? params = params.append('page_size',  dataPaginate.page_size): null;
    dataPaginate.is_active ? params = params.append('is_active',  dataPaginate.is_active): null;
    return this.http.get<DataItems>(`${this.baseUrl}/catalogs/manufacture-types/`, {params});
  }

  /**
   * Get Standard Types
   */
  getStandardsPaginate(dataPaginate: any): Observable<DataItems> {
    let params = new HttpParams();
    dataPaginate.search ? params = params.append('search',  dataPaginate.search) : null;
    dataPaginate.page ? params = params.append('page',  dataPaginate.page) : null;
    dataPaginate.page_size ? params = params.append('page_size',  dataPaginate.page_size): null;
    dataPaginate.is_active ? params = params.append('is_active',  dataPaginate.is_active): null;
    return this.http.get<DataItems>(`${this.baseUrl}/catalogs/standard-types/`, {params});
  }

  /**
   * Get Work Heights Types
   */
  getWorkHeightsPaginate(dataPaginate: any): Observable<DataItems> {
    let params = new HttpParams();
    dataPaginate.search ? params = params.append('search',  dataPaginate.search) : null;
    dataPaginate.page ? params = params.append('page',  dataPaginate.page) : null;
    dataPaginate.page_size ? params = params.append('page_size',  dataPaginate.page_size): null;
    dataPaginate.is_active ? params = params.append('is_active',  dataPaginate.is_active): null;
    return this.http.get<DataItems>(`${this.baseUrl}/catalogs/work-height-types/`, {params});
  }


  /**
   * Get Work Heights Types
   */
  getHotWorksPaginate(dataPaginate: any): Observable<DataItems> {
    let params = new HttpParams();
    dataPaginate.search ? params = params.append('search',  dataPaginate.search) : null;
    dataPaginate.page ? params = params.append('page',  dataPaginate.page) : null;
    dataPaginate.page_size ? params = params.append('page_size',  dataPaginate.page_size): null;
    dataPaginate.is_active ? params = params.append('is_active',  dataPaginate.is_active): null;
    return this.http.get<DataItems>(`${this.baseUrl}/catalogs/hot-work-types/`, {params});
  }

  /**
   * Get Loading Equipment Types
   */
  getLoadingEquipmentsPaginate(dataPaginate: any): Observable<DataItems> {
    let params = new HttpParams();
    dataPaginate.search ? params = params.append('search',  dataPaginate.search) : null;
    dataPaginate.page ? params = params.append('page',  dataPaginate.page) : null;
    dataPaginate.page_size ? params = params.append('page_size',  dataPaginate.page_size): null;
    dataPaginate.is_active ? params = params.append('is_active',  dataPaginate.is_active): null;
    return this.http.get<DataItems>(`${this.baseUrl}/catalogs/loading-equipment-types/`, {params});
  }

  /**
   * get Data by Id
   * @param data
   */
  getItemById(data: any, url: string) : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${url}${data.id}/`)
  }

  /**
   * add new data
   * @param dataForm
   */
  addItem(dataForm: {}, url: string) : Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${url}`, dataForm)
  }

  /**
   * edit with put data
   * @param dataForm
   */
  updateItem(dataForm: any, url: string) : Observable<any> {
    console.log(dataForm)
    return this.http.put<any>(`${this.baseUrl}${url}${dataForm.id}/`, dataForm)
  }

  /**
   * edit with put data
   * @param form
   * @param dataForm
   */
  patchItem(dataForm: any, form: FormData) : Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/inventories/entries/${dataForm.id}/`, form)
  }

  /**
   * delete
   * @param id
   */
  deleteItem(id: string, url: string) : Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}${url}${id}`)
  }


}
