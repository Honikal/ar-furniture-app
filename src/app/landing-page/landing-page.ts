import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//Importamos este schema para reconocer componentes web

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  //Permite el model viewer
})
export class LandingPage {
  furniture_models = [
    { name: 'Mueble 1', src: '../../../public/models/1/18_9_2025.glb'},
    { name: 'Mueble 2', src: "/models/2/18_9_2025.glb"},
    { name: 'Mueble 3', src: "/models/3/18_9_2025.glb"}
  ];

  onFurnitureClicked(index: number){
    alert(`Se ha seleccionado el objeto: ${index}`)
  }
  
}
