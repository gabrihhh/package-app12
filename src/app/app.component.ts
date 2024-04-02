import { AfterViewInit, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public valor: string | null= "00:00:00"
  public valorDisabled:boolean = true
  public valorMax = "05:00:00"
  public valorMin = '00:00:00'
  public valorSeconds = false
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
    this.valorDisabled = !this.valorDisabled
  }
  mudarMax(){
    if(this.valorMax == "23:59:59"){
      this.valorMax = "999:59:59"
    }else{
      this.valorMax = "23:59:59"
    }
  }
  mudarMin(){
    if(this.valorMin == "00:00:00"){
      this.valorMin = "02:20:20"
    }else{
      this.valorMin = "00:00:00"
    }
  }
  mudarSeconds(){
    this.valorSeconds = !this.valorSeconds
  }
}
