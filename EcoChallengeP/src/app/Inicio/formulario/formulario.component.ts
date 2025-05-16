import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UsuarioService } from '../usuario.service'; // <-- 1. Importa tu servicio
// import { HttpClientModule } from '@angular/common/http';
// import { Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
// Los mínimos para que un formulario funcione
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
// El único que se exporta abajo
import {  ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// Ruteo
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-formulario',
  imports: [    ReactiveFormsModule, CommonModule, RouterModule, HttpClientModule,],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

    registroForm: FormGroup;

      constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private router: Router,
      ) {
        this.registroForm = this.fb.group({
          email:['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]],
        })
      }

      onSubmit(): void{
        if(this.registroForm){
          const credenciales = this.registroForm.value;

          this.http.get('http://localhost:8080/api/udemy/user/iniciar-sesion', credenciales).subscribe({
            next:(response: any) => {
              console.log('inicio exitoso', response);
              // localStorage.setItem('token',response.token)
              this.router.navigate(['/InicioPrivado'])
            },
            error: (error) => {
              console.error('Error en el inicio de sesion', error);
              alert('Correo o contraseña incorrectos')
            },
          })
        } else {
          alert('Por favor completa el formulario correctamente')
        }
      }











































// Código que tenía Andres, se reemplaza porque genera error el ts que él creo 

//  registroForm!: FormGroup; // Usa '!' para indicar que se inicializará en ngOnInit o constructor

//   // Inyecta FormBuilder y tu UsuarioService
//   constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) { // <-- 2. Inyecta el servicio
//     // Puedes inicializar aquí también si prefieres:
//     this.registroForm = this.fb.group({});
//   }

//   ngOnInit(): void {
//     // Define la estructura y validaciones del formulario
//     this.registroForm = this.fb.group({
//       nombre: ['', Validators.required],
//       apellido: ['', Validators.required],
//       genero: ['', Validators.required],
//       edad: ['', [Validators.required, Validators.min(5), Validators.max(18)]]
//     });
//   }

//   onSubmit(): void {
//     if (this.registroForm.valid) {
//       console.log('Formulario válido. Enviando datos...');

//       // 3. Llama al servicio para enviar los datos al backend
//       this.usuarioService.registrarUsuario(this.registroForm.value).subscribe({
//         next: (respuestaBackend) => {
//           // Esto se ejecuta si la petición POST fue exitosa (ej. código 200, 201)
//           console.log('✅ Registro exitoso:', respuestaBackend);
//           alert('¡Registro exitoso!');
//           this.router.navigate(['/educativo1']);
//           // Aquí podrías redirigir al usuario a otra página,
//           // mostrar un mensaje de éxito en la interfaz, etc.
//           this.registroForm.reset(); // Opcional: resetear el formulario después de éxito
//         },
//         error: (errorBackend) => {
//           // Esto se ejecuta si hubo un error en la petición (ej. 400 Bad Request, 500 Internal Server Error)
//           console.error('❌ Error en el registro:', errorBackend);
//           alert('Hubo un error en el registro. Revisa la consola para más detalles.');
//           // Aquí podrías mostrar errores específicos del backend al usuario
//         },
//         complete: () => {
//           // Esto se ejecuta al finalizar la petición (éxito o error)
//           console.log('▶️ Proceso de envío a backend finalizado.');
//         }
//       });

//     } else {
//       console.error('El formulario no es válido. No se enviarán los datos.');
//       // 4. Marca los campos como 'touched' para que se muestren los mensajes de error en el HTML
//       this.registroForm.markAllAsTouched();
//       alert('Por favor, completa el formulario correctamente.'); // Mensaje básico para el usuario
//     }
//   }

//   get nombre() { return this.registroForm.get('nombre'); }
//   get apellido() { return this.registroForm.get('apellido'); }
//   get genero() { return this.registroForm.get('genero'); }
//   get edad() { return this.registroForm.get('edad'); }


}
