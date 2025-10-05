import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
//Importamos este schema para reconocer componentes web

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LandingPage implements AfterViewInit {
  furniture_models = [
    { name: 'Mueble 1', src: "/models/1/18_9_2025.glb" },
    { name: 'Mueble 2', src: "/models/2/18_9_2025.glb" },
    { name: 'Mueble 3', src: "/models/3/18_9_2025.glb" }
  ];

  showARView: boolean = false;
  selectedModelSrc: string = '';
  isMobileDevice: boolean = false;
  currentScale: number = 1;
  currentRotation: number = 0;
  isBrowser: boolean;

  @ViewChild('arViewer', { static: false }) arViewer!: ElementRef;

  ngAfterViewInit(): void {
    if (typeof customElements.get('model-viewer') === 'undefined') {
      console.error('Model Viewer not loaded. Check script in index.html');
    }
  }


  onFurnitureClicked(modelSrc: string){
    //Primero, verificamos que el dispositivo usado sea un móbil

    this.selectedModelSrc = modelSrc;
    this.showARView = true;

    setTimeout(() => {
      this.triggerAR();
    }, 100);
  }

  closeARView() {
    this.showARView = false;
  }

  triggerAR() {
    if (!this.isBrowser) return;

    const arButton = document.getElementById("ar-button") as HTMLElement;
    if (arButton) {
      arButton.click();
    }
  }

  requestCameraPermission() {
    if (!this.isBrowser) return;

    if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {
          console.log('Camera access granted');
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
