import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { throwError } from 'rxjs';
@Component({
  selector: 'ngx-timepicker',
  template: `
  <div 
  class="timepicker"
  [style.width]="widthCss" 
  [style.height]="heightCss"  
  [style.borderBottom]="disabled ? '1px solid gray' : '1px solid black'">
    <div 
    id="hour" 
    tabindex="1" 
    (blur)="lostFocus()" 
    (focus)="focus($event)" 
    [style.background-color]="selected==='hour'? cor : 'transparent'" 
    [style.color]="disabled ? 'gray' : 'black'"
    (click)="focus($event)">{{hour.toString().length===1?'0'+this.hour:this.hour}}
  </div>
    <div>:</div>
    <div 
    id="minute" 
    tabindex="1" 
    (blur)="lostFocus()" 
    (focus)="focus($event)" 
    [style.background-color]="selected==='minute'? cor : 'transparent'" 
    [style.color]="disabled ? 'gray' : 'black'"
    (click)="focus($event)">{{minute.toString().length===1?'0'+this.minute:this.minute}}</div>
    <div *ngIf="needSeconds">:</div>
    <div 
    *ngIf="needSeconds" 
    id="second" [style.color]="disabled ? 'gray' : 'black'" 
    tabindex="1" (blur)="lostFocus()" (focus)="focus($event)" 
    [style.background-color]="selected==='second'? cor : 'transparent'" 
    (click)="focus($event)">{{second.toString().length===1?'0'+this.second:this.second}}
    </div>
    <button *ngIf="!disabled" mat-icon-button style="padding:20px;position:relative;bottom:1px" [matMenuTriggerFor]="aboveMenu" #trigger="matMenuTrigger" class="btnClock" (click)="preencherDivs()">
      <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 17px;">
        <path d="M12 7V12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <mat-menu #aboveMenu="matMenu" yPosition="above">
    <div class="matMenuClock" (click)="$event.stopPropagation();">
      <div class="numbers">
        <div id="hourClock"></div>
        <div id="minuteClock"></div>
        <div id="secondClock"></div>
      </div>
      <div class="footerClock">
        <button mat-raised-button *ngIf="max !== '23:59:59'" (click)="maxClock()">Max</button>
        <button mat-raised-button *ngIf="max == '23:59:59'" (click)="nowClock()">Now</button>
        <button mat-raised-button [disabled]="disableClock" (click)="confirmClock()">Ok</button>
      </div>
    </div>
    </mat-menu>
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
    }
    div:focus{
      outline:none;
    }
    .btnClock{
      margin:0 5px;
      height:30px;
      min-width:25px;
      display:flex;
      justify-content:center;
      align-items:center;
    }
    .btnClock{
      display:flex;
      justify-content:center;
      align-items:center;
      min-height:25px;
      height:25px;
    }
    .matMenuClock{
      width:150px;
      height:150px;
      display:flex;
      flex-direction:column;
    }
    .numbers{
      width:150px;
      height:120px;
      display:flex;
    }
    .numbers>div{
      width:50px;
      height:120px;
      display:flex;
      flex-direction:column;
      align-items:center;
      overflow:scroll;
      scrollbar-width: none;
    }
    .numbers>div::-webkit-scrollbar{
      display:none;
    }
    .footerClock{
      width:150px;
      height:30px;
      display:flex;
      justify-content:space-around;
      align-items:center;
      button{
        min-width:50px;
        min-height:20px;
        width:50px;
        height:20px;
        font-size:15px;
        display:flex;
        justify-content:center;
        align-items:center;
      }
    }
    `
  ]
})
export class NgxTimepicker12Component implements OnInit,AfterViewInit,OnChanges{
  @ViewChild('trigger') menuTrigger!: MatMenuTrigger;
  @Input() width:number = 130;
  @Input() height:number = 40;
  @Input() font:number = 10;
  @Input() max:string = '23:59:59';
  @Input() response: number|null = null;
  @Input() responseString: string | null = null;
  @Input() needSeconds: boolean = true;
  @Input() type: 'milisecond'|'second'|'minute'| 'hour' | 'time' = 'second'
  @Input() cor:string = "#48b9c7";
  @Input() disabled:boolean = false;

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
  public disableClock:boolean = true;
  public hourClock:string|null = null;
  public minuteClock:string|null = null;
  public secondClock:string|null = null;
  private newInput:boolean = true;
  constructor(){
  }

