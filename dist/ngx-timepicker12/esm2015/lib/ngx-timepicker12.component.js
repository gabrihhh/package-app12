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
        this.newInput = true;
        this.hourString = '';
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
NgxTimepicker12Component.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: NgxTimepicker12Component, selector: "ngx-timepicker", inputs: { width: "width", height: "height", font: "font", max: "max", min: "min", response: "response", responseString: "responseString", needSeconds: "needSeconds", type: "type", cor: "cor", disabled: "disabled" }, outputs: { responseChange: "responseChange", responseStringChange: "responseStringChange" }, viewQueries: [{ propertyName: "menuTrigger", first: true, predicate: ["trigger"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div \nclass=\"timepicker\"\n[style.width]=\"widthCss\" \n[style.height]=\"heightCss\"  \n[style.borderBottom]=\"disabled ? '1px solid gray' : '1px solid black'\">\n  <div \n  id=\"hour\" \n  tabindex=\"1\" \n  (blur)=\"lostFocus()\" \n  (focus)=\"focus($event)\" \n  [style.background-color]=\"selected==='hour'? cor : 'transparent'\" \n  [style.color]=\"disabled ? 'gray' : 'black'\"\n  (click)=\"focus($event)\">{{hour.toString().length - maxHour.toString().length !== 0 ? ('0'.repeat(maxHour.toString().length - hour.toString().length))+ this.hour : this.hour}}\n</div>\n  <div\n  [style.color]=\"disabled ? 'gray' : 'black'\"\n  >:</div>\n  <div \n  id=\"minute\" \n  tabindex=\"1\" \n  (blur)=\"lostFocus()\" \n  (focus)=\"focus($event)\" \n  [style.background-color]=\"selected==='minute'? cor : 'transparent'\" \n  [style.color]=\"disabled ? 'gray' : 'black'\"\n  (click)=\"focus($event)\">{{minute.toString().length===1?'0'+this.minute:this.minute}}</div>\n  <div *ngIf=\"needSeconds\"\n  [style.color]=\"disabled ? 'gray' : 'black'\"\n  >:</div>\n  <div \n  *ngIf=\"needSeconds\" \n  id=\"second\" [style.color]=\"disabled ? 'gray' : 'black'\" \n  tabindex=\"1\" (blur)=\"lostFocus()\" (focus)=\"focus($event)\" \n  [style.background-color]=\"selected==='second'? cor : 'transparent'\" \n  (click)=\"focus($event)\">{{second.toString().length===1?'0'+this.second:this.second}}\n  </div>\n  <button *ngIf=\"!disabled\" mat-icon-button style=\"padding:20px;position:relative;bottom:1px\" [matMenuTriggerFor]=\"aboveMenu\" #trigger=\"matMenuTrigger\" class=\"btnClock\" (click)=\"preencherDivs()\">\n    <svg width=\"20px\" height=\"20px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" style=\"width: 17px;\">\n      <path d=\"M12 7V12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    </svg>\n  </button>\n  <mat-menu #aboveMenu=\"matMenu\" yPosition=\"above\">\n  <div class=\"matMenuClock\" (click)=\"$event.stopPropagation();\">\n    <div class=\"numbers\">\n      <div id=\"hourClock\"></div>\n      <div id=\"minuteClock\"></div>\n      <div id=\"secondClock\"></div>\n    </div>\n    <div class=\"footerClock\">\n      <button mat-raised-button *ngIf=\"max !== '23:59:59'\" (click)=\"maxClock()\">Max</button>\n      <button mat-raised-button *ngIf=\"max == '23:59:59'\" (click)=\"nowClock()\">Now</button>\n      <button mat-raised-button [disabled]=\"disableClock\" (click)=\"confirmClock()\">Ok</button>\n    </div>\n  </div>\n  </mat-menu>\n</div>", styles: [".timepicker{border-bottom:1px solid gray;display:flex;flex-wrap:nowrap;justify-content:center;align-items:center}div{-webkit-user-select:none;user-select:none}div:focus{outline:none}.btnClock{margin:0 5px;height:30px;min-width:25px;display:flex;justify-content:center;align-items:center}.btnClock{display:flex;justify-content:center;align-items:center;min-height:25px;height:25px}.matMenuClock{width:150px;height:150px;display:flex;flex-direction:column}.numbers{width:150px;height:120px;display:flex}.numbers>div{width:50px;height:120px;display:flex;flex-direction:column;align-items:center;overflow:scroll;scrollbar-width:none}.numbers>div::-webkit-scrollbar{display:none}.footerClock{width:150px;height:30px;display:flex;justify-content:space-around;align-items:center}.footerClock button{min-width:50px;min-height:20px;width:50px;height:20px;font-size:15px;display:flex;justify-content:center;align-items:center}\n"], components: [{ type: i1.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i2.MatMenu, selector: "mat-menu", exportAs: ["matMenu"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", exportAs: ["matMenuTrigger"] }] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdGltZXBpY2tlcjEyL3NyYy9saWIvbmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdGltZXBpY2tlcjEyL3NyYy9saWIvbmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQVFwSCxNQUFNLE9BQU8sd0JBQXdCO0lBbUNuQztRQWpDUyxVQUFLLEdBQVUsR0FBRyxDQUFDO1FBQ25CLFdBQU0sR0FBVSxFQUFFLENBQUM7UUFDbkIsU0FBSSxHQUFVLEVBQUUsQ0FBQztRQUNqQixRQUFHLEdBQVUsVUFBVSxDQUFDO1FBQ3hCLFFBQUcsR0FBVSxVQUFVLENBQUM7UUFDeEIsYUFBUSxHQUFnQixJQUFJLENBQUM7UUFDN0IsbUJBQWMsR0FBa0IsSUFBSSxDQUFDO1FBQ3JDLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBQzVCLFNBQUksR0FBb0QsUUFBUSxDQUFBO1FBQ2hFLFFBQUcsR0FBVSxTQUFTLENBQUM7UUFDdkIsYUFBUSxHQUFXLEtBQUssQ0FBQztRQUV4QixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDekMseUJBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNsRCxhQUFRLEdBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUM7UUFDcEMsY0FBUyxHQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDO1FBQ3RDLFlBQU8sR0FBVSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQTtRQUNqQyxTQUFJLEdBQVUsQ0FB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RyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFFSSxjQUFjO3NCQUF2QixNQUFNO2dCQUNHLG9CQUFvQjtzQkFBN0IsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRNZW51VHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xuaW1wb3J0IHsgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXRpbWVwaWNrZXInLFxuICB0ZW1wbGF0ZVVybDogJ25neC10aW1lcGlja2VyMTIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUaW1lcGlja2VyMTJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsQWZ0ZXJWaWV3SW5pdCxPbkNoYW5nZXN7XG4gIEBWaWV3Q2hpbGQoJ3RyaWdnZXInKSBtZW51VHJpZ2dlciE6IE1hdE1lbnVUcmlnZ2VyO1xuICBASW5wdXQoKSB3aWR0aDpudW1iZXIgPSAxMzA7XG4gIEBJbnB1dCgpIGhlaWdodDpudW1iZXIgPSA0MDtcbiAgQElucHV0KCkgZm9udDpudW1iZXIgPSAxMDtcbiAgQElucHV0KCkgbWF4OnN0cmluZyA9ICcyMzo1OTo1OSc7XG4gIEBJbnB1dCgpIG1pbjpzdHJpbmcgPSAnMDA6MDA6MDAnO1xuICBASW5wdXQoKSByZXNwb25zZTogbnVtYmVyfG51bGwgPSBudWxsO1xuICBASW5wdXQoKSByZXNwb25zZVN0cmluZzogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG5lZWRTZWNvbmRzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgdHlwZTogJ21pbGlzZWNvbmQnfCdzZWNvbmQnfCdtaW51dGUnfCAnaG91cicgfCAndGltZScgPSAnc2Vjb25kJ1xuICBASW5wdXQoKSBjb3I6c3RyaW5nID0gXCIjNDhiOWM3XCI7XG4gIEBJbnB1dCgpIGRpc2FibGVkOmJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgcmVzcG9uc2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHJlc3BvbnNlU3RyaW5nQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHB1YmxpYyB3aWR0aENzczpzdHJpbmcgPSBgJHt0aGlzLndpZHRofXB4YDtcbiAgcHVibGljIGhlaWdodENzczpzdHJpbmcgPSBgJHt0aGlzLmhlaWdodH1weGA7XG4gIHB1YmxpYyBmb250Q3NzOnN0cmluZyA9IGAke3RoaXMuZm9udH1weGBcbiAgcHVibGljIGhvdXI6bnVtYmVyID0gMDtcbiAgcHVibGljIG1pbnV0ZTpudW1iZXIgPSAwO1xuICBwdWJsaWMgc2Vjb25kOm51bWJlciA9IDA7XG4gIHB1YmxpYyBzZWxlY3RlZDonaG91cid8J21pbnV0ZSd8J3NlY29uZCd8bnVsbCA9IG51bGw7XG4gIHB1YmxpYyBtYXhIb3VyOm51bWJlciA9IDBcbiAgcHVibGljIG1heE1pbnV0ZTpudW1iZXIgPSAwXG4gIHB1YmxpYyBtYXhTZWNvbmQ6bnVtYmVyID0gMFxuICBwdWJsaWMgbWluSG91cjpudW1iZXIgPSAwXG4gIHB1YmxpYyBtaW5NaW51dGU6bnVtYmVyID0gMFxuICBwdWJsaWMgbWluU2Vjb25kOm51bWJlciA9IDBcbiAgcHVibGljIGRpc2FibGVDbG9jazpib29sZWFuID0gdHJ1ZTtcbiAgcHVibGljIGhvdXJDbG9jazpzdHJpbmd8bnVsbCA9IG51bGw7XG4gIHB1YmxpYyBtaW51dGVDbG9jazpzdHJpbmd8bnVsbCA9IG51bGw7XG4gIHB1YmxpYyBzZWNvbmRDbG9jazpzdHJpbmd8bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgbmV3SW5wdXQ6Ym9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgaG91clN0cmluZzpzdHJpbmcgPSAnJ1xuICBjb25zdHJ1Y3Rvcigpe1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYodGhpcy5taW4gIT0gJycpe1xuICAgICAgY29uc3QgYXJyYXlNaW4gPSB0aGlzLm1pbi5zcGxpdCgnOicpO1xuICAgICAgdGhpcy5taW5Ib3VyPXBhcnNlSW50KGFycmF5TWluWzBdKVxuICAgICAgdGhpcy5taW5NaW51dGU9cGFyc2VJbnQoYXJyYXlNaW5bMV0pXG4gICAgICB0aGlzLm1pblNlY29uZD1wYXJzZUludChhcnJheU1pblsyXSlcbiAgICB9XG4gICAgaWYodGhpcy5tYXggIT0gJycpe1xuICAgICAgY29uc3QgYXJyYXlNYXggPSB0aGlzLm1heC5zcGxpdCgnOicpO1xuICAgICAgdGhpcy5tYXhIb3VyPXBhcnNlSW50KGFycmF5TWF4WzBdKVxuICAgICAgdGhpcy5tYXhNaW51dGU9cGFyc2VJbnQoYXJyYXlNYXhbMV0pXG4gICAgICB0aGlzLm1heFNlY29uZD1wYXJzZUludChhcnJheU1heFsyXSlcbiAgICB9XG4gICAgaWYodGhpcy5yZXNwb25zZVN0cmluZyl7XG4gICAgICB0aGlzLmluaXQodGhpcy5yZXNwb25zZVN0cmluZylcbiAgICB9XG4gICAgaWYodGhpcy5yZXNwb25zZSl7XG4gICAgICBsZXQgdGltZSA9IHRoaXMucmVzcG9uc2VcbiAgICAgIGlmKHRpbWU+MzYwMCl7XG4gICAgICAgIHRoaXMuaG91ciA9IE1hdGgucm91bmQodGltZS8zNjAwKVxuICAgICAgICB0aW1lIC09MzYwMCp0aGlzLmhvdXJcbiAgICAgIH1cbiAgICAgIGlmKHRpbWU+NjApe1xuICAgICAgICB0aGlzLm1pbnV0ZSA9IE1hdGgucm91bmQodGltZS82MClcbiAgICAgICAgdGltZSAtPTYwKnRoaXMubWludXRlXG4gICAgICB9XG4gICAgICBpZih0aW1lKXtcbiAgICAgICAgdGhpcy5zZWNvbmQgPSB0aW1lXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XG4gICAgLy8gVmVyaWZpY2Egc2UgJ3Jlc3BvbnNlU3RyaW5nJyBmb2kgYSBwcm9wcmllZGFkZSBxdWUgbXVkb3VcbiAgICBpZiAoY2hhbmdlc1sncmVzcG9uc2VTdHJpbmcnXSkge1xuICAgICAgLy8gY29uc3QgcHJldmlvdXNWYWx1ZSA9IGNoYW5nZXNbJ3Jlc3BvbnNlU3RyaW5nJ10ucHJldmlvdXNWYWx1ZTsgLS0tIGNhc28gcHJlY2lzZSBkbyB2YWxvciBhbnRlcyBkYSBtdWRhbsOnYSBkbyBpbnB1dFxuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY2hhbmdlc1sncmVzcG9uc2VTdHJpbmcnXS5jdXJyZW50VmFsdWU7XG4gICAgICBpZihjdXJyZW50VmFsdWUpe1xuICAgICAgICB0aGlzLmluaXQoY3VycmVudFZhbHVlKVxuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMuaW5pdChcIjAwOjAwOjAwXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snZGlzYWJsZWQnXSkge1xuICAgICAgLy8gY29uc3QgcHJldmlvdXNWYWx1ZSA9IGNoYW5nZXNbJ3Jlc3BvbnNlU3RyaW5nJ10ucHJldmlvdXNWYWx1ZTsgLS0tIGNhc28gcHJlY2lzZSBkbyB2YWxvciBhbnRlcyBkYSBtdWRhbsOnYSBkbyBpbnB1dFxuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY2hhbmdlc1snZGlzYWJsZWQnXS5jdXJyZW50VmFsdWU7XG4gICAgICB0aGlzLmRpc2FibGVkID0gY3VycmVudFZhbHVlXG4gICAgfVxuICAgIGlmKGNoYW5nZXNbJ21heCddKXtcbiAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNoYW5nZXNbJ21heCddLmN1cnJlbnRWYWx1ZTtcbiAgICAgIGNvbnN0IGFycmF5TWF4ID0gY3VycmVudFZhbHVlLnNwbGl0KCc6Jyk7XG4gICAgICB0aGlzLm1heEhvdXI9cGFyc2VJbnQoYXJyYXlNYXhbMF0pXG4gICAgICB0aGlzLm1heE1pbnV0ZT1wYXJzZUludChhcnJheU1heFsxXSlcbiAgICAgIHRoaXMubWF4U2Vjb25kPXBhcnNlSW50KGFycmF5TWF4WzJdKVxuICAgICAgaWYodGhpcy5ob3VyPnRoaXMubWF4SG91cil7XG4gICAgICAgIHRoaXMuaG91ciA9IHRoaXMubWF4SG91clxuICAgICAgfVxuICAgICAgaWYodGhpcy5taW51dGU+dGhpcy5tYXhNaW51dGUpe1xuICAgICAgICB0aGlzLm1pbnV0ZSA9IHRoaXMubWF4TWludXRlXG4gICAgICB9XG4gICAgICBpZih0aGlzLnNlY29uZD50aGlzLm1heFNlY29uZCl7XG4gICAgICAgIHRoaXMuc2Vjb25kID0gdGhpcy5tYXhTZWNvbmRcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoY2hhbmdlc1snbWluJ10pe1xuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY2hhbmdlc1snbWluJ10uY3VycmVudFZhbHVlO1xuICAgICAgY29uc3QgYXJyYXlNaW4gPSBjdXJyZW50VmFsdWUuc3BsaXQoJzonKTtcbiAgICAgIHRoaXMubWluSG91cj1wYXJzZUludChhcnJheU1pblswXSlcbiAgICAgIHRoaXMubWluTWludXRlPXBhcnNlSW50KGFycmF5TWluWzFdKVxuICAgICAgdGhpcy5taW5TZWNvbmQ9cGFyc2VJbnQoYXJyYXlNaW5bMl0pXG4gICAgICBpZih0aGlzLmhvdXI8dGhpcy5taW5Ib3VyKXtcbiAgICAgICAgdGhpcy5ob3VyID10aGlzLm1pbkhvdXJcbiAgICAgIH1cbiAgICAgIGlmKHRoaXMubWludXRlPHRoaXMubWluTWludXRlKXtcbiAgICAgICAgdGhpcy5taW51dGUgPXRoaXMubWluTWludXRlXG4gICAgICB9XG4gICAgICBpZih0aGlzLnNlY29uZDx0aGlzLm1pblNlY29uZCl7XG4gICAgICAgIHRoaXMuc2Vjb25kID10aGlzLm1pblNlY29uZFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpbml0KHJlc3BvbnNlU3RyaW5nOlN0cmluZyl7XG4gICAgbGV0IGFycmF5ID0gcmVzcG9uc2VTdHJpbmcuc3BsaXQoJzonKTtcbiAgICAgICAgaWYodGhpcy5uZWVkU2Vjb25kcyl7XG4gICAgICAgICAgICB0aGlzLmhvdXIgPSBwYXJzZUludChhcnJheVswXSk7XG4gICAgICAgICAgICB0aGlzLm1pbnV0ZSA9IHBhcnNlSW50KGFycmF5WzFdKTtcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kID0gcGFyc2VJbnQoYXJyYXlbMl0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuaG91ciA9IHBhcnNlSW50KGFycmF5WzBdKTtcbiAgICAgICAgICAgIHRoaXMubWludXRlID0gcGFyc2VJbnQoYXJyYXlbMV0pO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgaWYoaXNOYU4odGhpcy5ob3VyKSB8fCBpc05hTih0aGlzLm1pbnV0ZSkgfHwgaXNOYU4odGhpcy5zZWNvbmQpKXtcbiAgICAgICAgICB0aGlzLmhvdXIgPSAwXG4gICAgICAgICAgdGhpcy5taW51dGUgPSAwXG4gICAgICAgICAgdGhpcy5zZWNvbmQgPSAwXG4gICAgICAgIH1cbiAgfVxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywoZSk9PntcbiAgICAgICAgaWYoZS5jb2RlID09ICdUYWInKXtcbiAgICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdtaW51dGUnXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ3NlY29uZCdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGUuY29kZSA9PSAnQXJyb3dVcCcpe1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgICAgaWYodGhpcy5ob3VyPT10aGlzLm1heEhvdXIpe1xuICAgICAgICAgICAgICAgIHRoaXMuaG91ciA9IHRoaXMubWluSG91clxuICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmhvdXIrK1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICB0aGlzLm1pbnV0ZSsrXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgICB0aGlzLnNlY29uZCsrXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGUuY29kZSA9PSAnQXJyb3dEb3duJyl7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHN3aXRjaCh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICBpZih0aGlzLmhvdXI9PXRoaXMubWluSG91cil7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3VyPXRoaXMubWF4SG91clxuICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmhvdXItLVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICBpZih0aGlzLm1pbnV0ZT09MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5taW51dGU9NTlcbiAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5taW51dGUtLVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgICBpZih0aGlzLnNlY29uZD09MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWNvbmQ9NTlcbiAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWNvbmQtLVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGUuY29kZSA9PSAnQXJyb3dSaWdodCcpe1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdtaW51dGUnO1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdzZWNvbmQnO1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihlLmNvZGUgPT0gJ0Fycm93TGVmdCcpe1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ21pbnV0ZSc7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ2hvdXInO1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihlLmNvZGUgPT0nQmFja3NwYWNlJyl7XG4gICAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICAgIHRoaXMuYXBhZ2FyKCdob3VyJylcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICAgIHRoaXMuYXBhZ2FyKCdtaW51dGUnKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgdGhpcy5hcGFnYXIoJ3NlY29uZCcpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBzd2l0Y2goZS5rZXkpe1xuICAgICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDEsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzInOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDIsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzMnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDMsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzQnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDQsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzUnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDUsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzYnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDYsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzcnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDcsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzgnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDgsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzknOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDksdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJzAnOlxuICAgICAgICAgICAgdGhpcy5kaWdpdGFyKDAsdGhpcy5zZWxlY3RlZCk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZSgpXG4gICAgICB9KVxuICB9XG5cbiAgcHVibGljIGxvc3RGb2N1cygpe1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsXG4gIH1cblxuICBwdWJsaWMgZm9jdXMoJGV2ZW50OmFueSl7XG4gICAgaWYoIXRoaXMuZGlzYWJsZWQpe1xuICAgICAgc3dpdGNoKCRldmVudC50YXJnZXQuaWQpe1xuICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ2hvdXInO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdtaW51dGUnO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdzZWNvbmQnO1xuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFwYWdhcihsb2NhbDogJ2hvdXInfCdtaW51dGUnfCdzZWNvbmQnfG51bGwpIHtcbiAgICBpZihsb2NhbCl7XG4gICAgICBpZihsb2NhbD09J2hvdXInKXtcbiAgICAgICAgbGV0IGhvcmEgPSB0aGlzLmhvdXIudG9TdHJpbmcoKS5zcGxpdCgnJyk7XG4gICAgICAgIGlmKGhvcmEubGVuZ3RoPjEpe1xuICAgICAgICAgIGxldCByZXRpcmFkbyA9IGhvcmEucG9wKCk7XG4gICAgICAgIHRoaXMuaG91ciA9ICBwYXJzZUludChob3JhLmpvaW4oJycpKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLmhvdXIgPSAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGxvY2FsPT0nbWludXRlJyl7XG4gICAgICAgIGxldCBtaW51dG8gPSB0aGlzLm1pbnV0ZS50b1N0cmluZygpLnNwbGl0KCcnKTtcbiAgICAgICAgaWYobWludXRvLmxlbmd0aD4xKXtcbiAgICAgICAgbGV0IHJldGlyYWRvID0gbWludXRvLnBvcCgpO1xuICAgICAgICB0aGlzLm1pbnV0ZSA9ICBwYXJzZUludChtaW51dG8uam9pbignJykpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLm1pbnV0ZSA9IDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYobG9jYWw9PSdzZWNvbmQnKXtcbiAgICAgICAgbGV0IHNlZ3VuZG8gPSB0aGlzLnNlY29uZC50b1N0cmluZygpLnNwbGl0KCcnKTtcbiAgICAgICAgaWYoc2VndW5kby5sZW5ndGg+MSl7XG4gICAgICAgIGxldCByZXRpcmFkbyA9IHNlZ3VuZG8ucG9wKCk7XG4gICAgICAgIHRoaXMuc2Vjb25kID0gIHBhcnNlSW50KHNlZ3VuZG8uam9pbignJykpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuc2Vjb25kID0gMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRpZ2l0YXIobnVtOm51bWJlcixsb2NhbDonaG91cid8J21pbnV0ZSd8J3NlY29uZCd8bnVsbCl7XG4gICAgaWYobG9jYWwpe1xuICAgICAgaWYobG9jYWw9PSdob3VyJyl7XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLm5ld0lucHV0KXtcbiAgICAgICAgICB0aGlzLmhvdXI9cGFyc2VJbnQoJzAnK251bSlcbiAgICAgICAgICB0aGlzLm5ld0lucHV0ID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5ob3VyU3RyaW5nID0gbnVtLnRvU3RyaW5nKClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5ob3VyPXBhcnNlSW50KHRoaXMuaG91ci50b1N0cmluZygpK251bSlcbiAgICAgICAgICB0aGlzLmhvdXJTdHJpbmcgKz0gbnVtXG4gICAgICAgICAgaWYodGhpcy5ob3VyU3RyaW5nLmxlbmd0aCA9PSB0aGlzLm1heEhvdXIudG9TdHJpbmcoKS5sZW5ndGgpe1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdtaW51dGUnO1xuICAgICAgICAgICAgdGhpcy5uZXdJbnB1dD10cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihsb2NhbD09J21pbnV0ZScpe1xuICAgICAgICBpZih0aGlzLm5ld0lucHV0KXtcbiAgICAgICAgICB0aGlzLm1pbnV0ZT1wYXJzZUludCgnMCcrbnVtKVxuICAgICAgICAgIHRoaXMubmV3SW5wdXQgPSBmYWxzZVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLm1pbnV0ZT1wYXJzZUludCh0aGlzLm1pbnV0ZS50b1N0cmluZygpK251bSlcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ3NlY29uZCc7XG4gICAgICAgICAgdGhpcy5uZXdJbnB1dD10cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGxvY2FsPT0nc2Vjb25kJyl7XG4gICAgICAgIGlmKHRoaXMubmV3SW5wdXQpe1xuICAgICAgICAgIHRoaXMuc2Vjb25kPXBhcnNlSW50KCcwJytudW0pXG4gICAgICAgICAgdGhpcy5uZXdJbnB1dCA9IGZhbHNlXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuc2Vjb25kPXBhcnNlSW50KHRoaXMuc2Vjb25kLnRvU3RyaW5nKCkrbnVtKVxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgICAgIHRoaXMubmV3SW5wdXQ9dHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZVZhbHVlKCk6IHZvaWQge1xuICAgIGlmKHRoaXMubWludXRlPjU5IHx8IHRoaXMubWludXRlPDApe1xuICAgICAgdGhpcy5taW51dGUgPSAwXG4gICAgfVxuXG4gICAgaWYodGhpcy5zZWNvbmQ+NTkgfHwgdGhpcy5zZWNvbmQ8MCl7XG4gICAgICB0aGlzLnNlY29uZCA9IDBcbiAgICB9XG4gICAgaWYodGhpcy5ob3VyPHRoaXMubWluSG91cil7XG4gICAgICB0aGlzLmhvdXIgPSB0aGlzLm1pbkhvdXI7XG4gICAgfVxuICAgIGlmKHRoaXMuaG91cj50aGlzLm1heEhvdXIpe1xuICAgICAgdGhpcy5ob3VyID0gdGhpcy5tYXhIb3VyO1xuICAgIH1cbiAgICBpZih0aGlzLmhvdXI9PXRoaXMubWF4SG91ciAmJiB0aGlzLm1pbnV0ZT50aGlzLm1heE1pbnV0ZSl7XG4gICAgICB0aGlzLm1pbnV0ZT10aGlzLm1heE1pbnV0ZVxuICAgIH1cbiAgICBpZih0aGlzLmhvdXI9PXRoaXMubWluSG91ciAmJiB0aGlzLm1pbnV0ZTx0aGlzLm1pbk1pbnV0ZSl7XG4gICAgICB0aGlzLm1pbnV0ZT10aGlzLm1pbk1pbnV0ZVxuICAgIH1cbiAgICBpZih0aGlzLmhvdXI9PXRoaXMubWF4SG91ciAmJiB0aGlzLm1pbnV0ZT09dGhpcy5tYXhNaW51dGUgJiYgdGhpcy5zZWNvbmQ+dGhpcy5tYXhTZWNvbmQpe1xuICAgICAgdGhpcy5zZWNvbmQ9dGhpcy5tYXhTZWNvbmRcbiAgICB9XG4gICAgaWYodGhpcy5ob3VyPT10aGlzLm1pbkhvdXIgJiYgdGhpcy5taW51dGU9PXRoaXMubWluTWludXRlICYmIHRoaXMuc2Vjb25kPHRoaXMubWluU2Vjb25kKXtcbiAgICAgIHRoaXMuc2Vjb25kPXRoaXMubWluU2Vjb25kXG4gICAgfVxuICAgIHN3aXRjaCh0aGlzLnR5cGUpe1xuICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgY29uc3QgcmVzcG9zdGFTZWd1bmRvID0gKCh0aGlzLmhvdXIqNjApK3RoaXMubWludXRlKSo2MCt0aGlzLnNlY29uZFxuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFTZWd1bmRvKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhU2VndW5kby50b1N0cmluZygpKTtcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhTWludXRvID0gKCh0aGlzLmhvdXIqNjApK01hdGguZmxvb3IodGhpcy5zZWNvbmQvNjApKSt0aGlzLm1pbnV0ZVxuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFNaW51dG8pO1xuICAgICAgICB0aGlzLnJlc3BvbnNlU3RyaW5nQ2hhbmdlLmVtaXQocmVzcG9zdGFNaW51dG8udG9TdHJpbmcoKSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ21pbGlzZWNvbmQnOlxuICAgICAgICBjb25zdCByZXNwb3N0YU1pbGlzZWd1bmRvID0gKCgodGhpcy5ob3VyKjYwKSt0aGlzLm1pbnV0ZSkqNjArdGhpcy5zZWNvbmQpKjEwMDA7XG4gICAgICAgIHRoaXMucmVzcG9uc2VDaGFuZ2UuZW1pdChyZXNwb3N0YU1pbGlzZWd1bmRvKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhTWlsaXNlZ3VuZG8udG9TdHJpbmcoKSk7XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgY29uc3QgcmVzcG9zdGFIb3JhID0gTWF0aC5mbG9vcigoTWF0aC5mbG9vcih0aGlzLnNlY29uZC82MCkrdGhpcy5taW51dGUpLzYwKSt0aGlzLmhvdXI7XG4gICAgICAgIHRoaXMucmVzcG9uc2VDaGFuZ2UuZW1pdChyZXNwb3N0YUhvcmEpO1xuICAgICAgICB0aGlzLnJlc3BvbnNlU3RyaW5nQ2hhbmdlLmVtaXQocmVzcG9zdGFIb3JhLnRvU3RyaW5nKCkpO1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhID0gYCR7dGhpcy5ob3VyLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5ob3VyOnRoaXMuaG91cn06JHt0aGlzLm1pbnV0ZS50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMubWludXRlOnRoaXMubWludXRlfToke3RoaXMuc2Vjb25kLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5zZWNvbmQ6dGhpcy5zZWNvbmR9YFxuICAgICAgICBjb25zdCByZXNwb3N0YVNlcGFyYWRhID0ge1xuICAgICAgICAgIGhvdXI6dGhpcy5ob3VyLFxuICAgICAgICAgIG1pbnV0ZTp0aGlzLm1pbnV0ZSxcbiAgICAgICAgICBzZWNvbmQ6dGhpcy5zZWNvbmRcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc3BvbnNlU3RyaW5nQ2hhbmdlLmVtaXQocmVzcG9zdGEpO1xuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFTZXBhcmFkYSk7XG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgcHVibGljIG1heENsb2NrKCl7XG4gICAgdGhpcy5ob3VyID0gdGhpcy5tYXhIb3VyO1xuICAgIHRoaXMubWludXRlID0gdGhpcy5tYXhNaW51dGU7XG4gICAgdGhpcy5zZWNvbmQgPSB0aGlzLm1heFNlY29uZDtcbiAgICB0aGlzLmZlY2hhck1lbnUodGhpcy5tZW51VHJpZ2dlcik7XG4gIH1cblxuICBwdWJsaWMgbm93Q2xvY2soKXtcbiAgICBjb25zdCBhZ29yYSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgaG9yYXMgPSBhZ29yYS5nZXRIb3VycygpO1xuICAgIGNvbnN0IG1pbnV0b3MgPSBhZ29yYS5nZXRNaW51dGVzKCk7XG4gICAgY29uc3Qgc2VndW5kb3MgPSBhZ29yYS5nZXRTZWNvbmRzKCk7XG5cbiAgICB0aGlzLmhvdXIgPSBob3JhcztcbiAgICB0aGlzLm1pbnV0ZSA9IG1pbnV0b3M7XG4gICAgdGhpcy5zZWNvbmQgPSBzZWd1bmRvcztcbiAgICB0aGlzLmZlY2hhck1lbnUodGhpcy5tZW51VHJpZ2dlcik7XG4gIH1cblxuICBwdWJsaWMgZmVjaGFyTWVudSh0cmlnZ2VyOk1hdE1lbnVUcmlnZ2VyKSB7XG4gICAgdGhpcy5kaXNhYmxlQ2xvY2sgPSB0cnVlXG4gICAgdHJpZ2dlci5jbG9zZU1lbnUoKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlKCk7XG4gIH1cblxuICBwdWJsaWMgcHJlZW5jaGVyRGl2cygpIHtcbiAgICB0aGlzLmRpc2FibGVDbG9jayA9IHRydWU7XG4gICAgdGhpcy5ob3VyQ2xvY2sgPSBudWxsO1xuICAgIHRoaXMubWludXRlQ2xvY2sgPSBudWxsO1xuICAgIHRoaXMuc2Vjb25kQ2xvY2sgPSBudWxsO1xuICAgIHRoaXMuZGVzdHJveURpdnMoJ2hvdXJDbG9jaycpXG4gICAgdGhpcy5kZXN0cm95RGl2cygnbWludXRlQ2xvY2snKVxuICAgIHRoaXMuZGVzdHJveURpdnMoJ3NlY29uZENsb2NrJylcbiAgICBjb25zdCBjcmlhckRpdnMgPSAocGFyZW50RWxlbWVudElkOiBzdHJpbmcsIGlkOiBudW1iZXIsIGxpbWl0ZTogbnVtYmVyKSA9PiB7XG5cbiAgICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnRFbGVtZW50SWQpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBsaW1pdGU7IGkrKykge1xuICAgICAgICBjb25zdCBudW1iZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbnVtYmVyRGl2LnRleHRDb250ZW50ID0gaSA8IDEwID8gYDAke2l9YCA6IGAke2l9YDtcbiAgICAgICAgbnVtYmVyRGl2LnN0eWxlLmJvcmRlckJvdHRvbSA9IFwiMXB4IHNvbGlkIGJsYWNrXCI7XG4gICAgICAgIG51bWJlckRpdi5zdHlsZS5wYWRkaW5nID0gXCI1cHggMTBweFwiO1xuICAgICAgICBudW1iZXJEaXYuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICAgIG51bWJlckRpdi5zdHlsZS5tYXJnaW4gPSBcIjJweFwiO1xuXG4gICAgICAgIGxldCBjbGFzc0lkZW50aWZpZXIgPSAnJztcbiAgICAgICAgc3dpdGNoKGlkKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgY2xhc3NJZGVudGlmaWVyID0gJ251bUhvdXJDbG9jayc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjbGFzc0lkZW50aWZpZXIgPSAnbnVtTWludXRlQ2xvY2snO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2xhc3NJZGVudGlmaWVyID0gJ251bVNlY29uZENsb2NrJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIG51bWJlckRpdi5jbGFzc0xpc3QuYWRkKGNsYXNzSWRlbnRpZmllcik7XG5cbiAgICAgICAgbnVtYmVyRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGFsbFNpYmxpbmdzID0gcGFyZW50RWxlbWVudCEucXVlcnlTZWxlY3RvckFsbChgLiR7Y2xhc3NJZGVudGlmaWVyfWApO1xuICAgICAgICAgIGFsbFNpYmxpbmdzLmZvckVhY2goc2libGluZyA9PiB7XG4gICAgICAgICAgICBpZiAoc2libGluZyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgIHNpYmxpbmcuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmKGNsYXNzSWRlbnRpZmllciA9PT0gJ251bUhvdXJDbG9jaycpIHRoaXMuaG91ckNsb2NrID0gbnVtYmVyRGl2LnRleHRDb250ZW50O1xuICAgICAgICAgIGlmKGNsYXNzSWRlbnRpZmllciA9PT0gJ251bU1pbnV0ZUNsb2NrJykgdGhpcy5taW51dGVDbG9jayA9IG51bWJlckRpdi50ZXh0Q29udGVudDtcbiAgICAgICAgICBpZihjbGFzc0lkZW50aWZpZXIgPT09ICdudW1TZWNvbmRDbG9jaycpIHRoaXMuc2Vjb25kQ2xvY2sgPSBudW1iZXJEaXYudGV4dENvbnRlbnQ7XG5cbiAgICAgICAgICBudW1iZXJEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGJsdWVcIjtcblxuICAgICAgICAgIGlmKHRoaXMuaG91ckNsb2NrICYmIHRoaXMubWludXRlQ2xvY2sgJiYgdGhpcy5zZWNvbmRDbG9jayl7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVDbG9jayA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcGFyZW50RWxlbWVudCEuYXBwZW5kQ2hpbGQobnVtYmVyRGl2KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY3JpYXJEaXZzKCdob3VyQ2xvY2snLCAwLCB0aGlzLm1heEhvdXIpO1xuICAgIGNyaWFyRGl2cygnbWludXRlQ2xvY2snLCAxLCA1OSk7XG4gICAgY3JpYXJEaXZzKCdzZWNvbmRDbG9jaycsIDIsIDU5KTtcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95RGl2cyhpZDpzdHJpbmcpe1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgaWYoZWxlbWVudCl7XG4gICAgICBlbGVtZW50LmlubmVySFRNTCA9ICcnXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNvbmZpcm1DbG9jaygpe1xuICAgIHRoaXMuaG91ciA9IHBhcnNlSW50KHRoaXMuaG91ckNsb2NrISlcbiAgICB0aGlzLm1pbnV0ZSA9IHBhcnNlSW50KHRoaXMubWludXRlQ2xvY2shKVxuICAgIHRoaXMuc2Vjb25kID0gcGFyc2VJbnQodGhpcy5zZWNvbmRDbG9jayEpXG4gICAgdGhpcy5mZWNoYXJNZW51KHRoaXMubWVudVRyaWdnZXIpO1xuICB9XG59XG4iLCI8ZGl2IFxuY2xhc3M9XCJ0aW1lcGlja2VyXCJcbltzdHlsZS53aWR0aF09XCJ3aWR0aENzc1wiIFxuW3N0eWxlLmhlaWdodF09XCJoZWlnaHRDc3NcIiAgXG5bc3R5bGUuYm9yZGVyQm90dG9tXT1cImRpc2FibGVkID8gJzFweCBzb2xpZCBncmF5JyA6ICcxcHggc29saWQgYmxhY2snXCI+XG4gIDxkaXYgXG4gIGlkPVwiaG91clwiIFxuICB0YWJpbmRleD1cIjFcIiBcbiAgKGJsdXIpPVwibG9zdEZvY3VzKClcIiBcbiAgKGZvY3VzKT1cImZvY3VzKCRldmVudClcIiBcbiAgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwic2VsZWN0ZWQ9PT0naG91cic/IGNvciA6ICd0cmFuc3BhcmVudCdcIiBcbiAgW3N0eWxlLmNvbG9yXT1cImRpc2FibGVkID8gJ2dyYXknIDogJ2JsYWNrJ1wiXG4gIChjbGljayk9XCJmb2N1cygkZXZlbnQpXCI+e3tob3VyLnRvU3RyaW5nKCkubGVuZ3RoIC0gbWF4SG91ci50b1N0cmluZygpLmxlbmd0aCAhPT0gMCA/ICgnMCcucmVwZWF0KG1heEhvdXIudG9TdHJpbmcoKS5sZW5ndGggLSBob3VyLnRvU3RyaW5nKCkubGVuZ3RoKSkrIHRoaXMuaG91ciA6IHRoaXMuaG91cn19XG48L2Rpdj5cbiAgPGRpdlxuICBbc3R5bGUuY29sb3JdPVwiZGlzYWJsZWQgPyAnZ3JheScgOiAnYmxhY2snXCJcbiAgPjo8L2Rpdj5cbiAgPGRpdiBcbiAgaWQ9XCJtaW51dGVcIiBcbiAgdGFiaW5kZXg9XCIxXCIgXG4gIChibHVyKT1cImxvc3RGb2N1cygpXCIgXG4gIChmb2N1cyk9XCJmb2N1cygkZXZlbnQpXCIgXG4gIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cInNlbGVjdGVkPT09J21pbnV0ZSc/IGNvciA6ICd0cmFuc3BhcmVudCdcIiBcbiAgW3N0eWxlLmNvbG9yXT1cImRpc2FibGVkID8gJ2dyYXknIDogJ2JsYWNrJ1wiXG4gIChjbGljayk9XCJmb2N1cygkZXZlbnQpXCI+e3ttaW51dGUudG9TdHJpbmcoKS5sZW5ndGg9PT0xPycwJyt0aGlzLm1pbnV0ZTp0aGlzLm1pbnV0ZX19PC9kaXY+XG4gIDxkaXYgKm5nSWY9XCJuZWVkU2Vjb25kc1wiXG4gIFtzdHlsZS5jb2xvcl09XCJkaXNhYmxlZCA/ICdncmF5JyA6ICdibGFjaydcIlxuICA+OjwvZGl2PlxuICA8ZGl2IFxuICAqbmdJZj1cIm5lZWRTZWNvbmRzXCIgXG4gIGlkPVwic2Vjb25kXCIgW3N0eWxlLmNvbG9yXT1cImRpc2FibGVkID8gJ2dyYXknIDogJ2JsYWNrJ1wiIFxuICB0YWJpbmRleD1cIjFcIiAoYmx1cik9XCJsb3N0Rm9jdXMoKVwiIChmb2N1cyk9XCJmb2N1cygkZXZlbnQpXCIgXG4gIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cInNlbGVjdGVkPT09J3NlY29uZCc/IGNvciA6ICd0cmFuc3BhcmVudCdcIiBcbiAgKGNsaWNrKT1cImZvY3VzKCRldmVudClcIj57e3NlY29uZC50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMuc2Vjb25kOnRoaXMuc2Vjb25kfX1cbiAgPC9kaXY+XG4gIDxidXR0b24gKm5nSWY9XCIhZGlzYWJsZWRcIiBtYXQtaWNvbi1idXR0b24gc3R5bGU9XCJwYWRkaW5nOjIwcHg7cG9zaXRpb246cmVsYXRpdmU7Ym90dG9tOjFweFwiIFttYXRNZW51VHJpZ2dlckZvcl09XCJhYm92ZU1lbnVcIiAjdHJpZ2dlcj1cIm1hdE1lbnVUcmlnZ2VyXCIgY2xhc3M9XCJidG5DbG9ja1wiIChjbGljayk9XCJwcmVlbmNoZXJEaXZzKClcIj5cbiAgICA8c3ZnIHdpZHRoPVwiMjBweFwiIGhlaWdodD1cIjIwcHhcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgc3R5bGU9XCJ3aWR0aDogMTdweDtcIj5cbiAgICAgIDxwYXRoIGQ9XCJNMTIgN1YxMkgxNU0yMSAxMkMyMSAxNi45NzA2IDE2Ljk3MDYgMjEgMTIgMjFDNy4wMjk0NCAyMSAzIDE2Ljk3MDYgMyAxMkMzIDcuMDI5NDQgNy4wMjk0NCAzIDEyIDNDMTYuOTcwNiAzIDIxIDcuMDI5NDQgMjEgMTJaXCIgc3Ryb2tlPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG4gICAgPC9zdmc+XG4gIDwvYnV0dG9uPlxuICA8bWF0LW1lbnUgI2Fib3ZlTWVudT1cIm1hdE1lbnVcIiB5UG9zaXRpb249XCJhYm92ZVwiPlxuICA8ZGl2IGNsYXNzPVwibWF0TWVudUNsb2NrXCIgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIj5cbiAgICA8ZGl2IGNsYXNzPVwibnVtYmVyc1wiPlxuICAgICAgPGRpdiBpZD1cImhvdXJDbG9ja1wiPjwvZGl2PlxuICAgICAgPGRpdiBpZD1cIm1pbnV0ZUNsb2NrXCI+PC9kaXY+XG4gICAgICA8ZGl2IGlkPVwic2Vjb25kQ2xvY2tcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyQ2xvY2tcIj5cbiAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gKm5nSWY9XCJtYXggIT09ICcyMzo1OTo1OSdcIiAoY2xpY2spPVwibWF4Q2xvY2soKVwiPk1heDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiAqbmdJZj1cIm1heCA9PSAnMjM6NTk6NTknXCIgKGNsaWNrKT1cIm5vd0Nsb2NrKClcIj5Ob3c8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gW2Rpc2FibGVkXT1cImRpc2FibGVDbG9ja1wiIChjbGljayk9XCJjb25maXJtQ2xvY2soKVwiPk9rPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L21hdC1tZW51PlxuPC9kaXY+Il19