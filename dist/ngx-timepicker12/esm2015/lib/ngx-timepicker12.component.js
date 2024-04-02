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
NgxTimepicker12Component.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: NgxTimepicker12Component, selector: "ngx-timepicker", inputs: { width: "width", height: "height", font: "font", max: "max", response: "response", responseString: "responseString", needSeconds: "needSeconds", type: "type", cor: "cor", disabled: "disabled" }, outputs: { responseChange: "responseChange", responseStringChange: "responseStringChange" }, viewQueries: [{ propertyName: "menuTrigger", first: true, predicate: ["trigger"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div \nclass=\"timepicker\"\n[style.width]=\"widthCss\" \n[style.height]=\"heightCss\"  \n[style.borderBottom]=\"disabled ? '1px solid gray' : '1px solid black'\">\n  <div \n  id=\"hour\" \n  tabindex=\"1\" \n  (blur)=\"lostFocus()\" \n  (focus)=\"focus($event)\" \n  [style.background-color]=\"selected==='hour'? cor : 'transparent'\" \n  [style.color]=\"disabled ? 'gray' : 'black'\"\n  (click)=\"focus($event)\">{{hour.toString().length===1?'0'+this.hour:this.hour}}\n</div>\n  <div\n  [style.color]=\"disabled ? 'gray' : 'black'\"\n  >:</div>\n  <div \n  id=\"minute\" \n  tabindex=\"1\" \n  (blur)=\"lostFocus()\" \n  (focus)=\"focus($event)\" \n  [style.background-color]=\"selected==='minute'? cor : 'transparent'\" \n  [style.color]=\"disabled ? 'gray' : 'black'\"\n  (click)=\"focus($event)\">{{minute.toString().length===1?'0'+this.minute:this.minute}}</div>\n  <div *ngIf=\"needSeconds\"\n  [style.color]=\"disabled ? 'gray' : 'black'\"\n  >:</div>\n  <div \n  *ngIf=\"needSeconds\" \n  id=\"second\" [style.color]=\"disabled ? 'gray' : 'black'\" \n  tabindex=\"1\" (blur)=\"lostFocus()\" (focus)=\"focus($event)\" \n  [style.background-color]=\"selected==='second'? cor : 'transparent'\" \n  (click)=\"focus($event)\">{{second.toString().length===1?'0'+this.second:this.second}}\n  </div>\n  <button *ngIf=\"!disabled\" mat-icon-button style=\"padding:20px;position:relative;bottom:1px\" [matMenuTriggerFor]=\"aboveMenu\" #trigger=\"matMenuTrigger\" class=\"btnClock\" (click)=\"preencherDivs()\">\n    <svg width=\"20px\" height=\"20px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" style=\"width: 17px;\">\n      <path d=\"M12 7V12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    </svg>\n  </button>\n  <mat-menu #aboveMenu=\"matMenu\" yPosition=\"above\">\n  <div class=\"matMenuClock\" (click)=\"$event.stopPropagation();\">\n    <div class=\"numbers\">\n      <div id=\"hourClock\"></div>\n      <div id=\"minuteClock\"></div>\n      <div id=\"secondClock\"></div>\n    </div>\n    <div class=\"footerClock\">\n      <button mat-raised-button *ngIf=\"max !== '23:59:59'\" (click)=\"maxClock()\">Max</button>\n      <button mat-raised-button *ngIf=\"max == '23:59:59'\" (click)=\"nowClock()\">Now</button>\n      <button mat-raised-button [disabled]=\"disableClock\" (click)=\"confirmClock()\">Ok</button>\n    </div>\n  </div>\n  </mat-menu>\n</div>", styles: [".timepicker{border-bottom:1px solid gray;display:flex;flex-wrap:nowrap;justify-content:center;align-items:center}div{-webkit-user-select:none;user-select:none}div:focus{outline:none}.btnClock{margin:0 5px;height:30px;min-width:25px;display:flex;justify-content:center;align-items:center}.btnClock{display:flex;justify-content:center;align-items:center;min-height:25px;height:25px}.matMenuClock{width:150px;height:150px;display:flex;flex-direction:column}.numbers{width:150px;height:120px;display:flex}.numbers>div{width:50px;height:120px;display:flex;flex-direction:column;align-items:center;overflow:scroll;scrollbar-width:none}.numbers>div::-webkit-scrollbar{display:none}.footerClock{width:150px;height:30px;display:flex;justify-content:space-around;align-items:center}.footerClock button{min-width:50px;min-height:20px;width:50px;height:20px;font-size:15px;display:flex;justify-content:center;align-items:center}\n"], components: [{ type: i1.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i2.MatMenu, selector: "mat-menu", exportAs: ["matMenu"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", exportAs: ["matMenuTrigger"] }] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdGltZXBpY2tlcjEyL3NyYy9saWIvbmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdGltZXBpY2tlcjEyL3NyYy9saWIvbmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7O0FBTWxDLE1BQU0sT0FBTyx3QkFBd0I7SUE4Qm5DO1FBNUJTLFVBQUssR0FBVSxHQUFHLENBQUM7UUFDbkIsV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUNuQixTQUFJLEdBQVUsRUFBRSxDQUFDO1FBQ2pCLFFBQUcsR0FBVSxVQUFVLENBQUM7UUFDeEIsYUFBUSxHQUFnQixJQUFJLENBQUM7UUFDN0IsbUJBQWMsR0FBa0IsSUFBSSxDQUFDO1FBQ3JDLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBQzVCLFNBQUksR0FBb0QsUUFBUSxDQUFBO1FBQ2hFLFFBQUcsR0FBVSxTQUFTLENBQUM7UUFDdkIsYUFBUSxHQUFXLEtBQUssQ0FBQztRQUV4QixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDekMseUJBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNsRCxhQUFRLEdBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUM7UUFDcEMsY0FBUyxHQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDO1FBQ3RDLFlBQU8sR0FBVSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQTtRQUNq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QUNHLG9CQUFvQjtzQkFBN0IsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRNZW51VHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xuaW1wb3J0IHsgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXRpbWVwaWNrZXInLFxuICB0ZW1wbGF0ZVVybDogJ25neC10aW1lcGlja2VyMTIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUaW1lcGlja2VyMTJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsQWZ0ZXJWaWV3SW5pdCxPbkNoYW5nZXN7XG4gIEBWaWV3Q2hpbGQoJ3RyaWdnZXInKSBtZW51VHJpZ2dlciE6IE1hdE1lbnVUcmlnZ2VyO1xuICBASW5wdXQoKSB3aWR0aDpudW1iZXIgPSAxMzA7XG4gIEBJbnB1dCgpIGhlaWdodDpudW1iZXIgPSA0MDtcbiAgQElucHV0KCkgZm9udDpudW1iZXIgPSAxMDtcbiAgQElucHV0KCkgbWF4OnN0cmluZyA9ICcyMzo1OTo1OSc7XG4gIEBJbnB1dCgpIHJlc3BvbnNlOiBudW1iZXJ8bnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHJlc3BvbnNlU3RyaW5nOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbmVlZFNlY29uZHM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSB0eXBlOiAnbWlsaXNlY29uZCd8J3NlY29uZCd8J21pbnV0ZSd8ICdob3VyJyB8ICd0aW1lJyA9ICdzZWNvbmQnXG4gIEBJbnB1dCgpIGNvcjpzdHJpbmcgPSBcIiM0OGI5YzdcIjtcbiAgQElucHV0KCkgZGlzYWJsZWQ6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSByZXNwb25zZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgcmVzcG9uc2VTdHJpbmdDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgcHVibGljIHdpZHRoQ3NzOnN0cmluZyA9IGAke3RoaXMud2lkdGh9cHhgO1xuICBwdWJsaWMgaGVpZ2h0Q3NzOnN0cmluZyA9IGAke3RoaXMuaGVpZ2h0fXB4YDtcbiAgcHVibGljIGZvbnRDc3M6c3RyaW5nID0gYCR7dGhpcy5mb250fXB4YFxuICBwdWJsaWMgaG91cjpudW1iZXIgPSAwO1xuICBwdWJsaWMgbWludXRlOm51bWJlciA9IDA7XG4gIHB1YmxpYyBzZWNvbmQ6bnVtYmVyID0gMDtcbiAgcHVibGljIHNlbGVjdGVkOidob3VyJ3wnbWludXRlJ3wnc2Vjb25kJ3xudWxsID0gbnVsbDtcbiAgcHVibGljIG1heEhvdXI6bnVtYmVyID0gMFxuICBwdWJsaWMgbWF4TWludXRlOm51bWJlciA9IDBcbiAgcHVibGljIG1heFNlY29uZDpudW1iZXIgPSAwXG4gIHB1YmxpYyBkaXNhYmxlQ2xvY2s6Ym9vbGVhbiA9IHRydWU7XG4gIHB1YmxpYyBob3VyQ2xvY2s6c3RyaW5nfG51bGwgPSBudWxsO1xuICBwdWJsaWMgbWludXRlQ2xvY2s6c3RyaW5nfG51bGwgPSBudWxsO1xuICBwdWJsaWMgc2Vjb25kQ2xvY2s6c3RyaW5nfG51bGwgPSBudWxsO1xuICBwcml2YXRlIG5ld0lucHV0OmJvb2xlYW4gPSB0cnVlO1xuICBjb25zdHJ1Y3Rvcigpe1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYodGhpcy5tYXggIT0gJycpe1xuICAgICAgY29uc3QgYXJyYXlNYXggPSB0aGlzLm1heC5zcGxpdCgnOicpO1xuICAgICAgdGhpcy5tYXhIb3VyPXBhcnNlSW50KGFycmF5TWF4WzBdKVxuICAgICAgdGhpcy5tYXhNaW51dGU9cGFyc2VJbnQoYXJyYXlNYXhbMV0pXG4gICAgICB0aGlzLm1heFNlY29uZD1wYXJzZUludChhcnJheU1heFsyXSlcbiAgICB9XG4gICAgaWYodGhpcy5yZXNwb25zZVN0cmluZyl7XG4gICAgICB0aGlzLmluaXQodGhpcy5yZXNwb25zZVN0cmluZylcbiAgICB9XG4gICAgaWYodGhpcy5yZXNwb25zZSl7XG4gICAgICBsZXQgdGltZSA9IHRoaXMucmVzcG9uc2VcbiAgICAgIGlmKHRpbWU+MzYwMCl7XG4gICAgICAgIHRoaXMuaG91ciA9IE1hdGgucm91bmQodGltZS8zNjAwKVxuICAgICAgICB0aW1lIC09MzYwMCp0aGlzLmhvdXJcbiAgICAgIH1cbiAgICAgIGlmKHRpbWU+NjApe1xuICAgICAgICB0aGlzLm1pbnV0ZSA9IE1hdGgucm91bmQodGltZS82MClcbiAgICAgICAgdGltZSAtPTYwKnRoaXMubWludXRlXG4gICAgICB9XG4gICAgICBpZih0aW1lKXtcbiAgICAgICAgdGhpcy5zZWNvbmQgPSB0aW1lXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XG4gICAgLy8gVmVyaWZpY2Egc2UgJ3Jlc3BvbnNlU3RyaW5nJyBmb2kgYSBwcm9wcmllZGFkZSBxdWUgbXVkb3VcbiAgICBpZiAoY2hhbmdlc1sncmVzcG9uc2VTdHJpbmcnXSkge1xuICAgICAgLy8gY29uc3QgcHJldmlvdXNWYWx1ZSA9IGNoYW5nZXNbJ3Jlc3BvbnNlU3RyaW5nJ10ucHJldmlvdXNWYWx1ZTsgLS0tIGNhc28gcHJlY2lzZSBkbyB2YWxvciBhbnRlcyBkYSBtdWRhbsOnYSBkbyBpbnB1dFxuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY2hhbmdlc1sncmVzcG9uc2VTdHJpbmcnXS5jdXJyZW50VmFsdWU7XG4gICAgICBpZihjdXJyZW50VmFsdWUpe1xuICAgICAgICB0aGlzLmluaXQoY3VycmVudFZhbHVlKVxuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMuaW5pdChcIjAwOjAwOjAwXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snZGlzYWJsZWQnXSkge1xuICAgICAgLy8gY29uc3QgcHJldmlvdXNWYWx1ZSA9IGNoYW5nZXNbJ3Jlc3BvbnNlU3RyaW5nJ10ucHJldmlvdXNWYWx1ZTsgLS0tIGNhc28gcHJlY2lzZSBkbyB2YWxvciBhbnRlcyBkYSBtdWRhbsOnYSBkbyBpbnB1dFxuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gY2hhbmdlc1snZGlzYWJsZWQnXS5jdXJyZW50VmFsdWU7XG4gICAgICB0aGlzLmRpc2FibGVkID0gY3VycmVudFZhbHVlXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGluaXQocmVzcG9uc2VTdHJpbmc6U3RyaW5nKXtcbiAgICBsZXQgYXJyYXkgPSByZXNwb25zZVN0cmluZy5zcGxpdCgnOicpO1xuICAgICAgICBpZih0aGlzLm5lZWRTZWNvbmRzKXtcbiAgICAgICAgICAgIHRoaXMuaG91ciA9IHBhcnNlSW50KGFycmF5WzBdKTtcbiAgICAgICAgICAgIHRoaXMubWludXRlID0gcGFyc2VJbnQoYXJyYXlbMV0pO1xuICAgICAgICAgICAgdGhpcy5zZWNvbmQgPSBwYXJzZUludChhcnJheVsyXSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5ob3VyID0gcGFyc2VJbnQoYXJyYXlbMF0pO1xuICAgICAgICAgICAgdGhpcy5taW51dGUgPSBwYXJzZUludChhcnJheVsxXSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBpZihpc05hTih0aGlzLmhvdXIpIHx8IGlzTmFOKHRoaXMubWludXRlKSB8fCBpc05hTih0aGlzLnNlY29uZCkpe1xuICAgICAgICAgIHRoaXMuaG91ciA9IDBcbiAgICAgICAgICB0aGlzLm1pbnV0ZSA9IDBcbiAgICAgICAgICB0aGlzLnNlY29uZCA9IDBcbiAgICAgICAgfVxuICB9XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLChlKT0+e1xuICAgICAgICBpZihlLmNvZGUgPT0gJ1RhYicpe1xuICAgICAgICAgIHN3aXRjaCh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ21pbnV0ZSdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnc2Vjb25kJ1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG51bGxcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZS5jb2RlID09ICdBcnJvd1VwJyl7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHN3aXRjaCh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICB0aGlzLmhvdXIrK1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgdGhpcy5taW51dGUrK1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgdGhpcy5zZWNvbmQrK1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihlLmNvZGUgPT0gJ0Fycm93RG93bicpe1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgICAgaWYodGhpcy5ob3VyPT0wKXtcbiAgICAgICAgICAgICAgICB0aGlzLmhvdXI9dGhpcy5tYXhIb3VyXG4gICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuaG91ci0tXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICAgIGlmKHRoaXMubWludXRlPT0wKXtcbiAgICAgICAgICAgICAgICB0aGlzLm1pbnV0ZT01OVxuICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLm1pbnV0ZS0tXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICAgIGlmKHRoaXMuc2Vjb25kPT0wKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNlY29uZD01OVxuICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnNlY29uZC0tXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZS5jb2RlID09ICdBcnJvd1JpZ2h0Jyl7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHN3aXRjaCh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ21pbnV0ZSc7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ3NlY29uZCc7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGUuY29kZSA9PSAnQXJyb3dMZWZ0Jyl7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHN3aXRjaCh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnbWludXRlJztcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnaG91cic7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGUuY29kZSA9PSdCYWNrc3BhY2UnKXtcbiAgICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgICAgdGhpcy5hcGFnYXIoJ2hvdXInKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgdGhpcy5hcGFnYXIoJ21pbnV0ZScpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgICB0aGlzLmFwYWdhcignc2Vjb25kJylcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHN3aXRjaChlLmtleSl7XG4gICAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoMSx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoMix0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnMyc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoMyx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnNCc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoNCx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnNSc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoNSx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnNic6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoNix0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnNyc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoNyx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnOCc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoOCx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnOSc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoOSx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnMCc6XG4gICAgICAgICAgICB0aGlzLmRpZ2l0YXIoMCx0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLm1pbnV0ZT41OSB8fCB0aGlzLm1pbnV0ZTwwKXtcbiAgICAgICAgICB0aGlzLm1pbnV0ZSA9IDBcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnNlY29uZD41OSB8fCB0aGlzLnNlY29uZDwwKXtcbiAgICAgICAgICB0aGlzLnNlY29uZCA9IDBcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmhvdXI8MCl7XG4gICAgICAgICAgdGhpcy5ob3VyID0gMFxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuaG91cj50aGlzLm1heEhvdXIpe1xuICAgICAgICAgIHRoaXMuaG91ciA9IHRoaXMubWF4SG91clxuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUoKVxuICAgICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBsb3N0Rm9jdXMoKXtcbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbFxuICB9XG5cbiAgcHVibGljIGZvY3VzKCRldmVudDphbnkpe1xuICAgIGlmKCF0aGlzLmRpc2FibGVkKXtcbiAgICAgIHN3aXRjaCgkZXZlbnQudGFyZ2V0LmlkKXtcbiAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdob3VyJztcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnbWludXRlJztcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnc2Vjb25kJztcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhcGFnYXIobG9jYWw6ICdob3VyJ3wnbWludXRlJ3wnc2Vjb25kJ3xudWxsKSB7XG4gICAgaWYobG9jYWwpe1xuICAgICAgaWYobG9jYWw9PSdob3VyJyl7XG4gICAgICAgIGxldCBob3JhID0gdGhpcy5ob3VyLnRvU3RyaW5nKCkuc3BsaXQoJycpO1xuICAgICAgICBpZihob3JhLmxlbmd0aD4xKXtcbiAgICAgICAgICBsZXQgcmV0aXJhZG8gPSBob3JhLnBvcCgpO1xuICAgICAgICB0aGlzLmhvdXIgPSAgcGFyc2VJbnQoaG9yYS5qb2luKCcnKSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5ob3VyID0gMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihsb2NhbD09J21pbnV0ZScpe1xuICAgICAgICBsZXQgbWludXRvID0gdGhpcy5taW51dGUudG9TdHJpbmcoKS5zcGxpdCgnJyk7XG4gICAgICAgIGlmKG1pbnV0by5sZW5ndGg+MSl7XG4gICAgICAgIGxldCByZXRpcmFkbyA9IG1pbnV0by5wb3AoKTtcbiAgICAgICAgdGhpcy5taW51dGUgPSAgcGFyc2VJbnQobWludXRvLmpvaW4oJycpKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5taW51dGUgPSAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGxvY2FsPT0nc2Vjb25kJyl7XG4gICAgICAgIGxldCBzZWd1bmRvID0gdGhpcy5zZWNvbmQudG9TdHJpbmcoKS5zcGxpdCgnJyk7XG4gICAgICAgIGlmKHNlZ3VuZG8ubGVuZ3RoPjEpe1xuICAgICAgICBsZXQgcmV0aXJhZG8gPSBzZWd1bmRvLnBvcCgpO1xuICAgICAgICB0aGlzLnNlY29uZCA9ICBwYXJzZUludChzZWd1bmRvLmpvaW4oJycpKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLnNlY29uZCA9IDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkaWdpdGFyKG51bTpudW1iZXIsbG9jYWw6J2hvdXInfCdtaW51dGUnfCdzZWNvbmQnfG51bGwpe1xuICAgIGlmKGxvY2FsKXtcbiAgICAgIGlmKGxvY2FsPT0naG91cicpe1xuICAgICAgICBpZih0aGlzLm5ld0lucHV0KXtcbiAgICAgICAgICB0aGlzLmhvdXI9cGFyc2VJbnQoJzAnK251bSlcbiAgICAgICAgICB0aGlzLm5ld0lucHV0ID0gZmFsc2U7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuaG91cj1wYXJzZUludCh0aGlzLmhvdXIudG9TdHJpbmcoKStudW0pXG4gICAgICAgICAgaWYodGhpcy5ob3VyLnRvU3RyaW5nKCkubGVuZ3RoID09IHRoaXMubWF4SG91ci50b1N0cmluZygpLmxlbmd0aCl7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ21pbnV0ZSc7XG4gICAgICAgICAgICB0aGlzLm5ld0lucHV0PXRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGxvY2FsPT0nbWludXRlJyl7XG4gICAgICAgIGlmKHRoaXMubmV3SW5wdXQpe1xuICAgICAgICAgIHRoaXMubWludXRlPXBhcnNlSW50KCcwJytudW0pXG4gICAgICAgICAgdGhpcy5uZXdJbnB1dCA9IGZhbHNlXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMubWludXRlPXBhcnNlSW50KHRoaXMubWludXRlLnRvU3RyaW5nKCkrbnVtKVxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnc2Vjb25kJztcbiAgICAgICAgICB0aGlzLm5ld0lucHV0PXRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYobG9jYWw9PSdzZWNvbmQnKXtcbiAgICAgICAgaWYodGhpcy5uZXdJbnB1dCl7XG4gICAgICAgICAgdGhpcy5zZWNvbmQ9cGFyc2VJbnQoJzAnK251bSlcbiAgICAgICAgICB0aGlzLm5ld0lucHV0ID0gZmFsc2VcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5zZWNvbmQ9cGFyc2VJbnQodGhpcy5zZWNvbmQudG9TdHJpbmcoKStudW0pXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gICAgICAgICAgdGhpcy5uZXdJbnB1dD10cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZXJyb3IoKXtcbiAgICByZXR1cm4gdGhyb3dFcnJvcigoKT0+IG5ldyBFcnJvcignVGhlIHRpbWUgaXMgYmlnZ2VyIHRoZW4gbWF4IHRpbWU6V2FzIHNldCB0aGUgbWF4IHRpbWUnKSlcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVWYWx1ZSgpOiB2b2lkIHtcbiAgICBpZih0aGlzLmhvdXI+dGhpcy5tYXhIb3VyKXtcbiAgICAgIHRoaXMuaG91ciA9IHRoaXMubWF4SG91cjtcbiAgICAgIHRoaXMuZXJyb3IoKVxuICAgIH1cbiAgICBpZih0aGlzLmhvdXI9PXRoaXMubWF4SG91ciAmJiB0aGlzLm1pbnV0ZT50aGlzLm1heE1pbnV0ZSl7XG4gICAgICB0aGlzLm1pbnV0ZT10aGlzLm1heE1pbnV0ZVxuICAgICAgdGhpcy5lcnJvcigpXG4gICAgfVxuICAgIGlmKHRoaXMuaG91cj09dGhpcy5tYXhIb3VyICYmIHRoaXMubWludXRlPT10aGlzLm1heE1pbnV0ZSAmJiB0aGlzLnNlY29uZD50aGlzLm1heFNlY29uZCl7XG4gICAgICB0aGlzLnNlY29uZD10aGlzLm1heFNlY29uZFxuICAgICAgdGhpcy5lcnJvcigpXG4gICAgfVxuICAgIHN3aXRjaCh0aGlzLnR5cGUpe1xuICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgY29uc3QgcmVzcG9zdGFTZWd1bmRvID0gKCh0aGlzLmhvdXIqNjApK3RoaXMubWludXRlKSo2MCt0aGlzLnNlY29uZFxuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFTZWd1bmRvKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhU2VndW5kby50b1N0cmluZygpKTtcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhTWludXRvID0gKCh0aGlzLmhvdXIqNjApK01hdGguZmxvb3IodGhpcy5zZWNvbmQvNjApKSt0aGlzLm1pbnV0ZVxuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFNaW51dG8pO1xuICAgICAgICB0aGlzLnJlc3BvbnNlU3RyaW5nQ2hhbmdlLmVtaXQocmVzcG9zdGFNaW51dG8udG9TdHJpbmcoKSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ21pbGlzZWNvbmQnOlxuICAgICAgICBjb25zdCByZXNwb3N0YU1pbGlzZWd1bmRvID0gKCgodGhpcy5ob3VyKjYwKSt0aGlzLm1pbnV0ZSkqNjArdGhpcy5zZWNvbmQpKjEwMDA7XG4gICAgICAgIHRoaXMucmVzcG9uc2VDaGFuZ2UuZW1pdChyZXNwb3N0YU1pbGlzZWd1bmRvKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhTWlsaXNlZ3VuZG8udG9TdHJpbmcoKSk7XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgY29uc3QgcmVzcG9zdGFIb3JhID0gTWF0aC5mbG9vcigoTWF0aC5mbG9vcih0aGlzLnNlY29uZC82MCkrdGhpcy5taW51dGUpLzYwKSt0aGlzLmhvdXI7XG4gICAgICAgIHRoaXMucmVzcG9uc2VDaGFuZ2UuZW1pdChyZXNwb3N0YUhvcmEpO1xuICAgICAgICB0aGlzLnJlc3BvbnNlU3RyaW5nQ2hhbmdlLmVtaXQocmVzcG9zdGFIb3JhLnRvU3RyaW5nKCkpO1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhID0gYCR7dGhpcy5ob3VyLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5ob3VyOnRoaXMuaG91cn06JHt0aGlzLm1pbnV0ZS50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMubWludXRlOnRoaXMubWludXRlfToke3RoaXMuc2Vjb25kLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5zZWNvbmQ6dGhpcy5zZWNvbmR9YFxuICAgICAgICBjb25zdCByZXNwb3N0YVNlcGFyYWRhID0ge1xuICAgICAgICAgIGhvdXI6dGhpcy5ob3VyLFxuICAgICAgICAgIG1pbnV0ZTp0aGlzLm1pbnV0ZSxcbiAgICAgICAgICBzZWNvbmQ6dGhpcy5zZWNvbmRcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc3BvbnNlU3RyaW5nQ2hhbmdlLmVtaXQocmVzcG9zdGEpO1xuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFTZXBhcmFkYSk7XG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgcHVibGljIG1heENsb2NrKCl7XG4gICAgdGhpcy5ob3VyID0gdGhpcy5tYXhIb3VyO1xuICAgIHRoaXMubWludXRlID0gdGhpcy5tYXhNaW51dGU7XG4gICAgdGhpcy5zZWNvbmQgPSB0aGlzLm1heFNlY29uZDtcbiAgICB0aGlzLmZlY2hhck1lbnUodGhpcy5tZW51VHJpZ2dlcik7XG4gIH1cblxuICBwdWJsaWMgbm93Q2xvY2soKXtcbiAgICBjb25zdCBhZ29yYSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgaG9yYXMgPSBhZ29yYS5nZXRIb3VycygpO1xuICAgIGNvbnN0IG1pbnV0b3MgPSBhZ29yYS5nZXRNaW51dGVzKCk7XG4gICAgY29uc3Qgc2VndW5kb3MgPSBhZ29yYS5nZXRTZWNvbmRzKCk7XG5cbiAgICB0aGlzLmhvdXIgPSBob3JhcztcbiAgICB0aGlzLm1pbnV0ZSA9IG1pbnV0b3M7XG4gICAgdGhpcy5zZWNvbmQgPSBzZWd1bmRvcztcbiAgICB0aGlzLmZlY2hhck1lbnUodGhpcy5tZW51VHJpZ2dlcik7XG4gIH1cblxuICBwdWJsaWMgZmVjaGFyTWVudSh0cmlnZ2VyOk1hdE1lbnVUcmlnZ2VyKSB7XG4gICAgdGhpcy5kaXNhYmxlQ2xvY2sgPSB0cnVlXG4gICAgdHJpZ2dlci5jbG9zZU1lbnUoKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlKCk7XG4gIH1cblxuICBwdWJsaWMgcHJlZW5jaGVyRGl2cygpIHtcbiAgICB0aGlzLmRpc2FibGVDbG9jayA9IHRydWU7XG4gICAgdGhpcy5ob3VyQ2xvY2sgPSBudWxsO1xuICAgIHRoaXMubWludXRlQ2xvY2sgPSBudWxsO1xuICAgIHRoaXMuc2Vjb25kQ2xvY2sgPSBudWxsO1xuICAgIHRoaXMuZGVzdHJveURpdnMoJ2hvdXJDbG9jaycpXG4gICAgdGhpcy5kZXN0cm95RGl2cygnbWludXRlQ2xvY2snKVxuICAgIHRoaXMuZGVzdHJveURpdnMoJ3NlY29uZENsb2NrJylcbiAgICBjb25zdCBjcmlhckRpdnMgPSAocGFyZW50RWxlbWVudElkOiBzdHJpbmcsIGlkOiBudW1iZXIsIGxpbWl0ZTogbnVtYmVyKSA9PiB7XG5cbiAgICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnRFbGVtZW50SWQpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBsaW1pdGU7IGkrKykge1xuICAgICAgICBjb25zdCBudW1iZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbnVtYmVyRGl2LnRleHRDb250ZW50ID0gaSA8IDEwID8gYDAke2l9YCA6IGAke2l9YDtcbiAgICAgICAgbnVtYmVyRGl2LnN0eWxlLmJvcmRlckJvdHRvbSA9IFwiMXB4IHNvbGlkIGJsYWNrXCI7XG4gICAgICAgIG51bWJlckRpdi5zdHlsZS5wYWRkaW5nID0gXCI1cHggMTBweFwiO1xuICAgICAgICBudW1iZXJEaXYuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICAgIG51bWJlckRpdi5zdHlsZS5tYXJnaW4gPSBcIjJweFwiO1xuXG4gICAgICAgIGxldCBjbGFzc0lkZW50aWZpZXIgPSAnJztcbiAgICAgICAgc3dpdGNoKGlkKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgY2xhc3NJZGVudGlmaWVyID0gJ251bUhvdXJDbG9jayc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjbGFzc0lkZW50aWZpZXIgPSAnbnVtTWludXRlQ2xvY2snO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2xhc3NJZGVudGlmaWVyID0gJ251bVNlY29uZENsb2NrJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIG51bWJlckRpdi5jbGFzc0xpc3QuYWRkKGNsYXNzSWRlbnRpZmllcik7XG5cbiAgICAgICAgbnVtYmVyRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGFsbFNpYmxpbmdzID0gcGFyZW50RWxlbWVudCEucXVlcnlTZWxlY3RvckFsbChgLiR7Y2xhc3NJZGVudGlmaWVyfWApO1xuICAgICAgICAgIGFsbFNpYmxpbmdzLmZvckVhY2goc2libGluZyA9PiB7XG4gICAgICAgICAgICBpZiAoc2libGluZyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgIHNpYmxpbmcuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmKGNsYXNzSWRlbnRpZmllciA9PT0gJ251bUhvdXJDbG9jaycpIHRoaXMuaG91ckNsb2NrID0gbnVtYmVyRGl2LnRleHRDb250ZW50O1xuICAgICAgICAgIGlmKGNsYXNzSWRlbnRpZmllciA9PT0gJ251bU1pbnV0ZUNsb2NrJykgdGhpcy5taW51dGVDbG9jayA9IG51bWJlckRpdi50ZXh0Q29udGVudDtcbiAgICAgICAgICBpZihjbGFzc0lkZW50aWZpZXIgPT09ICdudW1TZWNvbmRDbG9jaycpIHRoaXMuc2Vjb25kQ2xvY2sgPSBudW1iZXJEaXYudGV4dENvbnRlbnQ7XG5cbiAgICAgICAgICBudW1iZXJEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGJsdWVcIjtcblxuICAgICAgICAgIGlmKHRoaXMuaG91ckNsb2NrICYmIHRoaXMubWludXRlQ2xvY2sgJiYgdGhpcy5zZWNvbmRDbG9jayl7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVDbG9jayA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcGFyZW50RWxlbWVudCEuYXBwZW5kQ2hpbGQobnVtYmVyRGl2KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY3JpYXJEaXZzKCdob3VyQ2xvY2snLCAwLCB0aGlzLm1heEhvdXIpO1xuICAgIGNyaWFyRGl2cygnbWludXRlQ2xvY2snLCAxLCA1OSk7XG4gICAgY3JpYXJEaXZzKCdzZWNvbmRDbG9jaycsIDIsIDU5KTtcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95RGl2cyhpZDpzdHJpbmcpe1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgaWYoZWxlbWVudCl7XG4gICAgICBlbGVtZW50LmlubmVySFRNTCA9ICcnXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNvbmZpcm1DbG9jaygpe1xuICAgIHRoaXMuaG91ciA9IHBhcnNlSW50KHRoaXMuaG91ckNsb2NrISlcbiAgICB0aGlzLm1pbnV0ZSA9IHBhcnNlSW50KHRoaXMubWludXRlQ2xvY2shKVxuICAgIHRoaXMuc2Vjb25kID0gcGFyc2VJbnQodGhpcy5zZWNvbmRDbG9jayEpXG4gICAgdGhpcy5mZWNoYXJNZW51KHRoaXMubWVudVRyaWdnZXIpO1xuICB9XG59XG4iLCI8ZGl2IFxuY2xhc3M9XCJ0aW1lcGlja2VyXCJcbltzdHlsZS53aWR0aF09XCJ3aWR0aENzc1wiIFxuW3N0eWxlLmhlaWdodF09XCJoZWlnaHRDc3NcIiAgXG5bc3R5bGUuYm9yZGVyQm90dG9tXT1cImRpc2FibGVkID8gJzFweCBzb2xpZCBncmF5JyA6ICcxcHggc29saWQgYmxhY2snXCI+XG4gIDxkaXYgXG4gIGlkPVwiaG91clwiIFxuICB0YWJpbmRleD1cIjFcIiBcbiAgKGJsdXIpPVwibG9zdEZvY3VzKClcIiBcbiAgKGZvY3VzKT1cImZvY3VzKCRldmVudClcIiBcbiAgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwic2VsZWN0ZWQ9PT0naG91cic/IGNvciA6ICd0cmFuc3BhcmVudCdcIiBcbiAgW3N0eWxlLmNvbG9yXT1cImRpc2FibGVkID8gJ2dyYXknIDogJ2JsYWNrJ1wiXG4gIChjbGljayk9XCJmb2N1cygkZXZlbnQpXCI+e3tob3VyLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5ob3VyOnRoaXMuaG91cn19XG48L2Rpdj5cbiAgPGRpdlxuICBbc3R5bGUuY29sb3JdPVwiZGlzYWJsZWQgPyAnZ3JheScgOiAnYmxhY2snXCJcbiAgPjo8L2Rpdj5cbiAgPGRpdiBcbiAgaWQ9XCJtaW51dGVcIiBcbiAgdGFiaW5kZXg9XCIxXCIgXG4gIChibHVyKT1cImxvc3RGb2N1cygpXCIgXG4gIChmb2N1cyk9XCJmb2N1cygkZXZlbnQpXCIgXG4gIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cInNlbGVjdGVkPT09J21pbnV0ZSc/IGNvciA6ICd0cmFuc3BhcmVudCdcIiBcbiAgW3N0eWxlLmNvbG9yXT1cImRpc2FibGVkID8gJ2dyYXknIDogJ2JsYWNrJ1wiXG4gIChjbGljayk9XCJmb2N1cygkZXZlbnQpXCI+e3ttaW51dGUudG9TdHJpbmcoKS5sZW5ndGg9PT0xPycwJyt0aGlzLm1pbnV0ZTp0aGlzLm1pbnV0ZX19PC9kaXY+XG4gIDxkaXYgKm5nSWY9XCJuZWVkU2Vjb25kc1wiXG4gIFtzdHlsZS5jb2xvcl09XCJkaXNhYmxlZCA/ICdncmF5JyA6ICdibGFjaydcIlxuICA+OjwvZGl2PlxuICA8ZGl2IFxuICAqbmdJZj1cIm5lZWRTZWNvbmRzXCIgXG4gIGlkPVwic2Vjb25kXCIgW3N0eWxlLmNvbG9yXT1cImRpc2FibGVkID8gJ2dyYXknIDogJ2JsYWNrJ1wiIFxuICB0YWJpbmRleD1cIjFcIiAoYmx1cik9XCJsb3N0Rm9jdXMoKVwiIChmb2N1cyk9XCJmb2N1cygkZXZlbnQpXCIgXG4gIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cInNlbGVjdGVkPT09J3NlY29uZCc/IGNvciA6ICd0cmFuc3BhcmVudCdcIiBcbiAgKGNsaWNrKT1cImZvY3VzKCRldmVudClcIj57e3NlY29uZC50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMuc2Vjb25kOnRoaXMuc2Vjb25kfX1cbiAgPC9kaXY+XG4gIDxidXR0b24gKm5nSWY9XCIhZGlzYWJsZWRcIiBtYXQtaWNvbi1idXR0b24gc3R5bGU9XCJwYWRkaW5nOjIwcHg7cG9zaXRpb246cmVsYXRpdmU7Ym90dG9tOjFweFwiIFttYXRNZW51VHJpZ2dlckZvcl09XCJhYm92ZU1lbnVcIiAjdHJpZ2dlcj1cIm1hdE1lbnVUcmlnZ2VyXCIgY2xhc3M9XCJidG5DbG9ja1wiIChjbGljayk9XCJwcmVlbmNoZXJEaXZzKClcIj5cbiAgICA8c3ZnIHdpZHRoPVwiMjBweFwiIGhlaWdodD1cIjIwcHhcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgc3R5bGU9XCJ3aWR0aDogMTdweDtcIj5cbiAgICAgIDxwYXRoIGQ9XCJNMTIgN1YxMkgxNU0yMSAxMkMyMSAxNi45NzA2IDE2Ljk3MDYgMjEgMTIgMjFDNy4wMjk0NCAyMSAzIDE2Ljk3MDYgMyAxMkMzIDcuMDI5NDQgNy4wMjk0NCAzIDEyIDNDMTYuOTcwNiAzIDIxIDcuMDI5NDQgMjEgMTJaXCIgc3Ryb2tlPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG4gICAgPC9zdmc+XG4gIDwvYnV0dG9uPlxuICA8bWF0LW1lbnUgI2Fib3ZlTWVudT1cIm1hdE1lbnVcIiB5UG9zaXRpb249XCJhYm92ZVwiPlxuICA8ZGl2IGNsYXNzPVwibWF0TWVudUNsb2NrXCIgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIj5cbiAgICA8ZGl2IGNsYXNzPVwibnVtYmVyc1wiPlxuICAgICAgPGRpdiBpZD1cImhvdXJDbG9ja1wiPjwvZGl2PlxuICAgICAgPGRpdiBpZD1cIm1pbnV0ZUNsb2NrXCI+PC9kaXY+XG4gICAgICA8ZGl2IGlkPVwic2Vjb25kQ2xvY2tcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyQ2xvY2tcIj5cbiAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gKm5nSWY9XCJtYXggIT09ICcyMzo1OTo1OSdcIiAoY2xpY2spPVwibWF4Q2xvY2soKVwiPk1heDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiAqbmdJZj1cIm1heCA9PSAnMjM6NTk6NTknXCIgKGNsaWNrKT1cIm5vd0Nsb2NrKClcIj5Ob3c8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gW2Rpc2FibGVkXT1cImRpc2FibGVDbG9ja1wiIChjbGljayk9XCJjb25maXJtQ2xvY2soKVwiPk9rPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L21hdC1tZW51PlxuPC9kaXY+Il19