// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-fin',
//   imports: [],
//   templateUrl: './fin.component.html',
//   styleUrl: './fin.component.css'
// })
// export class FinComponent {

//     constructor(private router: Router) {}

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


import { Component, OnInit, AfterViewInit,  ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fin',
    standalone: true,
  imports: [CommonModule],
  templateUrl: './fin.component.html',
  styleUrl: './fin.component.css'
})
export class FinComponent  implements OnInit, AfterViewInit {
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
