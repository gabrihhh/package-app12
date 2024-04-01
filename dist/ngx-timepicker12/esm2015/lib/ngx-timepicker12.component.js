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
NgxTimepicker12Component.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: NgxTimepicker12Component, selector: "ngx-timepicker", inputs: { width: "width", height: "height", font: "font", max: "max", response: "response", responseString: "responseString", needSeconds: "needSeconds", type: "type", cor: "cor", disabled: "disabled" }, outputs: { responseChange: "responseChange", responseStringChange: "responseStringChange" }, viewQueries: [{ propertyName: "menuTrigger", first: true, predicate: ["trigger"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdGltZXBpY2tlcjEyL3NyYy9saWIvbmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVwSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQTBHbEMsTUFBTSxPQUFPLHdCQUF3QjtJQThCbkM7UUE1QlMsVUFBSyxHQUFVLEdBQUcsQ0FBQztRQUNuQixXQUFNLEdBQVUsRUFBRSxDQUFDO1FBQ25CLFNBQUksR0FBVSxFQUFFLENBQUM7UUFDakIsUUFBRyxHQUFVLFVBQVUsQ0FBQztRQUN4QixhQUFRLEdBQWdCLElBQUksQ0FBQztRQUM3QixtQkFBYyxHQUFrQixJQUFJLENBQUM7UUFDckMsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIsU0FBSSxHQUFvRCxRQUFRLENBQUE7UUFDaEUsUUFBRyxHQUFVLFNBQVMsQ0FBQztRQUN2QixhQUFRLEdBQVcsS0FBSyxDQUFDO1FBRXhCLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN6Qyx5QkFBb0IsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2xELGFBQVEsR0FBVSxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQztRQUNwQyxjQUFTLEdBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUM7UUFDdEMsWUFBTyxHQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFBO1FBQ2pDLFNBQUksR0FBVSxDQUFDLENBQUM7UUFDaEIsV0FBTSxHQUFVLENBQUMsQ0FBQztRQUNsQixXQUFNLEdBQVUsQ0FBQyxDQUFDO1FBQ2xC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dUVDO3FCQUNGO2lCQUNGOzBFQUV1QixXQUFXO3NCQUFoQyxTQUFTO3VCQUFDLFNBQVM7Z0JBQ1gsS0FBSztzQkFBYixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFFSSxjQUFjO3NCQUF2QixNQUFNO2dCQUNHLG9CQUFvQjtzQkFBN0IsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRNZW51VHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xuaW1wb3J0IHsgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXRpbWVwaWNrZXInLFxuICB0ZW1wbGF0ZTogYFxuICA8ZGl2IFtzdHlsZS53aWR0aF09XCJ3aWR0aENzc1wiIFtzdHlsZS5oZWlnaHRdPVwiaGVpZ2h0Q3NzXCIgY2xhc3M9XCJ0aW1lcGlja2VyXCI+XG4gICAgPGRpdiBpZD1cImhvdXJcIiB0YWJpbmRleD1cIjFcIiAoYmx1cik9XCJsb3N0Rm9jdXMoKVwiIChmb2N1cyk9XCJmb2N1cygkZXZlbnQpXCIgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwic2VsZWN0ZWQ9PT0naG91cic/IGNvciA6ICd0cmFuc3BhcmVudCdcIiAoY2xpY2spPVwiZm9jdXMoJGV2ZW50KVwiPnt7aG91ci50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMuaG91cjp0aGlzLmhvdXJ9fTwvZGl2PlxuICAgIDxkaXY+OjwvZGl2PlxuICAgIDxkaXYgaWQ9XCJtaW51dGVcIiB0YWJpbmRleD1cIjFcIiAoYmx1cik9XCJsb3N0Rm9jdXMoKVwiIChmb2N1cyk9XCJmb2N1cygkZXZlbnQpXCIgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwic2VsZWN0ZWQ9PT0nbWludXRlJz8gY29yIDogJ3RyYW5zcGFyZW50J1wiIChjbGljayk9XCJmb2N1cygkZXZlbnQpXCI+e3ttaW51dGUudG9TdHJpbmcoKS5sZW5ndGg9PT0xPycwJyt0aGlzLm1pbnV0ZTp0aGlzLm1pbnV0ZX19PC9kaXY+XG4gICAgPGRpdiAqbmdJZj1cIm5lZWRTZWNvbmRzXCI+OjwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCJuZWVkU2Vjb25kc1wiIGlkPVwic2Vjb25kXCIgdGFiaW5kZXg9XCIxXCIgKGJsdXIpPVwibG9zdEZvY3VzKClcIiAoZm9jdXMpPVwiZm9jdXMoJGV2ZW50KVwiIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cInNlbGVjdGVkPT09J3NlY29uZCc/IGNvciA6ICd0cmFuc3BhcmVudCdcIiAoY2xpY2spPVwiZm9jdXMoJGV2ZW50KVwiPnt7c2Vjb25kLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5zZWNvbmQ6dGhpcy5zZWNvbmR9fTwvZGl2PlxuICAgIDxidXR0b24gKm5nSWY9XCIhZGlzYWJsZWRcIiBtYXQtYnV0dG9uIHN0eWxlPVwicGFkZGluZzoxMHB4O3Bvc2l0aW9uOnJlbGF0aXZlO2JvdHRvbToxcHhcIiBbbWF0TWVudVRyaWdnZXJGb3JdPVwiYWJvdmVNZW51XCIgI3RyaWdnZXI9XCJtYXRNZW51VHJpZ2dlclwiIGNsYXNzPVwiYnRuQ2xvY2tcIiAoY2xpY2spPVwicHJlZW5jaGVyRGl2cygpXCI+XG4gICAgICA8c3ZnIHdpZHRoPVwiMjBweFwiIGhlaWdodD1cIjIwcHhcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgc3R5bGU9XCJ3aWR0aDogMTdweDtcIj5cbiAgICAgICAgPHBhdGggZD1cIk0xMiA3VjEySDE1TTIxIDEyQzIxIDE2Ljk3MDYgMTYuOTcwNiAyMSAxMiAyMUM3LjAyOTQ0IDIxIDMgMTYuOTcwNiAzIDEyQzMgNy4wMjk0NCA3LjAyOTQ0IDMgMTIgM0MxNi45NzA2IDMgMjEgNy4wMjk0NCAyMSAxMlpcIiBzdHJva2U9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cbiAgICAgIDwvc3ZnPlxuICAgIDwvYnV0dG9uPlxuICAgIDxtYXQtbWVudSAjYWJvdmVNZW51PVwibWF0TWVudVwiIHlQb3NpdGlvbj1cImFib3ZlXCI+XG4gICAgPGRpdiBjbGFzcz1cIm1hdE1lbnVDbG9ja1wiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibnVtYmVyc1wiPlxuICAgICAgICA8ZGl2IGlkPVwiaG91ckNsb2NrXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgaWQ9XCJtaW51dGVDbG9ja1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGlkPVwic2Vjb25kQ2xvY2tcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImZvb3RlckNsb2NrXCI+XG4gICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gKm5nSWY9XCJtYXggIT09ICcyMzo1OTo1OSdcIiAoY2xpY2spPVwibWF4Q2xvY2soKVwiPk1heDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uICpuZ0lmPVwibWF4ID09ICcyMzo1OTo1OSdcIiAoY2xpY2spPVwibm93Q2xvY2soKVwiPk5vdzwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIFtkaXNhYmxlZF09XCJkaXNhYmxlQ2xvY2tcIiAoY2xpY2spPVwiY29uZmlybUNsb2NrKClcIj5PazwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPC9tYXQtbWVudT5cbiAgPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtcbiAgICBgLnRpbWVwaWNrZXJ7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgZ3JheTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LXdyYXA6IG5vd3JhcDtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB9XG4gICAgZGl2e1xuICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsgLyogU2FmYXJpICovXG4gICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lOyAvKiBGaXJlZm94ICovXG4gICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7IC8qIElFMTArL0VkZ2UgKi9cbiAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIH1cbiAgICBkaXY6Zm9jdXN7XG4gICAgICBvdXRsaW5lOm5vbmU7XG4gICAgfVxuICAgIC5idG5DbG9ja3tcbiAgICAgIG1hcmdpbjowIDVweDtcbiAgICAgIGhlaWdodDozMHB4O1xuICAgICAgbWluLXdpZHRoOjI1cHg7XG4gICAgICBkaXNwbGF5OmZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuICAgICAgYWxpZ24taXRlbXM6Y2VudGVyO1xuICAgIH1cbiAgICAuYnRuQ2xvY2t7XG4gICAgICBkaXNwbGF5OmZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuICAgICAgYWxpZ24taXRlbXM6Y2VudGVyO1xuICAgICAgbWluLWhlaWdodDoyNXB4O1xuICAgICAgaGVpZ2h0OjI1cHg7XG4gICAgfVxuICAgIC5tYXRNZW51Q2xvY2t7XG4gICAgICB3aWR0aDoxNTBweDtcbiAgICAgIGhlaWdodDoxNTBweDtcbiAgICAgIGRpc3BsYXk6ZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcbiAgICB9XG4gICAgLm51bWJlcnN7XG4gICAgICB3aWR0aDoxNTBweDtcbiAgICAgIGhlaWdodDoxMjBweDtcbiAgICAgIGRpc3BsYXk6ZmxleDtcbiAgICB9XG4gICAgLm51bWJlcnM+ZGl2e1xuICAgICAgd2lkdGg6NTBweDtcbiAgICAgIGhlaWdodDoxMjBweDtcbiAgICAgIGRpc3BsYXk6ZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcbiAgICAgIGFsaWduLWl0ZW1zOmNlbnRlcjtcbiAgICAgIG92ZXJmbG93OnNjcm9sbDtcbiAgICAgIHNjcm9sbGJhci13aWR0aDogbm9uZTtcbiAgICB9XG4gICAgLm51bWJlcnM+ZGl2Ojotd2Via2l0LXNjcm9sbGJhcntcbiAgICAgIGRpc3BsYXk6bm9uZTtcbiAgICB9XG4gICAgLmZvb3RlckNsb2Nre1xuICAgICAgd2lkdGg6MTUwcHg7XG4gICAgICBoZWlnaHQ6MzBweDtcbiAgICAgIGRpc3BsYXk6ZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmQ7XG4gICAgICBhbGlnbi1pdGVtczpjZW50ZXI7XG4gICAgICBidXR0b257XG4gICAgICAgIG1pbi13aWR0aDo1MHB4O1xuICAgICAgICBtaW4taGVpZ2h0OjIwcHg7XG4gICAgICAgIHdpZHRoOjUwcHg7XG4gICAgICAgIGhlaWdodDoyMHB4O1xuICAgICAgICBmb250LXNpemU6MTVweDtcbiAgICAgICAgZGlzcGxheTpmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczpjZW50ZXI7XG4gICAgICB9XG4gICAgfVxuICAgIGBcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUaW1lcGlja2VyMTJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsQWZ0ZXJWaWV3SW5pdCxPbkNoYW5nZXN7XG4gIEBWaWV3Q2hpbGQoJ3RyaWdnZXInKSBtZW51VHJpZ2dlciE6IE1hdE1lbnVUcmlnZ2VyO1xuICBASW5wdXQoKSB3aWR0aDpudW1iZXIgPSAxMzA7XG4gIEBJbnB1dCgpIGhlaWdodDpudW1iZXIgPSA0MDtcbiAgQElucHV0KCkgZm9udDpudW1iZXIgPSAxMDtcbiAgQElucHV0KCkgbWF4OnN0cmluZyA9ICcyMzo1OTo1OSc7XG4gIEBJbnB1dCgpIHJlc3BvbnNlOiBudW1iZXJ8bnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHJlc3BvbnNlU3RyaW5nOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbmVlZFNlY29uZHM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSB0eXBlOiAnbWlsaXNlY29uZCd8J3NlY29uZCd8J21pbnV0ZSd8ICdob3VyJyB8ICd0aW1lJyA9ICdzZWNvbmQnXG4gIEBJbnB1dCgpIGNvcjpzdHJpbmcgPSBcIiM0OGI5YzdcIjtcbiAgQElucHV0KCkgZGlzYWJsZWQ6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSByZXNwb25zZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgcmVzcG9uc2VTdHJpbmdDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgcHVibGljIHdpZHRoQ3NzOnN0cmluZyA9IGAke3RoaXMud2lkdGh9cHhgO1xuICBwdWJsaWMgaGVpZ2h0Q3NzOnN0cmluZyA9IGAke3RoaXMuaGVpZ2h0fXB4YDtcbiAgcHVibGljIGZvbnRDc3M6c3RyaW5nID0gYCR7dGhpcy5mb250fXB4YFxuICBwdWJsaWMgaG91cjpudW1iZXIgPSAwO1xuICBwdWJsaWMgbWludXRlOm51bWJlciA9IDA7XG4gIHB1YmxpYyBzZWNvbmQ6bnVtYmVyID0gMDtcbiAgcHVibGljIHNlbGVjdGVkOidob3VyJ3wnbWludXRlJ3wnc2Vjb25kJ3xudWxsID0gbnVsbDtcbiAgcHVibGljIG1heEhvdXI6bnVtYmVyID0gMFxuICBwdWJsaWMgbWF4TWludXRlOm51bWJlciA9IDBcbiAgcHVibGljIG1heFNlY29uZDpudW1iZXIgPSAwXG4gIHB1YmxpYyBkaXNhYmxlQ2xvY2s6Ym9vbGVhbiA9IHRydWU7XG4gIHB1YmxpYyBob3VyQ2xvY2s6c3RyaW5nfG51bGwgPSBudWxsO1xuICBwdWJsaWMgbWludXRlQ2xvY2s6c3RyaW5nfG51bGwgPSBudWxsO1xuICBwdWJsaWMgc2Vjb25kQ2xvY2s6c3RyaW5nfG51bGwgPSBudWxsO1xuICBwcml2YXRlIG5ld0lucHV0OmJvb2xlYW4gPSB0cnVlO1xuICBjb25zdHJ1Y3Rvcigpe1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYodGhpcy5tYXggIT0gJycpe1xuICAgICAgY29uc3QgYXJyYXlNYXggPSB0aGlzLm1heC5zcGxpdCgnOicpO1xuICAgICAgdGhpcy5tYXhIb3VyPXBhcnNlSW50KGFycmF5TWF4WzBdKVxuICAgICAgdGhpcy5tYXhNaW51dGU9cGFyc2VJbnQoYXJyYXlNYXhbMV0pXG4gICAgICB0aGlzLm1heFNlY29uZD1wYXJzZUludChhcnJheU1heFsyXSlcbiAgICB9XG4gICAgaWYodGhpcy5yZXNwb25zZVN0cmluZyl7XG4gICAgICB0aGlzLmluaXQodGhpcy5yZXNwb25zZVN0cmluZylcbiAgICB9XG4gICAgaWYodGhpcy5yZXNwb25zZSl7XG4gICAgICBsZXQgdGltZSA9IHRoaXMucmVzcG9uc2VcbiAgICAgIGlmKHRpbWU+MzYwMCl7XG4gICAgICAgIHRoaXMuaG91ciA9IE1hdGgucm91bmQodGltZS8zNjAwKVxuICAgICAgICB0aW1lIC09MzYwMCp0aGlzLmhvdXJcbiAgICAgIH1cbiAgICAgIGlmKHRpbWU+NjApe1xuICAgICAgICB0aGlzLm1pbnV0ZSA9IE1hdGgucm91bmQodGltZS82MClcbiAgICAgICAgdGltZSAtPTYwKnRoaXMubWludXRlXG4gICAgICB9XG4gICAgICBpZih0aW1lKXtcbiAgICAgICAgdGhpcy5zZWNvbmQgPSB0aW1lXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XG4gICAgLy8gVmVyaWZpY2Egc2UgJ3Jlc3BvbnNlU3RyaW5nJyBmb2kgYSBwcm9wcmllZGFkZSBxdWUgbXVkb3VcbiAgICBpZiAoY2hhbmdlc1sncmVzcG9uc2VTdHJpbmcnXSkge1xuICAgICAgLy8gY29uc3QgcHJldmlvdXNWYWx1ZSA9IGNoYW5nZXNbJ3Jlc3BvbnNlU3RyaW5nJ10ucHJldmlvdXNWYWx1ZTsgLS0tIGNhc28gcHJlY2lzZSBkbyB2YWxvciBhbnRlcyBkYSBtdWRhbsOnYSBkbyBpbnB1dFxuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY2hhbmdlc1sncmVzcG9uc2VTdHJpbmcnXS5jdXJyZW50VmFsdWU7XG4gICAgICBpZihjdXJyZW50VmFsdWUpe1xuICAgICAgICB0aGlzLmluaXQoY3VycmVudFZhbHVlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpbml0KHJlc3BvbnNlU3RyaW5nOlN0cmluZyl7XG4gICAgbGV0IGFycmF5ID0gcmVzcG9uc2VTdHJpbmcuc3BsaXQoJzonKTtcbiAgICAgICAgaWYodGhpcy5uZWVkU2Vjb25kcyl7XG4gICAgICAgICAgICB0aGlzLmhvdXIgPSBwYXJzZUludChhcnJheVswXSk7XG4gICAgICAgICAgICB0aGlzLm1pbnV0ZSA9IHBhcnNlSW50KGFycmF5WzFdKTtcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kID0gcGFyc2VJbnQoYXJyYXlbMl0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuaG91ciA9IHBhcnNlSW50KGFycmF5WzBdKTtcbiAgICAgICAgICAgIHRoaXMubWludXRlID0gcGFyc2VJbnQoYXJyYXlbMV0pO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgaWYoaXNOYU4odGhpcy5ob3VyKSB8fCBpc05hTih0aGlzLm1pbnV0ZSkgfHwgaXNOYU4odGhpcy5zZWNvbmQpKXtcbiAgICAgICAgICB0aGlzLmhvdXIgPSAwXG4gICAgICAgICAgdGhpcy5taW51dGUgPSAwXG4gICAgICAgICAgdGhpcy5zZWNvbmQgPSAwXG4gICAgICAgIH1cbiAgfVxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYoIXRoaXMuZGlzYWJsZWQpe1xuICAgICAgY29uc3QgaG91ciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob3VyJyk7XG4gICAgICBpZihob3VyKXtob3VyLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwifTtcbiAgICAgIGNvbnN0IG1pbnV0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaW51dGUnKTtcbiAgICAgIGlmKG1pbnV0ZSl7bWludXRlLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwifVxuICAgICAgY29uc3Qgc2Vjb25kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlY29uZCcpO1xuICAgICAgaWYoc2Vjb25kKXtzZWNvbmQuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCJ9XG4gICAgICBcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLChlKT0+e1xuICAgICAgICBpZihlLmNvZGUgPT0gJ1RhYicpe1xuICAgICAgICAgIHN3aXRjaCh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ21pbnV0ZSdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnc2Vjb25kJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG51bGxcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZS5jb2RlID09ICdBcnJvd1VwJyl7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHN3aXRjaCh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICB0aGlzLmhvdXIrK1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgdGhpcy5taW51dGUrK1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWNvbmQrK1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihlLmNvZGUgPT0gJ0Fycm93RG93bicpe1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgICAgaWYodGhpcy5ob3VyPT0wKXtcbiAgICAgICAgICAgICAgICB0aGlzLmhvdXI9dGhpcy5tYXhIb3VyXG4gICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuaG91ci0tXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICAgIGlmKHRoaXMubWludXRlPT0wKXtcbiAgICAgICAgICAgICAgICB0aGlzLm1pbnV0ZT01OVxuICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLm1pbnV0ZS0tXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICAgIGlmKHRoaXMuc2Vjb25kPT0wKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNlY29uZD01OVxuICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnNlY29uZC0tXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZS5jb2RlID09ICdBcnJvd1JpZ2h0Jyl7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHN3aXRjaCh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ21pbnV0ZSc7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ3NlY29uZCc7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGUuY29kZSA9PSAnQXJyb3dMZWZ0Jyl7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHN3aXRjaCh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnbWludXRlJztcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnaG91cic7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGUuY29kZSA9PSdCYWNrc3BhY2UnKXtcbiAgICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgICAgdGhpcy5hcGFnYXIoJ2hvdXInKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgdGhpcy5hcGFnYXIoJ21pbnV0ZScpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgICB0aGlzLmFwYWdhcignc2Vjb25kJylcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHN3aXRjaChlLmtleSl7XG4gICAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoMSx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoMix0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnMyc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoMyx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnNCc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoNCx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnNSc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoNSx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnNic6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoNix0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnNyc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoNyx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnOCc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoOCx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnOSc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoOSx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnMCc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoMCx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLm1pbnV0ZT41OSB8fCB0aGlzLm1pbnV0ZTwwKXtcbiAgICAgICAgICB0aGlzLm1pbnV0ZSA9IDBcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnNlY29uZD41OSB8fCB0aGlzLnNlY29uZDwwKXtcbiAgICAgICAgICB0aGlzLnNlY29uZCA9IDBcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmhvdXI8MCl7XG4gICAgICAgICAgdGhpcy5ob3VyID0gMFxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuaG91cj50aGlzLm1heEhvdXIpe1xuICAgICAgICAgIHRoaXMuaG91ciA9IHRoaXMubWF4SG91clxuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUoKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbG9zdEZvY3VzKCl7XG4gICAgdGhpcy5zZWxlY3RlZCA9IG51bGxcbiAgfVxuXG4gIHB1YmxpYyBmb2N1cygkZXZlbnQ6YW55KXtcbiAgICBpZighdGhpcy5kaXNhYmxlZCl7XG4gICAgICBzd2l0Y2goJGV2ZW50LnRhcmdldC5pZCl7XG4gICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnaG91cic7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ21pbnV0ZSc7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ3NlY29uZCc7XG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXBhZ2FyKGxvY2FsOiAnaG91cid8J21pbnV0ZSd8J3NlY29uZCd8bnVsbCkge1xuICAgIGlmKGxvY2FsKXtcbiAgICAgIGlmKGxvY2FsPT0naG91cicpe1xuICAgICAgICBsZXQgaG9yYSA9IHRoaXMuaG91ci50b1N0cmluZygpLnNwbGl0KCcnKTtcbiAgICAgICAgaWYoaG9yYS5sZW5ndGg+MSl7XG4gICAgICAgICAgbGV0IHJldGlyYWRvID0gaG9yYS5wb3AoKTtcbiAgICAgICAgdGhpcy5ob3VyID0gIHBhcnNlSW50KGhvcmEuam9pbignJykpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuaG91ciA9IDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYobG9jYWw9PSdtaW51dGUnKXtcbiAgICAgICAgbGV0IG1pbnV0byA9IHRoaXMubWludXRlLnRvU3RyaW5nKCkuc3BsaXQoJycpO1xuICAgICAgICBpZihtaW51dG8ubGVuZ3RoPjEpe1xuICAgICAgICBsZXQgcmV0aXJhZG8gPSBtaW51dG8ucG9wKCk7XG4gICAgICAgIHRoaXMubWludXRlID0gIHBhcnNlSW50KG1pbnV0by5qb2luKCcnKSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMubWludXRlID0gMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihsb2NhbD09J3NlY29uZCcpe1xuICAgICAgICBsZXQgc2VndW5kbyA9IHRoaXMuc2Vjb25kLnRvU3RyaW5nKCkuc3BsaXQoJycpO1xuICAgICAgICBpZihzZWd1bmRvLmxlbmd0aD4xKXtcbiAgICAgICAgbGV0IHJldGlyYWRvID0gc2VndW5kby5wb3AoKTtcbiAgICAgICAgdGhpcy5zZWNvbmQgPSAgcGFyc2VJbnQoc2VndW5kby5qb2luKCcnKSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5zZWNvbmQgPSAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGlnaXRhcihudW06bnVtYmVyLGxvY2FsOidob3VyJ3wnbWludXRlJ3wnc2Vjb25kJ3xudWxsKXtcbiAgICBpZihsb2NhbCl7XG4gICAgICBpZihsb2NhbD09J2hvdXInKXtcbiAgICAgICAgaWYodGhpcy5uZXdJbnB1dCl7XG4gICAgICAgICAgdGhpcy5ob3VyPXBhcnNlSW50KCcwJytudW0pXG4gICAgICAgICAgdGhpcy5uZXdJbnB1dCA9IGZhbHNlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLmhvdXI9cGFyc2VJbnQodGhpcy5ob3VyLnRvU3RyaW5nKCkrbnVtKVxuICAgICAgICAgIGlmKHRoaXMuaG91ci50b1N0cmluZygpLmxlbmd0aCA9PSB0aGlzLm1heEhvdXIudG9TdHJpbmcoKS5sZW5ndGgpe1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdtaW51dGUnO1xuICAgICAgICAgICAgdGhpcy5uZXdJbnB1dD10cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihsb2NhbD09J21pbnV0ZScpe1xuICAgICAgICBpZih0aGlzLm5ld0lucHV0KXtcbiAgICAgICAgICB0aGlzLm1pbnV0ZT1wYXJzZUludCgnMCcrbnVtKVxuICAgICAgICAgIHRoaXMubmV3SW5wdXQgPSBmYWxzZVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLm1pbnV0ZT1wYXJzZUludCh0aGlzLm1pbnV0ZS50b1N0cmluZygpK251bSlcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ3NlY29uZCc7XG4gICAgICAgICAgdGhpcy5uZXdJbnB1dD10cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGxvY2FsPT0nc2Vjb25kJyl7XG4gICAgICAgIGlmKHRoaXMubmV3SW5wdXQpe1xuICAgICAgICAgIHRoaXMuc2Vjb25kPXBhcnNlSW50KCcwJytudW0pXG4gICAgICAgICAgdGhpcy5uZXdJbnB1dCA9IGZhbHNlXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuc2Vjb25kPXBhcnNlSW50KHRoaXMuc2Vjb25kLnRvU3RyaW5nKCkrbnVtKVxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgICAgIHRoaXMubmV3SW5wdXQ9dHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGVycm9yKCl7XG4gICAgcmV0dXJuIHRocm93RXJyb3IoKCk9PiBuZXcgRXJyb3IoJ1RoZSB0aW1lIGlzIGJpZ2dlciB0aGVuIG1heCB0aW1lOldhcyBzZXQgdGhlIG1heCB0aW1lJykpXG4gIH1cblxuICBwdWJsaWMgdXBkYXRlVmFsdWUoKTogdm9pZCB7XG4gICAgaWYodGhpcy5ob3VyPnRoaXMubWF4SG91cil7XG4gICAgICB0aGlzLmhvdXIgPSB0aGlzLm1heEhvdXI7XG4gICAgICB0aGlzLmVycm9yKClcbiAgICB9XG4gICAgaWYodGhpcy5ob3VyPT10aGlzLm1heEhvdXIgJiYgdGhpcy5taW51dGU+dGhpcy5tYXhNaW51dGUpe1xuICAgICAgdGhpcy5taW51dGU9dGhpcy5tYXhNaW51dGVcbiAgICAgIHRoaXMuZXJyb3IoKVxuICAgIH1cbiAgICBpZih0aGlzLmhvdXI9PXRoaXMubWF4SG91ciAmJiB0aGlzLm1pbnV0ZT09dGhpcy5tYXhNaW51dGUgJiYgdGhpcy5zZWNvbmQ+dGhpcy5tYXhTZWNvbmQpe1xuICAgICAgdGhpcy5zZWNvbmQ9dGhpcy5tYXhTZWNvbmRcbiAgICAgIHRoaXMuZXJyb3IoKVxuICAgIH1cbiAgICBzd2l0Y2godGhpcy50eXBlKXtcbiAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhU2VndW5kbyA9ICgodGhpcy5ob3VyKjYwKSt0aGlzLm1pbnV0ZSkqNjArdGhpcy5zZWNvbmRcbiAgICAgICAgdGhpcy5yZXNwb25zZUNoYW5nZS5lbWl0KHJlc3Bvc3RhU2VndW5kbyk7XG4gICAgICAgIHRoaXMucmVzcG9uc2VTdHJpbmdDaGFuZ2UuZW1pdChyZXNwb3N0YVNlZ3VuZG8udG9TdHJpbmcoKSk7XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICBjb25zdCByZXNwb3N0YU1pbnV0byA9ICgodGhpcy5ob3VyKjYwKStNYXRoLmZsb29yKHRoaXMuc2Vjb25kLzYwKSkrdGhpcy5taW51dGVcbiAgICAgICAgdGhpcy5yZXNwb25zZUNoYW5nZS5lbWl0KHJlc3Bvc3RhTWludXRvKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhTWludXRvLnRvU3RyaW5nKCkpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdtaWxpc2Vjb25kJzpcbiAgICAgICAgY29uc3QgcmVzcG9zdGFNaWxpc2VndW5kbyA9ICgoKHRoaXMuaG91cio2MCkrdGhpcy5taW51dGUpKjYwK3RoaXMuc2Vjb25kKSoxMDAwO1xuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFNaWxpc2VndW5kbyk7XG4gICAgICAgIHRoaXMucmVzcG9uc2VTdHJpbmdDaGFuZ2UuZW1pdChyZXNwb3N0YU1pbGlzZWd1bmRvLnRvU3RyaW5nKCkpO1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhSG9yYSA9IE1hdGguZmxvb3IoKE1hdGguZmxvb3IodGhpcy5zZWNvbmQvNjApK3RoaXMubWludXRlKS82MCkrdGhpcy5ob3VyO1xuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFIb3JhKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhSG9yYS50b1N0cmluZygpKTtcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICBjb25zdCByZXNwb3N0YSA9IGAke3RoaXMuaG91ci50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMuaG91cjp0aGlzLmhvdXJ9OiR7dGhpcy5taW51dGUudG9TdHJpbmcoKS5sZW5ndGg9PT0xPycwJyt0aGlzLm1pbnV0ZTp0aGlzLm1pbnV0ZX06JHt0aGlzLnNlY29uZC50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMuc2Vjb25kOnRoaXMuc2Vjb25kfWBcbiAgICAgICAgY29uc3QgcmVzcG9zdGFTZXBhcmFkYSA9IHtcbiAgICAgICAgICBob3VyOnRoaXMuaG91cixcbiAgICAgICAgICBtaW51dGU6dGhpcy5taW51dGUsXG4gICAgICAgICAgc2Vjb25kOnRoaXMuc2Vjb25kXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZUNoYW5nZS5lbWl0KHJlc3Bvc3RhU2VwYXJhZGEpO1xuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBtYXhDbG9jaygpe1xuICAgIHRoaXMuaG91ciA9IHRoaXMubWF4SG91cjtcbiAgICB0aGlzLm1pbnV0ZSA9IHRoaXMubWF4TWludXRlO1xuICAgIHRoaXMuc2Vjb25kID0gdGhpcy5tYXhTZWNvbmQ7XG4gICAgdGhpcy5mZWNoYXJNZW51KHRoaXMubWVudVRyaWdnZXIpO1xuICB9XG5cbiAgcHVibGljIG5vd0Nsb2NrKCl7XG4gICAgY29uc3QgYWdvcmEgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGhvcmFzID0gYWdvcmEuZ2V0SG91cnMoKTtcbiAgICBjb25zdCBtaW51dG9zID0gYWdvcmEuZ2V0TWludXRlcygpO1xuICAgIGNvbnN0IHNlZ3VuZG9zID0gYWdvcmEuZ2V0U2Vjb25kcygpO1xuXG4gICAgdGhpcy5ob3VyID0gaG9yYXM7XG4gICAgdGhpcy5taW51dGUgPSBtaW51dG9zO1xuICAgIHRoaXMuc2Vjb25kID0gc2VndW5kb3M7XG4gICAgdGhpcy5mZWNoYXJNZW51KHRoaXMubWVudVRyaWdnZXIpO1xuICB9XG5cbiAgcHVibGljIGZlY2hhck1lbnUodHJpZ2dlcjpNYXRNZW51VHJpZ2dlcikge1xuICAgIHRoaXMuZGlzYWJsZUNsb2NrID0gdHJ1ZVxuICAgIHRyaWdnZXIuY2xvc2VNZW51KCk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZSgpO1xuICB9XG5cbiAgcHVibGljIHByZWVuY2hlckRpdnMoKSB7XG4gICAgdGhpcy5kaXNhYmxlQ2xvY2sgPSB0cnVlO1xuICAgIHRoaXMuaG91ckNsb2NrID0gbnVsbDtcbiAgICB0aGlzLm1pbnV0ZUNsb2NrID0gbnVsbDtcbiAgICB0aGlzLnNlY29uZENsb2NrID0gbnVsbDtcbiAgICB0aGlzLmRlc3Ryb3lEaXZzKCdob3VyQ2xvY2snKVxuICAgIHRoaXMuZGVzdHJveURpdnMoJ21pbnV0ZUNsb2NrJylcbiAgICB0aGlzLmRlc3Ryb3lEaXZzKCdzZWNvbmRDbG9jaycpXG4gICAgY29uc3QgY3JpYXJEaXZzID0gKHBhcmVudEVsZW1lbnRJZDogc3RyaW5nLCBpZDogbnVtYmVyLCBsaW1pdGU6IG51bWJlcikgPT4ge1xuXG4gICAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyZW50RWxlbWVudElkKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gbGltaXRlOyBpKyspIHtcbiAgICAgICAgY29uc3QgbnVtYmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG51bWJlckRpdi50ZXh0Q29udGVudCA9IGkgPCAxMCA/IGAwJHtpfWAgOiBgJHtpfWA7XG4gICAgICAgIG51bWJlckRpdi5zdHlsZS5ib3JkZXJCb3R0b20gPSBcIjFweCBzb2xpZCBibGFja1wiO1xuICAgICAgICBudW1iZXJEaXYuc3R5bGUucGFkZGluZyA9IFwiNXB4IDEwcHhcIjtcbiAgICAgICAgbnVtYmVyRGl2LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgICBudW1iZXJEaXYuc3R5bGUubWFyZ2luID0gXCIycHhcIjtcblxuICAgICAgICBsZXQgY2xhc3NJZGVudGlmaWVyID0gJyc7XG4gICAgICAgIHN3aXRjaChpZCkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNsYXNzSWRlbnRpZmllciA9ICdudW1Ib3VyQ2xvY2snO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY2xhc3NJZGVudGlmaWVyID0gJ251bU1pbnV0ZUNsb2NrJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNsYXNzSWRlbnRpZmllciA9ICdudW1TZWNvbmRDbG9jayc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBudW1iZXJEaXYuY2xhc3NMaXN0LmFkZChjbGFzc0lkZW50aWZpZXIpO1xuXG4gICAgICAgIG51bWJlckRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBhbGxTaWJsaW5ncyA9IHBhcmVudEVsZW1lbnQhLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2NsYXNzSWRlbnRpZmllcn1gKTtcbiAgICAgICAgICBhbGxTaWJsaW5ncy5mb3JFYWNoKHNpYmxpbmcgPT4ge1xuICAgICAgICAgICAgaWYgKHNpYmxpbmcgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICBzaWJsaW5nLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZihjbGFzc0lkZW50aWZpZXIgPT09ICdudW1Ib3VyQ2xvY2snKSB0aGlzLmhvdXJDbG9jayA9IG51bWJlckRpdi50ZXh0Q29udGVudDtcbiAgICAgICAgICBpZihjbGFzc0lkZW50aWZpZXIgPT09ICdudW1NaW51dGVDbG9jaycpIHRoaXMubWludXRlQ2xvY2sgPSBudW1iZXJEaXYudGV4dENvbnRlbnQ7XG4gICAgICAgICAgaWYoY2xhc3NJZGVudGlmaWVyID09PSAnbnVtU2Vjb25kQ2xvY2snKSB0aGlzLnNlY29uZENsb2NrID0gbnVtYmVyRGl2LnRleHRDb250ZW50O1xuXG4gICAgICAgICAgbnVtYmVyRGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRibHVlXCI7XG5cbiAgICAgICAgICBpZih0aGlzLmhvdXJDbG9jayAmJiB0aGlzLm1pbnV0ZUNsb2NrICYmIHRoaXMuc2Vjb25kQ2xvY2spe1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlQ2xvY2sgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBhcmVudEVsZW1lbnQhLmFwcGVuZENoaWxkKG51bWJlckRpdik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNyaWFyRGl2cygnaG91ckNsb2NrJywgMCwgdGhpcy5tYXhIb3VyKTtcbiAgICBjcmlhckRpdnMoJ21pbnV0ZUNsb2NrJywgMSwgNTkpO1xuICAgIGNyaWFyRGl2cygnc2Vjb25kQ2xvY2snLCAyLCA1OSk7XG4gIH1cblxuICBwdWJsaWMgZGVzdHJveURpdnMoaWQ6c3RyaW5nKXtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGlmKGVsZW1lbnQpe1xuICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSAnJ1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjb25maXJtQ2xvY2soKXtcbiAgICB0aGlzLmhvdXIgPSBwYXJzZUludCh0aGlzLmhvdXJDbG9jayEpXG4gICAgdGhpcy5taW51dGUgPSBwYXJzZUludCh0aGlzLm1pbnV0ZUNsb2NrISlcbiAgICB0aGlzLnNlY29uZCA9IHBhcnNlSW50KHRoaXMuc2Vjb25kQ2xvY2shKVxuICAgIHRoaXMuZmVjaGFyTWVudSh0aGlzLm1lbnVUcmlnZ2VyKTtcbiAgfVxufVxuIl19