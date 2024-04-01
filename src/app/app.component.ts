import { AfterViewInit, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public valor: string | null= null
  public maximo:string = '00:00:00'

  teste(){
    console.log(this.valor)
  }
  mudar(){
    this.valor = "20:20:20"
  }
}