  ngOnInit(): void {
    if(this.max != ''){
      const arrayMax = this.max.split(':');
      this.maxHour=parseInt(arrayMax[0])
      this.maxMinute=parseInt(arrayMax[1])
      this.maxSecond=parseInt(arrayMax[2])
    }
    if(this.responseString){
      this.init(this.responseString)
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

  ngOnChanges(changes: any) {
    // Verifica se 'responseString' foi a propriedade que mudou
    if (changes['responseString']) {
      // const previousValue = changes['responseString'].previousValue; --- caso precise do valor antes da mudança do input
      const currentValue = changes['responseString'].currentValue;
      if(currentValue){
        this.init(currentValue)
      }else{
        this.init("00:00:00");
      }
    }
    if (changes['disabled']) {
      // const previousValue = changes['responseString'].previousValue; --- caso precise do valor antes da mudança do input
      const currentValue = changes['disabled'].currentValue;
      this.disabled = currentValue
    }
  }

  public init(responseString:String){
    let array = responseString.split(':');
        if(this.needSeconds){
            this.hour = parseInt(array[0]);
            this.minute = parseInt(array[1]);
            this.second = parseInt(array[2]);
        }else{
            this.hour = parseInt(array[0]);
            this.minute = parseInt(array[1]);
            
        }
        if(isNaN(this.hour) || isNaN(this.minute) || isNaN(this.second)){
          this.hour = 0
          this.minute = 0
          this.second = 0
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
          e.preventDefault();
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
          e.preventDefault();
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
          e.preventDefault();
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
          e.preventDefault();
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
        if(this.hour<0){
          this.hour = 0
        }
        if(this.hour>this.maxHour){
          this.hour = this.maxHour
        }
        this.updateValue()
      })
  }

  public lostFocus(){
    this.selected = null
  }

  public focus($event:any){
    if(!this.disabled){
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
        if(this.newInput){
          this.hour=parseInt('0'+num)
          this.newInput = false;
        }else{
          this.hour=parseInt(this.hour.toString()+num)
          if(this.hour.toString().length == this.maxHour.toString().length){
            this.selected = 'minute';
            this.newInput=true
          }
        }
      }
      if(local=='minute'){
        if(this.newInput){
          this.minute=parseInt('0'+num)
          this.newInput = false
        }else{
          this.minute=parseInt(this.minute.toString()+num)
          this.selected = 'second';
          this.newInput=true
        }
      }
      if(local=='second'){
        if(this.newInput){
          this.second=parseInt('0'+num)
          this.newInput = false
        }else{
          this.second=parseInt(this.second.toString()+num)
          this.selected = null;
          this.newInput=true
        }
      }
    }
  }

  public error(){
    return throwError(()=> new Error('The time is bigger then max time:Was set the max time'))
  }

  public updateValue(): void {
    if(this.hour>this.maxHour){
      this.hour = this.maxHour;
      this.error()
    }
    if(this.hour==this.maxHour && this.minute>this.maxMinute){
      this.minute=this.maxMinute
      this.error()
    }
    if(this.hour==this.maxHour && this.minute==this.maxMinute && this.second>this.maxSecond){
      this.second=this.maxSecond
      this.error()
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

  public maxClock(){
    this.hour = this.maxHour;
    this.minute = this.maxMinute;
    this.second = this.maxSecond;
    this.fecharMenu(this.menuTrigger);
  }

  public nowClock(){
    const agora = new Date();
    const horas = agora.getHours();
    const minutos = agora.getMinutes();
    const segundos = agora.getSeconds();

    this.hour = horas;
    this.minute = minutos;
    this.second = segundos;
    this.fecharMenu(this.menuTrigger);
  }

  public fecharMenu(trigger:MatMenuTrigger) {
    this.disableClock = true
    trigger.closeMenu();
    this.updateValue();
  }

  public preencherDivs() {
    this.disableClock = true;
    this.hourClock = null;
    this.minuteClock = null;
    this.secondClock = null;
    this.destroyDivs('hourClock')
    this.destroyDivs('minuteClock')
    this.destroyDivs('secondClock')
    const criarDivs = (parentElementId: string, id: number, limite: number) => {

      const parentElement = document.getElementById(parentElementId);

      for (let i = 0; i <= limite; i++) {
        const numberDiv = document.createElement('div');
        numberDiv.textContent = i < 10 ? `0${i}` : `${i}`;
        numberDiv.style.borderBottom = "1px solid black";
        numberDiv.style.padding = "5px 10px";
        numberDiv.style.cursor = "pointer";
        numberDiv.style.margin = "2px";

        let classIdentifier = '';
        switch(id) {
          case 0:
            classIdentifier = 'numHourClock';
            break;
          case 1:
            classIdentifier = 'numMinuteClock';
            break;
          case 2:
            classIdentifier = 'numSecondClock';
            break;
        }
        numberDiv.classList.add(classIdentifier);

        numberDiv.addEventListener('click', () => {
          const allSiblings = parentElement!.querySelectorAll(`.${classIdentifier}`);
          allSiblings.forEach(sibling => {
            if (sibling instanceof HTMLElement) {
              sibling.style.backgroundColor = "";
            }
          });

          if(classIdentifier === 'numHourClock') this.hourClock = numberDiv.textContent;
          if(classIdentifier === 'numMinuteClock') this.minuteClock = numberDiv.textContent;
          if(classIdentifier === 'numSecondClock') this.secondClock = numberDiv.textContent;

          numberDiv.style.backgroundColor = "lightblue";

          if(this.hourClock && this.minuteClock && this.secondClock){
            this.disableClock = false;
          }
        });

        parentElement!.appendChild(numberDiv);
      }
    };

    criarDivs('hourClock', 0, this.maxHour);
    criarDivs('minuteClock', 1, 59);
    criarDivs('secondClock', 2, 59);
  }

  public destroyDivs(id:string){
    const element = document.getElementById(id);
    if(element){
      element.innerHTML = ''
    }
  }

  public confirmClock(){
    this.hour = parseInt(this.hourClock!)
    this.minute = parseInt(this.minuteClock!)
    this.second = parseInt(this.secondClock!)
    this.fecharMenu(this.menuTrigger);
  }
}
