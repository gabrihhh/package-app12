import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-timepicker',
  template: `
  <div [style.width]="widthCss" [style.height]="heightCss" class="timepicker">
    <div id="hour" tabindex="1" (focus)="focus($event)" [style.background-color]="selected==='hour'? cor : 'transparent'" (click)="focus($event)">{{hour.toString().length===1?'0'+this.hour:this.hour}}</div>
    <div>:</div>
    <div id="minute" tabindex="1" (focus)="focus($event)" [style.background-color]="selected==='minute'? cor : 'transparent'" (click)="focus($event)">{{minute.toString().length===1?'0'+this.minute:this.minute}}</div>
    <div *ngIf="needSeconds">:</div>
    <div *ngIf="needSeconds" id="second" tabindex="1" (focus)="focus($event)" [style.background-color]="selected==='second'? cor : 'transparent'" (click)="focus($event)">{{second.toString().length===1?'0'+this.second:this.second}}</div>
  </div>
`,
  styles: [
    `.timepicker{
      border-bottom: 1px solid gray;
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
    }
    div{
      -webkit-user-select: none; /* Safari */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* IE10+/Edge */
      user-select: none;
      cursor:pointer;
    }
    div:focus{
      outline:none;
    }`
  ]
})
export class NgxTimepicker12Component implements OnInit,AfterViewInit{

  @Input() width:number = 100;
  @Input() height:number = 30;
  @Input() font:number = 10;
  @Input() max:string = '23:59:59';
  @Input() response: number|null = null;
  @Input() responseString: string | null = null;
  @Input() needSeconds: boolean = true;
  @Input() type: 'milisecond'|'second'|'minute'| 'hour' | 'time' = 'second'
  @Input() cor:string = "#48b9c7";

  @Output() responseChange = new EventEmitter<any>();
  @Output() responseStringChange = new EventEmitter<any>();
  public widthCss:string = `${this.width}px`;
  public heightCss:string = `${this.height}px`;
  public fontCss:string = `${this.font}px`
  public hour:number = 0;
  public minute:number = 0;
  public second:number = 0;
  public selected:'hour'|'minute'|'second'|null = null;
  public maxHour:number = 0
  public maxMinute:number = 0
  public maxSecond:number = 0

  ngOnInit(): void {
    if(this.max != ''){
      const arrayMax = this.max.split(':');
      this.maxHour=parseInt(arrayMax[0])
      this.maxMinute=parseInt(arrayMax[1])
      this.maxSecond=parseInt(arrayMax[2])
    }
    if(this.responseString){
      let array = this.responseString.split(':');
      if(this.needSeconds){
        this.hour = parseInt(array[0]);
        this.minute = parseInt(array[1]);
        this.second = parseInt(array[2]);
      }else{
        this.hour = parseInt(array[0]);
        this.minute = parseInt(array[1]);
      }
    }
    if(this.response){
      let time = this.response
      if(time>3600){
        this.hour = Math.round(time/3600)
        time -=3600*this.hour
      }
      if(time>60){
        this.minute = Math.round(time/60)
        time -=60*this.minute
      }
      if(time){
        this.second = time
      }
    }
  }

  ngAfterViewInit(): void {
    document.addEventListener('keydown',(e)=>{
      if(e.code == 'Tab'){
        switch(this.selected){
          case 'hour':
            this.selected = 'minute'
            break
          case 'minute':
            this.selected = 'second'
            break
          case 'second':
            this.selected = null
            break
        }
      }
      if(e.code == 'ArrowUp'){
        switch(this.selected){
          case 'hour':
            this.hour++
            break
          case 'minute':
            this.minute++
            break
          case 'second':
            this.second++
            break
        }
      }
      if(e.code == 'ArrowDown'){
        switch(this.selected){
          case 'hour':
            if(this.hour==0){
              this.hour=this.maxHour
            }else{
              this.hour--
            }
            break
          case 'minute':
            if(this.minute==0){
              this.minute=59
            }else{
              this.minute--
            }
            break
          case 'second':
            if(this.second==0){
              this.second=59
            }else{
              this.second--
            }
            break
        }
      }
      if(e.code == 'ArrowRight'){
        switch(this.selected){
          case 'hour':
            this.selected = 'minute';
            break
          case 'minute':
            this.selected = 'second';
            break
        }
      }
      if(e.code == 'ArrowLeft'){
        switch(this.selected){
          case 'second':
            this.selected = 'minute';
            break
          case 'minute':
            this.selected = 'hour';
            break
        }
      }
      if(e.code =='Backspace'){
        switch(this.selected){
          case 'hour':
            this.apagar('hour')
            break
          case 'minute':
            this.apagar('minute')
            break
          case 'second':
            this.apagar('second')
            break
        }
      }


      switch(e.key){
        case '1':
          this.digitar(1,this.selected);
          break
        case '2':
          this.digitar(2,this.selected);
          break
        case '3':
          this.digitar(3,this.selected);
          break
        case '4':
          this.digitar(4,this.selected);
          break
        case '5':
          this.digitar(5,this.selected);
          break
        case '6':
          this.digitar(6,this.selected);
          break
        case '7':
          this.digitar(7,this.selected);
          break
        case '8':
          this.digitar(8,this.selected);
          break
        case '9':
          this.digitar(9,this.selected);
          break
        case '0':
          this.digitar(0,this.selected);
          break
      }

      if(this.minute>59 || this.minute<0){
        this.minute = 0
      }
      if(this.second>59 || this.second<0){
        this.second = 0
      }
      if(this.hour.toString().length>3 || this.hour<0){
        this.hour = 0
      }
      this.updateValue()
    })
  }

