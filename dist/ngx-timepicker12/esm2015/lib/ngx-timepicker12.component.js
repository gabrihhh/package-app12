import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
        this.min = '00:00:00';
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
        this.minHour = 0;
        this.minMinute = 0;
        this.minSecond = 0;
        this.disableClock = true;
        this.hourClock = null;
        this.minuteClock = null;
        this.secondClock = null;
        this.maxHourLength = 0;
        this.newInput = true;
        this.hourString = '';
        if (this.maxHour.toString().length <= 1) {
            this.maxHourLength = 2;
        }
        else {
            this.maxHourLength = this.maxHour.toString().length;
        }
    }
    ngOnInit() {
        if (this.min != '') {
            const arrayMin = this.min.split(':');
            this.minHour = parseInt(arrayMin[0]);
            this.minMinute = parseInt(arrayMin[1]);
            this.minSecond = parseInt(arrayMin[2]);
        }
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
        if (changes['max']) {
            const currentValue = changes['max'].currentValue;
            const arrayMax = currentValue.split(':');
            this.maxHour = parseInt(arrayMax[0]);
            this.maxMinute = parseInt(arrayMax[1]);
            this.maxSecond = parseInt(arrayMax[2]);
            if (this.hour > this.maxHour) {
                this.hour = this.maxHour;
            }
            if (this.minute > this.maxMinute) {
                this.minute = this.maxMinute;
            }
            if (this.second > this.maxSecond) {
                this.second = this.maxSecond;
            }
            if (this.maxHour.toString().length <= 1) {
                this.maxHourLength = 2;
            }
            else {
                this.maxHourLength = this.maxHour.toString().length;
            }
        }
        if (changes['min']) {
            const currentValue = changes['min'].currentValue;
            const arrayMin = currentValue.split(':');
            this.minHour = parseInt(arrayMin[0]);
            this.minMinute = parseInt(arrayMin[1]);
            this.minSecond = parseInt(arrayMin[2]);
            if (this.hour < this.minHour) {
                this.hour = this.minHour;
            }
            if (this.minute < this.minMinute) {
                this.minute = this.minMinute;
            }
            if (this.second < this.minSecond) {
                this.second = this.minSecond;
            }
        }
        if (changes['needSeconds']) {
            const currentValue = changes['needSeconds'].currentValue;
            this.needSeconds = currentValue;
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
                        if (this.hour == this.maxHour) {
                            this.hour = this.minHour;
                        }
                        else {
                            this.hour++;
                        }
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
                        if (this.hour == this.minHour) {
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
                    this.hourString = num.toString();
                }
                else {
                    this.hour = parseInt(this.hour.toString() + num);
                    this.hourString += num;
                    if (this.hourString.length == this.maxHour.toString().length) {
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
    updateValue() {
        if (this.minute > 59 || this.minute < 0) {
            this.minute = 0;
        }
        if (this.second > 59 || this.second < 0) {
            this.second = 0;
        }
        if (this.hour < this.minHour) {
            this.hour = this.minHour;
        }
        if (this.hour > this.maxHour) {
            this.hour = this.maxHour;
        }
        if (this.hour == this.maxHour && this.minute > this.maxMinute) {
            this.minute = this.maxMinute;
        }
        if (this.hour == this.minHour && this.minute < this.minMinute) {
            this.minute = this.minMinute;
        }
        if (this.hour == this.maxHour && this.minute == this.maxMinute && this.second > this.maxSecond) {
            this.second = this.maxSecond;
        }
        if (this.hour == this.minHour && this.minute == this.minMinute && this.second < this.minSecond) {
            this.second = this.minSecond;
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
NgxTimepicker12Component.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: NgxTimepicker12Component, selector: "ngx-timepicker", inputs: { width: "width", height: "height", font: "font", max: "max", min: "min", response: "response", responseString: "responseString", needSeconds: "needSeconds", type: "type", cor: "cor", disabled: "disabled" }, outputs: { responseChange: "responseChange", responseStringChange: "responseStringChange" }, viewQueries: [{ propertyName: "menuTrigger", first: true, predicate: ["trigger"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div \nclass=\"timepicker\"\n[style.width]=\"widthCss\" \n[style.height]=\"heightCss\"  \n[style.borderBottom]=\"disabled ? '1px solid gray' : '1px solid black'\">\n  <div \n  id=\"hour\" \n  tabindex=\"1\" \n  (blur)=\"lostFocus()\" \n  (focus)=\"focus($event)\" \n  [style.background-color]=\"selected==='hour'? cor : 'transparent'\" \n  [style.color]=\"disabled ? 'gray' : 'black'\"\n  (click)=\"focus($event)\">{{hour.toString().length - maxHourLength !== 0 ? ('0'.repeat(maxHourLength - hour.toString().length)) + this.hour : this.hour}}\n</div>\n  <div\n  [style.color]=\"disabled ? 'gray' : 'black'\"\n  >:</div>\n  <div \n  id=\"minute\" \n  tabindex=\"1\" \n  (blur)=\"lostFocus()\" \n  (focus)=\"focus($event)\" \n  [style.background-color]=\"selected==='minute'? cor : 'transparent'\" \n  [style.color]=\"disabled ? 'gray' : 'black'\"\n  (click)=\"focus($event)\">{{minute.toString().length===1?'0'+this.minute:this.minute}}</div>\n  <div *ngIf=\"needSeconds\"\n  [style.color]=\"disabled ? 'gray' : 'black'\"\n  >:</div>\n  <div \n  *ngIf=\"needSeconds\" \n  id=\"second\" [style.color]=\"disabled ? 'gray' : 'black'\" \n  tabindex=\"1\" (blur)=\"lostFocus()\" (focus)=\"focus($event)\" \n  [style.background-color]=\"selected==='second'? cor : 'transparent'\" \n  (click)=\"focus($event)\">{{second.toString().length===1?'0'+this.second:this.second}}\n  </div>\n  <button *ngIf=\"!disabled\" mat-icon-button style=\"padding:20px;position:relative;bottom:1px\" [matMenuTriggerFor]=\"aboveMenu\" #trigger=\"matMenuTrigger\" class=\"btnClock\" (click)=\"preencherDivs()\">\n    <svg width=\"20px\" height=\"20px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" style=\"width: 17px;\">\n      <path d=\"M12 7V12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    </svg>\n  </button>\n  <mat-menu #aboveMenu=\"matMenu\" yPosition=\"above\">\n  <div class=\"matMenuClock\" (click)=\"$event.stopPropagation();\">\n    <div class=\"numbers\">\n      <div id=\"hourClock\"></div>\n      <div id=\"minuteClock\"></div>\n      <div id=\"secondClock\"></div>\n    </div>\n    <div class=\"footerClock\">\n      <button mat-raised-button *ngIf=\"max !== '23:59:59'\" (click)=\"maxClock()\">Max</button>\n      <button mat-raised-button *ngIf=\"max == '23:59:59'\" (click)=\"nowClock()\">Now</button>\n      <button mat-raised-button [disabled]=\"disableClock\" (click)=\"confirmClock()\">Ok</button>\n    </div>\n  </div>\n  </mat-menu>\n</div>", styles: [".timepicker{border-bottom:1px solid gray;display:flex;flex-wrap:nowrap;justify-content:center;align-items:center}div{-webkit-user-select:none;user-select:none}div:focus{outline:none}.btnClock{margin:0 5px;height:30px;min-width:25px;display:flex;justify-content:center;align-items:center}.btnClock{display:flex;justify-content:center;align-items:center;min-height:25px;height:25px}.matMenuClock{width:150px;height:150px;display:flex;flex-direction:column}.numbers{width:150px;height:120px;display:flex}.numbers>div{width:50px;height:120px;display:flex;flex-direction:column;align-items:center;overflow:scroll;scrollbar-width:none}.numbers>div::-webkit-scrollbar{display:none}.footerClock{width:150px;height:30px;display:flex;justify-content:space-around;align-items:center}.footerClock button{min-width:50px;min-height:20px;width:50px;height:20px;font-size:15px;display:flex;justify-content:center;align-items:center}\n"], components: [{ type: i1.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i2.MatMenu, selector: "mat-menu", exportAs: ["matMenu"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", exportAs: ["matMenuTrigger"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NgxTimepicker12Component, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngx-timepicker',
                    templateUrl: 'ngx-timepicker12.component.html',
                    styleUrls: ['ngx-timepicker12.component.scss'],
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
            }], min: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdGltZXBpY2tlcjEyL3NyYy9saWIvbmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdGltZXBpY2tlcjEyL3NyYy9saWIvbmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQVFwSCxNQUFNLE9BQU8sd0JBQXdCO0lBb0NuQztRQWxDUyxVQUFLLEdBQVUsR0FBRyxDQUFDO1FBQ25CLFdBQU0sR0FBVSxFQUFFLENBQUM7UUFDbkIsU0FBSSxHQUFVLEVBQUUsQ0FBQztRQUNqQixRQUFHLEdBQVUsVUFBVSxDQUFDO1FBQ3hCLFFBQUcsR0FBVSxVQUFVLENBQUM7UUFDeEIsYUFBUSxHQUFnQixJQUFJLENBQUM7UUFDN0IsbUJBQWMsR0FBa0IsSUFBSSxDQUFDO1FBQ3JDLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBQzVCLFNBQUksR0FBb0QsUUFBUSxDQUFBO1FBQ2hFLFFBQUcsR0FBVSxTQUFTLENBQUM7UUFDdkIsYUFBUSxHQUFXLEtBQUssQ0FBQztRQUV4QixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDekMseUJBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNsRCxhQUFRLEdBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUM7UUFDcEMsY0FBUyxHQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDO1FBQ3RDLFlBQU8sR0FBVSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQTtRQUNqQyxTQUFJLEdBQVUsQ0FB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Q3ZCO0lBQ0gsQ0FBQztJQUVNLFlBQVk7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVUsQ0FBQyxDQUFBO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFZLENBQUMsQ0FBQTtRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBWSxDQUFDLENBQUE7UUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7c0hBeGhCVSx3QkFBd0I7MEdBQXhCLHdCQUF3Qix3ZUNSckMsMmtGQXNETTs0RkQ5Q08sd0JBQXdCO2tCQUxwQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFdBQVcsRUFBRSxpQ0FBaUM7b0JBQzlDLFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDO2lCQUMvQzswRUFFdUIsV0FBVztzQkFBaEMsU0FBUzt1QkFBQyxTQUFTO2dCQUNYLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVJLGNBQWM7c0JBQXZCLE1BQU07Z0JBQ0csb0JBQW9CO3NCQUE3QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdE1lbnVUcmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbWVudSc7XG5pbXBvcnQgeyB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtdGltZXBpY2tlcicsXG4gIHRlbXBsYXRlVXJsOiAnbmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWyduZ3gtdGltZXBpY2tlcjEyLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE5neFRpbWVwaWNrZXIxMkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCxBZnRlclZpZXdJbml0LE9uQ2hhbmdlc3tcbiAgQFZpZXdDaGlsZCgndHJpZ2dlcicpIG1lbnVUcmlnZ2VyITogTWF0TWVudVRyaWdnZXI7XG4gIEBJbnB1dCgpIHdpZHRoOm51bWJlciA9IDEzMDtcbiAgQElucHV0KCkgaGVpZ2h0Om51bWJlciA9IDQwO1xuICBASW5wdXQoKSBmb250Om51bWJlciA9IDEwO1xuICBASW5wdXQoKSBtYXg6c3RyaW5nID0gJzIzOjU5OjU5JztcbiAgQElucHV0KCkgbWluOnN0cmluZyA9ICcwMDowMDowMCc7XG4gIEBJbnB1dCgpIHJlc3BvbnNlOiBudW1iZXJ8bnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHJlc3BvbnNlU3RyaW5nOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbmVlZFNlY29uZHM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSB0eXBlOiAnbWlsaXNlY29uZCd8J3NlY29uZCd8J21pbnV0ZSd8ICdob3VyJyB8ICd0aW1lJyA9ICdzZWNvbmQnXG4gIEBJbnB1dCgpIGNvcjpzdHJpbmcgPSBcIiM0OGI5YzdcIjtcbiAgQElucHV0KCkgZGlzYWJsZWQ6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSByZXNwb25zZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgcmVzcG9uc2VTdHJpbmdDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgcHVibGljIHdpZHRoQ3NzOnN0cmluZyA9IGAke3RoaXMud2lkdGh9cHhgO1xuICBwdWJsaWMgaGVpZ2h0Q3NzOnN0cmluZyA9IGAke3RoaXMuaGVpZ2h0fXB4YDtcbiAgcHVibGljIGZvbnRDc3M6c3RyaW5nID0gYCR7dGhpcy5mb250fXB4YFxuICBwdWJsaWMgaG91cjpudW1iZXIgPSAwO1xuICBwdWJsaWMgbWludXRlOm51bWJlciA9IDA7XG4gIHB1YmxpYyBzZWNvbmQ6bnVtYmVyID0gMDtcbiAgcHVibGljIHNlbGVjdGVkOidob3VyJ3wnbWludXRlJ3wnc2Vjb25kJ3xudWxsID0gbnVsbDtcbiAgcHVibGljIG1heEhvdXI6bnVtYmVyID0gMFxuICBwdWJsaWMgbWF4TWludXRlOm51bWJlciA9IDBcbiAgcHVibGljIG1heFNlY29uZDpudW1iZXIgPSAwXG4gIHB1YmxpYyBtaW5Ib3VyOm51bWJlciA9IDBcbiAgcHVibGljIG1pbk1pbnV0ZTpudW1iZXIgPSAwXG4gIHB1YmxpYyBtaW5TZWNvbmQ6bnVtYmVyID0gMFxuICBwdWJsaWMgZGlzYWJsZUNsb2NrOmJvb2xlYW4gPSB0cnVlO1xuICBwdWJsaWMgaG91ckNsb2NrOnN0cmluZ3xudWxsID0gbnVsbDtcbiAgcHVibGljIG1pbnV0ZUNsb2NrOnN0cmluZ3xudWxsID0gbnVsbDtcbiAgcHVibGljIHNlY29uZENsb2NrOnN0cmluZ3xudWxsID0gbnVsbDtcbiAgcHVibGljIG1heEhvdXJMZW5ndGg6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgbmV3SW5wdXQ6Ym9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgaG91clN0cmluZzpzdHJpbmcgPSAnJ1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIGlmKHRoaXMubWF4SG91ci50b1N0cmluZygpLmxlbmd0aCA8PSAxKSB7XG4gICAgICB0aGlzLm1heEhvdXJMZW5ndGggPSAyXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWF4SG91ckxlbmd0aCA9IHRoaXMubWF4SG91ci50b1N0cmluZygpLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmKHRoaXMubWluICE9ICcnKXtcbiAgICAgIGNvbnN0IGFycmF5TWluID0gdGhpcy5taW4uc3BsaXQoJzonKTtcbiAgICAgIHRoaXMubWluSG91cj1wYXJzZUludChhcnJheU1pblswXSlcbiAgICAgIHRoaXMubWluTWludXRlPXBhcnNlSW50KGFycmF5TWluWzFdKVxuICAgICAgdGhpcy5taW5TZWNvbmQ9cGFyc2VJbnQoYXJyYXlNaW5bMl0pXG4gICAgfVxuICAgIGlmKHRoaXMubWF4ICE9ICcnKXtcbiAgICAgIGNvbnN0IGFycmF5TWF4ID0gdGhpcy5tYXguc3BsaXQoJzonKTtcbiAgICAgIHRoaXMubWF4SG91cj1wYXJzZUludChhcnJheU1heFswXSlcbiAgICAgIHRoaXMubWF4TWludXRlPXBhcnNlSW50KGFycmF5TWF4WzFdKVxuICAgICAgdGhpcy5tYXhTZWNvbmQ9cGFyc2VJbnQoYXJyYXlNYXhbMl0pXG4gICAgfVxuICAgIGlmKHRoaXMucmVzcG9uc2VTdHJpbmcpe1xuICAgICAgdGhpcy5pbml0KHRoaXMucmVzcG9uc2VTdHJpbmcpXG4gICAgfVxuICAgIGlmKHRoaXMucmVzcG9uc2Upe1xuICAgICAgbGV0IHRpbWUgPSB0aGlzLnJlc3BvbnNlXG4gICAgICBpZih0aW1lPjM2MDApe1xuICAgICAgICB0aGlzLmhvdXIgPSBNYXRoLnJvdW5kKHRpbWUvMzYwMClcbiAgICAgICAgdGltZSAtPTM2MDAqdGhpcy5ob3VyXG4gICAgICB9XG4gICAgICBpZih0aW1lPjYwKXtcbiAgICAgICAgdGhpcy5taW51dGUgPSBNYXRoLnJvdW5kKHRpbWUvNjApXG4gICAgICAgIHRpbWUgLT02MCp0aGlzLm1pbnV0ZVxuICAgICAgfVxuICAgICAgaWYodGltZSl7XG4gICAgICAgIHRoaXMuc2Vjb25kID0gdGltZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgIC8vIFZlcmlmaWNhIHNlICdyZXNwb25zZVN0cmluZycgZm9pIGEgcHJvcHJpZWRhZGUgcXVlIG11ZG91XG4gICAgaWYgKGNoYW5nZXNbJ3Jlc3BvbnNlU3RyaW5nJ10pIHtcbiAgICAgIC8vIGNvbnN0IHByZXZpb3VzVmFsdWUgPSBjaGFuZ2VzWydyZXNwb25zZVN0cmluZyddLnByZXZpb3VzVmFsdWU7IC0tLSBjYXNvIHByZWNpc2UgZG8gdmFsb3IgYW50ZXMgZGEgbXVkYW7Dp2EgZG8gaW5wdXRcbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNoYW5nZXNbJ3Jlc3BvbnNlU3RyaW5nJ10uY3VycmVudFZhbHVlO1xuICAgICAgaWYoY3VycmVudFZhbHVlKXtcbiAgICAgICAgdGhpcy5pbml0KGN1cnJlbnRWYWx1ZSlcbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLmluaXQoXCIwMDowMDowMFwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2Rpc2FibGVkJ10pIHtcbiAgICAgIC8vIGNvbnN0IHByZXZpb3VzVmFsdWUgPSBjaGFuZ2VzWydyZXNwb25zZVN0cmluZyddLnByZXZpb3VzVmFsdWU7IC0tLSBjYXNvIHByZWNpc2UgZG8gdmFsb3IgYW50ZXMgZGEgbXVkYW7Dp2EgZG8gaW5wdXRcbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNoYW5nZXNbJ2Rpc2FibGVkJ10uY3VycmVudFZhbHVlO1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IGN1cnJlbnRWYWx1ZVxuICAgIH1cbiAgICBpZihjaGFuZ2VzWydtYXgnXSl7XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBjaGFuZ2VzWydtYXgnXS5jdXJyZW50VmFsdWU7XG4gICAgICBjb25zdCBhcnJheU1heCA9IGN1cnJlbnRWYWx1ZS5zcGxpdCgnOicpO1xuICAgICAgdGhpcy5tYXhIb3VyPXBhcnNlSW50KGFycmF5TWF4WzBdKVxuICAgICAgdGhpcy5tYXhNaW51dGU9cGFyc2VJbnQoYXJyYXlNYXhbMV0pXG4gICAgICB0aGlzLm1heFNlY29uZD1wYXJzZUludChhcnJheU1heFsyXSlcbiAgICAgIGlmKHRoaXMuaG91cj50aGlzLm1heEhvdXIpe1xuICAgICAgICB0aGlzLmhvdXIgPSB0aGlzLm1heEhvdXJcbiAgICAgIH1cbiAgICAgIGlmKHRoaXMubWludXRlPnRoaXMubWF4TWludXRlKXtcbiAgICAgICAgdGhpcy5taW51dGUgPSB0aGlzLm1heE1pbnV0ZVxuICAgICAgfVxuICAgICAgaWYodGhpcy5zZWNvbmQ+dGhpcy5tYXhTZWNvbmQpe1xuICAgICAgICB0aGlzLnNlY29uZCA9IHRoaXMubWF4U2Vjb25kXG4gICAgICB9XG4gICAgICBpZih0aGlzLm1heEhvdXIudG9TdHJpbmcoKS5sZW5ndGggPD0gMSkge1xuICAgICAgICB0aGlzLm1heEhvdXJMZW5ndGggPSAyXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1heEhvdXJMZW5ndGggPSB0aGlzLm1heEhvdXIudG9TdHJpbmcoKS5sZW5ndGhcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoY2hhbmdlc1snbWluJ10pe1xuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY2hhbmdlc1snbWluJ10uY3VycmVudFZhbHVlO1xuICAgICAgY29uc3QgYXJyYXlNaW4gPSBjdXJyZW50VmFsdWUuc3BsaXQoJzonKTtcbiAgICAgIHRoaXMubWluSG91cj1wYXJzZUludChhcnJheU1pblswXSlcbiAgICAgIHRoaXMubWluTWludXRlPXBhcnNlSW50KGFycmF5TWluWzFdKVxuICAgICAgdGhpcy5taW5TZWNvbmQ9cGFyc2VJbnQoYXJyYXlNaW5bMl0pXG4gICAgICBpZih0aGlzLmhvdXI8dGhpcy5taW5Ib3VyKXtcbiAgICAgICAgdGhpcy5ob3VyID10aGlzLm1pbkhvdXJcbiAgICAgIH1cbiAgICAgIGlmKHRoaXMubWludXRlPHRoaXMubWluTWludXRlKXtcbiAgICAgICAgdGhpcy5taW51dGUgPXRoaXMubWluTWludXRlXG4gICAgICB9XG4gICAgICBpZih0aGlzLnNlY29uZDx0aGlzLm1pblNlY29uZCl7XG4gICAgICAgIHRoaXMuc2Vjb25kID10aGlzLm1pblNlY29uZFxuICAgICAgfVxuICAgIH1cbiAgICBpZihjaGFuZ2VzWyduZWVkU2Vjb25kcyddKXtcbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNoYW5nZXNbJ25lZWRTZWNvbmRzJ10uY3VycmVudFZhbHVlO1xuICAgICAgdGhpcy5uZWVkU2Vjb25kcyA9IGN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaW5pdChyZXNwb25zZVN0cmluZzpTdHJpbmcpe1xuICAgIGxldCBhcnJheSA9IHJlc3BvbnNlU3RyaW5nLnNwbGl0KCc6Jyk7XG4gICAgICAgIGlmKHRoaXMubmVlZFNlY29uZHMpe1xuICAgICAgICAgICAgdGhpcy5ob3VyID0gcGFyc2VJbnQoYXJyYXlbMF0pO1xuICAgICAgICAgICAgdGhpcy5taW51dGUgPSBwYXJzZUludChhcnJheVsxXSk7XG4gICAgICAgICAgICB0aGlzLnNlY29uZCA9IHBhcnNlSW50KGFycmF5WzJdKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmhvdXIgPSBwYXJzZUludChhcnJheVswXSk7XG4gICAgICAgICAgICB0aGlzLm1pbnV0ZSA9IHBhcnNlSW50KGFycmF5WzFdKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGlmKGlzTmFOKHRoaXMuaG91cikgfHwgaXNOYU4odGhpcy5taW51dGUpIHx8IGlzTmFOKHRoaXMuc2Vjb25kKSl7XG4gICAgICAgICAgdGhpcy5ob3VyID0gMFxuICAgICAgICAgIHRoaXMubWludXRlID0gMFxuICAgICAgICAgIHRoaXMuc2Vjb25kID0gMFxuICAgICAgICB9XG4gIH1cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsKGUpPT57XG4gICAgICAgIGlmKGUuY29kZSA9PSAnVGFiJyl7XG4gICAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnbWludXRlJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdzZWNvbmQnXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gbnVsbFxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihlLmNvZGUgPT0gJ0Fycm93VXAnKXtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICAgIGlmKHRoaXMuaG91cj09dGhpcy5tYXhIb3VyKXtcbiAgICAgICAgICAgICAgICB0aGlzLmhvdXIgPSB0aGlzLm1pbkhvdXJcbiAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3VyKytcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgdGhpcy5taW51dGUrK1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWNvbmQrK1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihlLmNvZGUgPT0gJ0Fycm93RG93bicpe1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgICAgaWYodGhpcy5ob3VyPT10aGlzLm1pbkhvdXIpe1xuICAgICAgICAgICAgICAgIHRoaXMuaG91cj10aGlzLm1heEhvdXJcbiAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3VyLS1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgaWYodGhpcy5taW51dGU9PTApe1xuICAgICAgICAgICAgICAgIHRoaXMubWludXRlPTU5XG4gICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMubWludXRlLS1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgaWYodGhpcy5zZWNvbmQ9PTApe1xuICAgICAgICAgICAgICAgIHRoaXMuc2Vjb25kPTU5XG4gICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuc2Vjb25kLS1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihlLmNvZGUgPT0gJ0Fycm93UmlnaHQnKXtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnbWludXRlJztcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnc2Vjb25kJztcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZS5jb2RlID09ICdBcnJvd0xlZnQnKXtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdtaW51dGUnO1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdob3VyJztcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZS5jb2RlID09J0JhY2tzcGFjZScpe1xuICAgICAgICAgIHN3aXRjaCh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICB0aGlzLmFwYWdhcignaG91cicpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICB0aGlzLmFwYWdhcignbWludXRlJylcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICAgIHRoaXMuYXBhZ2FyKCdzZWNvbmQnKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgc3dpdGNoKGUua2V5KXtcbiAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcigxLHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcigyLHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICczJzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcigzLHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICc0JzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcig0LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICc1JzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcig1LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICc2JzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcig2LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICc3JzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcig3LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICc4JzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcig4LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICc5JzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcig5LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICcwJzpcbiAgICAgICAgICAgIHRoaXMuZGlnaXRhcigwLHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUoKVxuICAgICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBsb3N0Rm9jdXMoKXtcbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbFxuICB9XG5cbiAgcHVibGljIGZvY3VzKCRldmVudDphbnkpe1xuICAgIGlmKCF0aGlzLmRpc2FibGVkKXtcbiAgICAgIHN3aXRjaCgkZXZlbnQudGFyZ2V0LmlkKXtcbiAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdob3VyJztcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnbWludXRlJztcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnc2Vjb25kJztcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhcGFnYXIobG9jYWw6ICdob3VyJ3wnbWludXRlJ3wnc2Vjb25kJ3xudWxsKSB7XG4gICAgaWYobG9jYWwpe1xuICAgICAgaWYobG9jYWw9PSdob3VyJyl7XG4gICAgICAgIGxldCBob3JhID0gdGhpcy5ob3VyLnRvU3RyaW5nKCkuc3BsaXQoJycpO1xuICAgICAgICBpZihob3JhLmxlbmd0aD4xKXtcbiAgICAgICAgICBsZXQgcmV0aXJhZG8gPSBob3JhLnBvcCgpO1xuICAgICAgICB0aGlzLmhvdXIgPSAgcGFyc2VJbnQoaG9yYS5qb2luKCcnKSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5ob3VyID0gMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihsb2NhbD09J21pbnV0ZScpe1xuICAgICAgICBsZXQgbWludXRvID0gdGhpcy5taW51dGUudG9TdHJpbmcoKS5zcGxpdCgnJyk7XG4gICAgICAgIGlmKG1pbnV0by5sZW5ndGg+MSl7XG4gICAgICAgIGxldCByZXRpcmFkbyA9IG1pbnV0by5wb3AoKTtcbiAgICAgICAgdGhpcy5taW51dGUgPSAgcGFyc2VJbnQobWludXRvLmpvaW4oJycpKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5taW51dGUgPSAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGxvY2FsPT0nc2Vjb25kJyl7XG4gICAgICAgIGxldCBzZWd1bmRvID0gdGhpcy5zZWNvbmQudG9TdHJpbmcoKS5zcGxpdCgnJyk7XG4gICAgICAgIGlmKHNlZ3VuZG8ubGVuZ3RoPjEpe1xuICAgICAgICBsZXQgcmV0aXJhZG8gPSBzZWd1bmRvLnBvcCgpO1xuICAgICAgICB0aGlzLnNlY29uZCA9ICBwYXJzZUludChzZWd1bmRvLmpvaW4oJycpKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLnNlY29uZCA9IDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkaWdpdGFyKG51bTpudW1iZXIsbG9jYWw6J2hvdXInfCdtaW51dGUnfCdzZWNvbmQnfG51bGwpe1xuICAgIGlmKGxvY2FsKXtcbiAgICAgIGlmKGxvY2FsPT0naG91cicpe1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5uZXdJbnB1dCl7XG4gICAgICAgICAgdGhpcy5ob3VyPXBhcnNlSW50KCcwJytudW0pXG4gICAgICAgICAgdGhpcy5uZXdJbnB1dCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuaG91clN0cmluZyA9IG51bS50b1N0cmluZygpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuaG91cj1wYXJzZUludCh0aGlzLmhvdXIudG9TdHJpbmcoKStudW0pXG4gICAgICAgICAgdGhpcy5ob3VyU3RyaW5nICs9IG51bVxuICAgICAgICAgIGlmKHRoaXMuaG91clN0cmluZy5sZW5ndGggPT0gdGhpcy5tYXhIb3VyLnRvU3RyaW5nKCkubGVuZ3RoKXtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnbWludXRlJztcbiAgICAgICAgICAgIHRoaXMubmV3SW5wdXQ9dHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYobG9jYWw9PSdtaW51dGUnKXtcbiAgICAgICAgaWYodGhpcy5uZXdJbnB1dCl7XG4gICAgICAgICAgdGhpcy5taW51dGU9cGFyc2VJbnQoJzAnK251bSlcbiAgICAgICAgICB0aGlzLm5ld0lucHV0ID0gZmFsc2VcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5taW51dGU9cGFyc2VJbnQodGhpcy5taW51dGUudG9TdHJpbmcoKStudW0pXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdzZWNvbmQnO1xuICAgICAgICAgIHRoaXMubmV3SW5wdXQ9dHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihsb2NhbD09J3NlY29uZCcpe1xuICAgICAgICBpZih0aGlzLm5ld0lucHV0KXtcbiAgICAgICAgICB0aGlzLnNlY29uZD1wYXJzZUludCgnMCcrbnVtKVxuICAgICAgICAgIHRoaXMubmV3SW5wdXQgPSBmYWxzZVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLnNlY29uZD1wYXJzZUludCh0aGlzLnNlY29uZC50b1N0cmluZygpK251bSlcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gbnVsbDtcbiAgICAgICAgICB0aGlzLm5ld0lucHV0PXRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVWYWx1ZSgpOiB2b2lkIHtcbiAgICBpZih0aGlzLm1pbnV0ZT41OSB8fCB0aGlzLm1pbnV0ZTwwKXtcbiAgICAgIHRoaXMubWludXRlID0gMFxuICAgIH1cblxuICAgIGlmKHRoaXMuc2Vjb25kPjU5IHx8IHRoaXMuc2Vjb25kPDApe1xuICAgICAgdGhpcy5zZWNvbmQgPSAwXG4gICAgfVxuICAgIGlmKHRoaXMuaG91cjx0aGlzLm1pbkhvdXIpe1xuICAgICAgdGhpcy5ob3VyID0gdGhpcy5taW5Ib3VyO1xuICAgIH1cbiAgICBpZih0aGlzLmhvdXI+dGhpcy5tYXhIb3VyKXtcbiAgICAgIHRoaXMuaG91ciA9IHRoaXMubWF4SG91cjtcbiAgICB9XG4gICAgaWYodGhpcy5ob3VyPT10aGlzLm1heEhvdXIgJiYgdGhpcy5taW51dGU+dGhpcy5tYXhNaW51dGUpe1xuICAgICAgdGhpcy5taW51dGU9dGhpcy5tYXhNaW51dGVcbiAgICB9XG4gICAgaWYodGhpcy5ob3VyPT10aGlzLm1pbkhvdXIgJiYgdGhpcy5taW51dGU8dGhpcy5taW5NaW51dGUpe1xuICAgICAgdGhpcy5taW51dGU9dGhpcy5taW5NaW51dGVcbiAgICB9XG4gICAgaWYodGhpcy5ob3VyPT10aGlzLm1heEhvdXIgJiYgdGhpcy5taW51dGU9PXRoaXMubWF4TWludXRlICYmIHRoaXMuc2Vjb25kPnRoaXMubWF4U2Vjb25kKXtcbiAgICAgIHRoaXMuc2Vjb25kPXRoaXMubWF4U2Vjb25kXG4gICAgfVxuICAgIGlmKHRoaXMuaG91cj09dGhpcy5taW5Ib3VyICYmIHRoaXMubWludXRlPT10aGlzLm1pbk1pbnV0ZSAmJiB0aGlzLnNlY29uZDx0aGlzLm1pblNlY29uZCl7XG4gICAgICB0aGlzLnNlY29uZD10aGlzLm1pblNlY29uZFxuICAgIH1cbiAgICBzd2l0Y2godGhpcy50eXBlKXtcbiAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhU2VndW5kbyA9ICgodGhpcy5ob3VyKjYwKSt0aGlzLm1pbnV0ZSkqNjArdGhpcy5zZWNvbmRcbiAgICAgICAgdGhpcy5yZXNwb25zZUNoYW5nZS5lbWl0KHJlc3Bvc3RhU2VndW5kbyk7XG4gICAgICAgIHRoaXMucmVzcG9uc2VTdHJpbmdDaGFuZ2UuZW1pdChyZXNwb3N0YVNlZ3VuZG8udG9TdHJpbmcoKSk7XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICBjb25zdCByZXNwb3N0YU1pbnV0byA9ICgodGhpcy5ob3VyKjYwKStNYXRoLmZsb29yKHRoaXMuc2Vjb25kLzYwKSkrdGhpcy5taW51dGVcbiAgICAgICAgdGhpcy5yZXNwb25zZUNoYW5nZS5lbWl0KHJlc3Bvc3RhTWludXRvKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhTWludXRvLnRvU3RyaW5nKCkpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdtaWxpc2Vjb25kJzpcbiAgICAgICAgY29uc3QgcmVzcG9zdGFNaWxpc2VndW5kbyA9ICgoKHRoaXMuaG91cio2MCkrdGhpcy5taW51dGUpKjYwK3RoaXMuc2Vjb25kKSoxMDAwO1xuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFNaWxpc2VndW5kbyk7XG4gICAgICAgIHRoaXMucmVzcG9uc2VTdHJpbmdDaGFuZ2UuZW1pdChyZXNwb3N0YU1pbGlzZWd1bmRvLnRvU3RyaW5nKCkpO1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhSG9yYSA9IE1hdGguZmxvb3IoKE1hdGguZmxvb3IodGhpcy5zZWNvbmQvNjApK3RoaXMubWludXRlKS82MCkrdGhpcy5ob3VyO1xuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFIb3JhKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhSG9yYS50b1N0cmluZygpKTtcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICBjb25zdCByZXNwb3N0YSA9IGAke3RoaXMuaG91ci50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMuaG91cjp0aGlzLmhvdXJ9OiR7dGhpcy5taW51dGUudG9TdHJpbmcoKS5sZW5ndGg9PT0xPycwJyt0aGlzLm1pbnV0ZTp0aGlzLm1pbnV0ZX06JHt0aGlzLnNlY29uZC50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMuc2Vjb25kOnRoaXMuc2Vjb25kfWBcbiAgICAgICAgY29uc3QgcmVzcG9zdGFTZXBhcmFkYSA9IHtcbiAgICAgICAgICBob3VyOnRoaXMuaG91cixcbiAgICAgICAgICBtaW51dGU6dGhpcy5taW51dGUsXG4gICAgICAgICAgc2Vjb25kOnRoaXMuc2Vjb25kXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZUNoYW5nZS5lbWl0KHJlc3Bvc3RhU2VwYXJhZGEpO1xuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBtYXhDbG9jaygpe1xuICAgIHRoaXMuaG91ciA9IHRoaXMubWF4SG91cjtcbiAgICB0aGlzLm1pbnV0ZSA9IHRoaXMubWF4TWludXRlO1xuICAgIHRoaXMuc2Vjb25kID0gdGhpcy5tYXhTZWNvbmQ7XG4gICAgdGhpcy5mZWNoYXJNZW51KHRoaXMubWVudVRyaWdnZXIpO1xuICB9XG5cbiAgcHVibGljIG5vd0Nsb2NrKCl7XG4gICAgY29uc3QgYWdvcmEgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGhvcmFzID0gYWdvcmEuZ2V0SG91cnMoKTtcbiAgICBjb25zdCBtaW51dG9zID0gYWdvcmEuZ2V0TWludXRlcygpO1xuICAgIGNvbnN0IHNlZ3VuZG9zID0gYWdvcmEuZ2V0U2Vjb25kcygpO1xuXG4gICAgdGhpcy5ob3VyID0gaG9yYXM7XG4gICAgdGhpcy5taW51dGUgPSBtaW51dG9zO1xuICAgIHRoaXMuc2Vjb25kID0gc2VndW5kb3M7XG4gICAgdGhpcy5mZWNoYXJNZW51KHRoaXMubWVudVRyaWdnZXIpO1xuICB9XG5cbiAgcHVibGljIGZlY2hhck1lbnUodHJpZ2dlcjpNYXRNZW51VHJpZ2dlcikge1xuICAgIHRoaXMuZGlzYWJsZUNsb2NrID0gdHJ1ZVxuICAgIHRyaWdnZXIuY2xvc2VNZW51KCk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZSgpO1xuICB9XG5cbiAgcHVibGljIHByZWVuY2hlckRpdnMoKSB7XG4gICAgdGhpcy5kaXNhYmxlQ2xvY2sgPSB0cnVlO1xuICAgIHRoaXMuaG91ckNsb2NrID0gbnVsbDtcbiAgICB0aGlzLm1pbnV0ZUNsb2NrID0gbnVsbDtcbiAgICB0aGlzLnNlY29uZENsb2NrID0gbnVsbDtcbiAgICB0aGlzLmRlc3Ryb3lEaXZzKCdob3VyQ2xvY2snKVxuICAgIHRoaXMuZGVzdHJveURpdnMoJ21pbnV0ZUNsb2NrJylcbiAgICB0aGlzLmRlc3Ryb3lEaXZzKCdzZWNvbmRDbG9jaycpXG4gICAgY29uc3QgY3JpYXJEaXZzID0gKHBhcmVudEVsZW1lbnRJZDogc3RyaW5nLCBpZDogbnVtYmVyLCBsaW1pdGU6IG51bWJlcikgPT4ge1xuXG4gICAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyZW50RWxlbWVudElkKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gbGltaXRlOyBpKyspIHtcbiAgICAgICAgY29uc3QgbnVtYmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG51bWJlckRpdi50ZXh0Q29udGVudCA9IGkgPCAxMCA/IGAwJHtpfWAgOiBgJHtpfWA7XG4gICAgICAgIG51bWJlckRpdi5zdHlsZS5ib3JkZXJCb3R0b20gPSBcIjFweCBzb2xpZCBibGFja1wiO1xuICAgICAgICBudW1iZXJEaXYuc3R5bGUucGFkZGluZyA9IFwiNXB4IDEwcHhcIjtcbiAgICAgICAgbnVtYmVyRGl2LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgICBudW1iZXJEaXYuc3R5bGUubWFyZ2luID0gXCIycHhcIjtcblxuICAgICAgICBsZXQgY2xhc3NJZGVudGlmaWVyID0gJyc7XG4gICAgICAgIHN3aXRjaChpZCkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNsYXNzSWRlbnRpZmllciA9ICdudW1Ib3VyQ2xvY2snO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY2xhc3NJZGVudGlmaWVyID0gJ251bU1pbnV0ZUNsb2NrJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNsYXNzSWRlbnRpZmllciA9ICdudW1TZWNvbmRDbG9jayc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBudW1iZXJEaXYuY2xhc3NMaXN0LmFkZChjbGFzc0lkZW50aWZpZXIpO1xuXG4gICAgICAgIG51bWJlckRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBhbGxTaWJsaW5ncyA9IHBhcmVudEVsZW1lbnQhLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2NsYXNzSWRlbnRpZmllcn1gKTtcbiAgICAgICAgICBhbGxTaWJsaW5ncy5mb3JFYWNoKHNpYmxpbmcgPT4ge1xuICAgICAgICAgICAgaWYgKHNpYmxpbmcgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICBzaWJsaW5nLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZihjbGFzc0lkZW50aWZpZXIgPT09ICdudW1Ib3VyQ2xvY2snKSB0aGlzLmhvdXJDbG9jayA9IG51bWJlckRpdi50ZXh0Q29udGVudDtcbiAgICAgICAgICBpZihjbGFzc0lkZW50aWZpZXIgPT09ICdudW1NaW51dGVDbG9jaycpIHRoaXMubWludXRlQ2xvY2sgPSBudW1iZXJEaXYudGV4dENvbnRlbnQ7XG4gICAgICAgICAgaWYoY2xhc3NJZGVudGlmaWVyID09PSAnbnVtU2Vjb25kQ2xvY2snKSB0aGlzLnNlY29uZENsb2NrID0gbnVtYmVyRGl2LnRleHRDb250ZW50O1xuXG4gICAgICAgICAgbnVtYmVyRGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRibHVlXCI7XG5cbiAgICAgICAgICBpZih0aGlzLmhvdXJDbG9jayAmJiB0aGlzLm1pbnV0ZUNsb2NrICYmIHRoaXMuc2Vjb25kQ2xvY2spe1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlQ2xvY2sgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBhcmVudEVsZW1lbnQhLmFwcGVuZENoaWxkKG51bWJlckRpdik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNyaWFyRGl2cygnaG91ckNsb2NrJywgMCwgdGhpcy5tYXhIb3VyKTtcbiAgICBjcmlhckRpdnMoJ21pbnV0ZUNsb2NrJywgMSwgNTkpO1xuICAgIGNyaWFyRGl2cygnc2Vjb25kQ2xvY2snLCAyLCA1OSk7XG4gIH1cblxuICBwdWJsaWMgZGVzdHJveURpdnMoaWQ6c3RyaW5nKXtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGlmKGVsZW1lbnQpe1xuICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSAnJ1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjb25maXJtQ2xvY2soKXtcbiAgICB0aGlzLmhvdXIgPSBwYXJzZUludCh0aGlzLmhvdXJDbG9jayEpXG4gICAgdGhpcy5taW51dGUgPSBwYXJzZUludCh0aGlzLm1pbnV0ZUNsb2NrISlcbiAgICB0aGlzLnNlY29uZCA9IHBhcnNlSW50KHRoaXMuc2Vjb25kQ2xvY2shKVxuICAgIHRoaXMuZmVjaGFyTWVudSh0aGlzLm1lbnVUcmlnZ2VyKTtcbiAgfVxufVxuIiwiPGRpdiBcbmNsYXNzPVwidGltZXBpY2tlclwiXG5bc3R5bGUud2lkdGhdPVwid2lkdGhDc3NcIiBcbltzdHlsZS5oZWlnaHRdPVwiaGVpZ2h0Q3NzXCIgIFxuW3N0eWxlLmJvcmRlckJvdHRvbV09XCJkaXNhYmxlZCA/ICcxcHggc29saWQgZ3JheScgOiAnMXB4IHNvbGlkIGJsYWNrJ1wiPlxuICA8ZGl2IFxuICBpZD1cImhvdXJcIiBcbiAgdGFiaW5kZXg9XCIxXCIgXG4gIChibHVyKT1cImxvc3RGb2N1cygpXCIgXG4gIChmb2N1cyk9XCJmb2N1cygkZXZlbnQpXCIgXG4gIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cInNlbGVjdGVkPT09J2hvdXInPyBjb3IgOiAndHJhbnNwYXJlbnQnXCIgXG4gIFtzdHlsZS5jb2xvcl09XCJkaXNhYmxlZCA/ICdncmF5JyA6ICdibGFjaydcIlxuICAoY2xpY2spPVwiZm9jdXMoJGV2ZW50KVwiPnt7aG91ci50b1N0cmluZygpLmxlbmd0aCAtIG1heEhvdXJMZW5ndGggIT09IDAgPyAoJzAnLnJlcGVhdChtYXhIb3VyTGVuZ3RoIC0gaG91ci50b1N0cmluZygpLmxlbmd0aCkpICsgdGhpcy5ob3VyIDogdGhpcy5ob3VyfX1cbjwvZGl2PlxuICA8ZGl2XG4gIFtzdHlsZS5jb2xvcl09XCJkaXNhYmxlZCA/ICdncmF5JyA6ICdibGFjaydcIlxuICA+OjwvZGl2PlxuICA8ZGl2IFxuICBpZD1cIm1pbnV0ZVwiIFxuICB0YWJpbmRleD1cIjFcIiBcbiAgKGJsdXIpPVwibG9zdEZvY3VzKClcIiBcbiAgKGZvY3VzKT1cImZvY3VzKCRldmVudClcIiBcbiAgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwic2VsZWN0ZWQ9PT0nbWludXRlJz8gY29yIDogJ3RyYW5zcGFyZW50J1wiIFxuICBbc3R5bGUuY29sb3JdPVwiZGlzYWJsZWQgPyAnZ3JheScgOiAnYmxhY2snXCJcbiAgKGNsaWNrKT1cImZvY3VzKCRldmVudClcIj57e21pbnV0ZS50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMubWludXRlOnRoaXMubWludXRlfX08L2Rpdj5cbiAgPGRpdiAqbmdJZj1cIm5lZWRTZWNvbmRzXCJcbiAgW3N0eWxlLmNvbG9yXT1cImRpc2FibGVkID8gJ2dyYXknIDogJ2JsYWNrJ1wiXG4gID46PC9kaXY+XG4gIDxkaXYgXG4gICpuZ0lmPVwibmVlZFNlY29uZHNcIiBcbiAgaWQ9XCJzZWNvbmRcIiBbc3R5bGUuY29sb3JdPVwiZGlzYWJsZWQgPyAnZ3JheScgOiAnYmxhY2snXCIgXG4gIHRhYmluZGV4PVwiMVwiIChibHVyKT1cImxvc3RGb2N1cygpXCIgKGZvY3VzKT1cImZvY3VzKCRldmVudClcIiBcbiAgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwic2VsZWN0ZWQ9PT0nc2Vjb25kJz8gY29yIDogJ3RyYW5zcGFyZW50J1wiIFxuICAoY2xpY2spPVwiZm9jdXMoJGV2ZW50KVwiPnt7c2Vjb25kLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5zZWNvbmQ6dGhpcy5zZWNvbmR9fVxuICA8L2Rpdj5cbiAgPGJ1dHRvbiAqbmdJZj1cIiFkaXNhYmxlZFwiIG1hdC1pY29uLWJ1dHRvbiBzdHlsZT1cInBhZGRpbmc6MjBweDtwb3NpdGlvbjpyZWxhdGl2ZTtib3R0b206MXB4XCIgW21hdE1lbnVUcmlnZ2VyRm9yXT1cImFib3ZlTWVudVwiICN0cmlnZ2VyPVwibWF0TWVudVRyaWdnZXJcIiBjbGFzcz1cImJ0bkNsb2NrXCIgKGNsaWNrKT1cInByZWVuY2hlckRpdnMoKVwiPlxuICAgIDxzdmcgd2lkdGg9XCIyMHB4XCIgaGVpZ2h0PVwiMjBweFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBzdHlsZT1cIndpZHRoOiAxN3B4O1wiPlxuICAgICAgPHBhdGggZD1cIk0xMiA3VjEySDE1TTIxIDEyQzIxIDE2Ljk3MDYgMTYuOTcwNiAyMSAxMiAyMUM3LjAyOTQ0IDIxIDMgMTYuOTcwNiAzIDEyQzMgNy4wMjk0NCA3LjAyOTQ0IDMgMTIgM0MxNi45NzA2IDMgMjEgNy4wMjk0NCAyMSAxMlpcIiBzdHJva2U9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cbiAgICA8L3N2Zz5cbiAgPC9idXR0b24+XG4gIDxtYXQtbWVudSAjYWJvdmVNZW51PVwibWF0TWVudVwiIHlQb3NpdGlvbj1cImFib3ZlXCI+XG4gIDxkaXYgY2xhc3M9XCJtYXRNZW51Q2xvY2tcIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiPlxuICAgIDxkaXYgY2xhc3M9XCJudW1iZXJzXCI+XG4gICAgICA8ZGl2IGlkPVwiaG91ckNsb2NrXCI+PC9kaXY+XG4gICAgICA8ZGl2IGlkPVwibWludXRlQ2xvY2tcIj48L2Rpdj5cbiAgICAgIDxkaXYgaWQ9XCJzZWNvbmRDbG9ja1wiPjwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJmb290ZXJDbG9ja1wiPlxuICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiAqbmdJZj1cIm1heCAhPT0gJzIzOjU5OjU5J1wiIChjbGljayk9XCJtYXhDbG9jaygpXCI+TWF4PC9idXR0b24+XG4gICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uICpuZ0lmPVwibWF4ID09ICcyMzo1OTo1OSdcIiAoY2xpY2spPVwibm93Q2xvY2soKVwiPk5vdzwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiBbZGlzYWJsZWRdPVwiZGlzYWJsZUNsb2NrXCIgKGNsaWNrKT1cImNvbmZpcm1DbG9jaygpXCI+T2s8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvbWF0LW1lbnU+XG48L2Rpdj4iXX0=