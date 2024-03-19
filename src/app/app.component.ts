import { AfterViewInit, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  public valor = '20:00:00'
  public maximo:string = '00:00:00'

  ngAfterViewInit(): void {

  }
  teste(){
    console.log(this.maximo)
  }
}
