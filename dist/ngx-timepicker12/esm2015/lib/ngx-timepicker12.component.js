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
        if (changes['disabled']) {
            // const previousValue = changes['responseString'].previousValue; --- caso precise do valor antes da mudança do input
            const currentValue = changes['disabled'].currentValue;
            this.disabled = currentValue;
            const hour = document.getElementById('hour');
            const minute = document.getElementById('minute');
            const second = document.getElementById('second');
            if (!this.disabled) {
                if (hour) {
                    hour.style.cursor = "pointer";
                }
                ;
                if (minute) {
                    minute.style.cursor = "pointer";
                }
                if (second) {
                    second.style.cursor = "pointer";
                }
            }
            else {
                if (hour) {
                    hour.style.cursor = "auto";
                }
                ;
                if (minute) {
                    minute.style.cursor = "auto";
                }
                if (second) {
                    second.style.cursor = "auto";
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdGltZXBpY2tlcjEyL3NyYy9saWIvbmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVwSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQTBHbEMsTUFBTSxPQUFPLHdCQUF3QjtJQThCbkM7UUE1QlMsVUFBSyxHQUFVLEdBQUcsQ0FBQztRQUNuQixXQUFNLEdBQVUsRUFBRSxDQUFDO1FBQ25CLFNBQUksR0FBVSxFQUFFLENBQUM7UUFDakIsUUFBRyxHQUFVLFVBQVUsQ0FBQztRQUN4QixhQUFRLEdBQWdCLElBQUksQ0FBQztRQUM3QixtQkFBYyxHQUFrQixJQUFJLENBQUM7UUFDckMsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIsU0FBSSxHQUFvRCxRQUFRLENBQUE7UUFDaEUsUUFBRyxHQUFVLFNBQVMsQ0FBQztRQUN2QixhQUFRLEdBQVcsS0FBSyxDQUFDO1FBRXhCLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN6Qyx5QkFBb0IsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2xELGFBQVEsR0FBVSxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQztRQUNwQyxjQUFTLEdBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUM7UUFDdEMsWUFBTyxHQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFBO1FBQ2pDLFNBQUksR0FBVSxDQUFDLENBQUM7UUFDaEIsV0FBTSxHQUFVLENBQUMsQ0FBQztRQUNsQixXQUFNLEdBQVUsQ0FBQyxDQUFDO1FBQ2xC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QUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFZLENBQUMsQ0FBQTtRQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNwQyxDQUFDOztzSEFwZVUsd0JBQXdCOzBHQUF4Qix3QkFBd0IsNGRBdkd6Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBMkJYOzRGQTRFWSx3QkFBd0I7a0JBekdwQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBMkJYO29CQUNDLE1BQU0sRUFBRTt3QkFDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F1RUM7cUJBQ0Y7aUJBQ0Y7MEVBRXVCLFdBQVc7c0JBQWhDLFNBQVM7dUJBQUMsU0FBUztnQkFDWCxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVJLGNBQWM7c0JBQXZCLE1BQU07Z0JBQ0csb0JBQW9CO3NCQUE3QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdE1lbnVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbWVudSc7XG5pbXBvcnQgeyB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtdGltZXBpY2tlcicsXG4gIHRlbXBsYXRlOiBgXG4gIDxkaXYgW3N0eWxlLndpZHRoXT1cIndpZHRoQ3NzXCIgW3N0eWxlLmhlaWdodF09XCJoZWlnaHRDc3NcIiBjbGFzcz1cInRpbWVwaWNrZXJcIj5cbiAgICA8ZGl2IGlkPVwiaG91clwiIHRhYmluZGV4PVwiMVwiIChibHVyKT1cImxvc3RGb2N1cygpXCIgKGZvY3VzKT1cImZvY3VzKCRldmVudClcIiBbc3R5bGUuYmFja2dyb3VuZC1jb2xvcl09XCJzZWxlY3RlZD09PSdob3VyJz8gY29yIDogJ3RyYW5zcGFyZW50J1wiIChjbGljayk9XCJmb2N1cygkZXZlbnQpXCI+e3tob3VyLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5ob3VyOnRoaXMuaG91cn19PC9kaXY+XG4gICAgPGRpdj46PC9kaXY+XG4gICAgPGRpdiBpZD1cIm1pbnV0ZVwiIHRhYmluZGV4PVwiMVwiIChibHVyKT1cImxvc3RGb2N1cygpXCIgKGZvY3VzKT1cImZvY3VzKCRldmVudClcIiBbc3R5bGUuYmFja2dyb3VuZC1jb2xvcl09XCJzZWxlY3RlZD09PSdtaW51dGUnPyBjb3IgOiAndHJhbnNwYXJlbnQnXCIgKGNsaWNrKT1cImZvY3VzKCRldmVudClcIj57e21pbnV0ZS50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMubWludXRlOnRoaXMubWludXRlfX08L2Rpdj5cbiAgICA8ZGl2ICpuZ0lmPVwibmVlZFNlY29uZHNcIj46PC9kaXY+XG4gICAgPGRpdiAqbmdJZj1cIm5lZWRTZWNvbmRzXCIgaWQ9XCJzZWNvbmRcIiB0YWJpbmRleD1cIjFcIiAoYmx1cik9XCJsb3N0Rm9jdXMoKVwiIChmb2N1cyk9XCJmb2N1cygkZXZlbnQpXCIgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwic2VsZWN0ZWQ9PT0nc2Vjb25kJz8gY29yIDogJ3RyYW5zcGFyZW50J1wiIChjbGljayk9XCJmb2N1cygkZXZlbnQpXCI+e3tzZWNvbmQudG9TdHJpbmcoKS5sZW5ndGg9PT0xPycwJyt0aGlzLnNlY29uZDp0aGlzLnNlY29uZH19PC9kaXY+XG4gICAgPGJ1dHRvbiAqbmdJZj1cIiFkaXNhYmxlZFwiIG1hdC1idXR0b24gc3R5bGU9XCJwYWRkaW5nOjEwcHg7cG9zaXRpb246cmVsYXRpdmU7Ym90dG9tOjFweFwiIFttYXRNZW51VHJpZ2dlckZvcl09XCJhYm92ZU1lbnVcIiAjdHJpZ2dlcj1cIm1hdE1lbnVUcmlnZ2VyXCIgY2xhc3M9XCJidG5DbG9ja1wiIChjbGljayk9XCJwcmVlbmNoZXJEaXZzKClcIj5cbiAgICAgIDxzdmcgd2lkdGg9XCIyMHB4XCIgaGVpZ2h0PVwiMjBweFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBzdHlsZT1cIndpZHRoOiAxN3B4O1wiPlxuICAgICAgICA8cGF0aCBkPVwiTTEyIDdWMTJIMTVNMjEgMTJDMjEgMTYuOTcwNiAxNi45NzA2IDIxIDEyIDIxQzcuMDI5NDQgMjEgMyAxNi45NzA2IDMgMTJDMyA3LjAyOTQ0IDcuMDI5NDQgMyAxMiAzQzE2Ljk3MDYgMyAyMSA3LjAyOTQ0IDIxIDEyWlwiIHN0cm9rZT1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIvPlxuICAgICAgPC9zdmc+XG4gICAgPC9idXR0b24+XG4gICAgPG1hdC1tZW51ICNhYm92ZU1lbnU9XCJtYXRNZW51XCIgeVBvc2l0aW9uPVwiYWJvdmVcIj5cbiAgICA8ZGl2IGNsYXNzPVwibWF0TWVudUNsb2NrXCIgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJudW1iZXJzXCI+XG4gICAgICAgIDxkaXYgaWQ9XCJob3VyQ2xvY2tcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBpZD1cIm1pbnV0ZUNsb2NrXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgaWQ9XCJzZWNvbmRDbG9ja1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyQ2xvY2tcIj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiAqbmdJZj1cIm1heCAhPT0gJzIzOjU5OjU5J1wiIChjbGljayk9XCJtYXhDbG9jaygpXCI+TWF4PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gKm5nSWY9XCJtYXggPT0gJzIzOjU5OjU5J1wiIChjbGljayk9XCJub3dDbG9jaygpXCI+Tm93PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gW2Rpc2FibGVkXT1cImRpc2FibGVDbG9ja1wiIChjbGljayk9XCJjb25maXJtQ2xvY2soKVwiPk9rPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8L21hdC1tZW51PlxuICA8L2Rpdj5cbmAsXG4gIHN0eWxlczogW1xuICAgIGAudGltZXBpY2tlcntcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBncmF5O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtd3JhcDogbm93cmFwO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIH1cbiAgICBkaXZ7XG4gICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lOyAvKiBTYWZhcmkgKi9cbiAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7IC8qIEZpcmVmb3ggKi9cbiAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTsgLyogSUUxMCsvRWRnZSAqL1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgfVxuICAgIGRpdjpmb2N1c3tcbiAgICAgIG91dGxpbmU6bm9uZTtcbiAgICB9XG4gICAgLmJ0bkNsb2Nre1xuICAgICAgbWFyZ2luOjAgNXB4O1xuICAgICAgaGVpZ2h0OjMwcHg7XG4gICAgICBtaW4td2lkdGg6MjVweDtcbiAgICAgIGRpc3BsYXk6ZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDpjZW50ZXI7XG4gICAgICBhbGlnbi1pdGVtczpjZW50ZXI7XG4gICAgfVxuICAgIC5idG5DbG9ja3tcbiAgICAgIGRpc3BsYXk6ZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDpjZW50ZXI7XG4gICAgICBhbGlnbi1pdGVtczpjZW50ZXI7XG4gICAgICBtaW4taGVpZ2h0OjI1cHg7XG4gICAgICBoZWlnaHQ6MjVweDtcbiAgICB9XG4gICAgLm1hdE1lbnVDbG9ja3tcbiAgICAgIHdpZHRoOjE1MHB4O1xuICAgICAgaGVpZ2h0OjE1MHB4O1xuICAgICAgZGlzcGxheTpmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246Y29sdW1uO1xuICAgIH1cbiAgICAubnVtYmVyc3tcbiAgICAgIHdpZHRoOjE1MHB4O1xuICAgICAgaGVpZ2h0OjEyMHB4O1xuICAgICAgZGlzcGxheTpmbGV4O1xuICAgIH1cbiAgICAubnVtYmVycz5kaXZ7XG4gICAgICB3aWR0aDo1MHB4O1xuICAgICAgaGVpZ2h0OjEyMHB4O1xuICAgICAgZGlzcGxheTpmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246Y29sdW1uO1xuICAgICAgYWxpZ24taXRlbXM6Y2VudGVyO1xuICAgICAgb3ZlcmZsb3c6c2Nyb2xsO1xuICAgICAgc2Nyb2xsYmFyLXdpZHRoOiBub25lO1xuICAgIH1cbiAgICAubnVtYmVycz5kaXY6Oi13ZWJraXQtc2Nyb2xsYmFye1xuICAgICAgZGlzcGxheTpub25lO1xuICAgIH1cbiAgICAuZm9vdGVyQ2xvY2t7XG4gICAgICB3aWR0aDoxNTBweDtcbiAgICAgIGhlaWdodDozMHB4O1xuICAgICAgZGlzcGxheTpmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZDtcbiAgICAgIGFsaWduLWl0ZW1zOmNlbnRlcjtcbiAgICAgIGJ1dHRvbntcbiAgICAgICAgbWluLXdpZHRoOjUwcHg7XG4gICAgICAgIG1pbi1oZWlnaHQ6MjBweDtcbiAgICAgICAgd2lkdGg6NTBweDtcbiAgICAgICAgaGVpZ2h0OjIwcHg7XG4gICAgICAgIGZvbnQtc2l6ZToxNXB4O1xuICAgICAgICBkaXNwbGF5OmZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDpjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOmNlbnRlcjtcbiAgICAgIH1cbiAgICB9XG4gICAgYFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neFRpbWVwaWNrZXIxMkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCxBZnRlclZpZXdJbml0LE9uQ2hhbmdlc3tcbiAgQFZpZXdDaGlsZCgndHJpZ2dlcicpIG1lbnVUcmlnZ2VyITogTWF0TWVudVRyaWdnZXI7XG4gIEBJbnB1dCgpIHdpZHRoOm51bWJlciA9IDEzMDtcbiAgQElucHV0KCkgaGVpZ2h0Om51bWJlciA9IDQwO1xuICBASW5wdXQoKSBmb250Om51bWJlciA9IDEwO1xuICBASW5wdXQoKSBtYXg6c3RyaW5nID0gJzIzOjU5OjU5JztcbiAgQElucHV0KCkgcmVzcG9uc2U6IG51bWJlcnxudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcmVzcG9uc2VTdHJpbmc6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuZWVkU2Vjb25kczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHR5cGU6ICdtaWxpc2Vjb25kJ3wnc2Vjb25kJ3wnbWludXRlJ3wgJ2hvdXInIHwgJ3RpbWUnID0gJ3NlY29uZCdcbiAgQElucHV0KCkgY29yOnN0cmluZyA9IFwiIzQ4YjljN1wiO1xuICBASW5wdXQoKSBkaXNhYmxlZDpib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHJlc3BvbnNlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSByZXNwb25zZVN0cmluZ0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBwdWJsaWMgd2lkdGhDc3M6c3RyaW5nID0gYCR7dGhpcy53aWR0aH1weGA7XG4gIHB1YmxpYyBoZWlnaHRDc3M6c3RyaW5nID0gYCR7dGhpcy5oZWlnaHR9cHhgO1xuICBwdWJsaWMgZm9udENzczpzdHJpbmcgPSBgJHt0aGlzLmZvbnR9cHhgXG4gIHB1YmxpYyBob3VyOm51bWJlciA9IDA7XG4gIHB1YmxpYyBtaW51dGU6bnVtYmVyID0gMDtcbiAgcHVibGljIHNlY29uZDpudW1iZXIgPSAwO1xuICBwdWJsaWMgc2VsZWN0ZWQ6J2hvdXInfCdtaW51dGUnfCdzZWNvbmQnfG51bGwgPSBudWxsO1xuICBwdWJsaWMgbWF4SG91cjpudW1iZXIgPSAwXG4gIHB1YmxpYyBtYXhNaW51dGU6bnVtYmVyID0gMFxuICBwdWJsaWMgbWF4U2Vjb25kOm51bWJlciA9IDBcbiAgcHVibGljIGRpc2FibGVDbG9jazpib29sZWFuID0gdHJ1ZTtcbiAgcHVibGljIGhvdXJDbG9jazpzdHJpbmd8bnVsbCA9IG51bGw7XG4gIHB1YmxpYyBtaW51dGVDbG9jazpzdHJpbmd8bnVsbCA9IG51bGw7XG4gIHB1YmxpYyBzZWNvbmRDbG9jazpzdHJpbmd8bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgbmV3SW5wdXQ6Ym9vbGVhbiA9IHRydWU7XG4gIGNvbnN0cnVjdG9yKCl7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZih0aGlzLm1heCAhPSAnJyl7XG4gICAgICBjb25zdCBhcnJheU1heCA9IHRoaXMubWF4LnNwbGl0KCc6Jyk7XG4gICAgICB0aGlzLm1heEhvdXI9cGFyc2VJbnQoYXJyYXlNYXhbMF0pXG4gICAgICB0aGlzLm1heE1pbnV0ZT1wYXJzZUludChhcnJheU1heFsxXSlcbiAgICAgIHRoaXMubWF4U2Vjb25kPXBhcnNlSW50KGFycmF5TWF4WzJdKVxuICAgIH1cbiAgICBpZih0aGlzLnJlc3BvbnNlU3RyaW5nKXtcbiAgICAgIHRoaXMuaW5pdCh0aGlzLnJlc3BvbnNlU3RyaW5nKVxuICAgIH1cbiAgICBpZih0aGlzLnJlc3BvbnNlKXtcbiAgICAgIGxldCB0aW1lID0gdGhpcy5yZXNwb25zZVxuICAgICAgaWYodGltZT4zNjAwKXtcbiAgICAgICAgdGhpcy5ob3VyID0gTWF0aC5yb3VuZCh0aW1lLzM2MDApXG4gICAgICAgIHRpbWUgLT0zNjAwKnRoaXMuaG91clxuICAgICAgfVxuICAgICAgaWYodGltZT42MCl7XG4gICAgICAgIHRoaXMubWludXRlID0gTWF0aC5yb3VuZCh0aW1lLzYwKVxuICAgICAgICB0aW1lIC09NjAqdGhpcy5taW51dGVcbiAgICAgIH1cbiAgICAgIGlmKHRpbWUpe1xuICAgICAgICB0aGlzLnNlY29uZCA9IHRpbWVcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcbiAgICAvLyBWZXJpZmljYSBzZSAncmVzcG9uc2VTdHJpbmcnIGZvaSBhIHByb3ByaWVkYWRlIHF1ZSBtdWRvdVxuICAgIGlmIChjaGFuZ2VzWydyZXNwb25zZVN0cmluZyddKSB7XG4gICAgICAvLyBjb25zdCBwcmV2aW91c1ZhbHVlID0gY2hhbmdlc1sncmVzcG9uc2VTdHJpbmcnXS5wcmV2aW91c1ZhbHVlOyAtLS0gY2FzbyBwcmVjaXNlIGRvIHZhbG9yIGFudGVzIGRhIG11ZGFuw6dhIGRvIGlucHV0XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBjaGFuZ2VzWydyZXNwb25zZVN0cmluZyddLmN1cnJlbnRWYWx1ZTtcbiAgICAgIGlmKGN1cnJlbnRWYWx1ZSl7XG4gICAgICAgIHRoaXMuaW5pdChjdXJyZW50VmFsdWUpXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydkaXNhYmxlZCddKSB7XG4gICAgICAvLyBjb25zdCBwcmV2aW91c1ZhbHVlID0gY2hhbmdlc1sncmVzcG9uc2VTdHJpbmcnXS5wcmV2aW91c1ZhbHVlOyAtLS0gY2FzbyBwcmVjaXNlIGRvIHZhbG9yIGFudGVzIGRhIG11ZGFuw6dhIGRvIGlucHV0XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBjaGFuZ2VzWydkaXNhYmxlZCddLmN1cnJlbnRWYWx1ZTtcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSBjdXJyZW50VmFsdWVcbiAgICAgIGNvbnN0IGhvdXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG91cicpO1xuICAgICAgY29uc3QgbWludXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21pbnV0ZScpO1xuICAgICAgY29uc3Qgc2Vjb25kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlY29uZCcpO1xuICAgICAgaWYoIXRoaXMuZGlzYWJsZWQpe1xuICAgICAgICBpZihob3VyKXtob3VyLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwifTtcbiAgICAgICAgaWYobWludXRlKXttaW51dGUuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCJ9XG4gICAgICAgIGlmKHNlY29uZCl7c2Vjb25kLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwifVxuICAgICAgfWVsc2V7XG4gICAgICAgIGlmKGhvdXIpe2hvdXIuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJ9O1xuICAgICAgICBpZihtaW51dGUpe21pbnV0ZS5zdHlsZS5jdXJzb3IgPSBcImF1dG9cIn1cbiAgICAgICAgaWYoc2Vjb25kKXtzZWNvbmQuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJ9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGluaXQocmVzcG9uc2VTdHJpbmc6U3RyaW5nKXtcbiAgICBsZXQgYXJyYXkgPSByZXNwb25zZVN0cmluZy5zcGxpdCgnOicpO1xuICAgICAgICBpZih0aGlzLm5lZWRTZWNvbmRzKXtcbiAgICAgICAgICAgIHRoaXMuaG91ciA9IHBhcnNlSW50KGFycmF5WzBdKTtcbiAgICAgICAgICAgIHRoaXMubWludXRlID0gcGFyc2VJbnQoYXJyYXlbMV0pO1xuICAgICAgICAgICAgdGhpcy5zZWNvbmQgPSBwYXJzZUludChhcnJheVsyXSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5ob3VyID0gcGFyc2VJbnQoYXJyYXlbMF0pO1xuICAgICAgICAgICAgdGhpcy5taW51dGUgPSBwYXJzZUludChhcnJheVsxXSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBpZihpc05hTih0aGlzLmhvdXIpIHx8IGlzTmFOKHRoaXMubWludXRlKSB8fCBpc05hTih0aGlzLnNlY29uZCkpe1xuICAgICAgICAgIHRoaXMuaG91ciA9IDBcbiAgICAgICAgICB0aGlzLm1pbnV0ZSA9IDBcbiAgICAgICAgICB0aGlzLnNlY29uZCA9IDBcbiAgICAgICAgfVxuICB9XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLChlKT0+e1xuICAgICAgICBpZihlLmNvZGUgPT0gJ1RhYicpe1xuICAgICAgICAgIHN3aXRjaCh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ21pbnV0ZSdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnc2Vjb25kJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG51bGxcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZS5jb2RlID09ICdBcnJvd1VwJyl7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHN3aXRjaCh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICB0aGlzLmhvdXIrK1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgdGhpcy5taW51dGUrK1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWNvbmQrK1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihlLmNvZGUgPT0gJ0Fycm93RG93bicpe1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgICAgaWYodGhpcy5ob3VyPT0wKXtcbiAgICAgICAgICAgICAgICB0aGlzLmhvdXI9dGhpcy5tYXhIb3VyXG4gICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuaG91ci0tXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICAgIGlmKHRoaXMubWludXRlPT0wKXtcbiAgICAgICAgICAgICAgICB0aGlzLm1pbnV0ZT01OVxuICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLm1pbnV0ZS0tXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICAgIGlmKHRoaXMuc2Vjb25kPT0wKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNlY29uZD01OVxuICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnNlY29uZC0tXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZS5jb2RlID09ICdBcnJvd1JpZ2h0Jyl7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHN3aXRjaCh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ21pbnV0ZSc7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ3NlY29uZCc7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGUuY29kZSA9PSAnQXJyb3dMZWZ0Jyl7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHN3aXRjaCh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnbWludXRlJztcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnaG91cic7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGUuY29kZSA9PSdCYWNrc3BhY2UnKXtcbiAgICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgICAgdGhpcy5hcGFnYXIoJ2hvdXInKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgdGhpcy5hcGFnYXIoJ21pbnV0ZScpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgICB0aGlzLmFwYWdhcignc2Vjb25kJylcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHN3aXRjaChlLmtleSl7XG4gICAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoMSx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoMix0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnMyc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoMyx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnNCc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoNCx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnNSc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoNSx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnNic6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoNix0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnNyc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoNyx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnOCc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoOCx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnOSc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoOSx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnMCc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoMCx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLm1pbnV0ZT41OSB8fCB0aGlzLm1pbnV0ZTwwKXtcbiAgICAgICAgICB0aGlzLm1pbnV0ZSA9IDBcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnNlY29uZD41OSB8fCB0aGlzLnNlY29uZDwwKXtcbiAgICAgICAgICB0aGlzLnNlY29uZCA9IDBcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmhvdXI8MCl7XG4gICAgICAgICAgdGhpcy5ob3VyID0gMFxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuaG91cj50aGlzLm1heEhvdXIpe1xuICAgICAgICAgIHRoaXMuaG91ciA9IHRoaXMubWF4SG91clxuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUoKVxuICAgICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBsb3N0Rm9jdXMoKXtcbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbFxuICB9XG5cbiAgcHVibGljIGZvY3VzKCRldmVudDphbnkpe1xuICAgIGlmKCF0aGlzLmRpc2FibGVkKXtcbiAgICAgIHN3aXRjaCgkZXZlbnQudGFyZ2V0LmlkKXtcbiAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdob3VyJztcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnbWludXRlJztcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnc2Vjb25kJztcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhcGFnYXIobG9jYWw6ICdob3VyJ3wnbWludXRlJ3wnc2Vjb25kJ3xudWxsKSB7XG4gICAgaWYobG9jYWwpe1xuICAgICAgaWYobG9jYWw9PSdob3VyJyl7XG4gICAgICAgIGxldCBob3JhID0gdGhpcy5ob3VyLnRvU3RyaW5nKCkuc3BsaXQoJycpO1xuICAgICAgICBpZihob3JhLmxlbmd0aD4xKXtcbiAgICAgICAgICBsZXQgcmV0aXJhZG8gPSBob3JhLnBvcCgpO1xuICAgICAgICB0aGlzLmhvdXIgPSAgcGFyc2VJbnQoaG9yYS5qb2luKCcnKSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5ob3VyID0gMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihsb2NhbD09J21pbnV0ZScpe1xuICAgICAgICBsZXQgbWludXRvID0gdGhpcy5taW51dGUudG9TdHJpbmcoKS5zcGxpdCgnJyk7XG4gICAgICAgIGlmKG1pbnV0by5sZW5ndGg+MSl7XG4gICAgICAgIGxldCByZXRpcmFkbyA9IG1pbnV0by5wb3AoKTtcbiAgICAgICAgdGhpcy5taW51dGUgPSAgcGFyc2VJbnQobWludXRvLmpvaW4oJycpKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5taW51dGUgPSAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGxvY2FsPT0nc2Vjb25kJyl7XG4gICAgICAgIGxldCBzZWd1bmRvID0gdGhpcy5zZWNvbmQudG9TdHJpbmcoKS5zcGxpdCgnJyk7XG4gICAgICAgIGlmKHNlZ3VuZG8ubGVuZ3RoPjEpe1xuICAgICAgICBsZXQgcmV0aXJhZG8gPSBzZWd1bmRvLnBvcCgpO1xuICAgICAgICB0aGlzLnNlY29uZCA9ICBwYXJzZUludChzZWd1bmRvLmpvaW4oJycpKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLnNlY29uZCA9IDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkaWdpdGFyKG51bTpudW1iZXIsbG9jYWw6J2hvdXInfCdtaW51dGUnfCdzZWNvbmQnfG51bGwpe1xuICAgIGlmKGxvY2FsKXtcbiAgICAgIGlmKGxvY2FsPT0naG91cicpe1xuICAgICAgICBpZih0aGlzLm5ld0lucHV0KXtcbiAgICAgICAgICB0aGlzLmhvdXI9cGFyc2VJbnQoJzAnK251bSlcbiAgICAgICAgICB0aGlzLm5ld0lucHV0ID0gZmFsc2U7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuaG91cj1wYXJzZUludCh0aGlzLmhvdXIudG9TdHJpbmcoKStudW0pXG4gICAgICAgICAgaWYodGhpcy5ob3VyLnRvU3RyaW5nKCkubGVuZ3RoID09IHRoaXMubWF4SG91ci50b1N0cmluZygpLmxlbmd0aCl7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ21pbnV0ZSc7XG4gICAgICAgICAgICB0aGlzLm5ld0lucHV0PXRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGxvY2FsPT0nbWludXRlJyl7XG4gICAgICAgIGlmKHRoaXMubmV3SW5wdXQpe1xuICAgICAgICAgIHRoaXMubWludXRlPXBhcnNlSW50KCcwJytudW0pXG4gICAgICAgICAgdGhpcy5uZXdJbnB1dCA9IGZhbHNlXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMubWludXRlPXBhcnNlSW50KHRoaXMubWludXRlLnRvU3RyaW5nKCkrbnVtKVxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnc2Vjb25kJztcbiAgICAgICAgICB0aGlzLm5ld0lucHV0PXRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYobG9jYWw9PSdzZWNvbmQnKXtcbiAgICAgICAgaWYodGhpcy5uZXdJbnB1dCl7XG4gICAgICAgICAgdGhpcy5zZWNvbmQ9cGFyc2VJbnQoJzAnK251bSlcbiAgICAgICAgICB0aGlzLm5ld0lucHV0ID0gZmFsc2VcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5zZWNvbmQ9cGFyc2VJbnQodGhpcy5zZWNvbmQudG9TdHJpbmcoKStudW0pXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gICAgICAgICAgdGhpcy5uZXdJbnB1dD10cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZXJyb3IoKXtcbiAgICByZXR1cm4gdGhyb3dFcnJvcigoKT0+IG5ldyBFcnJvcignVGhlIHRpbWUgaXMgYmlnZ2VyIHRoZW4gbWF4IHRpbWU6V2FzIHNldCB0aGUgbWF4IHRpbWUnKSlcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVWYWx1ZSgpOiB2b2lkIHtcbiAgICBpZih0aGlzLmhvdXI+dGhpcy5tYXhIb3VyKXtcbiAgICAgIHRoaXMuaG91ciA9IHRoaXMubWF4SG91cjtcbiAgICAgIHRoaXMuZXJyb3IoKVxuICAgIH1cbiAgICBpZih0aGlzLmhvdXI9PXRoaXMubWF4SG91ciAmJiB0aGlzLm1pbnV0ZT50aGlzLm1heE1pbnV0ZSl7XG4gICAgICB0aGlzLm1pbnV0ZT10aGlzLm1heE1pbnV0ZVxuICAgICAgdGhpcy5lcnJvcigpXG4gICAgfVxuICAgIGlmKHRoaXMuaG91cj09dGhpcy5tYXhIb3VyICYmIHRoaXMubWludXRlPT10aGlzLm1heE1pbnV0ZSAmJiB0aGlzLnNlY29uZD50aGlzLm1heFNlY29uZCl7XG4gICAgICB0aGlzLnNlY29uZD10aGlzLm1heFNlY29uZFxuICAgICAgdGhpcy5lcnJvcigpXG4gICAgfVxuICAgIHN3aXRjaCh0aGlzLnR5cGUpe1xuICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgY29uc3QgcmVzcG9zdGFTZWd1bmRvID0gKCh0aGlzLmhvdXIqNjApK3RoaXMubWludXRlKSo2MCt0aGlzLnNlY29uZFxuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFTZWd1bmRvKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhU2VndW5kby50b1N0cmluZygpKTtcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhTWludXRvID0gKCh0aGlzLmhvdXIqNjApK01hdGguZmxvb3IodGhpcy5zZWNvbmQvNjApKSt0aGlzLm1pbnV0ZVxuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFNaW51dG8pO1xuICAgICAgICB0aGlzLnJlc3BvbnNlU3RyaW5nQ2hhbmdlLmVtaXQocmVzcG9zdGFNaW51dG8udG9TdHJpbmcoKSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ21pbGlzZWNvbmQnOlxuICAgICAgICBjb25zdCByZXNwb3N0YU1pbGlzZWd1bmRvID0gKCgodGhpcy5ob3VyKjYwKSt0aGlzLm1pbnV0ZSkqNjArdGhpcy5zZWNvbmQpKjEwMDA7XG4gICAgICAgIHRoaXMucmVzcG9uc2VDaGFuZ2UuZW1pdChyZXNwb3N0YU1pbGlzZWd1bmRvKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhTWlsaXNlZ3VuZG8udG9TdHJpbmcoKSk7XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgY29uc3QgcmVzcG9zdGFIb3JhID0gTWF0aC5mbG9vcigoTWF0aC5mbG9vcih0aGlzLnNlY29uZC82MCkrdGhpcy5taW51dGUpLzYwKSt0aGlzLmhvdXI7XG4gICAgICAgIHRoaXMucmVzcG9uc2VDaGFuZ2UuZW1pdChyZXNwb3N0YUhvcmEpO1xuICAgICAgICB0aGlzLnJlc3BvbnNlU3RyaW5nQ2hhbmdlLmVtaXQocmVzcG9zdGFIb3JhLnRvU3RyaW5nKCkpO1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhID0gYCR7dGhpcy5ob3VyLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5ob3VyOnRoaXMuaG91cn06JHt0aGlzLm1pbnV0ZS50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMubWludXRlOnRoaXMubWludXRlfToke3RoaXMuc2Vjb25kLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5zZWNvbmQ6dGhpcy5zZWNvbmR9YFxuICAgICAgICBjb25zdCByZXNwb3N0YVNlcGFyYWRhID0ge1xuICAgICAgICAgIGhvdXI6dGhpcy5ob3VyLFxuICAgICAgICAgIG1pbnV0ZTp0aGlzLm1pbnV0ZSxcbiAgICAgICAgICBzZWNvbmQ6dGhpcy5zZWNvbmRcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc3BvbnNlU3RyaW5nQ2hhbmdlLmVtaXQocmVzcG9zdGEpO1xuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFTZXBhcmFkYSk7XG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgcHVibGljIG1heENsb2NrKCl7XG4gICAgdGhpcy5ob3VyID0gdGhpcy5tYXhIb3VyO1xuICAgIHRoaXMubWludXRlID0gdGhpcy5tYXhNaW51dGU7XG4gICAgdGhpcy5zZWNvbmQgPSB0aGlzLm1heFNlY29uZDtcbiAgICB0aGlzLmZlY2hhck1lbnUodGhpcy5tZW51VHJpZ2dlcik7XG4gIH1cblxuICBwdWJsaWMgbm93Q2xvY2soKXtcbiAgICBjb25zdCBhZ29yYSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgaG9yYXMgPSBhZ29yYS5nZXRIb3VycygpO1xuICAgIGNvbnN0IG1pbnV0b3MgPSBhZ29yYS5nZXRNaW51dGVzKCk7XG4gICAgY29uc3Qgc2VndW5kb3MgPSBhZ29yYS5nZXRTZWNvbmRzKCk7XG5cbiAgICB0aGlzLmhvdXIgPSBob3JhcztcbiAgICB0aGlzLm1pbnV0ZSA9IG1pbnV0b3M7XG4gICAgdGhpcy5zZWNvbmQgPSBzZWd1bmRvcztcbiAgICB0aGlzLmZlY2hhck1lbnUodGhpcy5tZW51VHJpZ2dlcik7XG4gIH1cblxuICBwdWJsaWMgZmVjaGFyTWVudSh0cmlnZ2VyOk1hdE1lbnVUcmlnZ2VyKSB7XG4gICAgdGhpcy5kaXNhYmxlQ2xvY2sgPSB0cnVlXG4gICAgdHJpZ2dlci5jbG9zZU1lbnUoKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlKCk7XG4gIH1cblxuICBwdWJsaWMgcHJlZW5jaGVyRGl2cygpIHtcbiAgICB0aGlzLmRpc2FibGVDbG9jayA9IHRydWU7XG4gICAgdGhpcy5ob3VyQ2xvY2sgPSBudWxsO1xuICAgIHRoaXMubWludXRlQ2xvY2sgPSBudWxsO1xuICAgIHRoaXMuc2Vjb25kQ2xvY2sgPSBudWxsO1xuICAgIHRoaXMuZGVzdHJveURpdnMoJ2hvdXJDbG9jaycpXG4gICAgdGhpcy5kZXN0cm95RGl2cygnbWludXRlQ2xvY2snKVxuICAgIHRoaXMuZGVzdHJveURpdnMoJ3NlY29uZENsb2NrJylcbiAgICBjb25zdCBjcmlhckRpdnMgPSAocGFyZW50RWxlbWVudElkOiBzdHJpbmcsIGlkOiBudW1iZXIsIGxpbWl0ZTogbnVtYmVyKSA9PiB7XG5cbiAgICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnRFbGVtZW50SWQpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBsaW1pdGU7IGkrKykge1xuICAgICAgICBjb25zdCBudW1iZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbnVtYmVyRGl2LnRleHRDb250ZW50ID0gaSA8IDEwID8gYDAke2l9YCA6IGAke2l9YDtcbiAgICAgICAgbnVtYmVyRGl2LnN0eWxlLmJvcmRlckJvdHRvbSA9IFwiMXB4IHNvbGlkIGJsYWNrXCI7XG4gICAgICAgIG51bWJlckRpdi5zdHlsZS5wYWRkaW5nID0gXCI1cHggMTBweFwiO1xuICAgICAgICBudW1iZXJEaXYuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICAgIG51bWJlckRpdi5zdHlsZS5tYXJnaW4gPSBcIjJweFwiO1xuXG4gICAgICAgIGxldCBjbGFzc0lkZW50aWZpZXIgPSAnJztcbiAgICAgICAgc3dpdGNoKGlkKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgY2xhc3NJZGVudGlmaWVyID0gJ251bUhvdXJDbG9jayc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjbGFzc0lkZW50aWZpZXIgPSAnbnVtTWludXRlQ2xvY2snO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2xhc3NJZGVudGlmaWVyID0gJ251bVNlY29uZENsb2NrJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIG51bWJlckRpdi5jbGFzc0xpc3QuYWRkKGNsYXNzSWRlbnRpZmllcik7XG5cbiAgICAgICAgbnVtYmVyRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGFsbFNpYmxpbmdzID0gcGFyZW50RWxlbWVudCEucXVlcnlTZWxlY3RvckFsbChgLiR7Y2xhc3NJZGVudGlmaWVyfWApO1xuICAgICAgICAgIGFsbFNpYmxpbmdzLmZvckVhY2goc2libGluZyA9PiB7XG4gICAgICAgICAgICBpZiAoc2libGluZyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgIHNpYmxpbmcuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmKGNsYXNzSWRlbnRpZmllciA9PT0gJ251bUhvdXJDbG9jaycpIHRoaXMuaG91ckNsb2NrID0gbnVtYmVyRGl2LnRleHRDb250ZW50O1xuICAgICAgICAgIGlmKGNsYXNzSWRlbnRpZmllciA9PT0gJ251bU1pbnV0ZUNsb2NrJykgdGhpcy5taW51dGVDbG9jayA9IG51bWJlckRpdi50ZXh0Q29udGVudDtcbiAgICAgICAgICBpZihjbGFzc0lkZW50aWZpZXIgPT09ICdudW1TZWNvbmRDbG9jaycpIHRoaXMuc2Vjb25kQ2xvY2sgPSBudW1iZXJEaXYudGV4dENvbnRlbnQ7XG5cbiAgICAgICAgICBudW1iZXJEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGJsdWVcIjtcblxuICAgICAgICAgIGlmKHRoaXMuaG91ckNsb2NrICYmIHRoaXMubWludXRlQ2xvY2sgJiYgdGhpcy5zZWNvbmRDbG9jayl7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVDbG9jayA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcGFyZW50RWxlbWVudCEuYXBwZW5kQ2hpbGQobnVtYmVyRGl2KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY3JpYXJEaXZzKCdob3VyQ2xvY2snLCAwLCB0aGlzLm1heEhvdXIpO1xuICAgIGNyaWFyRGl2cygnbWludXRlQ2xvY2snLCAxLCA1OSk7XG4gICAgY3JpYXJEaXZzKCdzZWNvbmRDbG9jaycsIDIsIDU5KTtcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95RGl2cyhpZDpzdHJpbmcpe1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgaWYoZWxlbWVudCl7XG4gICAgICBlbGVtZW50LmlubmVySFRNTCA9ICcnXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNvbmZpcm1DbG9jaygpe1xuICAgIHRoaXMuaG91ciA9IHBhcnNlSW50KHRoaXMuaG91ckNsb2NrISlcbiAgICB0aGlzLm1pbnV0ZSA9IHBhcnNlSW50KHRoaXMubWludXRlQ2xvY2shKVxuICAgIHRoaXMuc2Vjb25kID0gcGFyc2VJbnQodGhpcy5zZWNvbmRDbG9jayEpXG4gICAgdGhpcy5mZWNoYXJNZW51KHRoaXMubWVudVRyaWdnZXIpO1xuICB9XG59XG4iXX0=