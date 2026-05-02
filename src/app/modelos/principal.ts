export interface Distrito {
  id: number;
  codigo: string;
  nombre: string;
  idMunicipio: number;
}

export interface Municipio {
  id: number;
  codigo: string;
  nombre: string;
  idDepartamento: number;
  distritos: Distrito[];
}

export interface Departamento {
  id: number;
  codigo: string;
  nombre: string;
  municipios: Municipio[];
}
