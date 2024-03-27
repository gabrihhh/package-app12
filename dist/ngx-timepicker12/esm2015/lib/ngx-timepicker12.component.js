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
            if (isNaN(this.hour) || isNaN(this.minute) || isNaN(this.second)) {
                this.hour = 0;
                this.minute = 0;
                this.second = 0;
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
                if (this.hour < 0) {
                    this.hour = 0;
                }
                if (this.hour > this.maxHour) {
                    this.hour = this.maxHour;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdGltZXBpY2tlcjEyL3NyYy9saWIvbmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpHLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7O0FBMEdsQyxNQUFNLE9BQU8sd0JBQXdCO0lBOEJuQztRQTVCUyxVQUFLLEdBQVUsR0FBRyxDQUFDO1FBQ25CLFdBQU0sR0FBVSxFQUFFLENBQUM7UUFDbkIsU0FBSSxHQUFVLEVBQUUsQ0FBQztRQUNqQixRQUFHLEdBQVUsVUFBVSxDQUFDO1FBQ3hCLGFBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBQzdCLG1CQUFjLEdBQWtCLElBQUksQ0FBQztRQUNyQyxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUM1QixTQUFJLEdBQW9ELFFBQVEsQ0FBQTtRQUNoRSxRQUFHLEdBQVUsU0FBUyxDQUFDO1FBQ3ZCLGFBQVEsR0FBVyxLQUFLLENBQUM7UUFFeEIsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3pDLHlCQUFvQixHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDbEQsYUFBUSxHQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDO1FBQ3BDLGNBQVMsR0FBVSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQztRQUN0QyxZQUFPLEdBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUE7UUFDakMsU0FBSSxHQUFVLENBQUMsQ0FBQztRQUNoQixXQUFNLEdBQVUsQ0FBQyxDQUFDO1FBQ2xCLFdBQU0sR0FBVSxDQUFDLENBQUM7UUFDbEIs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dkIsTUFBTTtnQkFDRyxvQkFBb0I7c0JBQTdCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdE1lbnVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbWVudSc7XG5pbXBvcnQgeyB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtdGltZXBpY2tlcicsXG4gIHRlbXBsYXRlOiBgXG4gIDxkaXYgW3N0eWxlLndpZHRoXT1cIndpZHRoQ3NzXCIgW3N0eWxlLmhlaWdodF09XCJoZWlnaHRDc3NcIiBjbGFzcz1cInRpbWVwaWNrZXJcIj5cbiAgICA8ZGl2IGlkPVwiaG91clwiIHRhYmluZGV4PVwiMVwiIChibHVyKT1cImxvc3RGb2N1cygpXCIgKGZvY3VzKT1cImZvY3VzKCRldmVudClcIiBbc3R5bGUuYmFja2dyb3VuZC1jb2xvcl09XCJzZWxlY3RlZD09PSdob3VyJz8gY29yIDogJ3RyYW5zcGFyZW50J1wiIChjbGljayk9XCJmb2N1cygkZXZlbnQpXCI+e3tob3VyLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5ob3VyOnRoaXMuaG91cn19PC9kaXY+XG4gICAgPGRpdj46PC9kaXY+XG4gICAgPGRpdiBpZD1cIm1pbnV0ZVwiIHRhYmluZGV4PVwiMVwiIChibHVyKT1cImxvc3RGb2N1cygpXCIgKGZvY3VzKT1cImZvY3VzKCRldmVudClcIiBbc3R5bGUuYmFja2dyb3VuZC1jb2xvcl09XCJzZWxlY3RlZD09PSdtaW51dGUnPyBjb3IgOiAndHJhbnNwYXJlbnQnXCIgKGNsaWNrKT1cImZvY3VzKCRldmVudClcIj57e21pbnV0ZS50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMubWludXRlOnRoaXMubWludXRlfX08L2Rpdj5cbiAgICA8ZGl2ICpuZ0lmPVwibmVlZFNlY29uZHNcIj46PC9kaXY+XG4gICAgPGRpdiAqbmdJZj1cIm5lZWRTZWNvbmRzXCIgaWQ9XCJzZWNvbmRcIiB0YWJpbmRleD1cIjFcIiAoYmx1cik9XCJsb3N0Rm9jdXMoKVwiIChmb2N1cyk9XCJmb2N1cygkZXZlbnQpXCIgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwic2VsZWN0ZWQ9PT0nc2Vjb25kJz8gY29yIDogJ3RyYW5zcGFyZW50J1wiIChjbGljayk9XCJmb2N1cygkZXZlbnQpXCI+e3tzZWNvbmQudG9TdHJpbmcoKS5sZW5ndGg9PT0xPycwJyt0aGlzLnNlY29uZDp0aGlzLnNlY29uZH19PC9kaXY+XG4gICAgPGJ1dHRvbiAqbmdJZj1cIiFkaXNhYmxlZFwiIG1hdC1idXR0b24gc3R5bGU9XCJwYWRkaW5nOjEwcHg7cG9zaXRpb246cmVsYXRpdmU7Ym90dG9tOjFweFwiIFttYXRNZW51VHJpZ2dlckZvcl09XCJhYm92ZU1lbnVcIiAjdHJpZ2dlcj1cIm1hdE1lbnVUcmlnZ2VyXCIgY2xhc3M9XCJidG5DbG9ja1wiIChjbGljayk9XCJwcmVlbmNoZXJEaXZzKClcIj5cbiAgICAgIDxzdmcgd2lkdGg9XCIyMHB4XCIgaGVpZ2h0PVwiMjBweFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBzdHlsZT1cIndpZHRoOiAxN3B4O1wiPlxuICAgICAgICA8cGF0aCBkPVwiTTEyIDdWMTJIMTVNMjEgMTJDMjEgMTYuOTcwNiAxNi45NzA2IDIxIDEyIDIxQzcuMDI5NDQgMjEgMyAxNi45NzA2IDMgMTJDMyA3LjAyOTQ0IDcuMDI5NDQgMyAxMiAzQzE2Ljk3MDYgMyAyMSA3LjAyOTQ0IDIxIDEyWlwiIHN0cm9rZT1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIvPlxuICAgICAgPC9zdmc+XG4gICAgPC9idXR0b24+XG4gICAgPG1hdC1tZW51ICNhYm92ZU1lbnU9XCJtYXRNZW51XCIgeVBvc2l0aW9uPVwiYWJvdmVcIj5cbiAgICA8ZGl2IGNsYXNzPVwibWF0TWVudUNsb2NrXCIgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJudW1iZXJzXCI+XG4gICAgICAgIDxkaXYgaWQ9XCJob3VyQ2xvY2tcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBpZD1cIm1pbnV0ZUNsb2NrXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgaWQ9XCJzZWNvbmRDbG9ja1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyQ2xvY2tcIj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiAqbmdJZj1cIm1heCAhPT0gJzIzOjU5OjU5J1wiIChjbGljayk9XCJtYXhDbG9jaygpXCI+TWF4PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gKm5nSWY9XCJtYXggPT0gJzIzOjU5OjU5J1wiIChjbGljayk9XCJub3dDbG9jaygpXCI+Tm93PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gW2Rpc2FibGVkXT1cImRpc2FibGVDbG9ja1wiIChjbGljayk9XCJjb25maXJtQ2xvY2soKVwiPk9rPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8L21hdC1tZW51PlxuICA8L2Rpdj5cbmAsXG4gIHN0eWxlczogW1xuICAgIGAudGltZXBpY2tlcntcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBncmF5O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtd3JhcDogbm93cmFwO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIH1cbiAgICBkaXZ7XG4gICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lOyAvKiBTYWZhcmkgKi9cbiAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7IC8qIEZpcmVmb3ggKi9cbiAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTsgLyogSUUxMCsvRWRnZSAqL1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgfVxuICAgIGRpdjpmb2N1c3tcbiAgICAgIG91dGxpbmU6bm9uZTtcbiAgICB9XG4gICAgLmJ0bkNsb2Nre1xuICAgICAgbWFyZ2luOjAgNXB4O1xuICAgICAgaGVpZ2h0OjMwcHg7XG4gICAgICBtaW4td2lkdGg6MjVweDtcbiAgICAgIGRpc3BsYXk6ZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDpjZW50ZXI7XG4gICAgICBhbGlnbi1pdGVtczpjZW50ZXI7XG4gICAgfVxuICAgIC5idG5DbG9ja3tcbiAgICAgIGRpc3BsYXk6ZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDpjZW50ZXI7XG4gICAgICBhbGlnbi1pdGVtczpjZW50ZXI7XG4gICAgICBtaW4taGVpZ2h0OjI1cHg7XG4gICAgICBoZWlnaHQ6MjVweDtcbiAgICB9XG4gICAgLm1hdE1lbnVDbG9ja3tcbiAgICAgIHdpZHRoOjE1MHB4O1xuICAgICAgaGVpZ2h0OjE1MHB4O1xuICAgICAgZGlzcGxheTpmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246Y29sdW1uO1xuICAgIH1cbiAgICAubnVtYmVyc3tcbiAgICAgIHdpZHRoOjE1MHB4O1xuICAgICAgaGVpZ2h0OjEyMHB4O1xuICAgICAgZGlzcGxheTpmbGV4O1xuICAgIH1cbiAgICAubnVtYmVycz5kaXZ7XG4gICAgICB3aWR0aDo1MHB4O1xuICAgICAgaGVpZ2h0OjEyMHB4O1xuICAgICAgZGlzcGxheTpmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246Y29sdW1uO1xuICAgICAgYWxpZ24taXRlbXM6Y2VudGVyO1xuICAgICAgb3ZlcmZsb3c6c2Nyb2xsO1xuICAgICAgc2Nyb2xsYmFyLXdpZHRoOiBub25lO1xuICAgIH1cbiAgICAubnVtYmVycz5kaXY6Oi13ZWJraXQtc2Nyb2xsYmFye1xuICAgICAgZGlzcGxheTpub25lO1xuICAgIH1cbiAgICAuZm9vdGVyQ2xvY2t7XG4gICAgICB3aWR0aDoxNTBweDtcbiAgICAgIGhlaWdodDozMHB4O1xuICAgICAgZGlzcGxheTpmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZDtcbiAgICAgIGFsaWduLWl0ZW1zOmNlbnRlcjtcbiAgICAgIGJ1dHRvbntcbiAgICAgICAgbWluLXdpZHRoOjUwcHg7XG4gICAgICAgIG1pbi1oZWlnaHQ6MjBweDtcbiAgICAgICAgd2lkdGg6NTBweDtcbiAgICAgICAgaGVpZ2h0OjIwcHg7XG4gICAgICAgIGZvbnQtc2l6ZToxNXB4O1xuICAgICAgICBkaXNwbGF5OmZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDpjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOmNlbnRlcjtcbiAgICAgIH1cbiAgICB9XG4gICAgYFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neFRpbWVwaWNrZXIxMkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCxBZnRlclZpZXdJbml0e1xuICBAVmlld0NoaWxkKCd0cmlnZ2VyJykgbWVudVRyaWdnZXIhOiBNYXRNZW51VHJpZ2dlcjtcbiAgQElucHV0KCkgd2lkdGg6bnVtYmVyID0gMTMwO1xuICBASW5wdXQoKSBoZWlnaHQ6bnVtYmVyID0gNDA7XG4gIEBJbnB1dCgpIGZvbnQ6bnVtYmVyID0gMTA7XG4gIEBJbnB1dCgpIG1heDpzdHJpbmcgPSAnMjM6NTk6NTknO1xuICBASW5wdXQoKSByZXNwb25zZTogbnVtYmVyfG51bGwgPSBudWxsO1xuICBASW5wdXQoKSByZXNwb25zZVN0cmluZzogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG5lZWRTZWNvbmRzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgdHlwZTogJ21pbGlzZWNvbmQnfCdzZWNvbmQnfCdtaW51dGUnfCAnaG91cicgfCAndGltZScgPSAnc2Vjb25kJ1xuICBASW5wdXQoKSBjb3I6c3RyaW5nID0gXCIjNDhiOWM3XCI7XG4gIEBJbnB1dCgpIGRpc2FibGVkOmJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgcmVzcG9uc2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHJlc3BvbnNlU3RyaW5nQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHB1YmxpYyB3aWR0aENzczpzdHJpbmcgPSBgJHt0aGlzLndpZHRofXB4YDtcbiAgcHVibGljIGhlaWdodENzczpzdHJpbmcgPSBgJHt0aGlzLmhlaWdodH1weGA7XG4gIHB1YmxpYyBmb250Q3NzOnN0cmluZyA9IGAke3RoaXMuZm9udH1weGBcbiAgcHVibGljIGhvdXI6bnVtYmVyID0gMDtcbiAgcHVibGljIG1pbnV0ZTpudW1iZXIgPSAwO1xuICBwdWJsaWMgc2Vjb25kOm51bWJlciA9IDA7XG4gIHB1YmxpYyBzZWxlY3RlZDonaG91cid8J21pbnV0ZSd8J3NlY29uZCd8bnVsbCA9IG51bGw7XG4gIHB1YmxpYyBtYXhIb3VyOm51bWJlciA9IDBcbiAgcHVibGljIG1heE1pbnV0ZTpudW1iZXIgPSAwXG4gIHB1YmxpYyBtYXhTZWNvbmQ6bnVtYmVyID0gMFxuICBwdWJsaWMgZGlzYWJsZUNsb2NrOmJvb2xlYW4gPSB0cnVlO1xuICBwdWJsaWMgaG91ckNsb2NrOnN0cmluZ3xudWxsID0gbnVsbDtcbiAgcHVibGljIG1pbnV0ZUNsb2NrOnN0cmluZ3xudWxsID0gbnVsbDtcbiAgcHVibGljIHNlY29uZENsb2NrOnN0cmluZ3xudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBuZXdJbnB1dDpib29sZWFuID0gdHJ1ZTtcbiAgY29uc3RydWN0b3IoKXtcbiAgfVxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZih0aGlzLm1heCAhPSAnJyl7XG4gICAgICBjb25zdCBhcnJheU1heCA9IHRoaXMubWF4LnNwbGl0KCc6Jyk7XG4gICAgICB0aGlzLm1heEhvdXI9cGFyc2VJbnQoYXJyYXlNYXhbMF0pXG4gICAgICB0aGlzLm1heE1pbnV0ZT1wYXJzZUludChhcnJheU1heFsxXSlcbiAgICAgIHRoaXMubWF4U2Vjb25kPXBhcnNlSW50KGFycmF5TWF4WzJdKVxuICAgIH1cbiAgICBpZih0aGlzLnJlc3BvbnNlU3RyaW5nKXtcbiAgICAgIGxldCBhcnJheSA9IHRoaXMucmVzcG9uc2VTdHJpbmcuc3BsaXQoJzonKTtcbiAgICAgICAgaWYodGhpcy5uZWVkU2Vjb25kcyl7XG4gICAgICAgICAgICB0aGlzLmhvdXIgPSBwYXJzZUludChhcnJheVswXSk7XG4gICAgICAgICAgICB0aGlzLm1pbnV0ZSA9IHBhcnNlSW50KGFycmF5WzFdKTtcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kID0gcGFyc2VJbnQoYXJyYXlbMl0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuaG91ciA9IHBhcnNlSW50KGFycmF5WzBdKTtcbiAgICAgICAgICAgIHRoaXMubWludXRlID0gcGFyc2VJbnQoYXJyYXlbMV0pO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgaWYoaXNOYU4odGhpcy5ob3VyKSB8fCBpc05hTih0aGlzLm1pbnV0ZSkgfHwgaXNOYU4odGhpcy5zZWNvbmQpKXtcbiAgICAgICAgICB0aGlzLmhvdXIgPSAwXG4gICAgICAgICAgdGhpcy5taW51dGUgPSAwXG4gICAgICAgICAgdGhpcy5zZWNvbmQgPSAwXG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYodGhpcy5yZXNwb25zZSl7XG4gICAgICBsZXQgdGltZSA9IHRoaXMucmVzcG9uc2VcbiAgICAgIGlmKHRpbWU+MzYwMCl7XG4gICAgICAgIHRoaXMuaG91ciA9IE1hdGgucm91bmQodGltZS8zNjAwKVxuICAgICAgICB0aW1lIC09MzYwMCp0aGlzLmhvdXJcbiAgICAgIH1cbiAgICAgIGlmKHRpbWU+NjApe1xuICAgICAgICB0aGlzLm1pbnV0ZSA9IE1hdGgucm91bmQodGltZS82MClcbiAgICAgICAgdGltZSAtPTYwKnRoaXMubWludXRlXG4gICAgICB9XG4gICAgICBpZih0aW1lKXtcbiAgICAgICAgdGhpcy5zZWNvbmQgPSB0aW1lXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmKCF0aGlzLmRpc2FibGVkKXtcbiAgICAgIGNvbnN0IGhvdXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG91cicpO1xuICAgICAgaWYoaG91cil7aG91ci5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIn07XG4gICAgICBjb25zdCBtaW51dGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWludXRlJyk7XG4gICAgICBpZihtaW51dGUpe21pbnV0ZS5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIn1cbiAgICAgIGNvbnN0IHNlY29uZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWNvbmQnKTtcbiAgICAgIGlmKHNlY29uZCl7c2Vjb25kLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwifVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsKGUpPT57XG4gICAgICAgIGlmKGUuY29kZSA9PSAnVGFiJyl7XG4gICAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnbWludXRlJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdzZWNvbmQnXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gbnVsbFxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihlLmNvZGUgPT0gJ0Fycm93VXAnKXtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICAgIHRoaXMuaG91cisrXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICB0aGlzLm1pbnV0ZSsrXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgICB0aGlzLnNlY29uZCsrXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGUuY29kZSA9PSAnQXJyb3dEb3duJyl7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHN3aXRjaCh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICBpZih0aGlzLmhvdXI9PTApe1xuICAgICAgICAgICAgICAgIHRoaXMuaG91cj10aGlzLm1heEhvdXJcbiAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3VyLS1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgaWYodGhpcy5taW51dGU9PTApe1xuICAgICAgICAgICAgICAgIHRoaXMubWludXRlPTU5XG4gICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMubWludXRlLS1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgaWYodGhpcy5zZWNvbmQ9PTApe1xuICAgICAgICAgICAgICAgIHRoaXMuc2Vjb25kPTU5XG4gICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuc2Vjb25kLS1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihlLmNvZGUgPT0gJ0Fycm93UmlnaHQnKXtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnbWludXRlJztcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnc2Vjb25kJztcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZS5jb2RlID09ICdBcnJvd0xlZnQnKXtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdtaW51dGUnO1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdob3VyJztcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZS5jb2RlID09J0JhY2tzcGFjZScpe1xuICAgICAgICAgIHN3aXRjaCh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICB0aGlzLmFwYWdhcignaG91cicpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICB0aGlzLmFwYWdhcignbWludXRlJylcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICAgIHRoaXMuYXBhZ2FyKCdzZWNvbmQnKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgc3dpdGNoKGUua2V5KXtcbiAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcigxLHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcigyLHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICczJzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcigzLHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICc0JzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcig0LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICc1JzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcig1LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICc2JzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcig2LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICc3JzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcig3LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICc4JzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcig4LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICc5JzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcig5LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICcwJzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcigwLHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMubWludXRlPjU5IHx8IHRoaXMubWludXRlPDApe1xuICAgICAgICAgIHRoaXMubWludXRlID0gMFxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuc2Vjb25kPjU5IHx8IHRoaXMuc2Vjb25kPDApe1xuICAgICAgICAgIHRoaXMuc2Vjb25kID0gMFxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuaG91cjwwKXtcbiAgICAgICAgICB0aGlzLmhvdXIgPSAwXG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5ob3VyPnRoaXMubWF4SG91cil7XG4gICAgICAgICAgdGhpcy5ob3VyID0gdGhpcy5tYXhIb3VyXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZSgpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBsb3N0Rm9jdXMoKXtcbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbFxuICB9XG5cbiAgcHVibGljIGZvY3VzKCRldmVudDphbnkpe1xuICAgIGlmKCF0aGlzLmRpc2FibGVkKXtcbiAgICAgIHN3aXRjaCgkZXZlbnQudGFyZ2V0LmlkKXtcbiAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdob3VyJztcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnbWludXRlJztcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnc2Vjb25kJztcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhcGFnYXIobG9jYWw6ICdob3VyJ3wnbWludXRlJ3wnc2Vjb25kJ3xudWxsKSB7XG4gICAgaWYobG9jYWwpe1xuICAgICAgaWYobG9jYWw9PSdob3VyJyl7XG4gICAgICAgIGxldCBob3JhID0gdGhpcy5ob3VyLnRvU3RyaW5nKCkuc3BsaXQoJycpO1xuICAgICAgICBpZihob3JhLmxlbmd0aD4xKXtcbiAgICAgICAgICBsZXQgcmV0aXJhZG8gPSBob3JhLnBvcCgpO1xuICAgICAgICB0aGlzLmhvdXIgPSAgcGFyc2VJbnQoaG9yYS5qb2luKCcnKSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5ob3VyID0gMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihsb2NhbD09J21pbnV0ZScpe1xuICAgICAgICBsZXQgbWludXRvID0gdGhpcy5taW51dGUudG9TdHJpbmcoKS5zcGxpdCgnJyk7XG4gICAgICAgIGlmKG1pbnV0by5sZW5ndGg+MSl7XG4gICAgICAgIGxldCByZXRpcmFkbyA9IG1pbnV0by5wb3AoKTtcbiAgICAgICAgdGhpcy5taW51dGUgPSAgcGFyc2VJbnQobWludXRvLmpvaW4oJycpKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5taW51dGUgPSAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGxvY2FsPT0nc2Vjb25kJyl7XG4gICAgICAgIGxldCBzZWd1bmRvID0gdGhpcy5zZWNvbmQudG9TdHJpbmcoKS5zcGxpdCgnJyk7XG4gICAgICAgIGlmKHNlZ3VuZG8ubGVuZ3RoPjEpe1xuICAgICAgICBsZXQgcmV0aXJhZG8gPSBzZWd1bmRvLnBvcCgpO1xuICAgICAgICB0aGlzLnNlY29uZCA9ICBwYXJzZUludChzZWd1bmRvLmpvaW4oJycpKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLnNlY29uZCA9IDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkaWdpdGFyKG51bTpudW1iZXIsbG9jYWw6J2hvdXInfCdtaW51dGUnfCdzZWNvbmQnfG51bGwpe1xuICAgIGlmKGxvY2FsKXtcbiAgICAgIGlmKGxvY2FsPT0naG91cicpe1xuICAgICAgICBpZih0aGlzLm5ld0lucHV0KXtcbiAgICAgICAgICB0aGlzLmhvdXI9cGFyc2VJbnQoJzAnK251bSlcbiAgICAgICAgICB0aGlzLm5ld0lucHV0ID0gZmFsc2U7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuaG91cj1wYXJzZUludCh0aGlzLmhvdXIudG9TdHJpbmcoKStudW0pXG4gICAgICAgICAgaWYodGhpcy5ob3VyLnRvU3RyaW5nKCkubGVuZ3RoID09IHRoaXMubWF4SG91ci50b1N0cmluZygpLmxlbmd0aCl7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ21pbnV0ZSc7XG4gICAgICAgICAgICB0aGlzLm5ld0lucHV0PXRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGxvY2FsPT0nbWludXRlJyl7XG4gICAgICAgIGlmKHRoaXMubmV3SW5wdXQpe1xuICAgICAgICAgIHRoaXMubWludXRlPXBhcnNlSW50KCcwJytudW0pXG4gICAgICAgICAgdGhpcy5uZXdJbnB1dCA9IGZhbHNlXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMubWludXRlPXBhcnNlSW50KHRoaXMubWludXRlLnRvU3RyaW5nKCkrbnVtKVxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnc2Vjb25kJztcbiAgICAgICAgICB0aGlzLm5ld0lucHV0PXRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYobG9jYWw9PSdzZWNvbmQnKXtcbiAgICAgICAgaWYodGhpcy5uZXdJbnB1dCl7XG4gICAgICAgICAgdGhpcy5zZWNvbmQ9cGFyc2VJbnQoJzAnK251bSlcbiAgICAgICAgICB0aGlzLm5ld0lucHV0ID0gZmFsc2VcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5zZWNvbmQ9cGFyc2VJbnQodGhpcy5zZWNvbmQudG9TdHJpbmcoKStudW0pXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gICAgICAgICAgdGhpcy5uZXdJbnB1dD10cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZXJyb3IoKXtcbiAgICByZXR1cm4gdGhyb3dFcnJvcigoKT0+IG5ldyBFcnJvcignVGhlIHRpbWUgaXMgYmlnZ2VyIHRoZW4gbWF4IHRpbWU6V2FzIHNldCB0aGUgbWF4IHRpbWUnKSlcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVWYWx1ZSgpOiB2b2lkIHtcbiAgICBpZih0aGlzLmhvdXI+dGhpcy5tYXhIb3VyKXtcbiAgICAgIHRoaXMuaG91ciA9IHRoaXMubWF4SG91cjtcbiAgICAgIHRoaXMuZXJyb3IoKVxuICAgIH1cbiAgICBpZih0aGlzLmhvdXI9PXRoaXMubWF4SG91ciAmJiB0aGlzLm1pbnV0ZT50aGlzLm1heE1pbnV0ZSl7XG4gICAgICB0aGlzLm1pbnV0ZT10aGlzLm1heE1pbnV0ZVxuICAgICAgdGhpcy5lcnJvcigpXG4gICAgfVxuICAgIGlmKHRoaXMuaG91cj09dGhpcy5tYXhIb3VyICYmIHRoaXMubWludXRlPT10aGlzLm1heE1pbnV0ZSAmJiB0aGlzLnNlY29uZD50aGlzLm1heFNlY29uZCl7XG4gICAgICB0aGlzLnNlY29uZD10aGlzLm1heFNlY29uZFxuICAgICAgdGhpcy5lcnJvcigpXG4gICAgfVxuICAgIHN3aXRjaCh0aGlzLnR5cGUpe1xuICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgY29uc3QgcmVzcG9zdGFTZWd1bmRvID0gKCh0aGlzLmhvdXIqNjApK3RoaXMubWludXRlKSo2MCt0aGlzLnNlY29uZFxuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFTZWd1bmRvKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhU2VndW5kby50b1N0cmluZygpKTtcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhTWludXRvID0gKCh0aGlzLmhvdXIqNjApK01hdGguZmxvb3IodGhpcy5zZWNvbmQvNjApKSt0aGlzLm1pbnV0ZVxuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFNaW51dG8pO1xuICAgICAgICB0aGlzLnJlc3BvbnNlU3RyaW5nQ2hhbmdlLmVtaXQocmVzcG9zdGFNaW51dG8udG9TdHJpbmcoKSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ21pbGlzZWNvbmQnOlxuICAgICAgICBjb25zdCByZXNwb3N0YU1pbGlzZWd1bmRvID0gKCgodGhpcy5ob3VyKjYwKSt0aGlzLm1pbnV0ZSkqNjArdGhpcy5zZWNvbmQpKjEwMDA7XG4gICAgICAgIHRoaXMucmVzcG9uc2VDaGFuZ2UuZW1pdChyZXNwb3N0YU1pbGlzZWd1bmRvKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhTWlsaXNlZ3VuZG8udG9TdHJpbmcoKSk7XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgY29uc3QgcmVzcG9zdGFIb3JhID0gTWF0aC5mbG9vcigoTWF0aC5mbG9vcih0aGlzLnNlY29uZC82MCkrdGhpcy5taW51dGUpLzYwKSt0aGlzLmhvdXI7XG4gICAgICAgIHRoaXMucmVzcG9uc2VDaGFuZ2UuZW1pdChyZXNwb3N0YUhvcmEpO1xuICAgICAgICB0aGlzLnJlc3BvbnNlU3RyaW5nQ2hhbmdlLmVtaXQocmVzcG9zdGFIb3JhLnRvU3RyaW5nKCkpO1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhID0gYCR7dGhpcy5ob3VyLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5ob3VyOnRoaXMuaG91cn06JHt0aGlzLm1pbnV0ZS50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMubWludXRlOnRoaXMubWludXRlfToke3RoaXMuc2Vjb25kLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5zZWNvbmQ6dGhpcy5zZWNvbmR9YFxuICAgICAgICBjb25zdCByZXNwb3N0YVNlcGFyYWRhID0ge1xuICAgICAgICAgIGhvdXI6dGhpcy5ob3VyLFxuICAgICAgICAgIG1pbnV0ZTp0aGlzLm1pbnV0ZSxcbiAgICAgICAgICBzZWNvbmQ6dGhpcy5zZWNvbmRcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc3BvbnNlU3RyaW5nQ2hhbmdlLmVtaXQocmVzcG9zdGEpO1xuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFTZXBhcmFkYSk7XG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgcHVibGljIG1heENsb2NrKCl7XG4gICAgdGhpcy5ob3VyID0gdGhpcy5tYXhIb3VyO1xuICAgIHRoaXMubWludXRlID0gdGhpcy5tYXhNaW51dGU7XG4gICAgdGhpcy5zZWNvbmQgPSB0aGlzLm1heFNlY29uZDtcbiAgICB0aGlzLmZlY2hhck1lbnUodGhpcy5tZW51VHJpZ2dlcik7XG4gIH1cblxuICBwdWJsaWMgbm93Q2xvY2soKXtcbiAgICBjb25zdCBhZ29yYSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgaG9yYXMgPSBhZ29yYS5nZXRIb3VycygpO1xuICAgIGNvbnN0IG1pbnV0b3MgPSBhZ29yYS5nZXRNaW51dGVzKCk7XG4gICAgY29uc3Qgc2VndW5kb3MgPSBhZ29yYS5nZXRTZWNvbmRzKCk7XG5cbiAgICB0aGlzLmhvdXIgPSBob3JhcztcbiAgICB0aGlzLm1pbnV0ZSA9IG1pbnV0b3M7XG4gICAgdGhpcy5zZWNvbmQgPSBzZWd1bmRvcztcbiAgICB0aGlzLmZlY2hhck1lbnUodGhpcy5tZW51VHJpZ2dlcik7XG4gIH1cblxuICBwdWJsaWMgZmVjaGFyTWVudSh0cmlnZ2VyOk1hdE1lbnVUcmlnZ2VyKSB7XG4gICAgdGhpcy5kaXNhYmxlQ2xvY2sgPSB0cnVlXG4gICAgdHJpZ2dlci5jbG9zZU1lbnUoKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlKCk7XG4gIH1cblxuICBwdWJsaWMgcHJlZW5jaGVyRGl2cygpIHtcbiAgICB0aGlzLmRpc2FibGVDbG9jayA9IHRydWU7XG4gICAgdGhpcy5ob3VyQ2xvY2sgPSBudWxsO1xuICAgIHRoaXMubWludXRlQ2xvY2sgPSBudWxsO1xuICAgIHRoaXMuc2Vjb25kQ2xvY2sgPSBudWxsO1xuICAgIHRoaXMuZGVzdHJveURpdnMoJ2hvdXJDbG9jaycpXG4gICAgdGhpcy5kZXN0cm95RGl2cygnbWludXRlQ2xvY2snKVxuICAgIHRoaXMuZGVzdHJveURpdnMoJ3NlY29uZENsb2NrJylcbiAgICBjb25zdCBjcmlhckRpdnMgPSAocGFyZW50RWxlbWVudElkOiBzdHJpbmcsIGlkOiBudW1iZXIsIGxpbWl0ZTogbnVtYmVyKSA9PiB7XG5cbiAgICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnRFbGVtZW50SWQpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBsaW1pdGU7IGkrKykge1xuICAgICAgICBjb25zdCBudW1iZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbnVtYmVyRGl2LnRleHRDb250ZW50ID0gaSA8IDEwID8gYDAke2l9YCA6IGAke2l9YDtcbiAgICAgICAgbnVtYmVyRGl2LnN0eWxlLmJvcmRlckJvdHRvbSA9IFwiMXB4IHNvbGlkIGJsYWNrXCI7XG4gICAgICAgIG51bWJlckRpdi5zdHlsZS5wYWRkaW5nID0gXCI1cHggMTBweFwiO1xuICAgICAgICBudW1iZXJEaXYuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICAgIG51bWJlckRpdi5zdHlsZS5tYXJnaW4gPSBcIjJweFwiO1xuXG4gICAgICAgIGxldCBjbGFzc0lkZW50aWZpZXIgPSAnJztcbiAgICAgICAgc3dpdGNoKGlkKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgY2xhc3NJZGVudGlmaWVyID0gJ251bUhvdXJDbG9jayc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjbGFzc0lkZW50aWZpZXIgPSAnbnVtTWludXRlQ2xvY2snO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2xhc3NJZGVudGlmaWVyID0gJ251bVNlY29uZENsb2NrJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIG51bWJlckRpdi5jbGFzc0xpc3QuYWRkKGNsYXNzSWRlbnRpZmllcik7XG5cbiAgICAgICAgbnVtYmVyRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGFsbFNpYmxpbmdzID0gcGFyZW50RWxlbWVudCEucXVlcnlTZWxlY3RvckFsbChgLiR7Y2xhc3NJZGVudGlmaWVyfWApO1xuICAgICAgICAgIGFsbFNpYmxpbmdzLmZvckVhY2goc2libGluZyA9PiB7XG4gICAgICAgICAgICBpZiAoc2libGluZyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgIHNpYmxpbmcuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmKGNsYXNzSWRlbnRpZmllciA9PT0gJ251bUhvdXJDbG9jaycpIHRoaXMuaG91ckNsb2NrID0gbnVtYmVyRGl2LnRleHRDb250ZW50O1xuICAgICAgICAgIGlmKGNsYXNzSWRlbnRpZmllciA9PT0gJ251bU1pbnV0ZUNsb2NrJykgdGhpcy5taW51dGVDbG9jayA9IG51bWJlckRpdi50ZXh0Q29udGVudDtcbiAgICAgICAgICBpZihjbGFzc0lkZW50aWZpZXIgPT09ICdudW1TZWNvbmRDbG9jaycpIHRoaXMuc2Vjb25kQ2xvY2sgPSBudW1iZXJEaXYudGV4dENvbnRlbnQ7XG5cbiAgICAgICAgICBudW1iZXJEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGJsdWVcIjtcblxuICAgICAgICAgIGlmKHRoaXMuaG91ckNsb2NrICYmIHRoaXMubWludXRlQ2xvY2sgJiYgdGhpcy5zZWNvbmRDbG9jayl7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVDbG9jayA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcGFyZW50RWxlbWVudCEuYXBwZW5kQ2hpbGQobnVtYmVyRGl2KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY3JpYXJEaXZzKCdob3VyQ2xvY2snLCAwLCB0aGlzLm1heEhvdXIpO1xuICAgIGNyaWFyRGl2cygnbWludXRlQ2xvY2snLCAxLCA1OSk7XG4gICAgY3JpYXJEaXZzKCdzZWNvbmRDbG9jaycsIDIsIDU5KTtcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95RGl2cyhpZDpzdHJpbmcpe1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgaWYoZWxlbWVudCl7XG4gICAgICBlbGVtZW50LmlubmVySFRNTCA9ICcnXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNvbmZpcm1DbG9jaygpe1xuICAgIHRoaXMuaG91ciA9IHBhcnNlSW50KHRoaXMuaG91ckNsb2NrISlcbiAgICB0aGlzLm1pbnV0ZSA9IHBhcnNlSW50KHRoaXMubWludXRlQ2xvY2shKVxuICAgIHRoaXMuc2Vjb25kID0gcGFyc2VJbnQodGhpcy5zZWNvbmRDbG9jayEpXG4gICAgdGhpcy5mZWNoYXJNZW51KHRoaXMubWVudVRyaWdnZXIpO1xuICB9XG59XG4iXX0=