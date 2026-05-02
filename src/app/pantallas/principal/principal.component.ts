import {Component, OnInit, ViewChild} from '@angular/core';
import {PrincipalService} from '../../servicios/principal.service';
import {
  MatTableDataSource, MatTableModule
} from '@angular/material/table';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatFormField, MatInputModule, MatLabel} from '@angular/material/input';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatChip, MatChipSet, MatChipsModule} from '@angular/material/chips';
import {CommonModule, NgForOf} from '@angular/common';
import {MatTooltip, MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Departamento, Distrito, Municipio} from '../../modelos/principal';
import {HasRolesDirective} from 'keycloak-angular';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-principal',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatButtonModule,
    MatExpansionModule,
    MatBadgeModule,
    HasRolesDirective
  ],
  templateUrl: './principal.component.html',
  standalone: true,
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {
  displayedColumns: string[] = ['id', 'codigo', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<Departamento>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data: any;

  constructor(private principalService: PrincipalService) {
    this.dataSource = new MatTableDataSource<Departamento>([]);
  }
  ngOnInit(): void {
    this.cargarMunicipios();
  }

  cargarMunicipios(): void {
    this.principalService.getDepa().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (error) => {
        console.error('Error cargando municipios:', error);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Configurar filtro personalizado
    this.dataSource.filterPredicate = (data: Departamento, filter: string) => {
      const searchStr = (data.nombre + data.codigo + data.id).toLowerCase();
      return searchStr.includes(filter.toLowerCase());
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Método para obtener el nombre de los distritos como string
  getDistritosNombres(distritos: Distrito[]): string {
    return distritos.map(d => d.nombre).join(', ');
  }

  getMunicipiosCount(municipios: Municipio[]): number {
    return municipios.length;
  }

  getTotalDistritosCount(municipios: Municipio[]): number {
    return municipios.reduce((total, municipio) => total + municipio.distritos.length, 0);
  }

  getMunicipiosResumen(municipios: Municipio[]): string {
    if (municipios.length === 0) return 'Sin municipios';
    if (municipios.length <= 2) {
      return municipios.map(m => m.nombre).join(', ');
    }
    return `${municipios[0].nombre}, ${municipios[1].nombre} y ${municipios.length - 2} más`;
  }

  getDistritosPorMunicipio(municipio: Municipio): string {
    if (municipio.distritos.length === 0) return 'Sin distritos';
    return municipio.distritos.map(d => d.nombre).join(', ');
  }

  // Método para contar distritos
  getDistritosCount(distritos: Distrito[]): number {
    return distritos.length;
  }

  // Métodos de acción
  verDetalles(departamento: Departamento) {
    console.log('Ver detalles del departamento:', departamento);
  }

  verMunicipios(departamento: Departamento) {
    console.log('Ver municipios de:', departamento.nombre, departamento.municipios);
  }

  editarDepartamento(departamento: Departamento) {
    console.log('Editar departamento:', departamento);
  }

  eliminarDepartamento(departamento: Departamento) {
    console.log('Eliminar departamento:', departamento);
  }
}
