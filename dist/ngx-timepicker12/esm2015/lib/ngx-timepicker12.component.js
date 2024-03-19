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
        <button mat-raised-button (click)="nowClock()">Now</button>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdGltZXBpY2tlcjEyL3NyYy9saWIvbmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpHLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7O0FBeUdsQyxNQUFNLE9BQU8sd0JBQXdCO0lBOEJuQztRQTVCUyxVQUFLLEdBQVUsR0FBRyxDQUFDO1FBQ25CLFdBQU0sR0FBVSxFQUFFLENBQUM7UUFDbkIsU0FBSSxHQUFVLEVBQUUsQ0FBQztRQUNqQixRQUFHLEdBQVUsVUFBVSxDQUFDO1FBQ3hCLGFBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBQzdCLG1CQUFjLEdBQWtCLElBQUksQ0FBQztRQUNyQyxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUM1QixTQUFJLEdBQW9ELFFBQVEsQ0FBQTtRQUNoRSxRQUFHLEdBQVUsU0FBUyxDQUFDO1FBQ3ZCLGFBQVEsR0FBVyxLQUFLLENBQUM7UUFFeEIsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3pDLHlCQUFvQixHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDbEQsYUFBUSxHQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDO1FBQ3BDLGNBQVMsR0FBVSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQztRQUN0QyxZQUFPLEdBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUE7UUFDakMsU0FBSSxHQUFVLENBQUMsQ0FBQztRQUNoQixXQUFNLEdBQVUsQ0FBQyxDQUFDO1FBQ2xCLFdBQU0sR0FBVSxDQUFDLENBQUM7UUFDbEIs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Ozs7Ozs7Ozs7O0tBdUVDO3FCQUNGO2lCQUNGOzBFQUV1QixXQUFXO3NCQUFoQyxTQUFTO3VCQUFDLFNBQVM7Z0JBQ1gsS0FBSztzQkFBYixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFFSSxjQUFjO3NCQUF2QixNQUFNO2dCQUNHLG9CQUFvQjtzQkFBN0IsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0TWVudVRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcbmltcG9ydCB7IHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC10aW1lcGlja2VyJyxcbiAgdGVtcGxhdGU6IGBcbiAgPGRpdiBbc3R5bGUud2lkdGhdPVwid2lkdGhDc3NcIiBbc3R5bGUuaGVpZ2h0XT1cImhlaWdodENzc1wiIGNsYXNzPVwidGltZXBpY2tlclwiPlxuICAgIDxkaXYgaWQ9XCJob3VyXCIgdGFiaW5kZXg9XCIxXCIgKGJsdXIpPVwibG9zdEZvY3VzKClcIiAoZm9jdXMpPVwiZm9jdXMoJGV2ZW50KVwiIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cInNlbGVjdGVkPT09J2hvdXInPyBjb3IgOiAndHJhbnNwYXJlbnQnXCIgKGNsaWNrKT1cImZvY3VzKCRldmVudClcIj57e2hvdXIudG9TdHJpbmcoKS5sZW5ndGg9PT0xPycwJyt0aGlzLmhvdXI6dGhpcy5ob3VyfX08L2Rpdj5cbiAgICA8ZGl2Pjo8L2Rpdj5cbiAgICA8ZGl2IGlkPVwibWludXRlXCIgdGFiaW5kZXg9XCIxXCIgKGJsdXIpPVwibG9zdEZvY3VzKClcIiAoZm9jdXMpPVwiZm9jdXMoJGV2ZW50KVwiIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cInNlbGVjdGVkPT09J21pbnV0ZSc/IGNvciA6ICd0cmFuc3BhcmVudCdcIiAoY2xpY2spPVwiZm9jdXMoJGV2ZW50KVwiPnt7bWludXRlLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5taW51dGU6dGhpcy5taW51dGV9fTwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCJuZWVkU2Vjb25kc1wiPjo8L2Rpdj5cbiAgICA8ZGl2ICpuZ0lmPVwibmVlZFNlY29uZHNcIiBpZD1cInNlY29uZFwiIHRhYmluZGV4PVwiMVwiIChibHVyKT1cImxvc3RGb2N1cygpXCIgKGZvY3VzKT1cImZvY3VzKCRldmVudClcIiBbc3R5bGUuYmFja2dyb3VuZC1jb2xvcl09XCJzZWxlY3RlZD09PSdzZWNvbmQnPyBjb3IgOiAndHJhbnNwYXJlbnQnXCIgKGNsaWNrKT1cImZvY3VzKCRldmVudClcIj57e3NlY29uZC50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMuc2Vjb25kOnRoaXMuc2Vjb25kfX08L2Rpdj5cbiAgICA8YnV0dG9uICpuZ0lmPVwiIWRpc2FibGVkXCIgbWF0LWJ1dHRvbiBzdHlsZT1cInBhZGRpbmc6MTBweDtwb3NpdGlvbjpyZWxhdGl2ZTtib3R0b206MXB4XCIgW21hdE1lbnVUcmlnZ2VyRm9yXT1cImFib3ZlTWVudVwiICN0cmlnZ2VyPVwibWF0TWVudVRyaWdnZXJcIiBjbGFzcz1cImJ0bkNsb2NrXCIgKGNsaWNrKT1cInByZWVuY2hlckRpdnMoKVwiPlxuICAgICAgPHN2ZyB3aWR0aD1cIjIwcHhcIiBoZWlnaHQ9XCIyMHB4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHN0eWxlPVwid2lkdGg6IDE3cHg7XCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNMTIgN1YxMkgxNU0yMSAxMkMyMSAxNi45NzA2IDE2Ljk3MDYgMjEgMTIgMjFDNy4wMjk0NCAyMSAzIDE2Ljk3MDYgMyAxMkMzIDcuMDI5NDQgNy4wMjk0NCAzIDEyIDNDMTYuOTcwNiAzIDIxIDcuMDI5NDQgMjEgMTJaXCIgc3Ryb2tlPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG4gICAgICA8L3N2Zz5cbiAgICA8L2J1dHRvbj5cbiAgICA8bWF0LW1lbnUgI2Fib3ZlTWVudT1cIm1hdE1lbnVcIiB5UG9zaXRpb249XCJhYm92ZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJtYXRNZW51Q2xvY2tcIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiPlxuICAgICAgPGRpdiBjbGFzcz1cIm51bWJlcnNcIj5cbiAgICAgICAgPGRpdiBpZD1cImhvdXJDbG9ja1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGlkPVwibWludXRlQ2xvY2tcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBpZD1cInNlY29uZENsb2NrXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXJDbG9ja1wiPlxuICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIChjbGljayk9XCJub3dDbG9jaygpXCI+Tm93PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gW2Rpc2FibGVkXT1cImRpc2FibGVDbG9ja1wiIChjbGljayk9XCJjb25maXJtQ2xvY2soKVwiPk9rPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8L21hdC1tZW51PlxuICA8L2Rpdj5cbmAsXG4gIHN0eWxlczogW1xuICAgIGAudGltZXBpY2tlcntcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBncmF5O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtd3JhcDogbm93cmFwO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIH1cbiAgICBkaXZ7XG4gICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lOyAvKiBTYWZhcmkgKi9cbiAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7IC8qIEZpcmVmb3ggKi9cbiAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTsgLyogSUUxMCsvRWRnZSAqL1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgfVxuICAgIGRpdjpmb2N1c3tcbiAgICAgIG91dGxpbmU6bm9uZTtcbiAgICB9XG4gICAgLmJ0bkNsb2Nre1xuICAgICAgbWFyZ2luOjAgNXB4O1xuICAgICAgaGVpZ2h0OjMwcHg7XG4gICAgICBtaW4td2lkdGg6MjVweDtcbiAgICAgIGRpc3BsYXk6ZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDpjZW50ZXI7XG4gICAgICBhbGlnbi1pdGVtczpjZW50ZXI7XG4gICAgfVxuICAgIC5idG5DbG9ja3tcbiAgICAgIGRpc3BsYXk6ZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDpjZW50ZXI7XG4gICAgICBhbGlnbi1pdGVtczpjZW50ZXI7XG4gICAgICBtaW4taGVpZ2h0OjI1cHg7XG4gICAgICBoZWlnaHQ6MjVweDtcbiAgICB9XG4gICAgLm1hdE1lbnVDbG9ja3tcbiAgICAgIHdpZHRoOjE1MHB4O1xuICAgICAgaGVpZ2h0OjE1MHB4O1xuICAgICAgZGlzcGxheTpmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246Y29sdW1uO1xuICAgIH1cbiAgICAubnVtYmVyc3tcbiAgICAgIHdpZHRoOjE1MHB4O1xuICAgICAgaGVpZ2h0OjEyMHB4O1xuICAgICAgZGlzcGxheTpmbGV4O1xuICAgIH1cbiAgICAubnVtYmVycz5kaXZ7XG4gICAgICB3aWR0aDo1MHB4O1xuICAgICAgaGVpZ2h0OjEyMHB4O1xuICAgICAgZGlzcGxheTpmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246Y29sdW1uO1xuICAgICAgYWxpZ24taXRlbXM6Y2VudGVyO1xuICAgICAgb3ZlcmZsb3c6c2Nyb2xsO1xuICAgICAgc2Nyb2xsYmFyLXdpZHRoOiBub25lO1xuICAgIH1cbiAgICAubnVtYmVycz5kaXY6Oi13ZWJraXQtc2Nyb2xsYmFye1xuICAgICAgZGlzcGxheTpub25lO1xuICAgIH1cbiAgICAuZm9vdGVyQ2xvY2t7XG4gICAgICB3aWR0aDoxNTBweDtcbiAgICAgIGhlaWdodDozMHB4O1xuICAgICAgZGlzcGxheTpmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZDtcbiAgICAgIGFsaWduLWl0ZW1zOmNlbnRlcjtcbiAgICAgIGJ1dHRvbntcbiAgICAgICAgbWluLXdpZHRoOjUwcHg7XG4gICAgICAgIG1pbi1oZWlnaHQ6MjBweDtcbiAgICAgICAgd2lkdGg6NTBweDtcbiAgICAgICAgaGVpZ2h0OjIwcHg7XG4gICAgICAgIGZvbnQtc2l6ZToxNXB4O1xuICAgICAgICBkaXNwbGF5OmZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDpjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOmNlbnRlcjtcbiAgICAgIH1cbiAgICB9XG4gICAgYFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neFRpbWVwaWNrZXIxMkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCxBZnRlclZpZXdJbml0e1xuICBAVmlld0NoaWxkKCd0cmlnZ2VyJykgbWVudVRyaWdnZXIhOiBNYXRNZW51VHJpZ2dlcjtcbiAgQElucHV0KCkgd2lkdGg6bnVtYmVyID0gMTMwO1xuICBASW5wdXQoKSBoZWlnaHQ6bnVtYmVyID0gNDA7XG4gIEBJbnB1dCgpIGZvbnQ6bnVtYmVyID0gMTA7XG4gIEBJbnB1dCgpIG1heDpzdHJpbmcgPSAnMjM6NTk6NTknO1xuICBASW5wdXQoKSByZXNwb25zZTogbnVtYmVyfG51bGwgPSBudWxsO1xuICBASW5wdXQoKSByZXNwb25zZVN0cmluZzogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG5lZWRTZWNvbmRzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgdHlwZTogJ21pbGlzZWNvbmQnfCdzZWNvbmQnfCdtaW51dGUnfCAnaG91cicgfCAndGltZScgPSAnc2Vjb25kJ1xuICBASW5wdXQoKSBjb3I6c3RyaW5nID0gXCIjNDhiOWM3XCI7XG4gIEBJbnB1dCgpIGRpc2FibGVkOmJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgcmVzcG9uc2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHJlc3BvbnNlU3RyaW5nQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHB1YmxpYyB3aWR0aENzczpzdHJpbmcgPSBgJHt0aGlzLndpZHRofXB4YDtcbiAgcHVibGljIGhlaWdodENzczpzdHJpbmcgPSBgJHt0aGlzLmhlaWdodH1weGA7XG4gIHB1YmxpYyBmb250Q3NzOnN0cmluZyA9IGAke3RoaXMuZm9udH1weGBcbiAgcHVibGljIGhvdXI6bnVtYmVyID0gMDtcbiAgcHVibGljIG1pbnV0ZTpudW1iZXIgPSAwO1xuICBwdWJsaWMgc2Vjb25kOm51bWJlciA9IDA7XG4gIHB1YmxpYyBzZWxlY3RlZDonaG91cid8J21pbnV0ZSd8J3NlY29uZCd8bnVsbCA9IG51bGw7XG4gIHB1YmxpYyBtYXhIb3VyOm51bWJlciA9IDBcbiAgcHVibGljIG1heE1pbnV0ZTpudW1iZXIgPSAwXG4gIHB1YmxpYyBtYXhTZWNvbmQ6bnVtYmVyID0gMFxuICBwdWJsaWMgZGlzYWJsZUNsb2NrOmJvb2xlYW4gPSB0cnVlO1xuICBwdWJsaWMgaG91ckNsb2NrOnN0cmluZ3xudWxsID0gbnVsbDtcbiAgcHVibGljIG1pbnV0ZUNsb2NrOnN0cmluZ3xudWxsID0gbnVsbDtcbiAgcHVibGljIHNlY29uZENsb2NrOnN0cmluZ3xudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBuZXdJbnB1dDpib29sZWFuID0gdHJ1ZTtcbiAgY29uc3RydWN0b3IoKXtcbiAgfVxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZih0aGlzLm1heCAhPSAnJyl7XG4gICAgICBjb25zdCBhcnJheU1heCA9IHRoaXMubWF4LnNwbGl0KCc6Jyk7XG4gICAgICB0aGlzLm1heEhvdXI9cGFyc2VJbnQoYXJyYXlNYXhbMF0pXG4gICAgICB0aGlzLm1heE1pbnV0ZT1wYXJzZUludChhcnJheU1heFsxXSlcbiAgICAgIHRoaXMubWF4U2Vjb25kPXBhcnNlSW50KGFycmF5TWF4WzJdKVxuICAgIH1cbiAgICBpZih0aGlzLnJlc3BvbnNlU3RyaW5nKXtcbiAgICAgIGxldCBhcnJheSA9IHRoaXMucmVzcG9uc2VTdHJpbmcuc3BsaXQoJzonKTtcbiAgICAgIGlmKHRoaXMubmVlZFNlY29uZHMpe1xuICAgICAgICB0aGlzLmhvdXIgPSBwYXJzZUludChhcnJheVswXSk7XG4gICAgICAgIHRoaXMubWludXRlID0gcGFyc2VJbnQoYXJyYXlbMV0pO1xuICAgICAgICB0aGlzLnNlY29uZCA9IHBhcnNlSW50KGFycmF5WzJdKTtcbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLmhvdXIgPSBwYXJzZUludChhcnJheVswXSk7XG4gICAgICAgIHRoaXMubWludXRlID0gcGFyc2VJbnQoYXJyYXlbMV0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZih0aGlzLnJlc3BvbnNlKXtcbiAgICAgIGxldCB0aW1lID0gdGhpcy5yZXNwb25zZVxuICAgICAgaWYodGltZT4zNjAwKXtcbiAgICAgICAgdGhpcy5ob3VyID0gTWF0aC5yb3VuZCh0aW1lLzM2MDApXG4gICAgICAgIHRpbWUgLT0zNjAwKnRoaXMuaG91clxuICAgICAgfVxuICAgICAgaWYodGltZT42MCl7XG4gICAgICAgIHRoaXMubWludXRlID0gTWF0aC5yb3VuZCh0aW1lLzYwKVxuICAgICAgICB0aW1lIC09NjAqdGhpcy5taW51dGVcbiAgICAgIH1cbiAgICAgIGlmKHRpbWUpe1xuICAgICAgICB0aGlzLnNlY29uZCA9IHRpbWVcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYoIXRoaXMuZGlzYWJsZWQpe1xuICAgICAgY29uc3QgaG91ciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob3VyJyk7XG4gICAgICBpZihob3VyKXtob3VyLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwifTtcbiAgICAgIGNvbnN0IG1pbnV0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaW51dGUnKTtcbiAgICAgIGlmKG1pbnV0ZSl7bWludXRlLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwifVxuICAgICAgY29uc3Qgc2Vjb25kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlY29uZCcpO1xuICAgICAgaWYoc2Vjb25kKXtzZWNvbmQuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCJ9XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywoZSk9PntcbiAgICAgICAgaWYoZS5jb2RlID09ICdUYWInKXtcbiAgICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdtaW51dGUnXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ3NlY29uZCdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGUuY29kZSA9PSAnQXJyb3dVcCcpe1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgICAgdGhpcy5ob3VyKytcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICAgIHRoaXMubWludXRlKytcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICAgIHRoaXMuc2Vjb25kKytcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZS5jb2RlID09ICdBcnJvd0Rvd24nKXtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICAgIGlmKHRoaXMuaG91cj09MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3VyPXRoaXMubWF4SG91clxuICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmhvdXItLVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICBpZih0aGlzLm1pbnV0ZT09MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5taW51dGU9NTlcbiAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5taW51dGUtLVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgICBpZih0aGlzLnNlY29uZD09MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWNvbmQ9NTlcbiAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWNvbmQtLVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGUuY29kZSA9PSAnQXJyb3dSaWdodCcpe1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdtaW51dGUnO1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdzZWNvbmQnO1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihlLmNvZGUgPT0gJ0Fycm93TGVmdCcpe1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ21pbnV0ZSc7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ2hvdXInO1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihlLmNvZGUgPT0nQmFja3NwYWNlJyl7XG4gICAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICAgIHRoaXMuYXBhZ2FyKCdob3VyJylcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICAgIHRoaXMuYXBhZ2FyKCdtaW51dGUnKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgdGhpcy5hcGFnYXIoJ3NlY29uZCcpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBzd2l0Y2goZS5rZXkpe1xuICAgICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDEsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzInOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDIsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzMnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDMsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzQnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDQsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzUnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDUsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzYnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDYsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzcnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDcsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzgnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDgsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzknOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDksdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzAnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDAsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5taW51dGU+NTkgfHwgdGhpcy5taW51dGU8MCl7XG4gICAgICAgICAgdGhpcy5taW51dGUgPSAwXG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5zZWNvbmQ+NTkgfHwgdGhpcy5zZWNvbmQ8MCl7XG4gICAgICAgICAgdGhpcy5zZWNvbmQgPSAwXG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5ob3VyLnRvU3RyaW5nKCkubGVuZ3RoPjMgfHwgdGhpcy5ob3VyPDApe1xuICAgICAgICAgIHRoaXMuaG91ciA9IDBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKClcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGxvc3RGb2N1cygpe1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsXG4gIH1cblxuICBwdWJsaWMgZm9jdXMoJGV2ZW50OmFueSl7XG4gICAgaWYoIXRoaXMuZGlzYWJsZWQpe1xuICAgICAgc3dpdGNoKCRldmVudC50YXJnZXQuaWQpe1xuICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ2hvdXInO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdtaW51dGUnO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdzZWNvbmQnO1xuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHB1YmxpYyBhcGFnYXIobG9jYWw6ICdob3VyJ3wnbWludXRlJ3wnc2Vjb25kJ3xudWxsKSB7XG4gICAgaWYobG9jYWwpe1xuICAgICAgaWYobG9jYWw9PSdob3VyJyl7XG4gICAgICAgIGxldCBob3JhID0gdGhpcy5ob3VyLnRvU3RyaW5nKCkuc3BsaXQoJycpO1xuICAgICAgICBpZihob3JhLmxlbmd0aD4xKXtcbiAgICAgICAgICBsZXQgcmV0aXJhZG8gPSBob3JhLnBvcCgpO1xuICAgICAgICB0aGlzLmhvdXIgPSAgcGFyc2VJbnQoaG9yYS5qb2luKCcnKSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5ob3VyID0gMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihsb2NhbD09J21pbnV0ZScpe1xuICAgICAgICBsZXQgbWludXRvID0gdGhpcy5taW51dGUudG9TdHJpbmcoKS5zcGxpdCgnJyk7XG4gICAgICAgIGlmKG1pbnV0by5sZW5ndGg+MSl7XG4gICAgICAgIGxldCByZXRpcmFkbyA9IG1pbnV0by5wb3AoKTtcbiAgICAgICAgdGhpcy5taW51dGUgPSAgcGFyc2VJbnQobWludXRvLmpvaW4oJycpKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5taW51dGUgPSAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGxvY2FsPT0nc2Vjb25kJyl7XG4gICAgICAgIGxldCBzZWd1bmRvID0gdGhpcy5zZWNvbmQudG9TdHJpbmcoKS5zcGxpdCgnJyk7XG4gICAgICAgIGlmKHNlZ3VuZG8ubGVuZ3RoPjEpe1xuICAgICAgICBsZXQgcmV0aXJhZG8gPSBzZWd1bmRvLnBvcCgpO1xuICAgICAgICB0aGlzLnNlY29uZCA9ICBwYXJzZUludChzZWd1bmRvLmpvaW4oJycpKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLnNlY29uZCA9IDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkaWdpdGFyKG51bTpudW1iZXIsbG9jYWw6J2hvdXInfCdtaW51dGUnfCdzZWNvbmQnfG51bGwpe1xuICAgIGlmKGxvY2FsKXtcbiAgICAgIGlmKGxvY2FsPT0naG91cicpe1xuICAgICAgICBpZih0aGlzLm5ld0lucHV0KXtcbiAgICAgICAgICB0aGlzLmhvdXI9cGFyc2VJbnQoJzAnK251bSlcbiAgICAgICAgICB0aGlzLm5ld0lucHV0ID0gZmFsc2VcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5ob3VyPXBhcnNlSW50KHRoaXMuaG91ci50b1N0cmluZygpK251bSlcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ21pbnV0ZSc7XG4gICAgICAgICAgdGhpcy5uZXdJbnB1dD10cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGxvY2FsPT0nbWludXRlJyl7XG4gICAgICAgIGlmKHRoaXMubmV3SW5wdXQpe1xuICAgICAgICAgIHRoaXMubWludXRlPXBhcnNlSW50KCcwJytudW0pXG4gICAgICAgICAgdGhpcy5uZXdJbnB1dCA9IGZhbHNlXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMubWludXRlPXBhcnNlSW50KHRoaXMubWludXRlLnRvU3RyaW5nKCkrbnVtKVxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnc2Vjb25kJztcbiAgICAgICAgICB0aGlzLm5ld0lucHV0PXRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYobG9jYWw9PSdzZWNvbmQnKXtcbiAgICAgICAgaWYodGhpcy5uZXdJbnB1dCl7XG4gICAgICAgICAgdGhpcy5zZWNvbmQ9cGFyc2VJbnQoJzAnK251bSlcbiAgICAgICAgICB0aGlzLm5ld0lucHV0ID0gZmFsc2VcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5zZWNvbmQ9cGFyc2VJbnQodGhpcy5zZWNvbmQudG9TdHJpbmcoKStudW0pXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gICAgICAgICAgdGhpcy5uZXdJbnB1dD10cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcHVibGljIGVycm9yKCl7XG4gICAgcmV0dXJuIHRocm93RXJyb3IoKCk9PiBuZXcgRXJyb3IoJ1RoZSB0aW1lIGlzIGJpZ2dlciB0aGVuIG1heCB0aW1lOldhcyBzZXQgdGhlIG1heCB0aW1lJykpXG4gIH1cbiAgcHVibGljIHVwZGF0ZVZhbHVlKCk6IHZvaWQge1xuICAgIGlmKHRoaXMuaG91cj50aGlzLm1heEhvdXIpe1xuICAgICAgdGhpcy5ob3VyID0gdGhpcy5tYXhIb3VyO1xuICAgICAgdGhpcy5lcnJvcigpXG4gICAgfVxuICAgIGlmKHRoaXMuaG91cj09dGhpcy5tYXhIb3VyICYmIHRoaXMubWludXRlPnRoaXMubWF4TWludXRlKXtcbiAgICAgIHRoaXMubWludXRlPXRoaXMubWF4TWludXRlXG4gICAgICB0aGlzLmVycm9yKClcbiAgICB9XG4gICAgaWYodGhpcy5ob3VyPT10aGlzLm1heEhvdXIgJiYgdGhpcy5taW51dGU9PXRoaXMubWF4TWludXRlICYmIHRoaXMuc2Vjb25kPnRoaXMubWF4U2Vjb25kKXtcbiAgICAgIHRoaXMuc2Vjb25kPXRoaXMubWF4U2Vjb25kXG4gICAgICB0aGlzLmVycm9yKClcbiAgICB9XG4gICAgc3dpdGNoKHRoaXMudHlwZSl7XG4gICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICBjb25zdCByZXNwb3N0YVNlZ3VuZG8gPSAoKHRoaXMuaG91cio2MCkrdGhpcy5taW51dGUpKjYwK3RoaXMuc2Vjb25kXG4gICAgICAgIHRoaXMucmVzcG9uc2VDaGFuZ2UuZW1pdChyZXNwb3N0YVNlZ3VuZG8pO1xuICAgICAgICB0aGlzLnJlc3BvbnNlU3RyaW5nQ2hhbmdlLmVtaXQocmVzcG9zdGFTZWd1bmRvLnRvU3RyaW5nKCkpO1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgY29uc3QgcmVzcG9zdGFNaW51dG8gPSAoKHRoaXMuaG91cio2MCkrTWF0aC5mbG9vcih0aGlzLnNlY29uZC82MCkpK3RoaXMubWludXRlXG4gICAgICAgIHRoaXMucmVzcG9uc2VDaGFuZ2UuZW1pdChyZXNwb3N0YU1pbnV0byk7XG4gICAgICAgIHRoaXMucmVzcG9uc2VTdHJpbmdDaGFuZ2UuZW1pdChyZXNwb3N0YU1pbnV0by50b1N0cmluZygpKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnbWlsaXNlY29uZCc6XG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhTWlsaXNlZ3VuZG8gPSAoKCh0aGlzLmhvdXIqNjApK3RoaXMubWludXRlKSo2MCt0aGlzLnNlY29uZCkqMTAwMDtcbiAgICAgICAgdGhpcy5yZXNwb25zZUNoYW5nZS5lbWl0KHJlc3Bvc3RhTWlsaXNlZ3VuZG8pO1xuICAgICAgICB0aGlzLnJlc3BvbnNlU3RyaW5nQ2hhbmdlLmVtaXQocmVzcG9zdGFNaWxpc2VndW5kby50b1N0cmluZygpKTtcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICBjb25zdCByZXNwb3N0YUhvcmEgPSBNYXRoLmZsb29yKChNYXRoLmZsb29yKHRoaXMuc2Vjb25kLzYwKSt0aGlzLm1pbnV0ZSkvNjApK3RoaXMuaG91cjtcbiAgICAgICAgdGhpcy5yZXNwb25zZUNoYW5nZS5lbWl0KHJlc3Bvc3RhSG9yYSk7XG4gICAgICAgIHRoaXMucmVzcG9uc2VTdHJpbmdDaGFuZ2UuZW1pdChyZXNwb3N0YUhvcmEudG9TdHJpbmcoKSk7XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgY29uc3QgcmVzcG9zdGEgPSBgJHt0aGlzLmhvdXIudG9TdHJpbmcoKS5sZW5ndGg9PT0xPycwJyt0aGlzLmhvdXI6dGhpcy5ob3VyfToke3RoaXMubWludXRlLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5taW51dGU6dGhpcy5taW51dGV9OiR7dGhpcy5zZWNvbmQudG9TdHJpbmcoKS5sZW5ndGg9PT0xPycwJyt0aGlzLnNlY29uZDp0aGlzLnNlY29uZH1gXG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhU2VwYXJhZGEgPSB7XG4gICAgICAgICAgaG91cjp0aGlzLmhvdXIsXG4gICAgICAgICAgbWludXRlOnRoaXMubWludXRlLFxuICAgICAgICAgIHNlY29uZDp0aGlzLnNlY29uZFxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzcG9uc2VTdHJpbmdDaGFuZ2UuZW1pdChyZXNwb3N0YSk7XG4gICAgICAgIHRoaXMucmVzcG9uc2VDaGFuZ2UuZW1pdChyZXNwb3N0YVNlcGFyYWRhKTtcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbiAgcHVibGljIG5vd0Nsb2NrKCl7XG4gICAgY29uc3QgYWdvcmEgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGhvcmFzID0gYWdvcmEuZ2V0SG91cnMoKTtcbiAgICBjb25zdCBtaW51dG9zID0gYWdvcmEuZ2V0TWludXRlcygpO1xuICAgIGNvbnN0IHNlZ3VuZG9zID0gYWdvcmEuZ2V0U2Vjb25kcygpO1xuXG4gICAgdGhpcy5ob3VyID0gaG9yYXM7XG4gICAgdGhpcy5taW51dGUgPSBtaW51dG9zO1xuICAgIHRoaXMuc2Vjb25kID0gc2VndW5kb3M7XG4gICAgdGhpcy5mZWNoYXJNZW51KHRoaXMubWVudVRyaWdnZXIpO1xuICB9XG4gIHB1YmxpYyBmZWNoYXJNZW51KHRyaWdnZXI6TWF0TWVudVRyaWdnZXIpIHtcbiAgICB0aGlzLmRpc2FibGVDbG9jayA9IHRydWVcbiAgICB0cmlnZ2VyLmNsb3NlTWVudSgpO1xuICAgIHRoaXMudXBkYXRlVmFsdWUoKTtcbiAgfVxuICBwdWJsaWMgcHJlZW5jaGVyRGl2cygpIHtcbiAgICB0aGlzLmRpc2FibGVDbG9jayA9IHRydWU7XG4gICAgdGhpcy5ob3VyQ2xvY2sgPSBudWxsO1xuICAgIHRoaXMubWludXRlQ2xvY2sgPSBudWxsO1xuICAgIHRoaXMuc2Vjb25kQ2xvY2sgPSBudWxsO1xuICAgIHRoaXMuZGVzdHJveURpdnMoJ2hvdXJDbG9jaycpXG4gICAgdGhpcy5kZXN0cm95RGl2cygnbWludXRlQ2xvY2snKVxuICAgIHRoaXMuZGVzdHJveURpdnMoJ3NlY29uZENsb2NrJylcbiAgICBjb25zdCBjcmlhckRpdnMgPSAocGFyZW50RWxlbWVudElkOiBzdHJpbmcsIGlkOiBudW1iZXIsIGxpbWl0ZTogbnVtYmVyKSA9PiB7XG5cbiAgICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnRFbGVtZW50SWQpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBsaW1pdGU7IGkrKykge1xuICAgICAgICBjb25zdCBudW1iZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbnVtYmVyRGl2LnRleHRDb250ZW50ID0gaSA8IDEwID8gYDAke2l9YCA6IGAke2l9YDtcbiAgICAgICAgbnVtYmVyRGl2LnN0eWxlLmJvcmRlckJvdHRvbSA9IFwiMXB4IHNvbGlkIGJsYWNrXCI7XG4gICAgICAgIG51bWJlckRpdi5zdHlsZS5wYWRkaW5nID0gXCI1cHggMTBweFwiO1xuICAgICAgICBudW1iZXJEaXYuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICAgIG51bWJlckRpdi5zdHlsZS5tYXJnaW4gPSBcIjJweFwiO1xuXG4gICAgICAgIGxldCBjbGFzc0lkZW50aWZpZXIgPSAnJztcbiAgICAgICAgc3dpdGNoKGlkKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgY2xhc3NJZGVudGlmaWVyID0gJ251bUhvdXJDbG9jayc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjbGFzc0lkZW50aWZpZXIgPSAnbnVtTWludXRlQ2xvY2snO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2xhc3NJZGVudGlmaWVyID0gJ251bVNlY29uZENsb2NrJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIG51bWJlckRpdi5jbGFzc0xpc3QuYWRkKGNsYXNzSWRlbnRpZmllcik7XG5cbiAgICAgICAgbnVtYmVyRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGFsbFNpYmxpbmdzID0gcGFyZW50RWxlbWVudCEucXVlcnlTZWxlY3RvckFsbChgLiR7Y2xhc3NJZGVudGlmaWVyfWApO1xuICAgICAgICAgIGFsbFNpYmxpbmdzLmZvckVhY2goc2libGluZyA9PiB7XG4gICAgICAgICAgICBpZiAoc2libGluZyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgIHNpYmxpbmcuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmKGNsYXNzSWRlbnRpZmllciA9PT0gJ251bUhvdXJDbG9jaycpIHRoaXMuaG91ckNsb2NrID0gbnVtYmVyRGl2LnRleHRDb250ZW50O1xuICAgICAgICAgIGlmKGNsYXNzSWRlbnRpZmllciA9PT0gJ251bU1pbnV0ZUNsb2NrJykgdGhpcy5taW51dGVDbG9jayA9IG51bWJlckRpdi50ZXh0Q29udGVudDtcbiAgICAgICAgICBpZihjbGFzc0lkZW50aWZpZXIgPT09ICdudW1TZWNvbmRDbG9jaycpIHRoaXMuc2Vjb25kQ2xvY2sgPSBudW1iZXJEaXYudGV4dENvbnRlbnQ7XG5cbiAgICAgICAgICBudW1iZXJEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGJsdWVcIjtcblxuICAgICAgICAgIGlmKHRoaXMuaG91ckNsb2NrICYmIHRoaXMubWludXRlQ2xvY2sgJiYgdGhpcy5zZWNvbmRDbG9jayl7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVDbG9jayA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcGFyZW50RWxlbWVudCEuYXBwZW5kQ2hpbGQobnVtYmVyRGl2KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY3JpYXJEaXZzKCdob3VyQ2xvY2snLCAwLCB0aGlzLm1heEhvdXIpO1xuICAgIGNyaWFyRGl2cygnbWludXRlQ2xvY2snLCAxLCA1OSk7XG4gICAgY3JpYXJEaXZzKCdzZWNvbmRDbG9jaycsIDIsIDU5KTtcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95RGl2cyhpZDpzdHJpbmcpe1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgaWYoZWxlbWVudCl7XG4gICAgICBlbGVtZW50LmlubmVySFRNTCA9ICcnXG4gICAgfVxuICB9XG4gIHB1YmxpYyBjb25maXJtQ2xvY2soKXtcbiAgICB0aGlzLmhvdXIgPSBwYXJzZUludCh0aGlzLmhvdXJDbG9jayEpXG4gICAgdGhpcy5taW51dGUgPSBwYXJzZUludCh0aGlzLm1pbnV0ZUNsb2NrISlcbiAgICB0aGlzLnNlY29uZCA9IHBhcnNlSW50KHRoaXMuc2Vjb25kQ2xvY2shKVxuICAgIHRoaXMuZmVjaGFyTWVudSh0aGlzLm1lbnVUcmlnZ2VyKTtcbiAgfVxufVxuIl19