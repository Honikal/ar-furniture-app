import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
//Importamos este schema para reconocer componentes web

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  //Permite el model viewer
})
export class LandingPage implements AfterViewInit, OnInit {
  furniture_models = [
    { name: 'Mueble 1', src: "/models/1/18_9_2025.glb"},
    { name: 'Mueble 2', src: "/models/2/18_9_2025.glb"},
    { name: 'Mueble 3', src: "/models/3/18_9_2025.glb"}
  ];

  showARView : boolean = false;
  selectedModelSrc : string = '';
  isMobileDevice : boolean = false;
  currentScale : number = 1;
  currentRotation : number = 0;

  @ViewChild('arViewer', { static: false }) arViewer!: ElementRef;

  //Llamamos al constructor para que se cheque que elemento se está usando en la aplicación
  ngOnInit(){
    this.checkMobileDevice();
  }

  ngAfterViewInit(): void {
    //Checamos si el model-viewer es seteado o cargado de forma correcta
    if (typeof customElements.get('model-viewer') === 'undefined') {
      console.error('Model Viewer not loaded. Check script in index.html');
    }
  }

  checkMobileDevice(){
    //Esta función llamada por el constructor se encarga de verificar que la aplicación esté accedida desde un dispositivo móbil
    this.isMobileDevice = (typeof window.screen.orientation !== undefined) || 
                        (navigator.userAgent.indexOf('IEMobile') !== -1);
  }

  onFurnitureClicked(modelSrc: string){
    //Primero, verificamos que el dispositivo usado sea un móbil
    if (!this.isMobileDevice){
      alert("Por favor, accede desde un dispositivo móvil para experimentar la realidad aumentada.");
      return;
    }

    //Asignamos los datos del model y activamos el modo AR
    this.selectedModelSrc = modelSrc;
    this.showARView = true;

    //Esperamos para renderizar el modal
    setTimeout(() => {
      this.triggerAR();
    }, 100);
  }

  closeARView(){
    //Apagamos el modal de vista AR
    this.showARView = false;
  }

  triggerAR(){ 
    const arButton = document.getElementById("ar-button") as HTMLElement;
    if (arButton){
      arButton.click();
    }
  }

  requestCameraPermission(){
    //Se encarga de solicitar el permiso del uso de la cámara para usar el AR
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {
          console.log('Camera access granted');
          // Camera permission granted, we can proceed with AR
        })
        .catch(err => {
          console.error('Camera access denied:', err);
          alert('Se necesita acceso a la cámara para usar la función de RA.');
          this.closeARView();
        });
    } else {
      alert('Su dispositivo no es compatible con la función de RA.');
    }
  }
  
}