  public focus($event:any){
    switch($event.target.id){
      case 'hour':
        this.selected = 'hour';
        break
      case 'minute':
        this.selected = 'minute';
        break
      case 'second':
        this.selected = 'second';
        break
    }
  }
  public apagar(local: 'hour'|'minute'|'second'|null) {
    if(local){
      if(local=='hour'){
        let hora = this.hour.toString().split('');
        if(hora.length>1){
          let retirado = hora.pop();
        this.hour =  parseInt(hora.join(''))
        }else{
          this.hour = 0
        }
      }
      if(local=='minute'){
        let minuto = this.minute.toString().split('');
        if(minuto.length>1){
        let retirado = minuto.pop();
        this.minute =  parseInt(minuto.join(''));
        }else{
          this.minute = 0
        }
      }
      if(local=='second'){
        let segundo = this.second.toString().split('');
        if(segundo.length>1){
        let retirado = segundo.pop();
        this.second =  parseInt(segundo.join(''))
        }else{
          this.second = 0
        }
      }
    }
  }

  public digitar(num:number,local:'hour'|'minute'|'second'|null){
    if(local){
      if(local=='hour'){
        if(this.hour.toString().length>=2){
          this.hour=0
        }
        this.hour=parseInt(this.hour.toString()+num)
        if(this.hour.toString().length>=2){
        this.selected = 'minute';
        }
      }
      if(local=='minute'){
        if(this.minute.toString().length>=2){
          this.minute=0
        }
        this.minute=parseInt(this.minute.toString()+num)
        if(this.minute.toString().length>=2){
        this.selected = 'second';
        }
      }
      if(local=='second'){
        if(this.second.toString().length>=2){
          this.second=0
        }
        this.second=parseInt(this.second.toString()+num)
      }
    }
  }

  public updateValue(): void {
    if(this.hour>this.maxHour){
      this.hour = this.maxHour;
    }
    if(this.hour==this.maxHour && this.minute>this.maxMinute){
      this.minute=this.maxMinute
    }
    if(this.hour==this.maxHour && this.minute==this.maxMinute && this.second>this.maxSecond){
      this.second=this.maxSecond
    }

    switch(this.type){
      case 'second':
        const respostaSegundo = ((this.hour*60)+this.minute)*60+this.second
        this.responseChange.emit(respostaSegundo);
        this.responseStringChange.emit(respostaSegundo.toString());
        break
      case 'minute':
        const respostaMinuto = ((this.hour*60)+Math.floor(this.second/60))+this.minute
        this.responseChange.emit(respostaMinuto);
        this.responseStringChange.emit(respostaMinuto.toString())
        break
      case 'milisecond':
        const respostaMilisegundo = (((this.hour*60)+this.minute)*60+this.second)*1000;
        this.responseChange.emit(respostaMilisegundo);
        this.responseStringChange.emit(respostaMilisegundo.toString());
        break
      case 'hour':
        const respostaHora = Math.floor((Math.floor(this.second/60)+this.minute)/60)+this.hour;
        this.responseChange.emit(respostaHora);
        this.responseStringChange.emit(respostaHora.toString());
        break
      case 'time':
        const resposta = `${this.hour.toString().length===1?'0'+this.hour:this.hour}:${this.minute.toString().length===1?'0'+this.minute:this.minute}:${this.second.toString().length===1?'0'+this.second:this.second}`
        const respostaSeparada = {
          hour:this.hour,
          minute:this.minute,
          second:this.second
        }
        this.responseStringChange.emit(resposta);
        this.responseChange.emit(respostaSeparada);
        break
    }
  }
}
