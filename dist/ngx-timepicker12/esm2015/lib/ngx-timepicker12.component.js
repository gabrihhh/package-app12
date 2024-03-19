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
        if (!this.disabled) {
            const hour = document.getElementById('hour');
            if (hour) {
                hour.style.cursor = "pointer";
            }
            ;
            const minute = document.getElementById('minute');
            if (minute) {
                minute.style.cursor = "pointer";
            }
            const second = document.getElementById('second');
            if (second) {
                second.style.cursor = "pointer";
            }
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
NgxTimepicker12Component.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: NgxTimepicker12Component, selector: "ngx-timepicker", inputs: { width: "width", height: "height", font: "font", max: "max", response: "response", responseString: "responseString", needSeconds: "needSeconds", type: "type", cor: "cor", disabled: "disabled" }, outputs: { responseChange: "responseChange", responseStringChange: "responseStringChange" }, viewQueries: [{ propertyName: "menuTrigger", first: true, predicate: ["trigger"], descendants: true }], ngImport: i0, template: `
  <div [style.width]="widthCss" [style.height]="heightCss" class="timepicker">
    <div id="hour" tabindex="1" (blur)="lostFocus()" (focus)="focus($event)" [style.background-color]="selected==='hour'? cor : 'transparent'" (click)="focus($event)">{{hour.toString().length===1?'0'+this.hour:this.hour}}</div>
    <div>:</div>
    <div id="minute" tabindex="1" (blur)="lostFocus()" (focus)="focus($event)" [style.background-color]="selected==='minute'? cor : 'transparent'" (click)="focus($event)">{{minute.toString().length===1?'0'+this.minute:this.minute}}</div>
    <div *ngIf="needSeconds">:</div>
    <div *ngIf="needSeconds" id="second" tabindex="1" (blur)="lostFocus()" (focus)="focus($event)" [style.background-color]="selected==='second'? cor : 'transparent'" (click)="focus($event)">{{second.toString().length===1?'0'+this.second:this.second}}</div>
    <button *ngIf="!disabled" mat-button style="padding:10px;position:relative;bottom:1px" [matMenuTriggerFor]="aboveMenu" #trigger="matMenuTrigger" class="btnClock" (click)="preencherDivs()">
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
  <div [style.width]="widthCss" [style.height]="heightCss" class="timepicker">
    <div id="hour" tabindex="1" (blur)="lostFocus()" (focus)="focus($event)" [style.background-color]="selected==='hour'? cor : 'transparent'" (click)="focus($event)">{{hour.toString().length===1?'0'+this.hour:this.hour}}</div>
    <div>:</div>
    <div id="minute" tabindex="1" (blur)="lostFocus()" (focus)="focus($event)" [style.background-color]="selected==='minute'? cor : 'transparent'" (click)="focus($event)">{{minute.toString().length===1?'0'+this.minute:this.minute}}</div>
    <div *ngIf="needSeconds">:</div>
    <div *ngIf="needSeconds" id="second" tabindex="1" (blur)="lostFocus()" (focus)="focus($event)" [style.background-color]="selected==='second'? cor : 'transparent'" (click)="focus($event)">{{second.toString().length===1?'0'+this.second:this.second}}</div>
    <button *ngIf="!disabled" mat-button style="padding:10px;position:relative;bottom:1px" [matMenuTriggerFor]="aboveMenu" #trigger="matMenuTrigger" class="btnClock" (click)="preencherDivs()">
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdGltZXBpY2tlcjEyL3NyYy9saWIvbmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpHLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7O0FBeUdsQyxNQUFNLE9BQU8sd0JBQXdCO0lBOEJuQztRQTVCUyxVQUFLLEdBQVUsR0FBRyxDQUFDO1FBQ25CLFdBQU0sR0FBVSxFQUFFLENBQUM7UUFDbkIsU0FBSSxHQUFVLEVBQUUsQ0FBQztRQUNqQixRQUFHLEdBQVUsVUFBVSxDQUFDO1FBQ3hCLGFBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBQzdCLG1CQUFjLEdBQWtCLElBQUksQ0FBQztRQUNyQyxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUM1QixTQUFJLEdBQW9ELFFBQVEsQ0FBQTtRQUNoRSxRQUFHLEdBQVUsU0FBUyxDQUFDO1FBQ3ZCLGFBQVEsR0FBVyxLQUFLLENBQUM7UUFFeEIsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3pDLHlCQUFvQixHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDbEQsYUFBUSxHQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDO1FBQ3BDLGNBQVMsR0FBVSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQztRQUN0QyxZQUFPLEdBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUE7UUFDakMsU0FBSSxHQUFVLENBQUMsQ0FBQztRQUNoQixXQUFNLEdBQVUsQ0FBQyxDQUFDO1FBQ2xCLFdBQU0sR0FBVSxDQUFDLENBQUM7UUFDbEIs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Ozs7Ozs7Ozs7O0tBdUVDO3FCQUNGO2lCQUNGOzBFQUV1QixXQUFXO3NCQUFoQyxTQUFTO3VCQUFDLFNBQVM7Z0JBQ1gsS0FBSztzQkFBYixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFFSSxjQUFjO3NCQUF2QixNQUFNO2dCQUNHLG9CQUFvQjtzQkFBN0IsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0TWVudVRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcbmltcG9ydCB7IHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC10aW1lcGlja2VyJyxcbiAgdGVtcGxhdGU6IGBcbiAgPGRpdiBbc3R5bGUud2lkdGhdPVwid2lkdGhDc3NcIiBbc3R5bGUuaGVpZ2h0XT1cImhlaWdodENzc1wiIGNsYXNzPVwidGltZXBpY2tlclwiPlxuICAgIDxkaXYgaWQ9XCJob3VyXCIgdGFiaW5kZXg9XCIxXCIgKGJsdXIpPVwibG9zdEZvY3VzKClcIiAoZm9jdXMpPVwiZm9jdXMoJGV2ZW50KVwiIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cInNlbGVjdGVkPT09J2hvdXInPyBjb3IgOiAndHJhbnNwYXJlbnQnXCIgKGNsaWNrKT1cImZvY3VzKCRldmVudClcIj57e2hvdXIudG9TdHJpbmcoKS5sZW5ndGg9PT0xPycwJyt0aGlzLmhvdXI6dGhpcy5ob3VyfX08L2Rpdj5cbiAgICA8ZGl2Pjo8L2Rpdj5cbiAgICA8ZGl2IGlkPVwibWludXRlXCIgdGFiaW5kZXg9XCIxXCIgKGJsdXIpPVwibG9zdEZvY3VzKClcIiAoZm9jdXMpPVwiZm9jdXMoJGV2ZW50KVwiIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cInNlbGVjdGVkPT09J21pbnV0ZSc/IGNvciA6ICd0cmFuc3BhcmVudCdcIiAoY2xpY2spPVwiZm9jdXMoJGV2ZW50KVwiPnt7bWludXRlLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5taW51dGU6dGhpcy5taW51dGV9fTwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCJuZWVkU2Vjb25kc1wiPjo8L2Rpdj5cbiAgICA8ZGl2ICpuZ0lmPVwibmVlZFNlY29uZHNcIiBpZD1cInNlY29uZFwiIHRhYmluZGV4PVwiMVwiIChibHVyKT1cImxvc3RGb2N1cygpXCIgKGZvY3VzKT1cImZvY3VzKCRldmVudClcIiBbc3R5bGUuYmFja2dyb3VuZC1jb2xvcl09XCJzZWxlY3RlZD09PSdzZWNvbmQnPyBjb3IgOiAndHJhbnNwYXJlbnQnXCIgKGNsaWNrKT1cImZvY3VzKCRldmVudClcIj57e3NlY29uZC50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMuc2Vjb25kOnRoaXMuc2Vjb25kfX08L2Rpdj5cbiAgICA8YnV0dG9uICpuZ0lmPVwiIWRpc2FibGVkXCIgbWF0LWJ1dHRvbiBzdHlsZT1cInBhZGRpbmc6MTBweDtwb3NpdGlvbjpyZWxhdGl2ZTtib3R0b206MXB4XCIgW21hdE1lbnVUcmlnZ2VyRm9yXT1cImFib3ZlTWVudVwiICN0cmlnZ2VyPVwibWF0TWVudVRyaWdnZXJcIiBjbGFzcz1cImJ0bkNsb2NrXCIgKGNsaWNrKT1cInByZWVuY2hlckRpdnMoKVwiPlxuICAgICAgPHN2ZyB3aWR0aD1cIjIwcHhcIiBoZWlnaHQ9XCIyMHB4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHN0eWxlPVwid2lkdGg6IDE3cHg7XCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNMTIgN1YxMkgxNU0yMSAxMkMyMSAxNi45NzA2IDE2Ljk3MDYgMjEgMTIgMjFDNy4wMjk0NCAyMSAzIDE2Ljk3MDYgMyAxMkMzIDcuMDI5NDQgNy4wMjk0NCAzIDEyIDNDMTYuOTcwNiAzIDIxIDcuMDI5NDQgMjEgMTJaXCIgc3Ryb2tlPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG4gICAgICA8L3N2Zz5cbiAgICA8L2J1dHRvbj5cbiAgICA8bWF0LW1lbnUgI2Fib3ZlTWVudT1cIm1hdE1lbnVcIiB5UG9zaXRpb249XCJhYm92ZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJtYXRNZW51Q2xvY2tcIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiPlxuICAgICAgPGRpdiBjbGFzcz1cIm51bWJlcnNcIj5cbiAgICAgICAgPGRpdiBpZD1cImhvdXJDbG9ja1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGlkPVwibWludXRlQ2xvY2tcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBpZD1cInNlY29uZENsb2NrXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXJDbG9ja1wiPlxuICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uICpuZ0lmPVwibWF4ID09ICcyMzo1OTo1OSdcIiAoY2xpY2spPVwibm93Q2xvY2soKVwiPk5vdzwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIFtkaXNhYmxlZF09XCJkaXNhYmxlQ2xvY2tcIiAoY2xpY2spPVwiY29uZmlybUNsb2NrKClcIj5PazwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPC9tYXQtbWVudT5cbiAgPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtcbiAgICBgLnRpbWVwaWNrZXJ7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgZ3JheTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LXdyYXA6IG5vd3JhcDtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB9XG4gICAgZGl2e1xuICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsgLyogU2FmYXJpICovXG4gICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lOyAvKiBGaXJlZm94ICovXG4gICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7IC8qIElFMTArL0VkZ2UgKi9cbiAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIH1cbiAgICBkaXY6Zm9jdXN7XG4gICAgICBvdXRsaW5lOm5vbmU7XG4gICAgfVxuICAgIC5idG5DbG9ja3tcbiAgICAgIG1hcmdpbjowIDVweDtcbiAgICAgIGhlaWdodDozMHB4O1xuICAgICAgbWluLXdpZHRoOjI1cHg7XG4gICAgICBkaXNwbGF5OmZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuICAgICAgYWxpZ24taXRlbXM6Y2VudGVyO1xuICAgIH1cbiAgICAuYnRuQ2xvY2t7XG4gICAgICBkaXNwbGF5OmZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuICAgICAgYWxpZ24taXRlbXM6Y2VudGVyO1xuICAgICAgbWluLWhlaWdodDoyNXB4O1xuICAgICAgaGVpZ2h0OjI1cHg7XG4gICAgfVxuICAgIC5tYXRNZW51Q2xvY2t7XG4gICAgICB3aWR0aDoxNTBweDtcbiAgICAgIGhlaWdodDoxNTBweDtcbiAgICAgIGRpc3BsYXk6ZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcbiAgICB9XG4gICAgLm51bWJlcnN7XG4gICAgICB3aWR0aDoxNTBweDtcbiAgICAgIGhlaWdodDoxMjBweDtcbiAgICAgIGRpc3BsYXk6ZmxleDtcbiAgICB9XG4gICAgLm51bWJlcnM+ZGl2e1xuICAgICAgd2lkdGg6NTBweDtcbiAgICAgIGhlaWdodDoxMjBweDtcbiAgICAgIGRpc3BsYXk6ZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOmNlbnRlcjtcbiAgICAgIG92ZXJmbG93OnNjcm9sbDtcbiAgICAgIHNjcm9sbGJhci13aWR0aDogbm9uZTtcbiAgICB9XG4gICAgLm51bWJlcnM+ZGl2Ojotd2Via2l0LXNjcm9sbGJhcntcbiAgICAgIGRpc3BsYXk6bm9uZTtcbiAgICB9XG4gICAgLmZvb3RlckNsb2Nre1xuICAgICAgd2lkdGg6MTUwcHg7XG4gICAgICBoZWlnaHQ6MzBweDtcbiAgICAgIGRpc3BsYXk6ZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmQ7XG4gICAgICBhbGlnbi1pdGVtczpjZW50ZXI7XG4gICAgICBidXR0b257XG4gICAgICAgIG1pbi13aWR0aDo1MHB4O1xuICAgICAgICBtaW4taGVpZ2h0OjIwcHg7XG4gICAgICAgIHdpZHRoOjUwcHg7XG4gICAgICAgIGhlaWdodDoyMHB4O1xuICAgICAgICBmb250LXNpemU6MTVweDtcbiAgICAgICAgZGlzcGxheTpmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczpjZW50ZXI7XG4gICAgICB9XG4gICAgfVxuICAgIGBcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUaW1lcGlja2VyMTJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsQWZ0ZXJWaWV3SW5pdHtcbiAgQFZpZXdDaGlsZCgndHJpZ2dlcicpIG1lbnVUcmlnZ2VyITogTWF0TWVudVRyaWdnZXI7XG4gIEBJbnB1dCgpIHdpZHRoOm51bWJlciA9IDEzMDtcbiAgQElucHV0KCkgaGVpZ2h0Om51bWJlciA9IDQwO1xuICBASW5wdXQoKSBmb250Om51bWJlciA9IDEwO1xuICBASW5wdXQoKSBtYXg6c3RyaW5nID0gJzIzOjU5OjU5JztcbiAgQElucHV0KCkgcmVzcG9uc2U6IG51bWJlcnxudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcmVzcG9uc2VTdHJpbmc6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuZWVkU2Vjb25kczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHR5cGU6ICdtaWxpc2Vjb25kJ3wnc2Vjb25kJ3wnbWludXRlJ3wgJ2hvdXInIHwgJ3RpbWUnID0gJ3NlY29uZCdcbiAgQElucHV0KCkgY29yOnN0cmluZyA9IFwiIzQ4YjljN1wiO1xuICBASW5wdXQoKSBkaXNhYmxlZDpib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHJlc3BvbnNlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSByZXNwb25zZVN0cmluZ0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBwdWJsaWMgd2lkdGhDc3M6c3RyaW5nID0gYCR7dGhpcy53aWR0aH1weGA7XG4gIHB1YmxpYyBoZWlnaHRDc3M6c3RyaW5nID0gYCR7dGhpcy5oZWlnaHR9cHhgO1xuICBwdWJsaWMgZm9udENzczpzdHJpbmcgPSBgJHt0aGlzLmZvbnR9cHhgXG4gIHB1YmxpYyBob3VyOm51bWJlciA9IDA7XG4gIHB1YmxpYyBtaW51dGU6bnVtYmVyID0gMDtcbiAgcHVibGljIHNlY29uZDpudW1iZXIgPSAwO1xuICBwdWJsaWMgc2VsZWN0ZWQ6J2hvdXInfCdtaW51dGUnfCdzZWNvbmQnfG51bGwgPSBudWxsO1xuICBwdWJsaWMgbWF4SG91cjpudW1iZXIgPSAwXG4gIHB1YmxpYyBtYXhNaW51dGU6bnVtYmVyID0gMFxuICBwdWJsaWMgbWF4U2Vjb25kOm51bWJlciA9IDBcbiAgcHVibGljIGRpc2FibGVDbG9jazpib29sZWFuID0gdHJ1ZTtcbiAgcHVibGljIGhvdXJDbG9jazpzdHJpbmd8bnVsbCA9IG51bGw7XG4gIHB1YmxpYyBtaW51dGVDbG9jazpzdHJpbmd8bnVsbCA9IG51bGw7XG4gIHB1YmxpYyBzZWNvbmRDbG9jazpzdHJpbmd8bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgbmV3SW5wdXQ6Ym9vbGVhbiA9IHRydWU7XG4gIGNvbnN0cnVjdG9yKCl7XG4gIH1cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYodGhpcy5tYXggIT0gJycpe1xuICAgICAgY29uc3QgYXJyYXlNYXggPSB0aGlzLm1heC5zcGxpdCgnOicpO1xuICAgICAgdGhpcy5tYXhIb3VyPXBhcnNlSW50KGFycmF5TWF4WzBdKVxuICAgICAgdGhpcy5tYXhNaW51dGU9cGFyc2VJbnQoYXJyYXlNYXhbMV0pXG4gICAgICB0aGlzLm1heFNlY29uZD1wYXJzZUludChhcnJheU1heFsyXSlcbiAgICB9XG4gICAgaWYodGhpcy5yZXNwb25zZVN0cmluZyl7XG4gICAgICBsZXQgYXJyYXkgPSB0aGlzLnJlc3BvbnNlU3RyaW5nLnNwbGl0KCc6Jyk7XG4gICAgICBpZih0aGlzLm5lZWRTZWNvbmRzKXtcbiAgICAgICAgdGhpcy5ob3VyID0gcGFyc2VJbnQoYXJyYXlbMF0pO1xuICAgICAgICB0aGlzLm1pbnV0ZSA9IHBhcnNlSW50KGFycmF5WzFdKTtcbiAgICAgICAgdGhpcy5zZWNvbmQgPSBwYXJzZUludChhcnJheVsyXSk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhpcy5ob3VyID0gcGFyc2VJbnQoYXJyYXlbMF0pO1xuICAgICAgICB0aGlzLm1pbnV0ZSA9IHBhcnNlSW50KGFycmF5WzFdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYodGhpcy5yZXNwb25zZSl7XG4gICAgICBsZXQgdGltZSA9IHRoaXMucmVzcG9uc2VcbiAgICAgIGlmKHRpbWU+MzYwMCl7XG4gICAgICAgIHRoaXMuaG91ciA9IE1hdGgucm91bmQodGltZS8zNjAwKVxuICAgICAgICB0aW1lIC09MzYwMCp0aGlzLmhvdXJcbiAgICAgIH1cbiAgICAgIGlmKHRpbWU+NjApe1xuICAgICAgICB0aGlzLm1pbnV0ZSA9IE1hdGgucm91bmQodGltZS82MClcbiAgICAgICAgdGltZSAtPTYwKnRoaXMubWludXRlXG4gICAgICB9XG4gICAgICBpZih0aW1lKXtcbiAgICAgICAgdGhpcy5zZWNvbmQgPSB0aW1lXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmKCF0aGlzLmRpc2FibGVkKXtcbiAgICAgIGNvbnN0IGhvdXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG91cicpO1xuICAgICAgaWYoaG91cil7aG91ci5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIn07XG4gICAgICBjb25zdCBtaW51dGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWludXRlJyk7XG4gICAgICBpZihtaW51dGUpe21pbnV0ZS5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIn1cbiAgICAgIGNvbnN0IHNlY29uZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWNvbmQnKTtcbiAgICAgIGlmKHNlY29uZCl7c2Vjb25kLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwifVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsKGUpPT57XG4gICAgICAgIGlmKGUuY29kZSA9PSAnVGFiJyl7XG4gICAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnbWludXRlJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdzZWNvbmQnXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gbnVsbFxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihlLmNvZGUgPT0gJ0Fycm93VXAnKXtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICAgIHRoaXMuaG91cisrXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICB0aGlzLm1pbnV0ZSsrXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgICB0aGlzLnNlY29uZCsrXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGUuY29kZSA9PSAnQXJyb3dEb3duJyl7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHN3aXRjaCh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICBpZih0aGlzLmhvdXI9PTApe1xuICAgICAgICAgICAgICAgIHRoaXMuaG91cj10aGlzLm1heEhvdXJcbiAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3VyLS1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgaWYodGhpcy5taW51dGU9PTApe1xuICAgICAgICAgICAgICAgIHRoaXMubWludXRlPTU5XG4gICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMubWludXRlLS1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgaWYodGhpcy5zZWNvbmQ9PTApe1xuICAgICAgICAgICAgICAgIHRoaXMuc2Vjb25kPTU5XG4gICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuc2Vjb25kLS1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihlLmNvZGUgPT0gJ0Fycm93UmlnaHQnKXtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnbWludXRlJztcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnc2Vjb25kJztcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZS5jb2RlID09ICdBcnJvd0xlZnQnKXtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdtaW51dGUnO1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdob3VyJztcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZS5jb2RlID09J0JhY2tzcGFjZScpe1xuICAgICAgICAgIHN3aXRjaCh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICB0aGlzLmFwYWdhcignaG91cicpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICB0aGlzLmFwYWdhcignbWludXRlJylcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICAgIHRoaXMuYXBhZ2FyKCdzZWNvbmQnKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgc3dpdGNoKGUua2V5KXtcbiAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcigxLHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcigyLHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICczJzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcigzLHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICc0JzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcig0LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICc1JzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcig1LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICc2JzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcig2LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICc3JzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcig3LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICc4JzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcig4LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICc5JzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcig5LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICcwJzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcigwLHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMubWludXRlPjU5IHx8IHRoaXMubWludXRlPDApe1xuICAgICAgICAgIHRoaXMubWludXRlID0gMFxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuc2Vjb25kPjU5IHx8IHRoaXMuc2Vjb25kPDApe1xuICAgICAgICAgIHRoaXMuc2Vjb25kID0gMFxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuaG91ci50b1N0cmluZygpLmxlbmd0aD4zIHx8IHRoaXMuaG91cjwwKXtcbiAgICAgICAgICB0aGlzLmhvdXIgPSAwXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZSgpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBsb3N0Rm9jdXMoKXtcbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbFxuICB9XG5cbiAgcHVibGljIGZvY3VzKCRldmVudDphbnkpe1xuICAgIGlmKCF0aGlzLmRpc2FibGVkKXtcbiAgICAgIHN3aXRjaCgkZXZlbnQudGFyZ2V0LmlkKXtcbiAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdob3VyJztcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnbWludXRlJztcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnc2Vjb25kJztcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBwdWJsaWMgYXBhZ2FyKGxvY2FsOiAnaG91cid8J21pbnV0ZSd8J3NlY29uZCd8bnVsbCkge1xuICAgIGlmKGxvY2FsKXtcbiAgICAgIGlmKGxvY2FsPT0naG91cicpe1xuICAgICAgICBsZXQgaG9yYSA9IHRoaXMuaG91ci50b1N0cmluZygpLnNwbGl0KCcnKTtcbiAgICAgICAgaWYoaG9yYS5sZW5ndGg+MSl7XG4gICAgICAgICAgbGV0IHJldGlyYWRvID0gaG9yYS5wb3AoKTtcbiAgICAgICAgdGhpcy5ob3VyID0gIHBhcnNlSW50KGhvcmEuam9pbignJykpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuaG91ciA9IDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYobG9jYWw9PSdtaW51dGUnKXtcbiAgICAgICAgbGV0IG1pbnV0byA9IHRoaXMubWludXRlLnRvU3RyaW5nKCkuc3BsaXQoJycpO1xuICAgICAgICBpZihtaW51dG8ubGVuZ3RoPjEpe1xuICAgICAgICBsZXQgcmV0aXJhZG8gPSBtaW51dG8ucG9wKCk7XG4gICAgICAgIHRoaXMubWludXRlID0gIHBhcnNlSW50KG1pbnV0by5qb2luKCcnKSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMubWludXRlID0gMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihsb2NhbD09J3NlY29uZCcpe1xuICAgICAgICBsZXQgc2VndW5kbyA9IHRoaXMuc2Vjb25kLnRvU3RyaW5nKCkuc3BsaXQoJycpO1xuICAgICAgICBpZihzZWd1bmRvLmxlbmd0aD4xKXtcbiAgICAgICAgbGV0IHJldGlyYWRvID0gc2VndW5kby5wb3AoKTtcbiAgICAgICAgdGhpcy5zZWNvbmQgPSAgcGFyc2VJbnQoc2VndW5kby5qb2luKCcnKSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5zZWNvbmQgPSAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGlnaXRhcihudW06bnVtYmVyLGxvY2FsOidob3VyJ3wnbWludXRlJ3wnc2Vjb25kJ3xudWxsKXtcbiAgICBpZihsb2NhbCl7XG4gICAgICBpZihsb2NhbD09J2hvdXInKXtcbiAgICAgICAgaWYodGhpcy5uZXdJbnB1dCl7XG4gICAgICAgICAgdGhpcy5ob3VyPXBhcnNlSW50KCcwJytudW0pXG4gICAgICAgICAgdGhpcy5uZXdJbnB1dCA9IGZhbHNlXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuaG91cj1wYXJzZUludCh0aGlzLmhvdXIudG9TdHJpbmcoKStudW0pXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdtaW51dGUnO1xuICAgICAgICAgIHRoaXMubmV3SW5wdXQ9dHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihsb2NhbD09J21pbnV0ZScpe1xuICAgICAgICBpZih0aGlzLm5ld0lucHV0KXtcbiAgICAgICAgICB0aGlzLm1pbnV0ZT1wYXJzZUludCgnMCcrbnVtKVxuICAgICAgICAgIHRoaXMubmV3SW5wdXQgPSBmYWxzZVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLm1pbnV0ZT1wYXJzZUludCh0aGlzLm1pbnV0ZS50b1N0cmluZygpK251bSlcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ3NlY29uZCc7XG4gICAgICAgICAgdGhpcy5uZXdJbnB1dD10cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGxvY2FsPT0nc2Vjb25kJyl7XG4gICAgICAgIGlmKHRoaXMubmV3SW5wdXQpe1xuICAgICAgICAgIHRoaXMuc2Vjb25kPXBhcnNlSW50KCcwJytudW0pXG4gICAgICAgICAgdGhpcy5uZXdJbnB1dCA9IGZhbHNlXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuc2Vjb25kPXBhcnNlSW50KHRoaXMuc2Vjb25kLnRvU3RyaW5nKCkrbnVtKVxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgICAgIHRoaXMubmV3SW5wdXQ9dHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHB1YmxpYyBlcnJvcigpe1xuICAgIHJldHVybiB0aHJvd0Vycm9yKCgpPT4gbmV3IEVycm9yKCdUaGUgdGltZSBpcyBiaWdnZXIgdGhlbiBtYXggdGltZTpXYXMgc2V0IHRoZSBtYXggdGltZScpKVxuICB9XG4gIHB1YmxpYyB1cGRhdGVWYWx1ZSgpOiB2b2lkIHtcbiAgICBpZih0aGlzLmhvdXI+dGhpcy5tYXhIb3VyKXtcbiAgICAgIHRoaXMuaG91ciA9IHRoaXMubWF4SG91cjtcbiAgICAgIHRoaXMuZXJyb3IoKVxuICAgIH1cbiAgICBpZih0aGlzLmhvdXI9PXRoaXMubWF4SG91ciAmJiB0aGlzLm1pbnV0ZT50aGlzLm1heE1pbnV0ZSl7XG4gICAgICB0aGlzLm1pbnV0ZT10aGlzLm1heE1pbnV0ZVxuICAgICAgdGhpcy5lcnJvcigpXG4gICAgfVxuICAgIGlmKHRoaXMuaG91cj09dGhpcy5tYXhIb3VyICYmIHRoaXMubWludXRlPT10aGlzLm1heE1pbnV0ZSAmJiB0aGlzLnNlY29uZD50aGlzLm1heFNlY29uZCl7XG4gICAgICB0aGlzLnNlY29uZD10aGlzLm1heFNlY29uZFxuICAgICAgdGhpcy5lcnJvcigpXG4gICAgfVxuICAgIHN3aXRjaCh0aGlzLnR5cGUpe1xuICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgY29uc3QgcmVzcG9zdGFTZWd1bmRvID0gKCh0aGlzLmhvdXIqNjApK3RoaXMubWludXRlKSo2MCt0aGlzLnNlY29uZFxuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFTZWd1bmRvKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhU2VndW5kby50b1N0cmluZygpKTtcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhTWludXRvID0gKCh0aGlzLmhvdXIqNjApK01hdGguZmxvb3IodGhpcy5zZWNvbmQvNjApKSt0aGlzLm1pbnV0ZVxuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFNaW51dG8pO1xuICAgICAgICB0aGlzLnJlc3BvbnNlU3RyaW5nQ2hhbmdlLmVtaXQocmVzcG9zdGFNaW51dG8udG9TdHJpbmcoKSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ21pbGlzZWNvbmQnOlxuICAgICAgICBjb25zdCByZXNwb3N0YU1pbGlzZWd1bmRvID0gKCgodGhpcy5ob3VyKjYwKSt0aGlzLm1pbnV0ZSkqNjArdGhpcy5zZWNvbmQpKjEwMDA7XG4gICAgICAgIHRoaXMucmVzcG9uc2VDaGFuZ2UuZW1pdChyZXNwb3N0YU1pbGlzZWd1bmRvKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhTWlsaXNlZ3VuZG8udG9TdHJpbmcoKSk7XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgY29uc3QgcmVzcG9zdGFIb3JhID0gTWF0aC5mbG9vcigoTWF0aC5mbG9vcih0aGlzLnNlY29uZC82MCkrdGhpcy5taW51dGUpLzYwKSt0aGlzLmhvdXI7XG4gICAgICAgIHRoaXMucmVzcG9uc2VDaGFuZ2UuZW1pdChyZXNwb3N0YUhvcmEpO1xuICAgICAgICB0aGlzLnJlc3BvbnNlU3RyaW5nQ2hhbmdlLmVtaXQocmVzcG9zdGFIb3JhLnRvU3RyaW5nKCkpO1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhID0gYCR7dGhpcy5ob3VyLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5ob3VyOnRoaXMuaG91cn06JHt0aGlzLm1pbnV0ZS50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMubWludXRlOnRoaXMubWludXRlfToke3RoaXMuc2Vjb25kLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5zZWNvbmQ6dGhpcy5zZWNvbmR9YFxuICAgICAgICBjb25zdCByZXNwb3N0YVNlcGFyYWRhID0ge1xuICAgICAgICAgIGhvdXI6dGhpcy5ob3VyLFxuICAgICAgICAgIG1pbnV0ZTp0aGlzLm1pbnV0ZSxcbiAgICAgICAgICBzZWNvbmQ6dGhpcy5zZWNvbmRcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc3BvbnNlU3RyaW5nQ2hhbmdlLmVtaXQocmVzcG9zdGEpO1xuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFTZXBhcmFkYSk7XG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIHB1YmxpYyBub3dDbG9jaygpe1xuICAgIGNvbnN0IGFnb3JhID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBob3JhcyA9IGFnb3JhLmdldEhvdXJzKCk7XG4gICAgY29uc3QgbWludXRvcyA9IGFnb3JhLmdldE1pbnV0ZXMoKTtcbiAgICBjb25zdCBzZWd1bmRvcyA9IGFnb3JhLmdldFNlY29uZHMoKTtcblxuICAgIHRoaXMuaG91ciA9IGhvcmFzO1xuICAgIHRoaXMubWludXRlID0gbWludXRvcztcbiAgICB0aGlzLnNlY29uZCA9IHNlZ3VuZG9zO1xuICAgIHRoaXMuZmVjaGFyTWVudSh0aGlzLm1lbnVUcmlnZ2VyKTtcbiAgfVxuICBwdWJsaWMgZmVjaGFyTWVudSh0cmlnZ2VyOk1hdE1lbnVUcmlnZ2VyKSB7XG4gICAgdGhpcy5kaXNhYmxlQ2xvY2sgPSB0cnVlXG4gICAgdHJpZ2dlci5jbG9zZU1lbnUoKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlKCk7XG4gIH1cbiAgcHVibGljIHByZWVuY2hlckRpdnMoKSB7XG4gICAgdGhpcy5kaXNhYmxlQ2xvY2sgPSB0cnVlO1xuICAgIHRoaXMuaG91ckNsb2NrID0gbnVsbDtcbiAgICB0aGlzLm1pbnV0ZUNsb2NrID0gbnVsbDtcbiAgICB0aGlzLnNlY29uZENsb2NrID0gbnVsbDtcbiAgICB0aGlzLmRlc3Ryb3lEaXZzKCdob3VyQ2xvY2snKVxuICAgIHRoaXMuZGVzdHJveURpdnMoJ21pbnV0ZUNsb2NrJylcbiAgICB0aGlzLmRlc3Ryb3lEaXZzKCdzZWNvbmRDbG9jaycpXG4gICAgY29uc3QgY3JpYXJEaXZzID0gKHBhcmVudEVsZW1lbnRJZDogc3RyaW5nLCBpZDogbnVtYmVyLCBsaW1pdGU6IG51bWJlcikgPT4ge1xuXG4gICAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyZW50RWxlbWVudElkKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gbGltaXRlOyBpKyspIHtcbiAgICAgICAgY29uc3QgbnVtYmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG51bWJlckRpdi50ZXh0Q29udGVudCA9IGkgPCAxMCA/IGAwJHtpfWAgOiBgJHtpfWA7XG4gICAgICAgIG51bWJlckRpdi5zdHlsZS5ib3JkZXJCb3R0b20gPSBcIjFweCBzb2xpZCBibGFja1wiO1xuICAgICAgICBudW1iZXJEaXYuc3R5bGUucGFkZGluZyA9IFwiNXB4IDEwcHhcIjtcbiAgICAgICAgbnVtYmVyRGl2LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgICBudW1iZXJEaXYuc3R5bGUubWFyZ2luID0gXCIycHhcIjtcblxuICAgICAgICBsZXQgY2xhc3NJZGVudGlmaWVyID0gJyc7XG4gICAgICAgIHN3aXRjaChpZCkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNsYXNzSWRlbnRpZmllciA9ICdudW1Ib3VyQ2xvY2snO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY2xhc3NJZGVudGlmaWVyID0gJ251bU1pbnV0ZUNsb2NrJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNsYXNzSWRlbnRpZmllciA9ICdudW1TZWNvbmRDbG9jayc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBudW1iZXJEaXYuY2xhc3NMaXN0LmFkZChjbGFzc0lkZW50aWZpZXIpO1xuXG4gICAgICAgIG51bWJlckRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBhbGxTaWJsaW5ncyA9IHBhcmVudEVsZW1lbnQhLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2NsYXNzSWRlbnRpZmllcn1gKTtcbiAgICAgICAgICBhbGxTaWJsaW5ncy5mb3JFYWNoKHNpYmxpbmcgPT4ge1xuICAgICAgICAgICAgaWYgKHNpYmxpbmcgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICBzaWJsaW5nLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZihjbGFzc0lkZW50aWZpZXIgPT09ICdudW1Ib3VyQ2xvY2snKSB0aGlzLmhvdXJDbG9jayA9IG51bWJlckRpdi50ZXh0Q29udGVudDtcbiAgICAgICAgICBpZihjbGFzc0lkZW50aWZpZXIgPT09ICdudW1NaW51dGVDbG9jaycpIHRoaXMubWludXRlQ2xvY2sgPSBudW1iZXJEaXYudGV4dENvbnRlbnQ7XG4gICAgICAgICAgaWYoY2xhc3NJZGVudGlmaWVyID09PSAnbnVtU2Vjb25kQ2xvY2snKSB0aGlzLnNlY29uZENsb2NrID0gbnVtYmVyRGl2LnRleHRDb250ZW50O1xuXG4gICAgICAgICAgbnVtYmVyRGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRibHVlXCI7XG5cbiAgICAgICAgICBpZih0aGlzLmhvdXJDbG9jayAmJiB0aGlzLm1pbnV0ZUNsb2NrICYmIHRoaXMuc2Vjb25kQ2xvY2spe1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlQ2xvY2sgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBhcmVudEVsZW1lbnQhLmFwcGVuZENoaWxkKG51bWJlckRpdik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNyaWFyRGl2cygnaG91ckNsb2NrJywgMCwgdGhpcy5tYXhIb3VyKTtcbiAgICBjcmlhckRpdnMoJ21pbnV0ZUNsb2NrJywgMSwgNTkpO1xuICAgIGNyaWFyRGl2cygnc2Vjb25kQ2xvY2snLCAyLCA1OSk7XG4gIH1cblxuICBwdWJsaWMgZGVzdHJveURpdnMoaWQ6c3RyaW5nKXtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGlmKGVsZW1lbnQpe1xuICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSAnJ1xuICAgIH1cbiAgfVxuICBwdWJsaWMgY29uZmlybUNsb2NrKCl7XG4gICAgdGhpcy5ob3VyID0gcGFyc2VJbnQodGhpcy5ob3VyQ2xvY2shKVxuICAgIHRoaXMubWludXRlID0gcGFyc2VJbnQodGhpcy5taW51dGVDbG9jayEpXG4gICAgdGhpcy5zZWNvbmQgPSBwYXJzZUludCh0aGlzLnNlY29uZENsb2NrISlcbiAgICB0aGlzLmZlY2hhck1lbnUodGhpcy5tZW51VHJpZ2dlcik7XG4gIH1cbn1cbiJdfQ==