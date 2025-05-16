import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // <--- Importa RouterModule aquí también

@Component({
  selector: 'app-educativo2',
  imports: [RouterModule],
  templateUrl: './educativo2.component.html',
  styleUrl: './educativo2.component.css'
})
export class Educativo2Component implements OnDestroy {
  constructor(private router: Router) { }
  ngOnDestroy(): void {
    
  }
  // IrAlJuego(){
  //   this.router.navigate(['/camino-reciclaje'])
  // }

}
