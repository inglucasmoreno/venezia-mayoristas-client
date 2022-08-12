import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from '../../services/alert.service';
import { DataService } from 'src/app/services/data.service';
import gsap from 'gsap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MayoristasService } from 'src/app/services/mayoristas.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  constructor(private authService: AuthService,
              private dataService: DataService,
              private fb: FormBuilder,
              private mayoristasService: MayoristasService,
              private alertService: AlertService) { }

  public mayoristaLogin: any;
  public passwordForm: FormGroup;

  ngOnInit(): void {
    gsap.from('.gsap-contenido', { y:100, opacity: 0, duration: .2 });
    this.dataService.ubicacionActual = "Dashboard - Perfil";
    this.getMayorista();
    
    // Formulario reactivo para password
    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
      repetir: ['', Validators.required]
    });
  }

  // Obtener datos de mayorista
  getMayorista(): void {
    this.alertService.loading();
    this.mayoristasService.getMayorista(this.authService.mayorista.mayoristaId).subscribe( (mayorista: any) => {
      this.alertService.close();
      this.mayoristaLogin = mayorista;
    },({error}) => {
      this.alertService.errorApi(error.msg);
    })
  }

  // Actualizar password
  actualizarPassword(): void {
    this.alertService.loading();
    this.mayoristasService.actualizarMayorista(this.mayoristaLogin._id, this.passwordForm.value).subscribe( () => {
      this.reiniciarValores();
      this.alertService.success('Contraseña actualizada');
    },({error}) => { 
      this.alertService.errorApi(error.msg)
    });
  }

  // Reiniciar valores
  reiniciarValores(): void {
    this.passwordForm.patchValue({
      password: '',
      repetir: ''
    });
  }

}
