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
  mudarvalue(){
    if(this.valor){
      this.valor = null
    }else{
      this.valor = "20:20:20"
    }
  }
  mudardisabled(){
    this.teste2 = !this.teste2
  }
}
