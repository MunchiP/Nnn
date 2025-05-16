// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-animacion-principal',
//   imports: [],
//   templateUrl: './animacion-principal.component.html',
//   styleUrl: './animacion-principal.component.css'
// })
// export class AnimacionPrincipalComponent {

//   constructor(private router: Router) {}

//   onVideoEnd() {
//     const container = document.querySelector('.fullscreen-video-container');
//     if (container) {
//       container.classList.add('fade-out');
//       setTimeout(() => {
//         this.router
//         .navigate(['/Formulario']);
//       }, 1000);
//     } else {
//       this.router.navigate(['/Formulario']);
//     }
//   }
  
// }


// // import { Component, AfterViewInit } from '@angular/core';
// // import { Router } from '@angular/router';

// // @Component({
// //   selector: 'app-animacion-principal',
// //   templateUrl: './animacion-principal.component.html',
// //   styleUrl: './animacion-principal.component.css'
// // })
// // export class AnimacionPrincipalComponent implements AfterViewInit {

// //   constructor(private router: Router) {}

// //   ngAfterViewInit() {
// //     const video = document.querySelector('video');
// //     if (video) {
// //       const playPromise = video.play();
// //       if (playPromise !== undefined) {
// //         playPromise.catch(error => {
// //           console.warn("El navegador bloqueó autoplay:", error);
// //         });
// //       }
// //     }
// //   }

// //   onVideoEnd() {
// //     const container = document.querySelector('.fullscreen-video-container');
// //     if (container) {
// //       container.classList.add('fade-out');
// //       setTimeout(() => {
// //         this.router.navigate(['/Formulario']);
// //       }, 1000);
// //     } else {
// //       this.router.navigate(['/Formulario']);
// //     }
// //   }
// // }


/////////////////////////////////////////
///////////////////////////////////////////
////////////// Funciona para una sola vez /////////
/////////////////////////////////////////////
// import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-animacion-principal',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './animacion-principal.component.html',
//   styleUrl: './animacion-principal.component.css'
// })
// export class AnimacionPrincipalComponent implements OnInit {
//   @ViewChild('videoContainer') videoContainer!: ElementRef;

//   constructor(private router: Router, private renderer: Renderer2) {}

//   ngOnInit(): void {
//     // Opcional: Puedes agregar lógica adicional aquí si es necesario
//   }

//   onVideoEnd() {
//     if (this.videoContainer) {
//       this.renderer.addClass(this.videoContainer.nativeElement, 'fade-out');
//       setTimeout(() => {
//         this.router.navigate(['/Formulario']);
//       }, 1000);
//     } else {
//       this.router.navigate(['/Formulario']);
//     }
//   }
// }

import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animacion-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animacion-principal.component.html',
  styleUrl: './animacion-principal.component.css'
})
export class AnimacionPrincipalComponent implements OnInit, AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoContainer') videoContainer!: ElementRef;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Puedes realizar otras inicializaciones aquí si es necesario
  }

  ngAfterViewInit(): void {
    if (this.videoElement && this.videoElement.nativeElement) {
      this.videoElement.nativeElement.play();
    }
  }

  onVideoEnd() {
    if (this.videoContainer) {
      this.videoContainer.nativeElement.classList.add('fade-out');
      setTimeout(() => {
        this.router.navigate(['/Formulario']);
      }, 1000);
    } else {
      this.router.navigate(['/Formulario']);
    }
  }
}