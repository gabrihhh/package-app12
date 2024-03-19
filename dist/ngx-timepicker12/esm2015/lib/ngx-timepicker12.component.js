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
        this.tabIndex = false;
    }
    ngOnInit() {
        if (this.max != '') {
            const arrayMax = this.max.split(':');
            this.maxHour = parseInt(arrayMax[0]);
            this.maxMinute = parseInt(arrayMax[1]);
            this.maxSecond = parseInt(arrayMax[2]);
        }
        if (this.responseString) {
            let array = this.responseString.split(':');
            if (this.needSeconds) {
                this.hour = parseInt(array[0]);
                this.minute = parseInt(array[1]);
                this.second = parseInt(array[2]);
            }
            else {
                this.hour = parseInt(array[0]);
                this.minute = parseInt(array[1]);
            }
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
            if (this.hour.toString().length > 3 || this.hour < 0) {
                this.hour = 0;
            }
            this.updateValue();
        });
    }
    lostFocus() {
        this.selected = null;
    }
    focus($event) {
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
                    this.selected = 'minute';
                    this.newInput = true;
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
NgxTimepicker12Component.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: NgxTimepicker12Component, selector: "ngx-timepicker", inputs: { width: "width", height: "height", font: "font", max: "max", response: "response", responseString: "responseString", needSeconds: "needSeconds", type: "type", cor: "cor" }, outputs: { responseChange: "responseChange", responseStringChange: "responseStringChange" }, viewQueries: [{ propertyName: "menuTrigger", first: true, predicate: ["trigger"], descendants: true }], ngImport: i0, template: `
  <div [style.width]="widthCss" [style.height]="heightCss" class="timepicker">
    <div id="hour" tabindex="1" (blur)="lostFocus()" (focus)="focus($event)" [style.background-color]="selected==='hour'? cor : 'transparent'" (click)="focus($event)">{{hour.toString().length===1?'0'+this.hour:this.hour}}</div>
    <div>:</div>
    <div id="minute" tabindex="1" (blur)="lostFocus()" (focus)="focus($event)" [style.background-color]="selected==='minute'? cor : 'transparent'" (click)="focus($event)">{{minute.toString().length===1?'0'+this.minute:this.minute}}</div>
    <div *ngIf="needSeconds">:</div>
    <div *ngIf="needSeconds" id="second" tabindex="1" (blur)="lostFocus()" (focus)="focus($event)" [style.background-color]="selected==='second'? cor : 'transparent'" (click)="focus($event)">{{second.toString().length===1?'0'+this.second:this.second}}</div>
    <button mat-button style="padding:10px;position:relative;bottom:1px" [matMenuTriggerFor]="aboveMenu" #trigger="matMenuTrigger" class="btnClock" (click)="preencherDivs()">
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
        <button mat-raised-button (click)="nowClock()">Now</button>
        <button mat-raised-button [disabled]="disableClock" (click)="confirmClock()">Ok</button>
      </div>
    </div>
    </mat-menu>
  </div>
`, isInline: true, styles: [".timepicker{\n      border-bottom: 1px solid gray;\n      display: flex;\n      flex-wrap: nowrap;\n      justify-content: center;\n      align-items: center;\n    }\n    div{\n      -webkit-user-select: none; /* Safari */\n      -moz-user-select: none; /* Firefox */\n      -ms-user-select: none; /* IE10+/Edge */\n      user-select: none;\n    }\n    div:focus{\n      outline:none;\n    }\n    .btnClock{\n      margin:0 5px;\n      height:30px;\n      min-width:25px;\n      display:flex;\n      justify-content:center;\n      align-items:center;\n    }\n\n    #hour,#minute,#second{\n      cursor:pointer\n    }\n    .btnClock{\n      display:flex;\n      justify-content:center;\n      align-items:center;\n      min-height:25px;\n      height:25px;\n    }\n    .matMenuClock{\n      width:150px;\n      height:150px;\n      display:flex;\n      flex-direction:column;\n    }\n    .numbers{\n      width:150px;\n      height:120px;\n      display:flex;\n    }\n    .numbers>div{\n      width:50px;\n      height:120px;\n      display:flex;\n      flex-direction:column;\n      align-items:center;\n      overflow:scroll;\n    }\n    .footerClock{\n      width:150px;\n      height:30px;\n      display:flex;\n      justify-content:space-around;\n      align-items:center;\n      button{\n        min-width:50px;\n        min-height:20px;\n        width:50px;\n        height:20px;\n        font-size:15px;\n        display:flex;\n        justify-content:center;\n        align-items:center;\n      }\n    }\n    "], components: [{ type: i1.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i2.MatMenu, selector: "mat-menu", exportAs: ["matMenu"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", exportAs: ["matMenuTrigger"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NgxTimepicker12Component, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngx-timepicker',
                    template: `
  <div [style.width]="widthCss" [style.height]="heightCss" class="timepicker">
    <div id="hour" tabindex="1" (blur)="lostFocus()" (focus)="focus($event)" [style.background-color]="selected==='hour'? cor : 'transparent'" (click)="focus($event)">{{hour.toString().length===1?'0'+this.hour:this.hour}}</div>
    <div>:</div>
    <div id="minute" tabindex="1" (blur)="lostFocus()" (focus)="focus($event)" [style.background-color]="selected==='minute'? cor : 'transparent'" (click)="focus($event)">{{minute.toString().length===1?'0'+this.minute:this.minute}}</div>
    <div *ngIf="needSeconds">:</div>
    <div *ngIf="needSeconds" id="second" tabindex="1" (blur)="lostFocus()" (focus)="focus($event)" [style.background-color]="selected==='second'? cor : 'transparent'" (click)="focus($event)">{{second.toString().length===1?'0'+this.second:this.second}}</div>
    <button mat-button style="padding:10px;position:relative;bottom:1px" [matMenuTriggerFor]="aboveMenu" #trigger="matMenuTrigger" class="btnClock" (click)="preencherDivs()">
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
        <button mat-raised-button (click)="nowClock()">Now</button>
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

    #hour,#minute,#second{
      cursor:pointer
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
            }], responseChange: [{
                type: Output
            }], responseStringChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdGltZXBpY2tlcjEyL3NyYy9saWIvbmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpHLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7O0FBeUdsQyxNQUFNLE9BQU8sd0JBQXdCO0lBOEJuQztRQTVCUyxVQUFLLEdBQVUsR0FBRyxDQUFDO1FBQ25CLFdBQU0sR0FBVSxFQUFFLENBQUM7UUFDbkIsU0FBSSxHQUFVLEVBQUUsQ0FBQztRQUNqQixRQUFHLEdBQVUsVUFBVSxDQUFDO1FBQ3hCLGFBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBQzdCLG1CQUFjLEdBQWtCLElBQUksQ0FBQztRQUNyQyxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUM1QixTQUFJLEdBQW9ELFFBQVEsQ0FBQTtRQUNoRSxRQUFHLEdBQVUsU0FBUyxDQUFDO1FBRXRCLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN6Qyx5QkFBb0IsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2xELGFBQVEsR0FBVSxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQztRQUNwQyxjQUFTLEdBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUM7UUFDdEMsWUFBTyxHQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFBO1FBQ2pDLFNBQUksR0FBVSxDQUFDLENBQUM7UUFDaEIsV0FBTSxHQUFVLENBQUMsQ0FBQztRQUNsQixXQUFNLEdBQVUsQ0FBQyxDQUFDO1FBQ2xCLGFBQVEsR0FBaUMsSUFBSSxDQUFDO1FBQzlD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QUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBWSxDQUFDLENBQUE7UUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7c0hBeGFVLHdCQUF3QjswR0FBeEIsd0JBQXdCLGliQXRHekI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBMEJYOzRGQTRFWSx3QkFBd0I7a0JBeEdwQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0EwQlg7b0JBQ0MsTUFBTSxFQUFFO3dCQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXVFQztxQkFDRjtpQkFDRjswRUFFdUIsV0FBVztzQkFBaEMsU0FBUzt1QkFBQyxTQUFTO2dCQUNYLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUVJLGNBQWM7c0JBQXZCLE1BQU07Z0JBQ0csb0JBQW9CO3NCQUE3QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRNZW51VHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xuaW1wb3J0IHsgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXRpbWVwaWNrZXInLFxuICB0ZW1wbGF0ZTogYFxuICA8ZGl2IFtzdHlsZS53aWR0aF09XCJ3aWR0aENzc1wiIFtzdHlsZS5oZWlnaHRdPVwiaGVpZ2h0Q3NzXCIgY2xhc3M9XCJ0aW1lcGlja2VyXCI+XG4gICAgPGRpdiBpZD1cImhvdXJcIiB0YWJpbmRleD1cIjFcIiAoYmx1cik9XCJsb3N0Rm9jdXMoKVwiIChmb2N1cyk9XCJmb2N1cygkZXZlbnQpXCIgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwic2VsZWN0ZWQ9PT0naG91cic/IGNvciA6ICd0cmFuc3BhcmVudCdcIiAoY2xpY2spPVwiZm9jdXMoJGV2ZW50KVwiPnt7aG91ci50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMuaG91cjp0aGlzLmhvdXJ9fTwvZGl2PlxuICAgIDxkaXY+OjwvZGl2PlxuICAgIDxkaXYgaWQ9XCJtaW51dGVcIiB0YWJpbmRleD1cIjFcIiAoYmx1cik9XCJsb3N0Rm9jdXMoKVwiIChmb2N1cyk9XCJmb2N1cygkZXZlbnQpXCIgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwic2VsZWN0ZWQ9PT0nbWludXRlJz8gY29yIDogJ3RyYW5zcGFyZW50J1wiIChjbGljayk9XCJmb2N1cygkZXZlbnQpXCI+e3ttaW51dGUudG9TdHJpbmcoKS5sZW5ndGg9PT0xPycwJyt0aGlzLm1pbnV0ZTp0aGlzLm1pbnV0ZX19PC9kaXY+XG4gICAgPGRpdiAqbmdJZj1cIm5lZWRTZWNvbmRzXCI+OjwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCJuZWVkU2Vjb25kc1wiIGlkPVwic2Vjb25kXCIgdGFiaW5kZXg9XCIxXCIgKGJsdXIpPVwibG9zdEZvY3VzKClcIiAoZm9jdXMpPVwiZm9jdXMoJGV2ZW50KVwiIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cInNlbGVjdGVkPT09J3NlY29uZCc/IGNvciA6ICd0cmFuc3BhcmVudCdcIiAoY2xpY2spPVwiZm9jdXMoJGV2ZW50KVwiPnt7c2Vjb25kLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5zZWNvbmQ6dGhpcy5zZWNvbmR9fTwvZGl2PlxuICAgIDxidXR0b24gbWF0LWJ1dHRvbiBzdHlsZT1cInBhZGRpbmc6MTBweDtwb3NpdGlvbjpyZWxhdGl2ZTtib3R0b206MXB4XCIgW21hdE1lbnVUcmlnZ2VyRm9yXT1cImFib3ZlTWVudVwiICN0cmlnZ2VyPVwibWF0TWVudVRyaWdnZXJcIiBjbGFzcz1cImJ0bkNsb2NrXCIgKGNsaWNrKT1cInByZWVuY2hlckRpdnMoKVwiPlxuICAgICAgPHN2ZyB3aWR0aD1cIjIwcHhcIiBoZWlnaHQ9XCIyMHB4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHN0eWxlPVwid2lkdGg6IDE3cHg7XCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNMTIgN1YxMkgxNU0yMSAxMkMyMSAxNi45NzA2IDE2Ljk3MDYgMjEgMTIgMjFDNy4wMjk0NCAyMSAzIDE2Ljk3MDYgMyAxMkMzIDcuMDI5NDQgNy4wMjk0NCAzIDEyIDNDMTYuOTcwNiAzIDIxIDcuMDI5NDQgMjEgMTJaXCIgc3Ryb2tlPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG4gICAgICA8L3N2Zz5cbiAgICA8L2J1dHRvbj5cbiAgICA8bWF0LW1lbnUgI2Fib3ZlTWVudT1cIm1hdE1lbnVcIiB5UG9zaXRpb249XCJhYm92ZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJtYXRNZW51Q2xvY2tcIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiPlxuICAgICAgPGRpdiBjbGFzcz1cIm51bWJlcnNcIj5cbiAgICAgICAgPGRpdiBpZD1cImhvdXJDbG9ja1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGlkPVwibWludXRlQ2xvY2tcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBpZD1cInNlY29uZENsb2NrXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXJDbG9ja1wiPlxuICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIChjbGljayk9XCJub3dDbG9jaygpXCI+Tm93PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gW2Rpc2FibGVkXT1cImRpc2FibGVDbG9ja1wiIChjbGljayk9XCJjb25maXJtQ2xvY2soKVwiPk9rPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8L21hdC1tZW51PlxuICA8L2Rpdj5cbmAsXG4gIHN0eWxlczogW1xuICAgIGAudGltZXBpY2tlcntcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBncmF5O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtd3JhcDogbm93cmFwO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIH1cbiAgICBkaXZ7XG4gICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lOyAvKiBTYWZhcmkgKi9cbiAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7IC8qIEZpcmVmb3ggKi9cbiAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTsgLyogSUUxMCsvRWRnZSAqL1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgfVxuICAgIGRpdjpmb2N1c3tcbiAgICAgIG91dGxpbmU6bm9uZTtcbiAgICB9XG4gICAgLmJ0bkNsb2Nre1xuICAgICAgbWFyZ2luOjAgNXB4O1xuICAgICAgaGVpZ2h0OjMwcHg7XG4gICAgICBtaW4td2lkdGg6MjVweDtcbiAgICAgIGRpc3BsYXk6ZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDpjZW50ZXI7XG4gICAgICBhbGlnbi1pdGVtczpjZW50ZXI7XG4gICAgfVxuXG4gICAgI2hvdXIsI21pbnV0ZSwjc2Vjb25ke1xuICAgICAgY3Vyc29yOnBvaW50ZXJcbiAgICB9XG4gICAgLmJ0bkNsb2Nre1xuICAgICAgZGlzcGxheTpmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OmNlbnRlcjtcbiAgICAgIGFsaWduLWl0ZW1zOmNlbnRlcjtcbiAgICAgIG1pbi1oZWlnaHQ6MjVweDtcbiAgICAgIGhlaWdodDoyNXB4O1xuICAgIH1cbiAgICAubWF0TWVudUNsb2Nre1xuICAgICAgd2lkdGg6MTUwcHg7XG4gICAgICBoZWlnaHQ6MTUwcHg7XG4gICAgICBkaXNwbGF5OmZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjpjb2x1bW47XG4gICAgfVxuICAgIC5udW1iZXJze1xuICAgICAgd2lkdGg6MTUwcHg7XG4gICAgICBoZWlnaHQ6MTIwcHg7XG4gICAgICBkaXNwbGF5OmZsZXg7XG4gICAgfVxuICAgIC5udW1iZXJzPmRpdntcbiAgICAgIHdpZHRoOjUwcHg7XG4gICAgICBoZWlnaHQ6MTIwcHg7XG4gICAgICBkaXNwbGF5OmZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjpjb2x1bW47XG4gICAgICBhbGlnbi1pdGVtczpjZW50ZXI7XG4gICAgICBvdmVyZmxvdzpzY3JvbGw7XG4gICAgfVxuICAgIC5mb290ZXJDbG9ja3tcbiAgICAgIHdpZHRoOjE1MHB4O1xuICAgICAgaGVpZ2h0OjMwcHg7XG4gICAgICBkaXNwbGF5OmZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kO1xuICAgICAgYWxpZ24taXRlbXM6Y2VudGVyO1xuICAgICAgYnV0dG9ue1xuICAgICAgICBtaW4td2lkdGg6NTBweDtcbiAgICAgICAgbWluLWhlaWdodDoyMHB4O1xuICAgICAgICB3aWR0aDo1MHB4O1xuICAgICAgICBoZWlnaHQ6MjBweDtcbiAgICAgICAgZm9udC1zaXplOjE1cHg7XG4gICAgICAgIGRpc3BsYXk6ZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OmNlbnRlcjtcbiAgICAgICAgYWxpZ24taXRlbXM6Y2VudGVyO1xuICAgICAgfVxuICAgIH1cbiAgICBgXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4VGltZXBpY2tlcjEyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LEFmdGVyVmlld0luaXR7XG4gIEBWaWV3Q2hpbGQoJ3RyaWdnZXInKSBtZW51VHJpZ2dlciE6IE1hdE1lbnVUcmlnZ2VyO1xuICBASW5wdXQoKSB3aWR0aDpudW1iZXIgPSAxMzA7XG4gIEBJbnB1dCgpIGhlaWdodDpudW1iZXIgPSA0MDtcbiAgQElucHV0KCkgZm9udDpudW1iZXIgPSAxMDtcbiAgQElucHV0KCkgbWF4OnN0cmluZyA9ICcyMzo1OTo1OSc7XG4gIEBJbnB1dCgpIHJlc3BvbnNlOiBudW1iZXJ8bnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHJlc3BvbnNlU3RyaW5nOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbmVlZFNlY29uZHM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSB0eXBlOiAnbWlsaXNlY29uZCd8J3NlY29uZCd8J21pbnV0ZSd8ICdob3VyJyB8ICd0aW1lJyA9ICdzZWNvbmQnXG4gIEBJbnB1dCgpIGNvcjpzdHJpbmcgPSBcIiM0OGI5YzdcIjtcblxuICBAT3V0cHV0KCkgcmVzcG9uc2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHJlc3BvbnNlU3RyaW5nQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHB1YmxpYyB3aWR0aENzczpzdHJpbmcgPSBgJHt0aGlzLndpZHRofXB4YDtcbiAgcHVibGljIGhlaWdodENzczpzdHJpbmcgPSBgJHt0aGlzLmhlaWdodH1weGA7XG4gIHB1YmxpYyBmb250Q3NzOnN0cmluZyA9IGAke3RoaXMuZm9udH1weGBcbiAgcHVibGljIGhvdXI6bnVtYmVyID0gMDtcbiAgcHVibGljIG1pbnV0ZTpudW1iZXIgPSAwO1xuICBwdWJsaWMgc2Vjb25kOm51bWJlciA9IDA7XG4gIHB1YmxpYyBzZWxlY3RlZDonaG91cid8J21pbnV0ZSd8J3NlY29uZCd8bnVsbCA9IG51bGw7XG4gIHB1YmxpYyBtYXhIb3VyOm51bWJlciA9IDBcbiAgcHVibGljIG1heE1pbnV0ZTpudW1iZXIgPSAwXG4gIHB1YmxpYyBtYXhTZWNvbmQ6bnVtYmVyID0gMFxuICBwdWJsaWMgZGlzYWJsZUNsb2NrOmJvb2xlYW4gPSB0cnVlO1xuICBwdWJsaWMgaG91ckNsb2NrOnN0cmluZ3xudWxsID0gbnVsbDtcbiAgcHVibGljIG1pbnV0ZUNsb2NrOnN0cmluZ3xudWxsID0gbnVsbDtcbiAgcHVibGljIHNlY29uZENsb2NrOnN0cmluZ3xudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBuZXdJbnB1dDpib29sZWFuID0gdHJ1ZTtcbiAgcHJpdmF0ZSB0YWJJbmRleDpib29sZWFuID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKCl7XG4gIH1cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYodGhpcy5tYXggIT0gJycpe1xuICAgICAgY29uc3QgYXJyYXlNYXggPSB0aGlzLm1heC5zcGxpdCgnOicpO1xuICAgICAgdGhpcy5tYXhIb3VyPXBhcnNlSW50KGFycmF5TWF4WzBdKVxuICAgICAgdGhpcy5tYXhNaW51dGU9cGFyc2VJbnQoYXJyYXlNYXhbMV0pXG4gICAgICB0aGlzLm1heFNlY29uZD1wYXJzZUludChhcnJheU1heFsyXSlcbiAgICB9XG4gICAgaWYodGhpcy5yZXNwb25zZVN0cmluZyl7XG4gICAgICBsZXQgYXJyYXkgPSB0aGlzLnJlc3BvbnNlU3RyaW5nLnNwbGl0KCc6Jyk7XG4gICAgICBpZih0aGlzLm5lZWRTZWNvbmRzKXtcbiAgICAgICAgdGhpcy5ob3VyID0gcGFyc2VJbnQoYXJyYXlbMF0pO1xuICAgICAgICB0aGlzLm1pbnV0ZSA9IHBhcnNlSW50KGFycmF5WzFdKTtcbiAgICAgICAgdGhpcy5zZWNvbmQgPSBwYXJzZUludChhcnJheVsyXSk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhpcy5ob3VyID0gcGFyc2VJbnQoYXJyYXlbMF0pO1xuICAgICAgICB0aGlzLm1pbnV0ZSA9IHBhcnNlSW50KGFycmF5WzFdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYodGhpcy5yZXNwb25zZSl7XG4gICAgICBsZXQgdGltZSA9IHRoaXMucmVzcG9uc2VcbiAgICAgIGlmKHRpbWU+MzYwMCl7XG4gICAgICAgIHRoaXMuaG91ciA9IE1hdGgucm91bmQodGltZS8zNjAwKVxuICAgICAgICB0aW1lIC09MzYwMCp0aGlzLmhvdXJcbiAgICAgIH1cbiAgICAgIGlmKHRpbWU+NjApe1xuICAgICAgICB0aGlzLm1pbnV0ZSA9IE1hdGgucm91bmQodGltZS82MClcbiAgICAgICAgdGltZSAtPTYwKnRoaXMubWludXRlXG4gICAgICB9XG4gICAgICBpZih0aW1lKXtcbiAgICAgICAgdGhpcy5zZWNvbmQgPSB0aW1lXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLChlKT0+e1xuICAgICAgaWYoZS5jb2RlID09ICdUYWInKXtcbiAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdtaW51dGUnXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ3NlY29uZCdcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihlLmNvZGUgPT0gJ0Fycm93VXAnKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICB0aGlzLmhvdXIrK1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgdGhpcy5taW51dGUrK1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgdGhpcy5zZWNvbmQrK1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYoZS5jb2RlID09ICdBcnJvd0Rvd24nKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICBpZih0aGlzLmhvdXI9PTApe1xuICAgICAgICAgICAgICB0aGlzLmhvdXI9dGhpcy5tYXhIb3VyXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgdGhpcy5ob3VyLS1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgIGlmKHRoaXMubWludXRlPT0wKXtcbiAgICAgICAgICAgICAgdGhpcy5taW51dGU9NTlcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICB0aGlzLm1pbnV0ZS0tXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICBpZih0aGlzLnNlY29uZD09MCl7XG4gICAgICAgICAgICAgIHRoaXMuc2Vjb25kPTU5XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgdGhpcy5zZWNvbmQtLVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYoZS5jb2RlID09ICdBcnJvd1JpZ2h0Jyl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdtaW51dGUnO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdzZWNvbmQnO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYoZS5jb2RlID09ICdBcnJvd0xlZnQnKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnbWludXRlJztcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnaG91cic7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihlLmNvZGUgPT0nQmFja3NwYWNlJyl7XG4gICAgICAgIHN3aXRjaCh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgIHRoaXMuYXBhZ2FyKCdob3VyJylcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgIHRoaXMuYXBhZ2FyKCdtaW51dGUnKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgdGhpcy5hcGFnYXIoJ3NlY29uZCcpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG5cblxuICAgICAgc3dpdGNoKGUua2V5KXtcbiAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgdGhpcy5kaWdpdGFyKDEsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgdGhpcy5kaWdpdGFyKDIsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnMyc6XG4gICAgICAgICAgdGhpcy5kaWdpdGFyKDMsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnNCc6XG4gICAgICAgICAgdGhpcy5kaWdpdGFyKDQsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnNSc6XG4gICAgICAgICAgdGhpcy5kaWdpdGFyKDUsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnNic6XG4gICAgICAgICAgdGhpcy5kaWdpdGFyKDYsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnNyc6XG4gICAgICAgICAgdGhpcy5kaWdpdGFyKDcsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnOCc6XG4gICAgICAgICAgdGhpcy5kaWdpdGFyKDgsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnOSc6XG4gICAgICAgICAgdGhpcy5kaWdpdGFyKDksdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnMCc6XG4gICAgICAgICAgdGhpcy5kaWdpdGFyKDAsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgaWYodGhpcy5taW51dGU+NTkgfHwgdGhpcy5taW51dGU8MCl7XG4gICAgICAgIHRoaXMubWludXRlID0gMFxuICAgICAgfVxuICAgICAgaWYodGhpcy5zZWNvbmQ+NTkgfHwgdGhpcy5zZWNvbmQ8MCl7XG4gICAgICAgIHRoaXMuc2Vjb25kID0gMFxuICAgICAgfVxuICAgICAgaWYodGhpcy5ob3VyLnRvU3RyaW5nKCkubGVuZ3RoPjMgfHwgdGhpcy5ob3VyPDApe1xuICAgICAgICB0aGlzLmhvdXIgPSAwXG4gICAgICB9XG4gICAgICB0aGlzLnVwZGF0ZVZhbHVlKClcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGxvc3RGb2N1cygpe1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsXG4gIH1cblxuICBwdWJsaWMgZm9jdXMoJGV2ZW50OmFueSl7XG4gICAgc3dpdGNoKCRldmVudC50YXJnZXQuaWQpe1xuICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnaG91cic7XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ21pbnV0ZSc7XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ3NlY29uZCc7XG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIHB1YmxpYyBhcGFnYXIobG9jYWw6ICdob3VyJ3wnbWludXRlJ3wnc2Vjb25kJ3xudWxsKSB7XG4gICAgaWYobG9jYWwpe1xuICAgICAgaWYobG9jYWw9PSdob3VyJyl7XG4gICAgICAgIGxldCBob3JhID0gdGhpcy5ob3VyLnRvU3RyaW5nKCkuc3BsaXQoJycpO1xuICAgICAgICBpZihob3JhLmxlbmd0aD4xKXtcbiAgICAgICAgICBsZXQgcmV0aXJhZG8gPSBob3JhLnBvcCgpO1xuICAgICAgICB0aGlzLmhvdXIgPSAgcGFyc2VJbnQoaG9yYS5qb2luKCcnKSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5ob3VyID0gMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihsb2NhbD09J21pbnV0ZScpe1xuICAgICAgICBsZXQgbWludXRvID0gdGhpcy5taW51dGUudG9TdHJpbmcoKS5zcGxpdCgnJyk7XG4gICAgICAgIGlmKG1pbnV0by5sZW5ndGg+MSl7XG4gICAgICAgIGxldCByZXRpcmFkbyA9IG1pbnV0by5wb3AoKTtcbiAgICAgICAgdGhpcy5taW51dGUgPSAgcGFyc2VJbnQobWludXRvLmpvaW4oJycpKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5taW51dGUgPSAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGxvY2FsPT0nc2Vjb25kJyl7XG4gICAgICAgIGxldCBzZWd1bmRvID0gdGhpcy5zZWNvbmQudG9TdHJpbmcoKS5zcGxpdCgnJyk7XG4gICAgICAgIGlmKHNlZ3VuZG8ubGVuZ3RoPjEpe1xuICAgICAgICBsZXQgcmV0aXJhZG8gPSBzZWd1bmRvLnBvcCgpO1xuICAgICAgICB0aGlzLnNlY29uZCA9ICBwYXJzZUludChzZWd1bmRvLmpvaW4oJycpKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLnNlY29uZCA9IDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkaWdpdGFyKG51bTpudW1iZXIsbG9jYWw6J2hvdXInfCdtaW51dGUnfCdzZWNvbmQnfG51bGwpe1xuICAgIGlmKGxvY2FsKXtcbiAgICAgIGlmKGxvY2FsPT0naG91cicpe1xuICAgICAgICBpZih0aGlzLm5ld0lucHV0KXtcbiAgICAgICAgICB0aGlzLmhvdXI9cGFyc2VJbnQoJzAnK251bSlcbiAgICAgICAgICB0aGlzLm5ld0lucHV0ID0gZmFsc2VcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5ob3VyPXBhcnNlSW50KHRoaXMuaG91ci50b1N0cmluZygpK251bSlcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ21pbnV0ZSc7XG4gICAgICAgICAgdGhpcy5uZXdJbnB1dD10cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGxvY2FsPT0nbWludXRlJyl7XG4gICAgICAgIGlmKHRoaXMubmV3SW5wdXQpe1xuICAgICAgICAgIHRoaXMubWludXRlPXBhcnNlSW50KCcwJytudW0pXG4gICAgICAgICAgdGhpcy5uZXdJbnB1dCA9IGZhbHNlXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMubWludXRlPXBhcnNlSW50KHRoaXMubWludXRlLnRvU3RyaW5nKCkrbnVtKVxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnc2Vjb25kJztcbiAgICAgICAgICB0aGlzLm5ld0lucHV0PXRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYobG9jYWw9PSdzZWNvbmQnKXtcbiAgICAgICAgaWYodGhpcy5uZXdJbnB1dCl7XG4gICAgICAgICAgdGhpcy5zZWNvbmQ9cGFyc2VJbnQoJzAnK251bSlcbiAgICAgICAgICB0aGlzLm5ld0lucHV0ID0gZmFsc2VcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5zZWNvbmQ9cGFyc2VJbnQodGhpcy5zZWNvbmQudG9TdHJpbmcoKStudW0pXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gICAgICAgICAgdGhpcy5uZXdJbnB1dD10cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcHVibGljIGVycm9yKCl7XG4gICAgcmV0dXJuIHRocm93RXJyb3IoKCk9PiBuZXcgRXJyb3IoJ1RoZSB0aW1lIGlzIGJpZ2dlciB0aGVuIG1heCB0aW1lOldhcyBzZXQgdGhlIG1heCB0aW1lJykpXG4gIH1cbiAgcHVibGljIHVwZGF0ZVZhbHVlKCk6IHZvaWQge1xuICAgIGlmKHRoaXMuaG91cj50aGlzLm1heEhvdXIpe1xuICAgICAgdGhpcy5ob3VyID0gdGhpcy5tYXhIb3VyO1xuICAgICAgdGhpcy5lcnJvcigpXG4gICAgfVxuICAgIGlmKHRoaXMuaG91cj09dGhpcy5tYXhIb3VyICYmIHRoaXMubWludXRlPnRoaXMubWF4TWludXRlKXtcbiAgICAgIHRoaXMubWludXRlPXRoaXMubWF4TWludXRlXG4gICAgICB0aGlzLmVycm9yKClcbiAgICB9XG4gICAgaWYodGhpcy5ob3VyPT10aGlzLm1heEhvdXIgJiYgdGhpcy5taW51dGU9PXRoaXMubWF4TWludXRlICYmIHRoaXMuc2Vjb25kPnRoaXMubWF4U2Vjb25kKXtcbiAgICAgIHRoaXMuc2Vjb25kPXRoaXMubWF4U2Vjb25kXG4gICAgICB0aGlzLmVycm9yKClcbiAgICB9XG4gICAgc3dpdGNoKHRoaXMudHlwZSl7XG4gICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICBjb25zdCByZXNwb3N0YVNlZ3VuZG8gPSAoKHRoaXMuaG91cio2MCkrdGhpcy5taW51dGUpKjYwK3RoaXMuc2Vjb25kXG4gICAgICAgIHRoaXMucmVzcG9uc2VDaGFuZ2UuZW1pdChyZXNwb3N0YVNlZ3VuZG8pO1xuICAgICAgICB0aGlzLnJlc3BvbnNlU3RyaW5nQ2hhbmdlLmVtaXQocmVzcG9zdGFTZWd1bmRvLnRvU3RyaW5nKCkpO1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgY29uc3QgcmVzcG9zdGFNaW51dG8gPSAoKHRoaXMuaG91cio2MCkrTWF0aC5mbG9vcih0aGlzLnNlY29uZC82MCkpK3RoaXMubWludXRlXG4gICAgICAgIHRoaXMucmVzcG9uc2VDaGFuZ2UuZW1pdChyZXNwb3N0YU1pbnV0byk7XG4gICAgICAgIHRoaXMucmVzcG9uc2VTdHJpbmdDaGFuZ2UuZW1pdChyZXNwb3N0YU1pbnV0by50b1N0cmluZygpKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnbWlsaXNlY29uZCc6XG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhTWlsaXNlZ3VuZG8gPSAoKCh0aGlzLmhvdXIqNjApK3RoaXMubWludXRlKSo2MCt0aGlzLnNlY29uZCkqMTAwMDtcbiAgICAgICAgdGhpcy5yZXNwb25zZUNoYW5nZS5lbWl0KHJlc3Bvc3RhTWlsaXNlZ3VuZG8pO1xuICAgICAgICB0aGlzLnJlc3BvbnNlU3RyaW5nQ2hhbmdlLmVtaXQocmVzcG9zdGFNaWxpc2VndW5kby50b1N0cmluZygpKTtcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICBjb25zdCByZXNwb3N0YUhvcmEgPSBNYXRoLmZsb29yKChNYXRoLmZsb29yKHRoaXMuc2Vjb25kLzYwKSt0aGlzLm1pbnV0ZSkvNjApK3RoaXMuaG91cjtcbiAgICAgICAgdGhpcy5yZXNwb25zZUNoYW5nZS5lbWl0KHJlc3Bvc3RhSG9yYSk7XG4gICAgICAgIHRoaXMucmVzcG9uc2VTdHJpbmdDaGFuZ2UuZW1pdChyZXNwb3N0YUhvcmEudG9TdHJpbmcoKSk7XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgY29uc3QgcmVzcG9zdGEgPSBgJHt0aGlzLmhvdXIudG9TdHJpbmcoKS5sZW5ndGg9PT0xPycwJyt0aGlzLmhvdXI6dGhpcy5ob3VyfToke3RoaXMubWludXRlLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5taW51dGU6dGhpcy5taW51dGV9OiR7dGhpcy5zZWNvbmQudG9TdHJpbmcoKS5sZW5ndGg9PT0xPycwJyt0aGlzLnNlY29uZDp0aGlzLnNlY29uZH1gXG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhU2VwYXJhZGEgPSB7XG4gICAgICAgICAgaG91cjp0aGlzLmhvdXIsXG4gICAgICAgICAgbWludXRlOnRoaXMubWludXRlLFxuICAgICAgICAgIHNlY29uZDp0aGlzLnNlY29uZFxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzcG9uc2VTdHJpbmdDaGFuZ2UuZW1pdChyZXNwb3N0YSk7XG4gICAgICAgIHRoaXMucmVzcG9uc2VDaGFuZ2UuZW1pdChyZXNwb3N0YVNlcGFyYWRhKTtcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbiAgcHVibGljIG5vd0Nsb2NrKCl7XG4gICAgY29uc3QgYWdvcmEgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGhvcmFzID0gYWdvcmEuZ2V0SG91cnMoKTtcbiAgICBjb25zdCBtaW51dG9zID0gYWdvcmEuZ2V0TWludXRlcygpO1xuICAgIGNvbnN0IHNlZ3VuZG9zID0gYWdvcmEuZ2V0U2Vjb25kcygpO1xuXG4gICAgdGhpcy5ob3VyID0gaG9yYXM7XG4gICAgdGhpcy5taW51dGUgPSBtaW51dG9zO1xuICAgIHRoaXMuc2Vjb25kID0gc2VndW5kb3M7XG4gICAgdGhpcy5mZWNoYXJNZW51KHRoaXMubWVudVRyaWdnZXIpO1xuICB9XG4gIHB1YmxpYyBmZWNoYXJNZW51KHRyaWdnZXI6TWF0TWVudVRyaWdnZXIpIHtcbiAgICB0aGlzLmRpc2FibGVDbG9jayA9IHRydWVcbiAgICB0cmlnZ2VyLmNsb3NlTWVudSgpO1xuICAgIHRoaXMudXBkYXRlVmFsdWUoKTtcbiAgfVxuICBwdWJsaWMgcHJlZW5jaGVyRGl2cygpIHtcbiAgICB0aGlzLmhvdXJDbG9jayA9IG51bGw7XG4gICAgdGhpcy5taW51dGVDbG9jayA9IG51bGw7XG4gICAgdGhpcy5zZWNvbmRDbG9jayA9IG51bGw7XG4gICAgdGhpcy5kZXN0cm95RGl2cygnaG91ckNsb2NrJylcbiAgICB0aGlzLmRlc3Ryb3lEaXZzKCdtaW51dGVDbG9jaycpXG4gICAgdGhpcy5kZXN0cm95RGl2cygnc2Vjb25kQ2xvY2snKVxuICAgIGNvbnN0IGNyaWFyRGl2cyA9IChwYXJlbnRFbGVtZW50SWQ6IHN0cmluZywgaWQ6IG51bWJlciwgbGltaXRlOiBudW1iZXIpID0+IHtcblxuICAgICAgY29uc3QgcGFyZW50RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmVudEVsZW1lbnRJZCk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGxpbWl0ZTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG51bWJlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBudW1iZXJEaXYudGV4dENvbnRlbnQgPSBpIDwgMTAgPyBgMCR7aX1gIDogYCR7aX1gO1xuICAgICAgICBudW1iZXJEaXYuc3R5bGUuYm9yZGVyQm90dG9tID0gXCIxcHggc29saWQgYmxhY2tcIjtcbiAgICAgICAgbnVtYmVyRGl2LnN0eWxlLnBhZGRpbmcgPSBcIjVweCAxMHB4XCI7XG4gICAgICAgIG51bWJlckRpdi5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgICAgbnVtYmVyRGl2LnN0eWxlLm1hcmdpbiA9IFwiMnB4XCI7XG5cbiAgICAgICAgbGV0IGNsYXNzSWRlbnRpZmllciA9ICcnO1xuICAgICAgICBzd2l0Y2goaWQpIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBjbGFzc0lkZW50aWZpZXIgPSAnbnVtSG91ckNsb2NrJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNsYXNzSWRlbnRpZmllciA9ICdudW1NaW51dGVDbG9jayc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBjbGFzc0lkZW50aWZpZXIgPSAnbnVtU2Vjb25kQ2xvY2snO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgbnVtYmVyRGl2LmNsYXNzTGlzdC5hZGQoY2xhc3NJZGVudGlmaWVyKTtcblxuICAgICAgICBudW1iZXJEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgYWxsU2libGluZ3MgPSBwYXJlbnRFbGVtZW50IS5xdWVyeVNlbGVjdG9yQWxsKGAuJHtjbGFzc0lkZW50aWZpZXJ9YCk7XG4gICAgICAgICAgYWxsU2libGluZ3MuZm9yRWFjaChzaWJsaW5nID0+IHtcbiAgICAgICAgICAgIGlmIChzaWJsaW5nIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgc2libGluZy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYoY2xhc3NJZGVudGlmaWVyID09PSAnbnVtSG91ckNsb2NrJykgdGhpcy5ob3VyQ2xvY2sgPSBudW1iZXJEaXYudGV4dENvbnRlbnQ7XG4gICAgICAgICAgaWYoY2xhc3NJZGVudGlmaWVyID09PSAnbnVtTWludXRlQ2xvY2snKSB0aGlzLm1pbnV0ZUNsb2NrID0gbnVtYmVyRGl2LnRleHRDb250ZW50O1xuICAgICAgICAgIGlmKGNsYXNzSWRlbnRpZmllciA9PT0gJ251bVNlY29uZENsb2NrJykgdGhpcy5zZWNvbmRDbG9jayA9IG51bWJlckRpdi50ZXh0Q29udGVudDtcblxuICAgICAgICAgIG51bWJlckRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0Ymx1ZVwiO1xuXG4gICAgICAgICAgaWYodGhpcy5ob3VyQ2xvY2sgJiYgdGhpcy5taW51dGVDbG9jayAmJiB0aGlzLnNlY29uZENsb2NrKXtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZUNsb2NrID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBwYXJlbnRFbGVtZW50IS5hcHBlbmRDaGlsZChudW1iZXJEaXYpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjcmlhckRpdnMoJ2hvdXJDbG9jaycsIDAsIHRoaXMubWF4SG91cik7XG4gICAgY3JpYXJEaXZzKCdtaW51dGVDbG9jaycsIDEsIDU5KTtcbiAgICBjcmlhckRpdnMoJ3NlY29uZENsb2NrJywgMiwgNTkpO1xuICB9XG5cbiAgcHVibGljIGRlc3Ryb3lEaXZzKGlkOnN0cmluZyl7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBpZihlbGVtZW50KXtcbiAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gJydcbiAgICB9XG4gIH1cbiAgcHVibGljIGNvbmZpcm1DbG9jaygpe1xuICAgIHRoaXMuaG91ciA9IHBhcnNlSW50KHRoaXMuaG91ckNsb2NrISlcbiAgICB0aGlzLm1pbnV0ZSA9IHBhcnNlSW50KHRoaXMubWludXRlQ2xvY2shKVxuICAgIHRoaXMuc2Vjb25kID0gcGFyc2VJbnQodGhpcy5zZWNvbmRDbG9jayEpXG4gICAgdGhpcy5mZWNoYXJNZW51KHRoaXMubWVudVRyaWdnZXIpO1xuICB9XG59XG4iXX0=