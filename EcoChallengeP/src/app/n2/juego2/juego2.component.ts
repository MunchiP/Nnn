import { Component, HostListener, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';;
// Ruteo
import { RouterModule } from '@angular/router';

// se agrega para el for
import { CommonModule } from '@angular/common';

interface Basura {
  x: number;
  y: number;
  recogida: boolean;
  color: 'Organico' | 'No Aprovechable' | 'Aprovechable';
  isCarried: boolean;
  imageSrc?: string;
}


@Component({
  selector: 'app-juego2',
  imports: [RouterModule, CommonModule],
  templateUrl: './juego2.component.html',
  styleUrl: './juego2.component.css'
})
export class Juego2Component implements OnInit {
personajeX = 50;
  personajeY = 50;
  personajeWidth = 50;
  personajeHeight = 50;

  basuras: Basura[] = [];
  carriedBasura: Basura | null = null;

  readonly gameAreaWidth = 1280;
  readonly gameAreaHeight = 720;
  readonly basuraWidth = 30;
  readonly basuraHeight = 30;

  totalBasuras = 0;
  basurasRecogidas = 0;
  juegoTerminado = false;

  readonly binAreas = [
    { type: 'Organico', x: 120, y: 280, width: 125, height: 125 },
    { type: 'No Aprovechable', x: 605, y: 287, width: 125, height: 125 },
    { type: 'Aprovechable', x: 1045, y: 297, width: 125, height: 125 },
  ];

  @ViewChild('gameContainer') gameContainer!: ElementRef<HTMLDivElement>;

  // Inyecta NgZone y Router (si lo usas) en el constructor
  constructor(
    private zone: NgZone
    // private router: Router // Descomentar si usas Router para navegar
  ) { }

  ngOnInit(): void {
    this.generarBasuras();
  }

  generarBasuras(): void {
    const colores: ('Organico' | 'No Aprovechable' | 'Aprovechable')[] = ['Organico', 'No Aprovechable', 'Aprovechable'];
    const cantidadPorColor = 5;

    const maxX = this.gameAreaWidth - this.basuraWidth;
    const maxY = this.gameAreaHeight - this.basuraHeight;

    this.basuras = [];

    this.totalBasuras = 0;
    this.basurasRecogidas = 0;
    this.juegoTerminado = false;


    colores.forEach(color => {
      for (let i = 0; i < cantidadPorColor; i++) {
        const imagesForColor = this.basuraImageMap[color];
        const randomIndex = Math.floor(Math.random() * imagesForColor.length);
        const randomImageSrc = imagesForColor[randomIndex];

        this.basuras.push({
          x: Math.floor(Math.random() * maxX),
          y: Math.floor(Math.random() * maxY),
          recogida: false,
          color: color,
          isCarried: false,
          imageSrc: randomImageSrc
        });

          this.totalBasuras++;
      }
    });

    console.log('Basuras generadas:', this.basuras);
    console.log('Total de basuras a recoger:', this.totalBasuras);
  }

  readonly basuraImageMap: { [key in Basura['color']]: string[] } = {
    'Organico': [
      '/assets/2_Andres/educativo/cascara-banana3.png',
      '/assets/2_Andres/educativo/manzana1.png',
      '/assets/2_Andres/educativo/hueso-final2.png'
    ],
    'No Aprovechable': [
      '/assets/2_Andres/educativo/servilleta-final.png',
      '/assets/2_Andres/educativo/higienico-final.png',
    ],
    'Aprovechable': [
      '/assets/2_Andres/educativo/lata-bebida-final.png',
      '/assets/2_Andres/educativo/carton-final.png',
      '/assets/2_Andres/educativo/papel-final.jpg'
    ],
  };

  moverPersonaje(event: KeyboardEvent): void {
    if (this.juegoTerminado) {
        return;
    }

    const velocidad = 10;
    let newX = this.personajeX;
    let newY = this.personajeY;

    switch (event.key) {
      case 'ArrowUp': newY -= velocidad; break;
      case 'ArrowDown': newY += velocidad; break;
      case 'ArrowLeft': newX -= velocidad; break;
      case 'ArrowRight': newX += velocidad; break;
      default: return;
    }

    this.personajeX = Math.max(0, Math.min(newX, this.gameAreaWidth - this.personajeWidth));
    this.personajeY = Math.max(0, Math.min(newY, this.gameAreaHeight - this.personajeHeight));

    if (this.carriedBasura) {
      const offsetX = 10;
      const offsetY = 10;
      this.carriedBasura.x = this.personajeX + offsetX;
      this.carriedBasura.y = this.personajeY + offsetY;
    }

    this.detectarColisiones();
  }

  detectarColisiones(): void {
    if (this.carriedBasura === null && !this.juegoTerminado) {
      for (const basura of this.basuras) {
        if (!basura.recogida && !basura.isCarried) {
          const colisionX = this.personajeX < basura.x + this.basuraWidth &&
            this.personajeX + this.personajeWidth > basura.x;
          const colisionY = this.personajeY < basura.y + this.basuraHeight &&
            this.personajeY + this.personajeHeight > basura.y;

          if (colisionX && colisionY) {
            basura.isCarried = true;
            this.carriedBasura = basura;
            break;
          }
        }
      }
    }
  }

  soltarBasura(): void {
    if (this.carriedBasura && !this.juegoTerminado) {
      console.log('Intentando soltar basura...');
      console.log('Basura llevada:', this.carriedBasura);
      let droppedCorrectly = false;

      for (const bin of this.binAreas) {
        const colisionX = this.personajeX < bin.x + bin.width && this.personajeX + this.personajeWidth > bin.x;
        const colisionY = this.personajeY < bin.y + bin.height && this.personajeY + this.personajeHeight > bin.y;

        console.log(`Colisión calculada con ${bin.type}: X=${colisionX}, Y=${colisionY}`);

        if (colisionX && colisionY) {
          console.log(`¡Colisión detectada con caneca ${bin.type}!`);
          console.log(`Comparando color basura "${this.carriedBasura.color}" con tipo caneca "${bin.type}"`);
          if (this.carriedBasura.color === bin.type) {
            alert('¡¡¡CLASIFICACIÓN CORRECTA SIGUE ASI!!!');
            this.carriedBasura.recogida = true;
            droppedCorrectly = true;

            this.basurasRecogidas++;
            console.log(`Basuras recogidas: ${this.basurasRecogidas}/${this.totalBasuras}`);

            if (this.basurasRecogidas === this.totalBasuras) {
              this.juegoTerminado = true;
              this.finalizarJuego();
            }

            break;
          } else {
            alert('Clasificación Incorrecta.');
             // Opcional: podrías no marcarla como recogida y dejarla caer en una posición cercana
             // this.carriedBasura.x = this.personajeX + 20; // Ejemplo: la deja caer cerca
             // this.carriedBasura.y = this.personajeY + 20; // Ejemplo: la deja caer cerca
          }
        }
      }
        // Independientemente de si fue correcta o no, la basura ya no se lleva
        this.carriedBasura.isCarried = false;
        this.carriedBasura = null;
    }
  }

  finalizarJuego(): void {
      this.zone.run(() => {
          alert('¡Felicidades! Has clasificado toda la basura correctamente.');
          console.log('¡Juego Terminado!');
          // Aquí puedes añadir lógica adicional, como habilitar el botón de Nivel 3
          // o mostrar un mensaje en pantalla.
      });
  }

  // --- NUEVO MÉTODO PARA MANEJAR EL CLIC DEL BOTÓN IR A NIVEL 3 ---
  irANivel3(): void {
    if (this.juegoTerminado) {
      // Aquí pones la lógica para ir al Nivel 3
      alert('¡Pasando al Nivel 3!');
      console.log('Navegando al Nivel 3...');
      // Ejemplo de navegación usando Angular Router:
      // this.router.navigate(['/nivel3']);
    } else {
      alert('¡Aún hay basura por clasificar! Completa el nivel actual.');
    }
  }
  // ---------------------------------------------------------------


  @HostListener('window:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (this.juegoTerminado) {
        return;
    }

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
      this.moverPersonaje(event);
    } else if (event.key === ' ') {
      event.preventDefault();
      this.soltarBasura();
    }
  }
}
