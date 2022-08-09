import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { AlertService } from '../../services/alert.service';
import gsap from 'gsap';
import { MayoristasService } from '../../services/mayoristas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  
  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  public registerForm = {
    descripcion: '',
    email: '',
    telefono: '',
    direccion: '',
    password: '',
    repetir: ''
  }

  // Modals
  public showRegister = false;

  constructor(private fb: FormBuilder,
              private alertService: AlertService,
              private mayoristasService: MayoristasService,
              private authService: AuthService,
              private router: Router  
  ) {}

  ngOnInit(): void {

    var tl = gsap.timeline({ defaults: { duration: 0.1 } });
    tl.from('.gsap-formulario', { y:-100, opacity: 0, duration: .5 })
      .from('.gsap-fondo', { y:100, opacity: 0, duration: .5 })
      .from('.gsap-imagen', { y:100, opacity: 0, duration: .5 });
  
  }

  login(): void {
    // Verificacion - Datos de acceso
    const { username, password } = this.loginForm.value;      
    if(username.trim() === '' || password.trim() === ''){
      this.alertService.formularioInvalido();
      return;
    }  
    this.alertService.loading();
    this.authService.login(this.loginForm.value).subscribe(()=> {
      this.alertService.close();     
      this.router.navigateByUrl('dashboard/home');
    },({error}) => {
      this.loginForm.setValue({ username: '', password: '' });
      this.alertService.errorApi(error.message);  
    });
  }

  registrar(): void {
    
    const { descripcion, email, telefono, direccion, password, repetir } = this.registerForm;

    console.log(descripcion);

    // Verificar - Descripcion
    if(descripcion.trim() === ''){
      this.alertService.info('Debe colocar nombre o razón social');
      return;
    }

    // Verificar - Correo electronico
    if(email.trim() === ''){
      this.alertService.info('Debe colocar un correo electrónico');
      return;
    }

    // Verificar - Correo electronico
    if(telefono.trim() === ''){
      this.alertService.info('Debe colocar un teléfono');
      return;
    }

    // Verificar - Direccion
    if(direccion.trim() === ''){
      this.alertService.info('Debe colocar una dirección');
      return;
    }

    // Verificar - Password
    if((password.trim() === '' || repetir.trim() === '') || (password !== repetir)){
      this.alertService.info('Contraseña incorrecta');
      return;
    }

    this.alertService.loading();

    this.mayoristasService.nuevoMayorista(this.registerForm).subscribe({
      next: () => {
        this.alertService.close();
        this.showRegister = false;
      },
      error: ({error}) => this.alertService.errorApi(error.message)
    });

  }

  abrirRegister(): void {
    this.showRegister = true;
    this.registerForm = {
      descripcion: '',
      email: '',
      telefono: '',
      direccion: '',
      password: '',
      repetir: ''
    }
  }

}
