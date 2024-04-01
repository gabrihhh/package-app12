import { AfterViewInit, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public valor: string | null= "20:20:20"
  public teste2:boolean = true

  teste(){
    console.log(this.valor)
  }
  mudar(){
    this.teste2 = !this.teste2
  }
}
