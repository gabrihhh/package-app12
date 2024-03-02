import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public valor = '12:00:00'

  teste(){
    console.log(this.valor)
  }
}
