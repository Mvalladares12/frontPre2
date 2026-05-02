import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Departamento, Municipio} from '../modelos/principal';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  constructor(private http: HttpClient) {

  }

  public getMunicipios():Observable<Municipio[]> {
    return this.http.get<Municipio[]>("http://localhost:8084/municipio");
  }

  public getDepa():Observable<Departamento[]> {
    return this.http.get<Departamento[]>("http://localhost:8084/departamento");
  }
}
