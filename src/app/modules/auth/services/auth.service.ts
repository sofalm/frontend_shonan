import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, tap} from "rxjs";
import {
  Company, Country, Employee,
  Login, MessageDetail,
  MessageVerify,
  ProfileUser,
  User
} from "../interfaces/auth.interface";
import {LocalStorageService} from "../../../shared/services/local-storage-service";
import {environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl
  private _user!: User;

  // get Data User
  get user() {
    return{...this._user}
  }

  constructor(private http: HttpClient,
              private localStorage: LocalStorageService) {}

  // Login Access
  login(login: FormData):Observable<Login>{
    return this.http.post<Login>(`${this.baseUrl}/authentication/login/`, login)
      .pipe(
        tap(resp => {
          if (resp.code === 200) {
              localStorage.setItem('access_token', resp.data.access_token)
              this.localStorage.set('user', resp.data.user);
                this._user = {
                    access: resp.data.access_token,
                }
          }
        }),
        catchError(err => of(err))
      )
  }

  // Method Validate Token
  validateToken(): Observable<boolean>{
    const url = `${this.baseUrl}/authentication/profile`
    return this.http.get<ProfileUser>(url)
      .pipe(
        map((resp:any) => {

          this.localStorage.set('employee_id', resp.data.employee.id);
          this.localStorage.set('company_id', resp.data.company.id);
          this.localStorage.set('user_id', resp.data.user.id);
          this.localStorage.set('group', resp.data.employee.employee_group.id);
          //this.localStorage.set('job_center_id', resp.data.employee.job_center?.id);
          // If exist Email is authenticated
          return !!resp.data.user.id;
        }),
        catchError(err => of(false))
      )
  }

  // Add Mew company
  registerCompany(company: Company) : Observable<MessageDetail>{
    return this.http.post<MessageDetail>(`${this.baseUrl}/authentication/register/`, company)
  }

  // Get User
  getUser() : Observable<ProfileUser> {
    return this.http.get<ProfileUser>(`${this.baseUrl}/authentication/profile/`)
  }

  // Update Data Profile
  updateProfile(profileUser: Employee) : Observable<Employee> {
    return this.http.patch<Employee>(`${this.baseUrl}/employees/${profileUser.id}/`, profileUser)
  }

  // Update Avatar
  updateAvatarProfile(id: string | undefined, avatar: FormData) : Observable<Employee> {
    return this.http.patch<Employee>(`${this.baseUrl}/employees/${id}/`, avatar)
  }

  // Update Avatar
  deleteAvatarProfile(id: string | undefined) : Observable<Employee> {
    let avatar = {avatar : null};
    return this.http.patch<Employee>(`${this.baseUrl}/employees/${id}/`, avatar)
  }

  // Code Confirmation
  sendVerify(data: MessageVerify) : Observable<Login>{
    return this.http.post<Login>(`${this.baseUrl}/authentication/verify_account`, data)
  }

  // Code Resend Confirmation
  sendResendVerify(data: MessageVerify) : Observable<MessageDetail>{
    return this.http.post<MessageDetail>(`${this.baseUrl}/authentication/resend_confirmation_code`, data)
  }

  // Get Countries
  getCountries() : Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}/catalogs/countries/`)
  }

}
