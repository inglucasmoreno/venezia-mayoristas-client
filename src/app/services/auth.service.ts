import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { LoginForm } from '../interfaces/login-form.inteface';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MayoristaOnline } from '../models/mayoristaLogin.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // Informacion de mayoristas logueado
  public mayorista: MayoristaOnline;

  constructor(private http: HttpClient,
              private router: Router) {}
  
  // Login de mayorista
  login( data: LoginForm ): Observable<any>{
    console.log(data);
    return this.http.post(`${baseUrl}/auth/login`, data)
                    .pipe(
                      tap( ({token}) => {
                        const tokenSend = 'bearer ' + token;
                        localStorage.setItem('token', tokenSend);
                      })
                    )    
  }

  // Cerrar sesion
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }

  // Validar token
  validarToken(): Observable<any>{
    
    // Se obtiene el token desde el localstorage
    const token = localStorage.getItem('token');
    
    return this.http.get(`${baseUrl}/profile`, {
      headers: { Authorization: token }
    }).pipe(
      map( (resp: any) => {
        const { mayoristaId, email, descripcion, confirm, role, activo} = resp.mayorista;
        this.mayorista = new MayoristaOnline( mayoristaId, email, descripcion, confirm, role, activo );
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(error => of(false)) // el of permite devolver un observable<boolean>(false)
    );
  
  }

  // Devuelve "true" si es ADMIN o "false" si no lo es
  validarAdmin(): Observable<boolean>{
    const token = localStorage.getItem('token');
    return this.http.get(`${baseUrl}/profile`,{headers:{'Authorization': token}}).pipe(
      map( (resp: any) => {
        if(resp.mayorista.role === 'ADMIN_ROLE'){
          return true;
        }else{
          return false;
        }      
      })
    );
  }

  // Proteccion de login
  proteccionLogin(): Observable<boolean>{
    const token = localStorage.getItem('token');
    return this.http.get(`${baseUrl}/auth`, {
      headers: { 'x-token': token }
    }).pipe(
      map(() => {
        return false;
      }),
      catchError( error => of(true) )
      );
  }
  
}
