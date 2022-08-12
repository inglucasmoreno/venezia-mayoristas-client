import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from '../../services/auth.service';
import { MayoristasService } from '../../services/mayoristas.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-statebar',
  templateUrl: './statebar.component.html',
  styles: [
  ]
})
export class StatebarComponent implements OnInit {

  public showModal = false;

  constructor(public dataService: DataService,
              private alertService: AlertService,
              private mayoristasService: MayoristasService,
              public authService: AuthService) {}

  ngOnInit(): void {}

  reenviarConfirmacion(): void {
    this.alertService.loading();
    this.mayoristasService.correoConfirmacion({
      id: this.authService.mayorista.mayoristaId,
      email: this.authService.mayorista.email,
    }).subscribe({
      next: () => {
        this.alertService.success('Correo de confirmacion reenviado');
        this.showModal = false;
      },
      error: ({error}) => this.alertService.errorApi(error.message),
    })
  }

}
