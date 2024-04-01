import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { throwError } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/button";
import * as i2 from "@angular/material/menu";
import * as i3 from "@angular/common";
export class NgxTimepicker12Component {
    constructor() {
        this.width = 130;
        this.height = 40;
        this.font = 10;
        this.max = '23:59:59';
        this.response = null;
        this.responseString = null;
        this.needSeconds = true;
        this.type = 'second';
        this.cor = "#48b9c7";
        this.disabled = false;
        this.responseChange = new EventEmitter();
        this.responseStringChange = new EventEmitter();
        this.widthCss = `${this.width}px`;
        this.heightCss = `${this.height}px`;
        this.fontCss = `${this.font}px`;
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.selected = null;
        this.maxHour = 0;
        this.maxMinute = 0;
        this.maxSecond = 0;
        this.disableClock = true;
        this.hourClock = null;
        this.minuteClock = null;
        this.secondClock = null;
        this.newInput = true;
    }
    ngOnInit() {
        if (this.max != '') {
            const arrayMax = this.max.split(':');
            this.maxHour = parseInt(arrayMax[0]);
            this.maxMinute = parseInt(arrayMax[1]);
            this.maxSecond = parseInt(arrayMax[2]);
        }
        if (this.responseString) {
            this.init(this.responseString);
        }
        if (this.response) {
            let time = this.response;
            if (time > 3600) {
                this.hour = Math.round(time / 3600);
                time -= 3600 * this.hour;
            }
            if (time > 60) {
                this.minute = Math.round(time / 60);
                time -= 60 * this.minute;
            }
            if (time) {
                this.second = time;
            }
        }
    }
    ngOnChanges(changes) {
        // Verifica se 'responseString' foi a propriedade que mudou
        if (changes['responseString']) {
            // const previousValue = changes['responseString'].previousValue; --- caso precise do valor antes da mudança do input
            const currentValue = changes['responseString'].currentValue;
            if (currentValue) {
                this.init(currentValue);
            }
            else {
                this.init("00:00:00");
            }
        }
        if (changes['disabled']) {
            // const previousValue = changes['responseString'].previousValue; --- caso precise do valor antes da mudança do input
            const currentValue = changes['disabled'].currentValue;
            this.disabled = currentValue;
        }
    }
    init(responseString) {
        let array = responseString.split(':');
        if (this.needSeconds) {
            this.hour = parseInt(array[0]);
            this.minute = parseInt(array[1]);
            this.second = parseInt(array[2]);
        }
        else {
            this.hour = parseInt(array[0]);
            this.minute = parseInt(array[1]);
        }
        if (isNaN(this.hour) || isNaN(this.minute) || isNaN(this.second)) {
            this.hour = 0;
            this.minute = 0;
            this.second = 0;
        }
    }
    ngAfterViewInit() {
        document.addEventListener('keydown', (e) => {
            if (e.code == 'Tab') {
                switch (this.selected) {
                    case 'hour':
                        this.selected = 'minute';
                        break;
                    case 'minute':
                        this.selected = 'second';
                        break;
                    case 'second':
                        this.selected = null;
                        break;
                }
            }
            if (e.code == 'ArrowUp') {
                e.preventDefault();
                switch (this.selected) {
                    case 'hour':
                        this.hour++;
                        break;
                    case 'minute':
                        this.minute++;
                        break;
                    case 'second':
                        this.second++;
                        break;
                }
            }
            if (e.code == 'ArrowDown') {
                e.preventDefault();
                switch (this.selected) {
                    case 'hour':
                        if (this.hour == 0) {
                            this.hour = this.maxHour;
                        }
                        else {
                            this.hour--;
                        }
                        break;
                    case 'minute':
                        if (this.minute == 0) {
                            this.minute = 59;
                        }
                        else {
                            this.minute--;
                        }
                        break;
                    case 'second':
                        if (this.second == 0) {
                            this.second = 59;
                        }
                        else {
                            this.second--;
                        }
                        break;
                }
            }
            if (e.code == 'ArrowRight') {
                e.preventDefault();
                switch (this.selected) {
                    case 'hour':
                        this.selected = 'minute';
                        break;
                    case 'minute':
                        this.selected = 'second';
                        break;
                }
            }
            if (e.code == 'ArrowLeft') {
                e.preventDefault();
                switch (this.selected) {
                    case 'second':
                        this.selected = 'minute';
                        break;
                    case 'minute':
                        this.selected = 'hour';
                        break;
                }
            }
            if (e.code == 'Backspace') {
                switch (this.selected) {
                    case 'hour':
                        this.apagar('hour');
                        break;
                    case 'minute':
                        this.apagar('minute');
                        break;
                    case 'second':
                        this.apagar('second');
                        break;
                }
            }
            switch (e.key) {
                case '1':
                    this.digitar(1, this.selected);
                    break;
                case '2':
                    this.digitar(2, this.selected);
                    break;
                case '3':
                    this.digitar(3, this.selected);
                    break;
                case '4':
                    this.digitar(4, this.selected);
                    break;
                case '5':
                    this.digitar(5, this.selected);
                    break;
                case '6':
                    this.digitar(6, this.selected);
                    break;
                case '7':
                    this.digitar(7, this.selected);
                    break;
                case '8':
                    this.digitar(8, this.selected);
                    break;
                case '9':
                    this.digitar(9, this.selected);
                    break;
                case '0':
                    this.digitar(0, this.selected);
                    break;
            }
            if (this.minute > 59 || this.minute < 0) {
                this.minute = 0;
            }
            if (this.second > 59 || this.second < 0) {
                this.second = 0;
            }
            if (this.hour < 0) {
                this.hour = 0;
            }
            if (this.hour > this.maxHour) {
                this.hour = this.maxHour;
            }
            this.updateValue();
        });
    }
    lostFocus() {
        this.selected = null;
    }
    focus($event) {
        if (!this.disabled) {
            switch ($event.target.id) {
                case 'hour':
                    this.selected = 'hour';
                    break;
                case 'minute':
                    this.selected = 'minute';
                    break;
                case 'second':
                    this.selected = 'second';
                    break;
            }
        }
    }
    apagar(local) {
        if (local) {
            if (local == 'hour') {
                let hora = this.hour.toString().split('');
                if (hora.length > 1) {
                    let retirado = hora.pop();
                    this.hour = parseInt(hora.join(''));
                }
                else {
                    this.hour = 0;
                }
            }
            if (local == 'minute') {
                let minuto = this.minute.toString().split('');
                if (minuto.length > 1) {
                    let retirado = minuto.pop();
                    this.minute = parseInt(minuto.join(''));
                }
                else {
                    this.minute = 0;
                }
            }
            if (local == 'second') {
                let segundo = this.second.toString().split('');
                if (segundo.length > 1) {
                    let retirado = segundo.pop();
                    this.second = parseInt(segundo.join(''));
                }
                else {
                    this.second = 0;
                }
            }
        }
    }
    digitar(num, local) {
        if (local) {
            if (local == 'hour') {
                if (this.newInput) {
                    this.hour = parseInt('0' + num);
                    this.newInput = false;
                }
                else {
                    this.hour = parseInt(this.hour.toString() + num);
                    if (this.hour.toString().length == this.maxHour.toString().length) {
                        this.selected = 'minute';
                        this.newInput = true;
                    }
                }
            }
            if (local == 'minute') {
                if (this.newInput) {
                    this.minute = parseInt('0' + num);
                    this.newInput = false;
                }
                else {
                    this.minute = parseInt(this.minute.toString() + num);
                    this.selected = 'second';
                    this.newInput = true;
                }
            }
            if (local == 'second') {
                if (this.newInput) {
                    this.second = parseInt('0' + num);
                    this.newInput = false;
                }
                else {
                    this.second = parseInt(this.second.toString() + num);
                    this.selected = null;
                    this.newInput = true;
                }
            }
        }
    }
    error() {
        return throwError(() => new Error('The time is bigger then max time:Was set the max time'));
    }
    updateValue() {
        if (this.hour > this.maxHour) {
            this.hour = this.maxHour;
            this.error();
        }
        if (this.hour == this.maxHour && this.minute > this.maxMinute) {
            this.minute = this.maxMinute;
            this.error();
        }
        if (this.hour == this.maxHour && this.minute == this.maxMinute && this.second > this.maxSecond) {
            this.second = this.maxSecond;
            this.error();
        }
        switch (this.type) {
            case 'second':
                const respostaSegundo = ((this.hour * 60) + this.minute) * 60 + this.second;
                this.responseChange.emit(respostaSegundo);
                this.responseStringChange.emit(respostaSegundo.toString());
                break;
            case 'minute':
                const respostaMinuto = ((this.hour * 60) + Math.floor(this.second / 60)) + this.minute;
                this.responseChange.emit(respostaMinuto);
                this.responseStringChange.emit(respostaMinuto.toString());
                break;
            case 'milisecond':
                const respostaMilisegundo = (((this.hour * 60) + this.minute) * 60 + this.second) * 1000;
                this.responseChange.emit(respostaMilisegundo);
                this.responseStringChange.emit(respostaMilisegundo.toString());
                break;
            case 'hour':
                const respostaHora = Math.floor((Math.floor(this.second / 60) + this.minute) / 60) + this.hour;
                this.responseChange.emit(respostaHora);
                this.responseStringChange.emit(respostaHora.toString());
                break;
            case 'time':
                const resposta = `${this.hour.toString().length === 1 ? '0' + this.hour : this.hour}:${this.minute.toString().length === 1 ? '0' + this.minute : this.minute}:${this.second.toString().length === 1 ? '0' + this.second : this.second}`;
                const respostaSeparada = {
                    hour: this.hour,
                    minute: this.minute,
                    second: this.second
                };
                this.responseStringChange.emit(resposta);
                this.responseChange.emit(respostaSeparada);
                break;
        }
    }
    maxClock() {
        this.hour = this.maxHour;
        this.minute = this.maxMinute;
        this.second = this.maxSecond;
        this.fecharMenu(this.menuTrigger);
    }
    nowClock() {
        const agora = new Date();
        const horas = agora.getHours();
        const minutos = agora.getMinutes();
        const segundos = agora.getSeconds();
        this.hour = horas;
        this.minute = minutos;
        this.second = segundos;
        this.fecharMenu(this.menuTrigger);
    }
    fecharMenu(trigger) {
        this.disableClock = true;
        trigger.closeMenu();
        this.updateValue();
    }
    preencherDivs() {
        this.disableClock = true;
        this.hourClock = null;
        this.minuteClock = null;
        this.secondClock = null;
        this.destroyDivs('hourClock');
        this.destroyDivs('minuteClock');
        this.destroyDivs('secondClock');
        const criarDivs = (parentElementId, id, limite) => {
            const parentElement = document.getElementById(parentElementId);
            for (let i = 0; i <= limite; i++) {
                const numberDiv = document.createElement('div');
                numberDiv.textContent = i < 10 ? `0${i}` : `${i}`;
                numberDiv.style.borderBottom = "1px solid black";
                numberDiv.style.padding = "5px 10px";
                numberDiv.style.cursor = "pointer";
                numberDiv.style.margin = "2px";
                let classIdentifier = '';
                switch (id) {
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
                    const allSiblings = parentElement.querySelectorAll(`.${classIdentifier}`);
                    allSiblings.forEach(sibling => {
                        if (sibling instanceof HTMLElement) {
                            sibling.style.backgroundColor = "";
                        }
                    });
                    if (classIdentifier === 'numHourClock')
                        this.hourClock = numberDiv.textContent;
                    if (classIdentifier === 'numMinuteClock')
                        this.minuteClock = numberDiv.textContent;
                    if (classIdentifier === 'numSecondClock')
                        this.secondClock = numberDiv.textContent;
                    numberDiv.style.backgroundColor = "lightblue";
                    if (this.hourClock && this.minuteClock && this.secondClock) {
                        this.disableClock = false;
                    }
                });
                parentElement.appendChild(numberDiv);
            }
        };
        criarDivs('hourClock', 0, this.maxHour);
        criarDivs('minuteClock', 1, 59);
        criarDivs('secondClock', 2, 59);
    }
    destroyDivs(id) {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = '';
        }
    }
    confirmClock() {
        this.hour = parseInt(this.hourClock);
        this.minute = parseInt(this.minuteClock);
        this.second = parseInt(this.secondClock);
        this.fecharMenu(this.menuTrigger);
    }
}
NgxTimepicker12Component.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NgxTimepicker12Component, deps: [], target: i0.ɵɵFactoryTarget.Component });
NgxTimepicker12Component.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: NgxTimepicker12Component, selector: "ngx-timepicker", inputs: { width: "width", height: "height", font: "font", max: "max", response: "response", responseString: "responseString", needSeconds: "needSeconds", type: "type", cor: "cor", disabled: "disabled" }, outputs: { responseChange: "responseChange", responseStringChange: "responseStringChange" }, viewQueries: [{ propertyName: "menuTrigger", first: true, predicate: ["trigger"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
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
`, isInline: true, styles: [".timepicker{\n      border-bottom: 1px solid gray;\n      display: flex;\n      flex-wrap: nowrap;\n      justify-content: center;\n      align-items: center;\n    }\n    div{\n      -webkit-user-select: none; /* Safari */\n      -moz-user-select: none; /* Firefox */\n      -ms-user-select: none; /* IE10+/Edge */\n      user-select: none;\n    }\n    div:focus{\n      outline:none;\n    }\n    .btnClock{\n      margin:0 5px;\n      height:30px;\n      min-width:25px;\n      display:flex;\n      justify-content:center;\n      align-items:center;\n    }\n    .btnClock{\n      display:flex;\n      justify-content:center;\n      align-items:center;\n      min-height:25px;\n      height:25px;\n    }\n    .matMenuClock{\n      width:150px;\n      height:150px;\n      display:flex;\n      flex-direction:column;\n    }\n    .numbers{\n      width:150px;\n      height:120px;\n      display:flex;\n    }\n    .numbers>div{\n      width:50px;\n      height:120px;\n      display:flex;\n      flex-direction:column;\n      align-items:center;\n      overflow:scroll;\n      scrollbar-width: none;\n    }\n    .numbers>div::-webkit-scrollbar{\n      display:none;\n    }\n    .footerClock{\n      width:150px;\n      height:30px;\n      display:flex;\n      justify-content:space-around;\n      align-items:center;\n      button{\n        min-width:50px;\n        min-height:20px;\n        width:50px;\n        height:20px;\n        font-size:15px;\n        display:flex;\n        justify-content:center;\n        align-items:center;\n      }\n    }\n    "], components: [{ type: i1.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i2.MatMenu, selector: "mat-menu", exportAs: ["matMenu"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", exportAs: ["matMenuTrigger"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NgxTimepicker12Component, decorators: [{
            type: Component,
            args: [{
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
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { menuTrigger: [{
                type: ViewChild,
                args: ['trigger']
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], font: [{
                type: Input
            }], max: [{
                type: Input
            }], response: [{
                type: Input
            }], responseString: [{
                type: Input
            }], needSeconds: [{
                type: Input
            }], type: [{
                type: Input
            }], cor: [{
                type: Input
            }], disabled: [{
                type: Input
            }], responseChange: [{
                type: Output
            }], responseStringChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdGltZXBpY2tlcjEyL3NyYy9saWIvbmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVwSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQW1JbEMsTUFBTSxPQUFPLHdCQUF3QjtJQThCbkM7UUE1QlMsVUFBSyxHQUFVLEdBQUcsQ0FBQztRQUNuQixXQUFNLEdBQVUsRUFBRSxDQUFDO1FBQ25CLFNBQUksR0FBVSxFQUFFLENBQUM7UUFDakIsUUFBRyxHQUFVLFVBQVUsQ0FBQztRQUN4QixhQUFRLEdBQWdCLElBQUksQ0FBQztRQUM3QixtQkFBYyxHQUFrQixJQUFJLENBQUM7UUFDckMsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIsU0FBSSxHQUFvRCxRQUFRLENBQUE7UUFDaEUsUUFBRyxHQUFVLFNBQVMsQ0FBQztRQUN2QixhQUFRLEdBQVcsS0FBSyxDQUFDO1FBRXhCLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN6Qyx5QkFBb0IsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2xELGFBQVEsR0FBVSxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQztRQUNwQyxjQUFTLEdBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUM7UUFDdEMsWUFBTyxHQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFBO1FBQ2pDLFNBQUksR0FBVSxDQUFDLENBQUM7UUFDaEIsV0FBTSxHQUFVLENBQUMsQ0FBQztRQUNsQixXQUFNLEdBQVUsQ0FBQyxDQUFDO1FBQ2xCLGFBQVEsR0FBaUMsSUFBSSxDQUFDO1FBQzlDLFlBQU8sR0FBVSxDQUFDLENBQUE7UUFDbEIsY0FBUyxHQUFVLENBQUMsQ0FBQTtRQUNwQixjQUFTLEdBQVUsQ0FBQyxDQUFBO1FBQ3BCLGlCQUFZLEdBQVcsSUFBSSxDQUFDO1FBQzVCLGNBQVMsR0FBZSxJQUFJLENBQUM7UUFDN0IsZ0JBQVcsR0FBZSxJQUFJLENBQUM7UUFDL0IsZ0JBQVcsR0FBZSxJQUFJLENBQUM7UUFDOUIsYUFBUSxHQUFXLElBQUksQ0FBQztJQUVoQyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUM7WUFDaEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDckM7UUFDRCxJQUFHLElBQUksQ0FBQyxjQUFjLEVBQUM7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7U0FDL0I7UUFDRCxJQUFHLElBQUksQ0FBQyxRQUFRLEVBQUM7WUFDZixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBO1lBQ3hCLElBQUcsSUFBSSxHQUFDLElBQUksRUFBQztnQkFDWCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNqQyxJQUFJLElBQUcsSUFBSSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7YUFDdEI7WUFDRCxJQUFHLElBQUksR0FBQyxFQUFFLEVBQUM7Z0JBQ1QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDakMsSUFBSSxJQUFHLEVBQUUsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFBO2FBQ3RCO1lBQ0QsSUFBRyxJQUFJLEVBQUM7Z0JBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7YUFDbkI7U0FDRjtJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsT0FBWTtRQUN0QiwyREFBMkQ7UUFDM0QsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUM3QixxSEFBcUg7WUFDckgsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsWUFBWSxDQUFDO1lBQzVELElBQUcsWUFBWSxFQUFDO2dCQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7YUFDeEI7aUJBQUk7Z0JBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN2QjtTQUNGO1FBQ0QsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkIscUhBQXFIO1lBQ3JILE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLENBQUM7WUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUE7U0FDN0I7SUFDSCxDQUFDO0lBRU0sSUFBSSxDQUFDLGNBQXFCO1FBQy9CLElBQUksS0FBSyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsSUFBRyxJQUFJLENBQUMsV0FBVyxFQUFDO1lBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO2FBQUk7WUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUVwQztRQUNELElBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUM7WUFDOUQsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUE7WUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtZQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1NBQ2hCO0lBQ1AsQ0FBQztJQUNELGVBQWU7UUFDWCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUU7WUFDdkMsSUFBRyxDQUFDLENBQUMsSUFBSSxJQUFJLEtBQUssRUFBQztnQkFDakIsUUFBTyxJQUFJLENBQUMsUUFBUSxFQUFDO29CQUNuQixLQUFLLE1BQU07d0JBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7d0JBQ3hCLE1BQUs7b0JBQ1AsS0FBSyxRQUFRO3dCQUNYLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO3dCQUN4QixNQUFLO29CQUNQLEtBQUssUUFBUTt3QkFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQTt3QkFDcEIsTUFBSztpQkFDUjthQUNGO1lBQ0QsSUFBRyxDQUFDLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBQztnQkFDckIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUNuQixRQUFPLElBQUksQ0FBQyxRQUFRLEVBQUM7b0JBQ25CLEtBQUssTUFBTTt3QkFDVCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7d0JBQ1gsTUFBSztvQkFDUCxLQUFLLFFBQVE7d0JBQ1gsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO3dCQUNiLE1BQUs7b0JBQ1AsS0FBSyxRQUFRO3dCQUNYLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTt3QkFDYixNQUFLO2lCQUNSO2FBQ0Y7WUFDRCxJQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksV0FBVyxFQUFDO2dCQUN2QixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ25CLFFBQU8sSUFBSSxDQUFDLFFBQVEsRUFBQztvQkFDbkIsS0FBSyxNQUFNO3dCQUNULElBQUcsSUFBSSxDQUFDLElBQUksSUFBRSxDQUFDLEVBQUM7NEJBQ2QsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO3lCQUN2Qjs2QkFBSTs0QkFDSCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7eUJBQ1o7d0JBQ0QsTUFBSztvQkFDUCxLQUFLLFFBQVE7d0JBQ1gsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFFLENBQUMsRUFBQzs0QkFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUE7eUJBQ2Y7NkJBQUk7NEJBQ0gsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO3lCQUNkO3dCQUNELE1BQUs7b0JBQ1AsS0FBSyxRQUFRO3dCQUNYLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBRSxDQUFDLEVBQUM7NEJBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUMsRUFBRSxDQUFBO3lCQUNmOzZCQUFJOzRCQUNILElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTt5QkFDZDt3QkFDRCxNQUFLO2lCQUNSO2FBQ0Y7WUFDRCxJQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksWUFBWSxFQUFDO2dCQUN4QixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ25CLFFBQU8sSUFBSSxDQUFDLFFBQVEsRUFBQztvQkFDbkIsS0FBSyxNQUFNO3dCQUNULElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO3dCQUN6QixNQUFLO29CQUNQLEtBQUssUUFBUTt3QkFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzt3QkFDekIsTUFBSztpQkFDUjthQUNGO1lBQ0QsSUFBRyxDQUFDLENBQUMsSUFBSSxJQUFJLFdBQVcsRUFBQztnQkFDdkIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUNuQixRQUFPLElBQUksQ0FBQyxRQUFRLEVBQUM7b0JBQ25CLEtBQUssUUFBUTt3QkFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzt3QkFDekIsTUFBSztvQkFDUCxLQUFLLFFBQVE7d0JBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7d0JBQ3ZCLE1BQUs7aUJBQ1I7YUFDRjtZQUNELElBQUcsQ0FBQyxDQUFDLElBQUksSUFBRyxXQUFXLEVBQUM7Z0JBQ3RCLFFBQU8sSUFBSSxDQUFDLFFBQVEsRUFBQztvQkFDbkIsS0FBSyxNQUFNO3dCQUNULElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7d0JBQ25CLE1BQUs7b0JBQ1AsS0FBSyxRQUFRO3dCQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7d0JBQ3JCLE1BQUs7b0JBQ1AsS0FBSyxRQUFRO3dCQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7d0JBQ3JCLE1BQUs7aUJBQ1I7YUFDRjtZQUdELFFBQU8sQ0FBQyxDQUFDLEdBQUcsRUFBQztnQkFDWCxLQUFLLEdBQUc7b0JBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM5QixNQUFLO2dCQUNQLEtBQUssR0FBRztvQkFDTixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzlCLE1BQUs7Z0JBQ1AsS0FBSyxHQUFHO29CQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDOUIsTUFBSztnQkFDUCxLQUFLLEdBQUc7b0JBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM5QixNQUFLO2dCQUNQLEtBQUssR0FBRztvQkFDTixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzlCLE1BQUs7Z0JBQ1AsS0FBSyxHQUFHO29CQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDOUIsTUFBSztnQkFDUCxLQUFLLEdBQUc7b0JBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM5QixNQUFLO2dCQUNQLEtBQUssR0FBRztvQkFDTixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzlCLE1BQUs7Z0JBQ1AsS0FBSyxHQUFHO29CQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDOUIsTUFBSztnQkFDUCxLQUFLLEdBQUc7b0JBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM5QixNQUFLO2FBQ1I7WUFFRCxJQUFHLElBQUksQ0FBQyxNQUFNLEdBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDO2dCQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTthQUNoQjtZQUNELElBQUcsSUFBSSxDQUFDLE1BQU0sR0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUM7Z0JBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO2FBQ2hCO1lBQ0QsSUFBRyxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsRUFBQztnQkFDYixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQTthQUNkO1lBQ0QsSUFBRyxJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxPQUFPLEVBQUM7Z0JBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTthQUN6QjtZQUNELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUNwQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTSxTQUFTO1FBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7SUFDdEIsQ0FBQztJQUVNLEtBQUssQ0FBQyxNQUFVO1FBQ3JCLElBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDO1lBQ2hCLFFBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUM7Z0JBQ3RCLEtBQUssTUFBTTtvQkFDVCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztvQkFDdkIsTUFBSztnQkFDUCxLQUFLLFFBQVE7b0JBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7b0JBQ3pCLE1BQUs7Z0JBQ1AsS0FBSyxRQUFRO29CQUNYLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO29CQUN6QixNQUFLO2FBQ1I7U0FDRjtJQUNILENBQUM7SUFFTSxNQUFNLENBQUMsS0FBb0M7UUFDaEQsSUFBRyxLQUFLLEVBQUM7WUFDUCxJQUFHLEtBQUssSUFBRSxNQUFNLEVBQUM7Z0JBQ2YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzFDLElBQUcsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUM7b0JBQ2YsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUM1QixJQUFJLENBQUMsSUFBSSxHQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7aUJBQ25DO3FCQUFJO29CQUNILElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFBO2lCQUNkO2FBQ0Y7WUFDRCxJQUFHLEtBQUssSUFBRSxRQUFRLEVBQUM7Z0JBQ2pCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QyxJQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDO29CQUNuQixJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDeEM7cUJBQUk7b0JBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7aUJBQ2hCO2FBQ0Y7WUFDRCxJQUFHLEtBQUssSUFBRSxRQUFRLEVBQUM7Z0JBQ2pCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMvQyxJQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDO29CQUNwQixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtpQkFDeEM7cUJBQUk7b0JBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7aUJBQ2hCO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFFTSxPQUFPLENBQUMsR0FBVSxFQUFDLEtBQW1DO1FBQzNELElBQUcsS0FBSyxFQUFDO1lBQ1AsSUFBRyxLQUFLLElBQUUsTUFBTSxFQUFDO2dCQUNmLElBQUcsSUFBSSxDQUFDLFFBQVEsRUFBQztvQkFDZixJQUFJLENBQUMsSUFBSSxHQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUMsR0FBRyxDQUFDLENBQUE7b0JBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2lCQUN2QjtxQkFBSTtvQkFDSCxJQUFJLENBQUMsSUFBSSxHQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUM1QyxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFDO3dCQUMvRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzt3QkFDekIsSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUE7cUJBQ25CO2lCQUNGO2FBQ0Y7WUFDRCxJQUFHLEtBQUssSUFBRSxRQUFRLEVBQUM7Z0JBQ2pCLElBQUcsSUFBSSxDQUFDLFFBQVEsRUFBQztvQkFDZixJQUFJLENBQUMsTUFBTSxHQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUMsR0FBRyxDQUFDLENBQUE7b0JBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO2lCQUN0QjtxQkFBSTtvQkFDSCxJQUFJLENBQUMsTUFBTSxHQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUNoRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztvQkFDekIsSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUE7aUJBQ25CO2FBQ0Y7WUFDRCxJQUFHLEtBQUssSUFBRSxRQUFRLEVBQUM7Z0JBQ2pCLElBQUcsSUFBSSxDQUFDLFFBQVEsRUFBQztvQkFDZixJQUFJLENBQUMsTUFBTSxHQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUMsR0FBRyxDQUFDLENBQUE7b0JBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO2lCQUN0QjtxQkFBSTtvQkFDSCxJQUFJLENBQUMsTUFBTSxHQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUNoRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztvQkFDckIsSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUE7aUJBQ25CO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFFTSxLQUFLO1FBQ1YsT0FBTyxVQUFVLENBQUMsR0FBRSxFQUFFLENBQUMsSUFBSSxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQyxDQUFBO0lBQzVGLENBQUM7SUFFTSxXQUFXO1FBQ2hCLElBQUcsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDO1lBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7U0FDYjtRQUNELElBQUcsSUFBSSxDQUFDLElBQUksSUFBRSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQztZQUN2RCxJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUE7WUFDMUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO1NBQ2I7UUFDRCxJQUFHLElBQUksQ0FBQyxJQUFJLElBQUUsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFFLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDO1lBQ3RGLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQTtZQUMxQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7U0FDYjtRQUNELFFBQU8sSUFBSSxDQUFDLElBQUksRUFBQztZQUNmLEtBQUssUUFBUTtnQkFDWCxNQUFNLGVBQWUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUMsRUFBRSxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUE7Z0JBQ25FLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRCxNQUFLO1lBQ1AsS0FBSyxRQUFRO2dCQUNYLE1BQU0sY0FBYyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUE7Z0JBQzlFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO2dCQUN6RCxNQUFLO1lBQ1AsS0FBSyxZQUFZO2dCQUNmLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUMsRUFBRSxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBQyxJQUFJLENBQUM7Z0JBQy9FLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDL0QsTUFBSztZQUNQLEtBQUssTUFBTTtnQkFDVCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUN2RixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDeEQsTUFBSztZQUNQLEtBQUssTUFBTTtnQkFDVCxNQUFNLFFBQVEsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxLQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsR0FBRyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEtBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQSxHQUFHLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sS0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFBLEdBQUcsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7Z0JBQy9NLE1BQU0sZ0JBQWdCLEdBQUc7b0JBQ3ZCLElBQUksRUFBQyxJQUFJLENBQUMsSUFBSTtvQkFDZCxNQUFNLEVBQUMsSUFBSSxDQUFDLE1BQU07b0JBQ2xCLE1BQU0sRUFBQyxJQUFJLENBQUMsTUFBTTtpQkFDbkIsQ0FBQTtnQkFDRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUMzQyxNQUFLO1NBQ1I7SUFDSCxDQUFDO0lBRU0sUUFBUTtRQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTSxRQUFRO1FBQ2IsTUFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN6QixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDL0IsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ25DLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUVwQyxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0sVUFBVSxDQUFDLE9BQXNCO1FBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBO1FBQ3hCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVNLGFBQWE7UUFDbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDL0IsTUFBTSxTQUFTLEdBQUcsQ0FBQyxlQUF1QixFQUFFLEVBQVUsRUFBRSxNQUFjLEVBQUUsRUFBRTtZQUV4RSxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRS9ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hELFNBQVMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDbEQsU0FBUyxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsaUJBQWlCLENBQUM7Z0JBQ2pELFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztnQkFDckMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUNuQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBRS9CLElBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQztnQkFDekIsUUFBTyxFQUFFLEVBQUU7b0JBQ1QsS0FBSyxDQUFDO3dCQUNKLGVBQWUsR0FBRyxjQUFjLENBQUM7d0JBQ2pDLE1BQU07b0JBQ1IsS0FBSyxDQUFDO3dCQUNKLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQzt3QkFDbkMsTUFBTTtvQkFDUixLQUFLLENBQUM7d0JBQ0osZUFBZSxHQUFHLGdCQUFnQixDQUFDO3dCQUNuQyxNQUFNO2lCQUNUO2dCQUNELFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUV6QyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtvQkFDdkMsTUFBTSxXQUFXLEdBQUcsYUFBYyxDQUFDLGdCQUFnQixDQUFDLElBQUksZUFBZSxFQUFFLENBQUMsQ0FBQztvQkFDM0UsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTt3QkFDNUIsSUFBSSxPQUFPLFlBQVksV0FBVyxFQUFFOzRCQUNsQyxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7eUJBQ3BDO29CQUNILENBQUMsQ0FBQyxDQUFDO29CQUVILElBQUcsZUFBZSxLQUFLLGNBQWM7d0JBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDO29CQUM5RSxJQUFHLGVBQWUsS0FBSyxnQkFBZ0I7d0JBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDO29CQUNsRixJQUFHLGVBQWUsS0FBSyxnQkFBZ0I7d0JBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDO29CQUVsRixTQUFTLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUM7b0JBRTlDLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUM7d0JBQ3hELElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO3FCQUMzQjtnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFFSCxhQUFjLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3ZDO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSxXQUFXLENBQUMsRUFBUztRQUMxQixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUcsT0FBTyxFQUFDO1lBQ1QsT0FBTyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUE7U0FDdkI7SUFDSCxDQUFDO0lBRU0sWUFBWTtRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBVSxDQUFDLENBQUE7UUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVksQ0FBQyxDQUFBO1FBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFZLENBQUMsQ0FBQTtRQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNwQyxDQUFDOztzSEExZFUsd0JBQXdCOzBHQUF4Qix3QkFBd0IsNGRBaEl6Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQW9EWDs0RkE0RVksd0JBQXdCO2tCQWxJcEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FvRFg7b0JBQ0MsTUFBTSxFQUFFO3dCQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXVFQztxQkFDRjtpQkFDRjswRUFFdUIsV0FBVztzQkFBaEMsU0FBUzt1QkFBQyxTQUFTO2dCQUNYLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUksY0FBYztzQkFBdkIsTUFBTTtnQkFDRyxvQkFBb0I7c0JBQTdCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0TWVudVRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcbmltcG9ydCB7IHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC10aW1lcGlja2VyJyxcbiAgdGVtcGxhdGU6IGBcbiAgPGRpdiBcbiAgY2xhc3M9XCJ0aW1lcGlja2VyXCJcbiAgW3N0eWxlLndpZHRoXT1cIndpZHRoQ3NzXCIgXG4gIFtzdHlsZS5oZWlnaHRdPVwiaGVpZ2h0Q3NzXCIgIFxuICBbc3R5bGUuYm9yZGVyQm90dG9tXT1cImRpc2FibGVkID8gJzFweCBzb2xpZCBncmF5JyA6ICcxcHggc29saWQgYmxhY2snXCI+XG4gICAgPGRpdiBcbiAgICBpZD1cImhvdXJcIiBcbiAgICB0YWJpbmRleD1cIjFcIiBcbiAgICAoYmx1cik9XCJsb3N0Rm9jdXMoKVwiIFxuICAgIChmb2N1cyk9XCJmb2N1cygkZXZlbnQpXCIgXG4gICAgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwic2VsZWN0ZWQ9PT0naG91cic/IGNvciA6ICd0cmFuc3BhcmVudCdcIiBcbiAgICBbc3R5bGUuY29sb3JdPVwiZGlzYWJsZWQgPyAnZ3JheScgOiAnYmxhY2snXCJcbiAgICAoY2xpY2spPVwiZm9jdXMoJGV2ZW50KVwiPnt7aG91ci50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMuaG91cjp0aGlzLmhvdXJ9fVxuICA8L2Rpdj5cbiAgICA8ZGl2Pjo8L2Rpdj5cbiAgICA8ZGl2IFxuICAgIGlkPVwibWludXRlXCIgXG4gICAgdGFiaW5kZXg9XCIxXCIgXG4gICAgKGJsdXIpPVwibG9zdEZvY3VzKClcIiBcbiAgICAoZm9jdXMpPVwiZm9jdXMoJGV2ZW50KVwiIFxuICAgIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cInNlbGVjdGVkPT09J21pbnV0ZSc/IGNvciA6ICd0cmFuc3BhcmVudCdcIiBcbiAgICBbc3R5bGUuY29sb3JdPVwiZGlzYWJsZWQgPyAnZ3JheScgOiAnYmxhY2snXCJcbiAgICAoY2xpY2spPVwiZm9jdXMoJGV2ZW50KVwiPnt7bWludXRlLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5taW51dGU6dGhpcy5taW51dGV9fTwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCJuZWVkU2Vjb25kc1wiPjo8L2Rpdj5cbiAgICA8ZGl2IFxuICAgICpuZ0lmPVwibmVlZFNlY29uZHNcIiBcbiAgICBpZD1cInNlY29uZFwiIFtzdHlsZS5jb2xvcl09XCJkaXNhYmxlZCA/ICdncmF5JyA6ICdibGFjaydcIiBcbiAgICB0YWJpbmRleD1cIjFcIiAoYmx1cik9XCJsb3N0Rm9jdXMoKVwiIChmb2N1cyk9XCJmb2N1cygkZXZlbnQpXCIgXG4gICAgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwic2VsZWN0ZWQ9PT0nc2Vjb25kJz8gY29yIDogJ3RyYW5zcGFyZW50J1wiIFxuICAgIChjbGljayk9XCJmb2N1cygkZXZlbnQpXCI+e3tzZWNvbmQudG9TdHJpbmcoKS5sZW5ndGg9PT0xPycwJyt0aGlzLnNlY29uZDp0aGlzLnNlY29uZH19XG4gICAgPC9kaXY+XG4gICAgPGJ1dHRvbiAqbmdJZj1cIiFkaXNhYmxlZFwiIG1hdC1pY29uLWJ1dHRvbiBzdHlsZT1cInBhZGRpbmc6MjBweDtwb3NpdGlvbjpyZWxhdGl2ZTtib3R0b206MXB4XCIgW21hdE1lbnVUcmlnZ2VyRm9yXT1cImFib3ZlTWVudVwiICN0cmlnZ2VyPVwibWF0TWVudVRyaWdnZXJcIiBjbGFzcz1cImJ0bkNsb2NrXCIgKGNsaWNrKT1cInByZWVuY2hlckRpdnMoKVwiPlxuICAgICAgPHN2ZyB3aWR0aD1cIjIwcHhcIiBoZWlnaHQ9XCIyMHB4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHN0eWxlPVwid2lkdGg6IDE3cHg7XCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNMTIgN1YxMkgxNU0yMSAxMkMyMSAxNi45NzA2IDE2Ljk3MDYgMjEgMTIgMjFDNy4wMjk0NCAyMSAzIDE2Ljk3MDYgMyAxMkMzIDcuMDI5NDQgNy4wMjk0NCAzIDEyIDNDMTYuOTcwNiAzIDIxIDcuMDI5NDQgMjEgMTJaXCIgc3Ryb2tlPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG4gICAgICA8L3N2Zz5cbiAgICA8L2J1dHRvbj5cbiAgICA8bWF0LW1lbnUgI2Fib3ZlTWVudT1cIm1hdE1lbnVcIiB5UG9zaXRpb249XCJhYm92ZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJtYXRNZW51Q2xvY2tcIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiPlxuICAgICAgPGRpdiBjbGFzcz1cIm51bWJlcnNcIj5cbiAgICAgICAgPGRpdiBpZD1cImhvdXJDbG9ja1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGlkPVwibWludXRlQ2xvY2tcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBpZD1cInNlY29uZENsb2NrXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXJDbG9ja1wiPlxuICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uICpuZ0lmPVwibWF4ICE9PSAnMjM6NTk6NTknXCIgKGNsaWNrKT1cIm1heENsb2NrKClcIj5NYXg8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiAqbmdJZj1cIm1heCA9PSAnMjM6NTk6NTknXCIgKGNsaWNrKT1cIm5vd0Nsb2NrKClcIj5Ob3c8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiBbZGlzYWJsZWRdPVwiZGlzYWJsZUNsb2NrXCIgKGNsaWNrKT1cImNvbmZpcm1DbG9jaygpXCI+T2s8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDwvbWF0LW1lbnU+XG4gIDwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbXG4gICAgYC50aW1lcGlja2Vye1xuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGdyYXk7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC13cmFwOiBub3dyYXA7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgfVxuICAgIGRpdntcbiAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7IC8qIFNhZmFyaSAqL1xuICAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTsgLyogRmlyZWZveCAqL1xuICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lOyAvKiBJRTEwKy9FZGdlICovXG4gICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICB9XG4gICAgZGl2OmZvY3Vze1xuICAgICAgb3V0bGluZTpub25lO1xuICAgIH1cbiAgICAuYnRuQ2xvY2t7XG4gICAgICBtYXJnaW46MCA1cHg7XG4gICAgICBoZWlnaHQ6MzBweDtcbiAgICAgIG1pbi13aWR0aDoyNXB4O1xuICAgICAgZGlzcGxheTpmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OmNlbnRlcjtcbiAgICAgIGFsaWduLWl0ZW1zOmNlbnRlcjtcbiAgICB9XG4gICAgLmJ0bkNsb2Nre1xuICAgICAgZGlzcGxheTpmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OmNlbnRlcjtcbiAgICAgIGFsaWduLWl0ZW1zOmNlbnRlcjtcbiAgICAgIG1pbi1oZWlnaHQ6MjVweDtcbiAgICAgIGhlaWdodDoyNXB4O1xuICAgIH1cbiAgICAubWF0TWVudUNsb2Nre1xuICAgICAgd2lkdGg6MTUwcHg7XG4gICAgICBoZWlnaHQ6MTUwcHg7XG4gICAgICBkaXNwbGF5OmZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjpjb2x1bW47XG4gICAgfVxuICAgIC5udW1iZXJze1xuICAgICAgd2lkdGg6MTUwcHg7XG4gICAgICBoZWlnaHQ6MTIwcHg7XG4gICAgICBkaXNwbGF5OmZsZXg7XG4gICAgfVxuICAgIC5udW1iZXJzPmRpdntcbiAgICAgIHdpZHRoOjUwcHg7XG4gICAgICBoZWlnaHQ6MTIwcHg7XG4gICAgICBkaXNwbGF5OmZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjpjb2x1bW47XG4gICAgICBhbGlnbi1pdGVtczpjZW50ZXI7XG4gICAgICBvdmVyZmxvdzpzY3JvbGw7XG4gICAgICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XG4gICAgfVxuICAgIC5udW1iZXJzPmRpdjo6LXdlYmtpdC1zY3JvbGxiYXJ7XG4gICAgICBkaXNwbGF5Om5vbmU7XG4gICAgfVxuICAgIC5mb290ZXJDbG9ja3tcbiAgICAgIHdpZHRoOjE1MHB4O1xuICAgICAgaGVpZ2h0OjMwcHg7XG4gICAgICBkaXNwbGF5OmZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kO1xuICAgICAgYWxpZ24taXRlbXM6Y2VudGVyO1xuICAgICAgYnV0dG9ue1xuICAgICAgICBtaW4td2lkdGg6NTBweDtcbiAgICAgICAgbWluLWhlaWdodDoyMHB4O1xuICAgICAgICB3aWR0aDo1MHB4O1xuICAgICAgICBoZWlnaHQ6MjBweDtcbiAgICAgICAgZm9udC1zaXplOjE1cHg7XG4gICAgICAgIGRpc3BsYXk6ZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OmNlbnRlcjtcbiAgICAgICAgYWxpZ24taXRlbXM6Y2VudGVyO1xuICAgICAgfVxuICAgIH1cbiAgICBgXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4VGltZXBpY2tlcjEyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LEFmdGVyVmlld0luaXQsT25DaGFuZ2Vze1xuICBAVmlld0NoaWxkKCd0cmlnZ2VyJykgbWVudVRyaWdnZXIhOiBNYXRNZW51VHJpZ2dlcjtcbiAgQElucHV0KCkgd2lkdGg6bnVtYmVyID0gMTMwO1xuICBASW5wdXQoKSBoZWlnaHQ6bnVtYmVyID0gNDA7XG4gIEBJbnB1dCgpIGZvbnQ6bnVtYmVyID0gMTA7XG4gIEBJbnB1dCgpIG1heDpzdHJpbmcgPSAnMjM6NTk6NTknO1xuICBASW5wdXQoKSByZXNwb25zZTogbnVtYmVyfG51bGwgPSBudWxsO1xuICBASW5wdXQoKSByZXNwb25zZVN0cmluZzogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG5lZWRTZWNvbmRzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgdHlwZTogJ21pbGlzZWNvbmQnfCdzZWNvbmQnfCdtaW51dGUnfCAnaG91cicgfCAndGltZScgPSAnc2Vjb25kJ1xuICBASW5wdXQoKSBjb3I6c3RyaW5nID0gXCIjNDhiOWM3XCI7XG4gIEBJbnB1dCgpIGRpc2FibGVkOmJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgcmVzcG9uc2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHJlc3BvbnNlU3RyaW5nQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHB1YmxpYyB3aWR0aENzczpzdHJpbmcgPSBgJHt0aGlzLndpZHRofXB4YDtcbiAgcHVibGljIGhlaWdodENzczpzdHJpbmcgPSBgJHt0aGlzLmhlaWdodH1weGA7XG4gIHB1YmxpYyBmb250Q3NzOnN0cmluZyA9IGAke3RoaXMuZm9udH1weGBcbiAgcHVibGljIGhvdXI6bnVtYmVyID0gMDtcbiAgcHVibGljIG1pbnV0ZTpudW1iZXIgPSAwO1xuICBwdWJsaWMgc2Vjb25kOm51bWJlciA9IDA7XG4gIHB1YmxpYyBzZWxlY3RlZDonaG91cid8J21pbnV0ZSd8J3NlY29uZCd8bnVsbCA9IG51bGw7XG4gIHB1YmxpYyBtYXhIb3VyOm51bWJlciA9IDBcbiAgcHVibGljIG1heE1pbnV0ZTpudW1iZXIgPSAwXG4gIHB1YmxpYyBtYXhTZWNvbmQ6bnVtYmVyID0gMFxuICBwdWJsaWMgZGlzYWJsZUNsb2NrOmJvb2xlYW4gPSB0cnVlO1xuICBwdWJsaWMgaG91ckNsb2NrOnN0cmluZ3xudWxsID0gbnVsbDtcbiAgcHVibGljIG1pbnV0ZUNsb2NrOnN0cmluZ3xudWxsID0gbnVsbDtcbiAgcHVibGljIHNlY29uZENsb2NrOnN0cmluZ3xudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBuZXdJbnB1dDpib29sZWFuID0gdHJ1ZTtcbiAgY29uc3RydWN0b3IoKXtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmKHRoaXMubWF4ICE9ICcnKXtcbiAgICAgIGNvbnN0IGFycmF5TWF4ID0gdGhpcy5tYXguc3BsaXQoJzonKTtcbiAgICAgIHRoaXMubWF4SG91cj1wYXJzZUludChhcnJheU1heFswXSlcbiAgICAgIHRoaXMubWF4TWludXRlPXBhcnNlSW50KGFycmF5TWF4WzFdKVxuICAgICAgdGhpcy5tYXhTZWNvbmQ9cGFyc2VJbnQoYXJyYXlNYXhbMl0pXG4gICAgfVxuICAgIGlmKHRoaXMucmVzcG9uc2VTdHJpbmcpe1xuICAgICAgdGhpcy5pbml0KHRoaXMucmVzcG9uc2VTdHJpbmcpXG4gICAgfVxuICAgIGlmKHRoaXMucmVzcG9uc2Upe1xuICAgICAgbGV0IHRpbWUgPSB0aGlzLnJlc3BvbnNlXG4gICAgICBpZih0aW1lPjM2MDApe1xuICAgICAgICB0aGlzLmhvdXIgPSBNYXRoLnJvdW5kKHRpbWUvMzYwMClcbiAgICAgICAgdGltZSAtPTM2MDAqdGhpcy5ob3VyXG4gICAgICB9XG4gICAgICBpZih0aW1lPjYwKXtcbiAgICAgICAgdGhpcy5taW51dGUgPSBNYXRoLnJvdW5kKHRpbWUvNjApXG4gICAgICAgIHRpbWUgLT02MCp0aGlzLm1pbnV0ZVxuICAgICAgfVxuICAgICAgaWYodGltZSl7XG4gICAgICAgIHRoaXMuc2Vjb25kID0gdGltZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgIC8vIFZlcmlmaWNhIHNlICdyZXNwb25zZVN0cmluZycgZm9pIGEgcHJvcHJpZWRhZGUgcXVlIG11ZG91XG4gICAgaWYgKGNoYW5nZXNbJ3Jlc3BvbnNlU3RyaW5nJ10pIHtcbiAgICAgIC8vIGNvbnN0IHByZXZpb3VzVmFsdWUgPSBjaGFuZ2VzWydyZXNwb25zZVN0cmluZyddLnByZXZpb3VzVmFsdWU7IC0tLSBjYXNvIHByZWNpc2UgZG8gdmFsb3IgYW50ZXMgZGEgbXVkYW7Dp2EgZG8gaW5wdXRcbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNoYW5nZXNbJ3Jlc3BvbnNlU3RyaW5nJ10uY3VycmVudFZhbHVlO1xuICAgICAgaWYoY3VycmVudFZhbHVlKXtcbiAgICAgICAgdGhpcy5pbml0KGN1cnJlbnRWYWx1ZSlcbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLmluaXQoXCIwMDowMDowMFwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2Rpc2FibGVkJ10pIHtcbiAgICAgIC8vIGNvbnN0IHByZXZpb3VzVmFsdWUgPSBjaGFuZ2VzWydyZXNwb25zZVN0cmluZyddLnByZXZpb3VzVmFsdWU7IC0tLSBjYXNvIHByZWNpc2UgZG8gdmFsb3IgYW50ZXMgZGEgbXVkYW7Dp2EgZG8gaW5wdXRcbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNoYW5nZXNbJ2Rpc2FibGVkJ10uY3VycmVudFZhbHVlO1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IGN1cnJlbnRWYWx1ZVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpbml0KHJlc3BvbnNlU3RyaW5nOlN0cmluZyl7XG4gICAgbGV0IGFycmF5ID0gcmVzcG9uc2VTdHJpbmcuc3BsaXQoJzonKTtcbiAgICAgICAgaWYodGhpcy5uZWVkU2Vjb25kcyl7XG4gICAgICAgICAgICB0aGlzLmhvdXIgPSBwYXJzZUludChhcnJheVswXSk7XG4gICAgICAgICAgICB0aGlzLm1pbnV0ZSA9IHBhcnNlSW50KGFycmF5WzFdKTtcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kID0gcGFyc2VJbnQoYXJyYXlbMl0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuaG91ciA9IHBhcnNlSW50KGFycmF5WzBdKTtcbiAgICAgICAgICAgIHRoaXMubWludXRlID0gcGFyc2VJbnQoYXJyYXlbMV0pO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgaWYoaXNOYU4odGhpcy5ob3VyKSB8fCBpc05hTih0aGlzLm1pbnV0ZSkgfHwgaXNOYU4odGhpcy5zZWNvbmQpKXtcbiAgICAgICAgICB0aGlzLmhvdXIgPSAwXG4gICAgICAgICAgdGhpcy5taW51dGUgPSAwXG4gICAgICAgICAgdGhpcy5zZWNvbmQgPSAwXG4gICAgICAgIH1cbiAgfVxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywoZSk9PntcbiAgICAgICAgaWYoZS5jb2RlID09ICdUYWInKXtcbiAgICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdtaW51dGUnXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ3NlY29uZCdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGUuY29kZSA9PSAnQXJyb3dVcCcpe1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgICAgdGhpcy5ob3VyKytcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICAgIHRoaXMubWludXRlKytcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICAgIHRoaXMuc2Vjb25kKytcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZS5jb2RlID09ICdBcnJvd0Rvd24nKXtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICAgIGlmKHRoaXMuaG91cj09MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3VyPXRoaXMubWF4SG91clxuICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmhvdXItLVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICBpZih0aGlzLm1pbnV0ZT09MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5taW51dGU9NTlcbiAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5taW51dGUtLVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgICBpZih0aGlzLnNlY29uZD09MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWNvbmQ9NTlcbiAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWNvbmQtLVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGUuY29kZSA9PSAnQXJyb3dSaWdodCcpe1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdtaW51dGUnO1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdzZWNvbmQnO1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihlLmNvZGUgPT0gJ0Fycm93TGVmdCcpe1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ21pbnV0ZSc7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ2hvdXInO1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihlLmNvZGUgPT0nQmFja3NwYWNlJyl7XG4gICAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICAgIHRoaXMuYXBhZ2FyKCdob3VyJylcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICAgIHRoaXMuYXBhZ2FyKCdtaW51dGUnKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgdGhpcy5hcGFnYXIoJ3NlY29uZCcpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBzd2l0Y2goZS5rZXkpe1xuICAgICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDEsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzInOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDIsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzMnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDMsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzQnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDQsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzUnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDUsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzYnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDYsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzcnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDcsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzgnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDgsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzknOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDksdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzAnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDAsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5taW51dGU+NTkgfHwgdGhpcy5taW51dGU8MCl7XG4gICAgICAgICAgdGhpcy5taW51dGUgPSAwXG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5zZWNvbmQ+NTkgfHwgdGhpcy5zZWNvbmQ8MCl7XG4gICAgICAgICAgdGhpcy5zZWNvbmQgPSAwXG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5ob3VyPDApe1xuICAgICAgICAgIHRoaXMuaG91ciA9IDBcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmhvdXI+dGhpcy5tYXhIb3VyKXtcbiAgICAgICAgICB0aGlzLmhvdXIgPSB0aGlzLm1heEhvdXJcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKClcbiAgICAgIH0pXG4gIH1cblxuICBwdWJsaWMgbG9zdEZvY3VzKCl7XG4gICAgdGhpcy5zZWxlY3RlZCA9IG51bGxcbiAgfVxuXG4gIHB1YmxpYyBmb2N1cygkZXZlbnQ6YW55KXtcbiAgICBpZighdGhpcy5kaXNhYmxlZCl7XG4gICAgICBzd2l0Y2goJGV2ZW50LnRhcmdldC5pZCl7XG4gICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnaG91cic7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ21pbnV0ZSc7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ3NlY29uZCc7XG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXBhZ2FyKGxvY2FsOiAnaG91cid8J21pbnV0ZSd8J3NlY29uZCd8bnVsbCkge1xuICAgIGlmKGxvY2FsKXtcbiAgICAgIGlmKGxvY2FsPT0naG91cicpe1xuICAgICAgICBsZXQgaG9yYSA9IHRoaXMuaG91ci50b1N0cmluZygpLnNwbGl0KCcnKTtcbiAgICAgICAgaWYoaG9yYS5sZW5ndGg+MSl7XG4gICAgICAgICAgbGV0IHJldGlyYWRvID0gaG9yYS5wb3AoKTtcbiAgICAgICAgdGhpcy5ob3VyID0gIHBhcnNlSW50KGhvcmEuam9pbignJykpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuaG91ciA9IDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYobG9jYWw9PSdtaW51dGUnKXtcbiAgICAgICAgbGV0IG1pbnV0byA9IHRoaXMubWludXRlLnRvU3RyaW5nKCkuc3BsaXQoJycpO1xuICAgICAgICBpZihtaW51dG8ubGVuZ3RoPjEpe1xuICAgICAgICBsZXQgcmV0aXJhZG8gPSBtaW51dG8ucG9wKCk7XG4gICAgICAgIHRoaXMubWludXRlID0gIHBhcnNlSW50KG1pbnV0by5qb2luKCcnKSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMubWludXRlID0gMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihsb2NhbD09J3NlY29uZCcpe1xuICAgICAgICBsZXQgc2VndW5kbyA9IHRoaXMuc2Vjb25kLnRvU3RyaW5nKCkuc3BsaXQoJycpO1xuICAgICAgICBpZihzZWd1bmRvLmxlbmd0aD4xKXtcbiAgICAgICAgbGV0IHJldGlyYWRvID0gc2VndW5kby5wb3AoKTtcbiAgICAgICAgdGhpcy5zZWNvbmQgPSAgcGFyc2VJbnQoc2VndW5kby5qb2luKCcnKSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5zZWNvbmQgPSAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGlnaXRhcihudW06bnVtYmVyLGxvY2FsOidob3VyJ3wnbWludXRlJ3wnc2Vjb25kJ3xudWxsKXtcbiAgICBpZihsb2NhbCl7XG4gICAgICBpZihsb2NhbD09J2hvdXInKXtcbiAgICAgICAgaWYodGhpcy5uZXdJbnB1dCl7XG4gICAgICAgICAgdGhpcy5ob3VyPXBhcnNlSW50KCcwJytudW0pXG4gICAgICAgICAgdGhpcy5uZXdJbnB1dCA9IGZhbHNlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLmhvdXI9cGFyc2VJbnQodGhpcy5ob3VyLnRvU3RyaW5nKCkrbnVtKVxuICAgICAgICAgIGlmKHRoaXMuaG91ci50b1N0cmluZygpLmxlbmd0aCA9PSB0aGlzLm1heEhvdXIudG9TdHJpbmcoKS5sZW5ndGgpe1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdtaW51dGUnO1xuICAgICAgICAgICAgdGhpcy5uZXdJbnB1dD10cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihsb2NhbD09J21pbnV0ZScpe1xuICAgICAgICBpZih0aGlzLm5ld0lucHV0KXtcbiAgICAgICAgICB0aGlzLm1pbnV0ZT1wYXJzZUludCgnMCcrbnVtKVxuICAgICAgICAgIHRoaXMubmV3SW5wdXQgPSBmYWxzZVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLm1pbnV0ZT1wYXJzZUludCh0aGlzLm1pbnV0ZS50b1N0cmluZygpK251bSlcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ3NlY29uZCc7XG4gICAgICAgICAgdGhpcy5uZXdJbnB1dD10cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGxvY2FsPT0nc2Vjb25kJyl7XG4gICAgICAgIGlmKHRoaXMubmV3SW5wdXQpe1xuICAgICAgICAgIHRoaXMuc2Vjb25kPXBhcnNlSW50KCcwJytudW0pXG4gICAgICAgICAgdGhpcy5uZXdJbnB1dCA9IGZhbHNlXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuc2Vjb25kPXBhcnNlSW50KHRoaXMuc2Vjb25kLnRvU3RyaW5nKCkrbnVtKVxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgICAgIHRoaXMubmV3SW5wdXQ9dHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGVycm9yKCl7XG4gICAgcmV0dXJuIHRocm93RXJyb3IoKCk9PiBuZXcgRXJyb3IoJ1RoZSB0aW1lIGlzIGJpZ2dlciB0aGVuIG1heCB0aW1lOldhcyBzZXQgdGhlIG1heCB0aW1lJykpXG4gIH1cblxuICBwdWJsaWMgdXBkYXRlVmFsdWUoKTogdm9pZCB7XG4gICAgaWYodGhpcy5ob3VyPnRoaXMubWF4SG91cil7XG4gICAgICB0aGlzLmhvdXIgPSB0aGlzLm1heEhvdXI7XG4gICAgICB0aGlzLmVycm9yKClcbiAgICB9XG4gICAgaWYodGhpcy5ob3VyPT10aGlzLm1heEhvdXIgJiYgdGhpcy5taW51dGU+dGhpcy5tYXhNaW51dGUpe1xuICAgICAgdGhpcy5taW51dGU9dGhpcy5tYXhNaW51dGVcbiAgICAgIHRoaXMuZXJyb3IoKVxuICAgIH1cbiAgICBpZih0aGlzLmhvdXI9PXRoaXMubWF4SG91ciAmJiB0aGlzLm1pbnV0ZT09dGhpcy5tYXhNaW51dGUgJiYgdGhpcy5zZWNvbmQ+dGhpcy5tYXhTZWNvbmQpe1xuICAgICAgdGhpcy5zZWNvbmQ9dGhpcy5tYXhTZWNvbmRcbiAgICAgIHRoaXMuZXJyb3IoKVxuICAgIH1cbiAgICBzd2l0Y2godGhpcy50eXBlKXtcbiAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhU2VndW5kbyA9ICgodGhpcy5ob3VyKjYwKSt0aGlzLm1pbnV0ZSkqNjArdGhpcy5zZWNvbmRcbiAgICAgICAgdGhpcy5yZXNwb25zZUNoYW5nZS5lbWl0KHJlc3Bvc3RhU2VndW5kbyk7XG4gICAgICAgIHRoaXMucmVzcG9uc2VTdHJpbmdDaGFuZ2UuZW1pdChyZXNwb3N0YVNlZ3VuZG8udG9TdHJpbmcoKSk7XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICBjb25zdCByZXNwb3N0YU1pbnV0byA9ICgodGhpcy5ob3VyKjYwKStNYXRoLmZsb29yKHRoaXMuc2Vjb25kLzYwKSkrdGhpcy5taW51dGVcbiAgICAgICAgdGhpcy5yZXNwb25zZUNoYW5nZS5lbWl0KHJlc3Bvc3RhTWludXRvKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhTWludXRvLnRvU3RyaW5nKCkpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdtaWxpc2Vjb25kJzpcbiAgICAgICAgY29uc3QgcmVzcG9zdGFNaWxpc2VndW5kbyA9ICgoKHRoaXMuaG91cio2MCkrdGhpcy5taW51dGUpKjYwK3RoaXMuc2Vjb25kKSoxMDAwO1xuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFNaWxpc2VndW5kbyk7XG4gICAgICAgIHRoaXMucmVzcG9uc2VTdHJpbmdDaGFuZ2UuZW1pdChyZXNwb3N0YU1pbGlzZWd1bmRvLnRvU3RyaW5nKCkpO1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhSG9yYSA9IE1hdGguZmxvb3IoKE1hdGguZmxvb3IodGhpcy5zZWNvbmQvNjApK3RoaXMubWludXRlKS82MCkrdGhpcy5ob3VyO1xuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFIb3JhKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhSG9yYS50b1N0cmluZygpKTtcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICBjb25zdCByZXNwb3N0YSA9IGAke3RoaXMuaG91ci50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMuaG91cjp0aGlzLmhvdXJ9OiR7dGhpcy5taW51dGUudG9TdHJpbmcoKS5sZW5ndGg9PT0xPycwJyt0aGlzLm1pbnV0ZTp0aGlzLm1pbnV0ZX06JHt0aGlzLnNlY29uZC50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMuc2Vjb25kOnRoaXMuc2Vjb25kfWBcbiAgICAgICAgY29uc3QgcmVzcG9zdGFTZXBhcmFkYSA9IHtcbiAgICAgICAgICBob3VyOnRoaXMuaG91cixcbiAgICAgICAgICBtaW51dGU6dGhpcy5taW51dGUsXG4gICAgICAgICAgc2Vjb25kOnRoaXMuc2Vjb25kXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZUNoYW5nZS5lbWl0KHJlc3Bvc3RhU2VwYXJhZGEpO1xuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBtYXhDbG9jaygpe1xuICAgIHRoaXMuaG91ciA9IHRoaXMubWF4SG91cjtcbiAgICB0aGlzLm1pbnV0ZSA9IHRoaXMubWF4TWludXRlO1xuICAgIHRoaXMuc2Vjb25kID0gdGhpcy5tYXhTZWNvbmQ7XG4gICAgdGhpcy5mZWNoYXJNZW51KHRoaXMubWVudVRyaWdnZXIpO1xuICB9XG5cbiAgcHVibGljIG5vd0Nsb2NrKCl7XG4gICAgY29uc3QgYWdvcmEgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGhvcmFzID0gYWdvcmEuZ2V0SG91cnMoKTtcbiAgICBjb25zdCBtaW51dG9zID0gYWdvcmEuZ2V0TWludXRlcygpO1xuICAgIGNvbnN0IHNlZ3VuZG9zID0gYWdvcmEuZ2V0U2Vjb25kcygpO1xuXG4gICAgdGhpcy5ob3VyID0gaG9yYXM7XG4gICAgdGhpcy5taW51dGUgPSBtaW51dG9zO1xuICAgIHRoaXMuc2Vjb25kID0gc2VndW5kb3M7XG4gICAgdGhpcy5mZWNoYXJNZW51KHRoaXMubWVudVRyaWdnZXIpO1xuICB9XG5cbiAgcHVibGljIGZlY2hhck1lbnUodHJpZ2dlcjpNYXRNZW51VHJpZ2dlcikge1xuICAgIHRoaXMuZGlzYWJsZUNsb2NrID0gdHJ1ZVxuICAgIHRyaWdnZXIuY2xvc2VNZW51KCk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZSgpO1xuICB9XG5cbiAgcHVibGljIHByZWVuY2hlckRpdnMoKSB7XG4gICAgdGhpcy5kaXNhYmxlQ2xvY2sgPSB0cnVlO1xuICAgIHRoaXMuaG91ckNsb2NrID0gbnVsbDtcbiAgICB0aGlzLm1pbnV0ZUNsb2NrID0gbnVsbDtcbiAgICB0aGlzLnNlY29uZENsb2NrID0gbnVsbDtcbiAgICB0aGlzLmRlc3Ryb3lEaXZzKCdob3VyQ2xvY2snKVxuICAgIHRoaXMuZGVzdHJveURpdnMoJ21pbnV0ZUNsb2NrJylcbiAgICB0aGlzLmRlc3Ryb3lEaXZzKCdzZWNvbmRDbG9jaycpXG4gICAgY29uc3QgY3JpYXJEaXZzID0gKHBhcmVudEVsZW1lbnRJZDogc3RyaW5nLCBpZDogbnVtYmVyLCBsaW1pdGU6IG51bWJlcikgPT4ge1xuXG4gICAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyZW50RWxlbWVudElkKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gbGltaXRlOyBpKyspIHtcbiAgICAgICAgY29uc3QgbnVtYmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG51bWJlckRpdi50ZXh0Q29udGVudCA9IGkgPCAxMCA/IGAwJHtpfWAgOiBgJHtpfWA7XG4gICAgICAgIG51bWJlckRpdi5zdHlsZS5ib3JkZXJCb3R0b20gPSBcIjFweCBzb2xpZCBibGFja1wiO1xuICAgICAgICBudW1iZXJEaXYuc3R5bGUucGFkZGluZyA9IFwiNXB4IDEwcHhcIjtcbiAgICAgICAgbnVtYmVyRGl2LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgICBudW1iZXJEaXYuc3R5bGUubWFyZ2luID0gXCIycHhcIjtcblxuICAgICAgICBsZXQgY2xhc3NJZGVudGlmaWVyID0gJyc7XG4gICAgICAgIHN3aXRjaChpZCkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNsYXNzSWRlbnRpZmllciA9ICdudW1Ib3VyQ2xvY2snO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY2xhc3NJZGVudGlmaWVyID0gJ251bU1pbnV0ZUNsb2NrJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNsYXNzSWRlbnRpZmllciA9ICdudW1TZWNvbmRDbG9jayc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBudW1iZXJEaXYuY2xhc3NMaXN0LmFkZChjbGFzc0lkZW50aWZpZXIpO1xuXG4gICAgICAgIG51bWJlckRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBhbGxTaWJsaW5ncyA9IHBhcmVudEVsZW1lbnQhLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2NsYXNzSWRlbnRpZmllcn1gKTtcbiAgICAgICAgICBhbGxTaWJsaW5ncy5mb3JFYWNoKHNpYmxpbmcgPT4ge1xuICAgICAgICAgICAgaWYgKHNpYmxpbmcgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICBzaWJsaW5nLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZihjbGFzc0lkZW50aWZpZXIgPT09ICdudW1Ib3VyQ2xvY2snKSB0aGlzLmhvdXJDbG9jayA9IG51bWJlckRpdi50ZXh0Q29udGVudDtcbiAgICAgICAgICBpZihjbGFzc0lkZW50aWZpZXIgPT09ICdudW1NaW51dGVDbG9jaycpIHRoaXMubWludXRlQ2xvY2sgPSBudW1iZXJEaXYudGV4dENvbnRlbnQ7XG4gICAgICAgICAgaWYoY2xhc3NJZGVudGlmaWVyID09PSAnbnVtU2Vjb25kQ2xvY2snKSB0aGlzLnNlY29uZENsb2NrID0gbnVtYmVyRGl2LnRleHRDb250ZW50O1xuXG4gICAgICAgICAgbnVtYmVyRGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRibHVlXCI7XG5cbiAgICAgICAgICBpZih0aGlzLmhvdXJDbG9jayAmJiB0aGlzLm1pbnV0ZUNsb2NrICYmIHRoaXMuc2Vjb25kQ2xvY2spe1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlQ2xvY2sgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBhcmVudEVsZW1lbnQhLmFwcGVuZENoaWxkKG51bWJlckRpdik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNyaWFyRGl2cygnaG91ckNsb2NrJywgMCwgdGhpcy5tYXhIb3VyKTtcbiAgICBjcmlhckRpdnMoJ21pbnV0ZUNsb2NrJywgMSwgNTkpO1xuICAgIGNyaWFyRGl2cygnc2Vjb25kQ2xvY2snLCAyLCA1OSk7XG4gIH1cblxuICBwdWJsaWMgZGVzdHJveURpdnMoaWQ6c3RyaW5nKXtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGlmKGVsZW1lbnQpe1xuICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSAnJ1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjb25maXJtQ2xvY2soKXtcbiAgICB0aGlzLmhvdXIgPSBwYXJzZUludCh0aGlzLmhvdXJDbG9jayEpXG4gICAgdGhpcy5taW51dGUgPSBwYXJzZUludCh0aGlzLm1pbnV0ZUNsb2NrISlcbiAgICB0aGlzLnNlY29uZCA9IHBhcnNlSW50KHRoaXMuc2Vjb25kQ2xvY2shKVxuICAgIHRoaXMuZmVjaGFyTWVudSh0aGlzLm1lbnVUcmlnZ2VyKTtcbiAgfVxufVxuIl19