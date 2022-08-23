import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { AlertService } from '../../services/alert.service';
import { ProductosService } from '../../services/productos.service';
import { VentasMayoristasService } from '../../services/ventas-mayoristas.service';
import gsap from 'gsap';

@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.component.html',
  styles: [
  ]
})
export class NuevoPedidoComponent implements OnInit {

  // Modal
  public showModal = false;

  // Variables
  public precioCarrito: number = 0;
  public productos: any[] = [];
  public cantidad: number = null;
  public productoSeleccionado: any = null;
  public carrito: any[] = [];

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
              private authService: AuthService,
              private alertService: AlertService,
              private ventasMayoristasService: VentasMayoristasService,
              private productosService: ProductosService) { }

  ngOnInit(): void {
    this.dataService.ubicacionActual = "Dashboard - Nuevo pedido";
    gsap.from('.gsap-contenido', { y:100, opacity: 0, duration: .2 });
    this.recuperarLocalStorage();
    this.listarProductos();
  }

  // Listado de productos
  listarProductos(): void {
    this.alertService.loading();
    this.productosService.listarProductos().subscribe({
      next: ({productos}) => {
        this.productos = productos.filter( producto => producto.precio_mayorista );
        this.alertService.close();
      },
      error: ({error}) => {
        this.alertService.errorApi(error.message);
      }
    });  
  }

  // Agregar producto
  agregarProducto(): void {
    
    let repetido = false;
    
    // Verificacion: Producto repetido
    this.carrito.find( elemento => {
      if(elemento._id === this.productoSeleccionado._id){
        repetido = true;
        elemento.cantidad += this.dataService.redondear(this.cantidad, 2);
        elemento.precio += this.dataService.redondear(this.productoSeleccionado.precio_mayorista * this.cantidad, 2);
      }
    });

    // Se agrega si el producto no esta cargado en el carrito
    if(!repetido) this.carrito.unshift(
      {
        producto: this.productoSeleccionado, 
        descripcion: this.productoSeleccionado.descripcion,
        precio_unitario: this.productoSeleccionado.precio_mayorista,
        precio: this.productoSeleccionado.precio_mayorista * this.cantidad,
        unidad_medida: this.productoSeleccionado.unidad_medida._id,
        unidad_medida_descripcion: this.productoSeleccionado.unidad_medida.descripcion,
        cantidad: this.cantidad, 
        precio_total: this.dataService.redondear(this.productoSeleccionado.precio_mayorista * this.cantidad, 2),
        creatorUser: this.authService.mayorista.mayoristaId,
        updatorUser: this.authService.mayorista.mayoristaId
      }
    );

    this.calculoPrecio();
    this.cerrarSeleccion();

  }

  // Eliminar producto
  eliminarProducto(producto: any): void {
    this.alertService.question({ msg: 'Eliminando producto', buttonText: 'Eliminar' })
        .then(({isConfirmed}) => {  
        if(isConfirmed){
          this.carrito = this.carrito.filter( elemento => elemento.producto._id !== producto.producto._id)
          this.calculoPrecio();
        };  
    });
  }

  // Calculo precio
  calculoPrecio(): void {
    let precioTMP = 0;
    this.carrito.map( elemento => {
      precioTMP += elemento.precio_total;
    })
    this.precioCarrito = precioTMP;
    this.almacenarLocalStorage();    
  }

  // Recuperar info del localStorage
  recuperarLocalStorage(): void {
    this.precioCarrito = localStorage.getItem('precioCarrito') ? JSON.parse(localStorage.getItem('precioCarrito')) : 0; 
    this.carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : []; 
  }

  // Almacenar en localStorage
  almacenarLocalStorage(): void {
    localStorage.setItem('precioCarrito', JSON.stringify(this.precioCarrito));
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  // Crear nuevo pedido
  crearPedido(): void {
    this.alertService.question({ msg: 'Enviando pedido', buttonText: 'Enviar' })
        .then(({isConfirmed}) => {  
        if(isConfirmed){
          
          this.alertService.loading();

          const data = {
            pedido: {
              mayorista: this.authService.mayorista.mayoristaId,
              precio_total: this.precioCarrito,
              creatorUser: this.authService.mayorista.mayoristaId,
              updatorUser: this.authService.mayorista.mayoristaId
            },
            productos: this.carrito
          };
          
          this.ventasMayoristasService.nuevaVenta(data).subscribe({
            next: () => {
              this.alertService.success('Pedido enviado!');
              this.reiniciarPedido();
            },
            error: ({error}) => {
              this.alertService.errorApi(error.message);
            }
          })

        };  
    });
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

  // Reiniciar pedido
  reiniciarPedido(): void {
    this.productoSeleccionado = null;
    this.carrito = [];
    this.cantidad = 0;
    this.precioCarrito = 0; 
    this.almacenarLocalStorage();      
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
