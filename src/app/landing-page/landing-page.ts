import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})
export class LandingPage {
  amount_furniture : number[] = [1,2,3];

  onFurnitureClicked(index: number){
    alert(`Se ha seleccionado el objeto: ${index}`)
  }
  
}
