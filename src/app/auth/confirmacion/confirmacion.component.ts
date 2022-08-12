import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import gsap from 'gsap';
import { AlertService } from 'src/app/services/alert.service';
import { MayoristasService } from 'src/app/services/mayoristas.service';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styles: [
  ]
})
export class ConfirmacionComponent implements OnInit {

  public estado = '';

  constructor(private alertService: AlertService,
              private activatedRoute: ActivatedRoute,
              private mayoristasService: MayoristasService) { }

  ngOnInit(): void {
    gsap.from('.gsap-contenido', { y:100, opacity: 0, duration: .2 });
    this.alertService.loading();
    this.activatedRoute.params.subscribe({
      next: ({id}) => {
        this.mayoristasService.actualizarMayorista(id, { confirm: true }).subscribe({
          next: () => {
            this.estado = 'exito';
            this.alertService.close();
          }, error: ({error}) =>{ 
            this.estado = 'error';
            this.alertService.errorApi(error.message)
            console.log()
          }
        })
      }, error: (error) => this.alertService.errorApi(error.message)
    })
    
  }

}
