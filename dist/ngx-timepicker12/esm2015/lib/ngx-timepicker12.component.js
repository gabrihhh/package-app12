import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class NgxTimepicker12Component {
    constructor() {
        this.width = 100;
        this.height = 30;
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
        var _a, _b, _c;
        switch ($event.target.id) {
            case 'hour':
                this.selected = 'hour';
                (_a = document.getElementById('hour')) === null || _a === void 0 ? void 0 : _a.focus();
                break;
            case 'minute':
                this.selected = 'minute';
                (_b = document.getElementById('minute')) === null || _b === void 0 ? void 0 : _b.focus();
                break;
            case 'second':
                this.selected = 'second';
                (_c = document.getElementById('second')) === null || _c === void 0 ? void 0 : _c.focus();
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
            console.log(num, local, this.newInput, this.selected);
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
    updateValue() {
        if (this.hour > this.maxHour) {
            this.hour = this.maxHour;
        }
        if (this.hour == this.maxHour && this.minute > this.maxMinute) {
            this.minute = this.maxMinute;
        }
        if (this.hour == this.maxHour && this.minute == this.maxMinute && this.second > this.maxSecond) {
            this.second = this.maxSecond;
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
}
NgxTimepicker12Component.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NgxTimepicker12Component, deps: [], target: i0.ɵɵFactoryTarget.Component });
NgxTimepicker12Component.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: NgxTimepicker12Component, selector: "ngx-timepicker", inputs: { width: "width", height: "height", font: "font", max: "max", response: "response", responseString: "responseString", needSeconds: "needSeconds", type: "type", cor: "cor" }, outputs: { responseChange: "responseChange", responseStringChange: "responseStringChange" }, ngImport: i0, template: `
  <div [style.width]="widthCss" [style.height]="heightCss" class="timepicker">
    <div id="hour" tabindex="1" (blur)="lostFocus()" (focus)="focus($event)" [style.background-color]="selected==='hour'? cor : 'transparent'" (click)="focus($event)">{{hour.toString().length===1?'0'+this.hour:this.hour}}</div>
    <div>:</div>
    <div id="minute" tabindex="1" (blur)="lostFocus()" (focus)="focus($event)" [style.background-color]="selected==='minute'? cor : 'transparent'" (click)="focus($event)">{{minute.toString().length===1?'0'+this.minute:this.minute}}</div>
    <div *ngIf="needSeconds">:</div>
    <div *ngIf="needSeconds" id="second" tabindex="1" (blur)="lostFocus()" (focus)="focus($event)" [style.background-color]="selected==='second'? cor : 'transparent'" (click)="focus($event)">{{second.toString().length===1?'0'+this.second:this.second}}</div>
  </div>
`, isInline: true, styles: [".timepicker{\n      border-bottom: 1px solid gray;\n      display: flex;\n      flex-wrap: nowrap;\n      justify-content: center;\n      align-items: center;\n    }\n    div{\n      -webkit-user-select: none; /* Safari */\n      -moz-user-select: none; /* Firefox */\n      -ms-user-select: none; /* IE10+/Edge */\n      user-select: none;\n      cursor:pointer;\n    }\n    div:focus{\n      outline:none;\n    }"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
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
      cursor:pointer;
    }
    div:focus{
      outline:none;
    }`
                    ]
                }]
        }], propDecorators: { width: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdGltZXBpY2tlcjEyL3NyYy9saWIvbmd4LXRpbWVwaWNrZXIxMi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQWlDOUYsTUFBTSxPQUFPLHdCQUF3QjtJQS9CckM7UUFpQ1csVUFBSyxHQUFVLEdBQUcsQ0FBQztRQUNuQixXQUFNLEdBQVUsRUFBRSxDQUFDO1FBQ25CLFNBQUksR0FBVSxFQUFFLENBQUM7UUFDakIsUUFBRyxHQUFVLFVBQVUsQ0FBQztRQUN4QixhQUFRLEdBQWdCLElBQUksQ0FBQztRQUM3QixtQkFBYyxHQUFrQixJQUFJLENBQUM7UUFDckMsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIsU0FBSSxHQUFvRCxRQUFRLENBQUE7UUFDaEUsUUFBRyxHQUFVLFNBQVMsQ0FBQztRQUV0QixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDekMseUJBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNsRCxhQUFRLEdBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUM7UUFDcEMsY0FBUyxHQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDO1FBQ3RDLFlBQU8sR0FBVSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQTtRQUNqQyxTQUFJLEdBQVUsQ0FBQyxDQUFDO1FBQ2hCLFdBQU0sR0FBVSxDQUFDLENBQUM7UUFDbEIsV0FBTSxHQUFVLENBQUMsQ0FBQztRQUNsQixhQUFRLEdBQWlDLElBQUksQ0FBQztRQUM5QyxZQUFPLEdBQVUsQ0FBQyxDQUFBO1FBQ2xCLGNBQVMsR0FBVSxDQUFDLENBQUE7UUFDcEIs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USxFQUFFOzs7Ozs7OztDQVFYO29CQUNDLE1BQU0sRUFBRTt3QkFDTjs7Ozs7Ozs7Ozs7Ozs7OztNQWdCRTtxQkFDSDtpQkFDRjs4QkFHVSxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFFSSxjQUFjO3NCQUF2QixNQUFNO2dCQUNHLG9CQUFvQjtzQkFBN0IsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXRpbWVwaWNrZXInLFxuICB0ZW1wbGF0ZTogYFxuICA8ZGl2IFtzdHlsZS53aWR0aF09XCJ3aWR0aENzc1wiIFtzdHlsZS5oZWlnaHRdPVwiaGVpZ2h0Q3NzXCIgY2xhc3M9XCJ0aW1lcGlja2VyXCI+XG4gICAgPGRpdiBpZD1cImhvdXJcIiB0YWJpbmRleD1cIjFcIiAoYmx1cik9XCJsb3N0Rm9jdXMoKVwiIChmb2N1cyk9XCJmb2N1cygkZXZlbnQpXCIgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwic2VsZWN0ZWQ9PT0naG91cic/IGNvciA6ICd0cmFuc3BhcmVudCdcIiAoY2xpY2spPVwiZm9jdXMoJGV2ZW50KVwiPnt7aG91ci50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMuaG91cjp0aGlzLmhvdXJ9fTwvZGl2PlxuICAgIDxkaXY+OjwvZGl2PlxuICAgIDxkaXYgaWQ9XCJtaW51dGVcIiB0YWJpbmRleD1cIjFcIiAoYmx1cik9XCJsb3N0Rm9jdXMoKVwiIChmb2N1cyk9XCJmb2N1cygkZXZlbnQpXCIgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwic2VsZWN0ZWQ9PT0nbWludXRlJz8gY29yIDogJ3RyYW5zcGFyZW50J1wiIChjbGljayk9XCJmb2N1cygkZXZlbnQpXCI+e3ttaW51dGUudG9TdHJpbmcoKS5sZW5ndGg9PT0xPycwJyt0aGlzLm1pbnV0ZTp0aGlzLm1pbnV0ZX19PC9kaXY+XG4gICAgPGRpdiAqbmdJZj1cIm5lZWRTZWNvbmRzXCI+OjwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCJuZWVkU2Vjb25kc1wiIGlkPVwic2Vjb25kXCIgdGFiaW5kZXg9XCIxXCIgKGJsdXIpPVwibG9zdEZvY3VzKClcIiAoZm9jdXMpPVwiZm9jdXMoJGV2ZW50KVwiIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cInNlbGVjdGVkPT09J3NlY29uZCc/IGNvciA6ICd0cmFuc3BhcmVudCdcIiAoY2xpY2spPVwiZm9jdXMoJGV2ZW50KVwiPnt7c2Vjb25kLnRvU3RyaW5nKCkubGVuZ3RoPT09MT8nMCcrdGhpcy5zZWNvbmQ6dGhpcy5zZWNvbmR9fTwvZGl2PlxuICA8L2Rpdj5cbmAsXG4gIHN0eWxlczogW1xuICAgIGAudGltZXBpY2tlcntcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBncmF5O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtd3JhcDogbm93cmFwO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIH1cbiAgICBkaXZ7XG4gICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lOyAvKiBTYWZhcmkgKi9cbiAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7IC8qIEZpcmVmb3ggKi9cbiAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTsgLyogSUUxMCsvRWRnZSAqL1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICBjdXJzb3I6cG9pbnRlcjtcbiAgICB9XG4gICAgZGl2OmZvY3Vze1xuICAgICAgb3V0bGluZTpub25lO1xuICAgIH1gXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4VGltZXBpY2tlcjEyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LEFmdGVyVmlld0luaXR7XG5cbiAgQElucHV0KCkgd2lkdGg6bnVtYmVyID0gMTAwO1xuICBASW5wdXQoKSBoZWlnaHQ6bnVtYmVyID0gMzA7XG4gIEBJbnB1dCgpIGZvbnQ6bnVtYmVyID0gMTA7XG4gIEBJbnB1dCgpIG1heDpzdHJpbmcgPSAnMjM6NTk6NTknO1xuICBASW5wdXQoKSByZXNwb25zZTogbnVtYmVyfG51bGwgPSBudWxsO1xuICBASW5wdXQoKSByZXNwb25zZVN0cmluZzogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG5lZWRTZWNvbmRzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgdHlwZTogJ21pbGlzZWNvbmQnfCdzZWNvbmQnfCdtaW51dGUnfCAnaG91cicgfCAndGltZScgPSAnc2Vjb25kJ1xuICBASW5wdXQoKSBjb3I6c3RyaW5nID0gXCIjNDhiOWM3XCI7XG5cbiAgQE91dHB1dCgpIHJlc3BvbnNlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSByZXNwb25zZVN0cmluZ0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBwdWJsaWMgd2lkdGhDc3M6c3RyaW5nID0gYCR7dGhpcy53aWR0aH1weGA7XG4gIHB1YmxpYyBoZWlnaHRDc3M6c3RyaW5nID0gYCR7dGhpcy5oZWlnaHR9cHhgO1xuICBwdWJsaWMgZm9udENzczpzdHJpbmcgPSBgJHt0aGlzLmZvbnR9cHhgXG4gIHB1YmxpYyBob3VyOm51bWJlciA9IDA7XG4gIHB1YmxpYyBtaW51dGU6bnVtYmVyID0gMDtcbiAgcHVibGljIHNlY29uZDpudW1iZXIgPSAwO1xuICBwdWJsaWMgc2VsZWN0ZWQ6J2hvdXInfCdtaW51dGUnfCdzZWNvbmQnfG51bGwgPSBudWxsO1xuICBwdWJsaWMgbWF4SG91cjpudW1iZXIgPSAwXG4gIHB1YmxpYyBtYXhNaW51dGU6bnVtYmVyID0gMFxuICBwdWJsaWMgbWF4U2Vjb25kOm51bWJlciA9IDBcbiAgcHJpdmF0ZSBuZXdJbnB1dDpib29sZWFuID0gdHJ1ZTtcbiAgcHJpdmF0ZSB0YWJJbmRleDpib29sZWFuID0gZmFsc2U7XG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmKHRoaXMubWF4ICE9ICcnKXtcbiAgICAgIGNvbnN0IGFycmF5TWF4ID0gdGhpcy5tYXguc3BsaXQoJzonKTtcbiAgICAgIHRoaXMubWF4SG91cj1wYXJzZUludChhcnJheU1heFswXSlcbiAgICAgIHRoaXMubWF4TWludXRlPXBhcnNlSW50KGFycmF5TWF4WzFdKVxuICAgICAgdGhpcy5tYXhTZWNvbmQ9cGFyc2VJbnQoYXJyYXlNYXhbMl0pXG4gICAgfVxuICAgIGlmKHRoaXMucmVzcG9uc2VTdHJpbmcpe1xuICAgICAgbGV0IGFycmF5ID0gdGhpcy5yZXNwb25zZVN0cmluZy5zcGxpdCgnOicpO1xuICAgICAgaWYodGhpcy5uZWVkU2Vjb25kcyl7XG4gICAgICAgIHRoaXMuaG91ciA9IHBhcnNlSW50KGFycmF5WzBdKTtcbiAgICAgICAgdGhpcy5taW51dGUgPSBwYXJzZUludChhcnJheVsxXSk7XG4gICAgICAgIHRoaXMuc2Vjb25kID0gcGFyc2VJbnQoYXJyYXlbMl0pO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMuaG91ciA9IHBhcnNlSW50KGFycmF5WzBdKTtcbiAgICAgICAgdGhpcy5taW51dGUgPSBwYXJzZUludChhcnJheVsxXSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHRoaXMucmVzcG9uc2Upe1xuICAgICAgbGV0IHRpbWUgPSB0aGlzLnJlc3BvbnNlXG4gICAgICBpZih0aW1lPjM2MDApe1xuICAgICAgICB0aGlzLmhvdXIgPSBNYXRoLnJvdW5kKHRpbWUvMzYwMClcbiAgICAgICAgdGltZSAtPTM2MDAqdGhpcy5ob3VyXG4gICAgICB9XG4gICAgICBpZih0aW1lPjYwKXtcbiAgICAgICAgdGhpcy5taW51dGUgPSBNYXRoLnJvdW5kKHRpbWUvNjApXG4gICAgICAgIHRpbWUgLT02MCp0aGlzLm1pbnV0ZVxuICAgICAgfVxuICAgICAgaWYodGltZSl7XG4gICAgICAgIHRoaXMuc2Vjb25kID0gdGltZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywoZSk9PntcbiAgICAgIGlmKGUuY29kZSA9PSAnVGFiJyl7XG4gICAgICAgIHN3aXRjaCh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnbWludXRlJ1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdzZWNvbmQnXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gbnVsbFxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYoZS5jb2RlID09ICdBcnJvd1VwJyl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgdGhpcy5ob3VyKytcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgIHRoaXMubWludXRlKytcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kKytcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGUuY29kZSA9PSAnQXJyb3dEb3duJyl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgaWYodGhpcy5ob3VyPT0wKXtcbiAgICAgICAgICAgICAgdGhpcy5ob3VyPXRoaXMubWF4SG91clxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIHRoaXMuaG91ci0tXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICBpZih0aGlzLm1pbnV0ZT09MCl7XG4gICAgICAgICAgICAgIHRoaXMubWludXRlPTU5XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgdGhpcy5taW51dGUtLVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgaWYodGhpcy5zZWNvbmQ9PTApe1xuICAgICAgICAgICAgICB0aGlzLnNlY29uZD01OVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIHRoaXMuc2Vjb25kLS1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGUuY29kZSA9PSAnQXJyb3dSaWdodCcpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHN3aXRjaCh0aGlzLnNlbGVjdGVkKXtcbiAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnbWludXRlJztcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnc2Vjb25kJztcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGUuY29kZSA9PSAnQXJyb3dMZWZ0Jyl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc3dpdGNoKHRoaXMuc2VsZWN0ZWQpe1xuICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ21pbnV0ZSc7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ2hvdXInO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYoZS5jb2RlID09J0JhY2tzcGFjZScpe1xuICAgICAgICBzd2l0Y2godGhpcy5zZWxlY3RlZCl7XG4gICAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICB0aGlzLmFwYWdhcignaG91cicpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICB0aGlzLmFwYWdhcignbWludXRlJylcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgIHRoaXMuYXBhZ2FyKCdzZWNvbmQnKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuXG5cbiAgICAgIHN3aXRjaChlLmtleSl7XG4gICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgIHRoaXMuZGlnaXRhcigxLHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJzInOlxuICAgICAgICAgIHRoaXMuZGlnaXRhcigyLHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJzMnOlxuICAgICAgICAgIHRoaXMuZGlnaXRhcigzLHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJzQnOlxuICAgICAgICAgIHRoaXMuZGlnaXRhcig0LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJzUnOlxuICAgICAgICAgIHRoaXMuZGlnaXRhcig1LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJzYnOlxuICAgICAgICAgIHRoaXMuZGlnaXRhcig2LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJzcnOlxuICAgICAgICAgIHRoaXMuZGlnaXRhcig3LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJzgnOlxuICAgICAgICAgIHRoaXMuZGlnaXRhcig4LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJzknOlxuICAgICAgICAgIHRoaXMuZGlnaXRhcig5LHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJzAnOlxuICAgICAgICAgIHRoaXMuZGlnaXRhcigwLHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGlmKHRoaXMubWludXRlPjU5IHx8IHRoaXMubWludXRlPDApe1xuICAgICAgICB0aGlzLm1pbnV0ZSA9IDBcbiAgICAgIH1cbiAgICAgIGlmKHRoaXMuc2Vjb25kPjU5IHx8IHRoaXMuc2Vjb25kPDApe1xuICAgICAgICB0aGlzLnNlY29uZCA9IDBcbiAgICAgIH1cbiAgICAgIGlmKHRoaXMuaG91ci50b1N0cmluZygpLmxlbmd0aD4zIHx8IHRoaXMuaG91cjwwKXtcbiAgICAgICAgdGhpcy5ob3VyID0gMFxuICAgICAgfVxuICAgICAgdGhpcy51cGRhdGVWYWx1ZSgpXG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBsb3N0Rm9jdXMoKXtcbiAgICB0aGlzLnNlbGVjdGVkID0gbnVsbFxuICB9XG5cbiAgcHVibGljIGZvY3VzKCRldmVudDphbnkpe1xuICAgIHN3aXRjaCgkZXZlbnQudGFyZ2V0LmlkKXtcbiAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ2hvdXInO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG91cicpPy5mb2N1cygpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ21pbnV0ZSc7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaW51dGUnKT8uZm9jdXMoKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICdzZWNvbmQnO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2Vjb25kJyk/LmZvY3VzKClcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbiAgcHVibGljIGFwYWdhcihsb2NhbDogJ2hvdXInfCdtaW51dGUnfCdzZWNvbmQnfG51bGwpIHtcbiAgICBpZihsb2NhbCl7XG4gICAgICBpZihsb2NhbD09J2hvdXInKXtcbiAgICAgICAgbGV0IGhvcmEgPSB0aGlzLmhvdXIudG9TdHJpbmcoKS5zcGxpdCgnJyk7XG4gICAgICAgIGlmKGhvcmEubGVuZ3RoPjEpe1xuICAgICAgICAgIGxldCByZXRpcmFkbyA9IGhvcmEucG9wKCk7XG4gICAgICAgIHRoaXMuaG91ciA9ICBwYXJzZUludChob3JhLmpvaW4oJycpKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLmhvdXIgPSAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGxvY2FsPT0nbWludXRlJyl7XG4gICAgICAgIGxldCBtaW51dG8gPSB0aGlzLm1pbnV0ZS50b1N0cmluZygpLnNwbGl0KCcnKTtcbiAgICAgICAgaWYobWludXRvLmxlbmd0aD4xKXtcbiAgICAgICAgbGV0IHJldGlyYWRvID0gbWludXRvLnBvcCgpO1xuICAgICAgICB0aGlzLm1pbnV0ZSA9ICBwYXJzZUludChtaW51dG8uam9pbignJykpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLm1pbnV0ZSA9IDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYobG9jYWw9PSdzZWNvbmQnKXtcbiAgICAgICAgbGV0IHNlZ3VuZG8gPSB0aGlzLnNlY29uZC50b1N0cmluZygpLnNwbGl0KCcnKTtcbiAgICAgICAgaWYoc2VndW5kby5sZW5ndGg+MSl7XG4gICAgICAgIGxldCByZXRpcmFkbyA9IHNlZ3VuZG8ucG9wKCk7XG4gICAgICAgIHRoaXMuc2Vjb25kID0gIHBhcnNlSW50KHNlZ3VuZG8uam9pbignJykpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuc2Vjb25kID0gMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRpZ2l0YXIobnVtOm51bWJlcixsb2NhbDonaG91cid8J21pbnV0ZSd8J3NlY29uZCd8bnVsbCl7XG4gICAgaWYobG9jYWwpe1xuICAgICAgY29uc29sZS5sb2cobnVtLGxvY2FsLHRoaXMubmV3SW5wdXQsdGhpcy5zZWxlY3RlZClcbiAgICAgIGlmKGxvY2FsPT0naG91cicpe1xuICAgICAgICBpZih0aGlzLm5ld0lucHV0KXtcbiAgICAgICAgICB0aGlzLmhvdXI9cGFyc2VJbnQoJzAnK251bSlcbiAgICAgICAgICB0aGlzLm5ld0lucHV0ID0gZmFsc2VcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5ob3VyPXBhcnNlSW50KHRoaXMuaG91ci50b1N0cmluZygpK251bSlcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gJ21pbnV0ZSc7XG4gICAgICAgICAgdGhpcy5uZXdJbnB1dD10cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGxvY2FsPT0nbWludXRlJyl7XG4gICAgICAgIGlmKHRoaXMubmV3SW5wdXQpe1xuICAgICAgICAgIHRoaXMubWludXRlPXBhcnNlSW50KCcwJytudW0pXG4gICAgICAgICAgdGhpcy5uZXdJbnB1dCA9IGZhbHNlXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMubWludXRlPXBhcnNlSW50KHRoaXMubWludXRlLnRvU3RyaW5nKCkrbnVtKVxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnc2Vjb25kJztcbiAgICAgICAgICB0aGlzLm5ld0lucHV0PXRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYobG9jYWw9PSdzZWNvbmQnKXtcbiAgICAgICAgaWYodGhpcy5uZXdJbnB1dCl7XG4gICAgICAgICAgdGhpcy5zZWNvbmQ9cGFyc2VJbnQoJzAnK251bSlcbiAgICAgICAgICB0aGlzLm5ld0lucHV0ID0gZmFsc2VcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5zZWNvbmQ9cGFyc2VJbnQodGhpcy5zZWNvbmQudG9TdHJpbmcoKStudW0pXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG51bGw7XG4gICAgICAgICAgdGhpcy5uZXdJbnB1dD10cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlVmFsdWUoKTogdm9pZCB7XG4gICAgaWYodGhpcy5ob3VyPnRoaXMubWF4SG91cil7XG4gICAgICB0aGlzLmhvdXIgPSB0aGlzLm1heEhvdXI7XG4gICAgfVxuICAgIGlmKHRoaXMuaG91cj09dGhpcy5tYXhIb3VyICYmIHRoaXMubWludXRlPnRoaXMubWF4TWludXRlKXtcbiAgICAgIHRoaXMubWludXRlPXRoaXMubWF4TWludXRlXG4gICAgfVxuICAgIGlmKHRoaXMuaG91cj09dGhpcy5tYXhIb3VyICYmIHRoaXMubWludXRlPT10aGlzLm1heE1pbnV0ZSAmJiB0aGlzLnNlY29uZD50aGlzLm1heFNlY29uZCl7XG4gICAgICB0aGlzLnNlY29uZD10aGlzLm1heFNlY29uZFxuICAgIH1cbiAgICBzd2l0Y2godGhpcy50eXBlKXtcbiAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhU2VndW5kbyA9ICgodGhpcy5ob3VyKjYwKSt0aGlzLm1pbnV0ZSkqNjArdGhpcy5zZWNvbmRcbiAgICAgICAgdGhpcy5yZXNwb25zZUNoYW5nZS5lbWl0KHJlc3Bvc3RhU2VndW5kbyk7XG4gICAgICAgIHRoaXMucmVzcG9uc2VTdHJpbmdDaGFuZ2UuZW1pdChyZXNwb3N0YVNlZ3VuZG8udG9TdHJpbmcoKSk7XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICBjb25zdCByZXNwb3N0YU1pbnV0byA9ICgodGhpcy5ob3VyKjYwKStNYXRoLmZsb29yKHRoaXMuc2Vjb25kLzYwKSkrdGhpcy5taW51dGVcbiAgICAgICAgdGhpcy5yZXNwb25zZUNoYW5nZS5lbWl0KHJlc3Bvc3RhTWludXRvKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhTWludXRvLnRvU3RyaW5nKCkpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdtaWxpc2Vjb25kJzpcbiAgICAgICAgY29uc3QgcmVzcG9zdGFNaWxpc2VndW5kbyA9ICgoKHRoaXMuaG91cio2MCkrdGhpcy5taW51dGUpKjYwK3RoaXMuc2Vjb25kKSoxMDAwO1xuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFNaWxpc2VndW5kbyk7XG4gICAgICAgIHRoaXMucmVzcG9uc2VTdHJpbmdDaGFuZ2UuZW1pdChyZXNwb3N0YU1pbGlzZWd1bmRvLnRvU3RyaW5nKCkpO1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgIGNvbnN0IHJlc3Bvc3RhSG9yYSA9IE1hdGguZmxvb3IoKE1hdGguZmxvb3IodGhpcy5zZWNvbmQvNjApK3RoaXMubWludXRlKS82MCkrdGhpcy5ob3VyO1xuICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQocmVzcG9zdGFIb3JhKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhSG9yYS50b1N0cmluZygpKTtcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICBjb25zdCByZXNwb3N0YSA9IGAke3RoaXMuaG91ci50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMuaG91cjp0aGlzLmhvdXJ9OiR7dGhpcy5taW51dGUudG9TdHJpbmcoKS5sZW5ndGg9PT0xPycwJyt0aGlzLm1pbnV0ZTp0aGlzLm1pbnV0ZX06JHt0aGlzLnNlY29uZC50b1N0cmluZygpLmxlbmd0aD09PTE/JzAnK3RoaXMuc2Vjb25kOnRoaXMuc2Vjb25kfWBcbiAgICAgICAgY29uc3QgcmVzcG9zdGFTZXBhcmFkYSA9IHtcbiAgICAgICAgICBob3VyOnRoaXMuaG91cixcbiAgICAgICAgICBtaW51dGU6dGhpcy5taW51dGUsXG4gICAgICAgICAgc2Vjb25kOnRoaXMuc2Vjb25kXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNwb25zZVN0cmluZ0NoYW5nZS5lbWl0KHJlc3Bvc3RhKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZUNoYW5nZS5lbWl0KHJlc3Bvc3RhU2VwYXJhZGEpO1xuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxufVxuIl19