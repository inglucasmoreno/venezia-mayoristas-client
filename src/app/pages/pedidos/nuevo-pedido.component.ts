import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AlertService } from '../../services/alert.service';
import { ProductosService } from '../../services/productos.service';
import { VentasMayoristasService } from '../../services/ventas-mayoristas.service';

@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.component.html',
  styles: [
  ]
})
export class NuevoPedidoComponent implements OnInit {

  // Modal
  public showModal = true;

  // Variables
  public productos: any[] = [];
  public cantidad: number = null;
  public productoSeleccionado: any = null;
  public carritos: any[] = [];

  // Paginacion
  public paginaActual: number = 1;
  public cantidadItems: number = 10;

  // Filtrado
  public filtro = {
    activo: 'true',
    parametro: ''
  }

  // Ordenar
  public ordenar = {
    direccion: 1,  // Asc (1) | Desc (-1)
    columna: 'descripcion'
  }

  constructor(private dataService: DataService,
              private alertService: AlertService,
              private ventasMayoristasService: VentasMayoristasService,
              private productosService: ProductosService) { }

  ngOnInit(): void {
    this.dataService.ubicacionActual = "Dashboard - Nuevo pedido";
    this.listarProductos();
  }

  // Listado de productos
  listarProductos(): void {
    this.alertService.loading();
    this.productosService.listarProductos().subscribe({
      next: ({productos}) => {
        this.productos = productos;
        this.alertService.close();
      },
      error: ({error}) => {
        this.alertService.errorApi(error.message);
      }
    });  
  }

  // Agregar producto
  agregarProducto(): void {
    console.log('producto');
    this.carritos.unshift({...this.productoSeleccionado, cantidad: this.cantidad});
    this.cerrarSeleccion();
  }

  // Abrir modal
  abrirModal(): void {
    this.showModal = true;
    this.productoSeleccionado = null;
  }

  // Cerrar seleccion de producto
  cerrarSeleccion(): void {
    this.cantidad = null;
    this.productoSeleccionado = null;
  }

  // Producto seleccionado
  seleccionarProducto(producto: any): void {
    this.productoSeleccionado = producto;
  }

  // Filtrar Activo/Inactivo
  filtrarActivos(activo: any): void{
    this.paginaActual = 1;
    this.filtro.activo = activo;
  }

  // Filtrar por Parametro
  filtrarParametro(parametro: string): void{
    this.paginaActual = 1;
    this.filtro.parametro = parametro;
  }

  // Ordenar por columna
  ordenarPorColumna(columna: string){
    this.ordenar.columna = columna;
    this.ordenar.direccion = this.ordenar.direccion == 1 ? -1 : 1; 
    this.alertService.loading();
    this.listarProductos();
  }
  


}
