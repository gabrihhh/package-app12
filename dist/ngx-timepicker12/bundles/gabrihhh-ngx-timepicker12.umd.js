(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material/button'), require('@angular/material/menu'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@gabrihhh/ngx-timepicker12', ['exports', '@angular/core', '@angular/material/button', '@angular/material/menu', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.gabrihhh = global.gabrihhh || {}, global.gabrihhh["ngx-timepicker12"] = {}), global.ng.core, global.ng.material.button, global.ng.material.menu, global.ng.common));
})(this, (function (exports, i0, i1, i2, i3) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);

    var NgxTimepicker12Component = /** @class */ (function () {
        function NgxTimepicker12Component() {
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
            this.responseChange = new i0.EventEmitter();
            this.responseStringChange = new i0.EventEmitter();
            this.widthCss = this.width + "px";
            this.heightCss = this.height + "px";
            this.fontCss = this.font + "px";
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
        NgxTimepicker12Component.prototype.ngOnInit = function () {
            if (this.min != '') {
                var arrayMin = this.min.split(':');
                this.minHour = parseInt(arrayMin[0]);
                this.minMinute = parseInt(arrayMin[1]);
                this.minSecond = parseInt(arrayMin[2]);
            }
            if (this.max != '') {
                var arrayMax = this.max.split(':');
                this.maxHour = parseInt(arrayMax[0]);
                this.maxMinute = parseInt(arrayMax[1]);
                this.maxSecond = parseInt(arrayMax[2]);
            }
            if (this.responseString) {
                this.init(this.responseString);
            }
            if (this.response) {
                var time = this.response;
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
        };
        NgxTimepicker12Component.prototype.ngOnChanges = function (changes) {
            // Verifica se 'responseString' foi a propriedade que mudou
            if (changes['responseString']) {
                // const previousValue = changes['responseString'].previousValue; --- caso precise do valor antes da mudança do input
                var currentValue = changes['responseString'].currentValue;
                if (currentValue) {
                    this.init(currentValue);
                }
                else {
                    this.init("00:00:00");
                }
            }
            if (changes['disabled']) {
                // const previousValue = changes['responseString'].previousValue; --- caso precise do valor antes da mudança do input
                var currentValue = changes['disabled'].currentValue;
                this.disabled = currentValue;
            }
            if (changes['max']) {
                var currentValue = changes['max'].currentValue;
                var arrayMax = currentValue.split(':');
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
                var currentValue = changes['min'].currentValue;
                var arrayMin = currentValue.split(':');
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
                var currentValue = changes['needSeconds'].currentValue;
                this.needSeconds = currentValue;
            }
        };
        NgxTimepicker12Component.prototype.init = function (responseString) {
            var array = responseString.split(':');
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
        };
        NgxTimepicker12Component.prototype.ngAfterViewInit = function () {
            var _this = this;
            document.addEventListener('keydown', function (e) {
                if (e.code == 'Tab') {
                    switch (_this.selected) {
                        case 'hour':
                            _this.selected = 'minute';
                            break;
                        case 'minute':
                            _this.selected = 'second';
                            break;
                        case 'second':
                            _this.selected = null;
                            break;
                    }
                }
                if (e.code == 'ArrowUp') {
                    e.preventDefault();
                    switch (_this.selected) {
                        case 'hour':
                            if (_this.hour == _this.maxHour) {
                                _this.hour = _this.minHour;
                            }
                            else {
                                _this.hour++;
                            }
                            break;
                        case 'minute':
                            _this.minute++;
                            break;
                        case 'second':
                            _this.second++;
                            break;
                    }
                }
                if (e.code == 'ArrowDown') {
                    e.preventDefault();
                    switch (_this.selected) {
                        case 'hour':
                            if (_this.hour == _this.minHour) {
                                _this.hour = _this.maxHour;
                            }
                            else {
                                _this.hour--;
                            }
                            break;
                        case 'minute':
                            if (_this.minute == 0) {
                                _this.minute = 59;
                            }
                            else {
                                _this.minute--;
                            }
                            break;
                        case 'second':
                            if (_this.second == 0) {
                                _this.second = 59;
                            }
                            else {
                                _this.second--;
                            }
                            break;
                    }
                }
                if (e.code == 'ArrowRight') {
                    e.preventDefault();
                    switch (_this.selected) {
                        case 'hour':
                            _this.selected = 'minute';
                            break;
                        case 'minute':
                            _this.selected = 'second';
                            break;
                    }
                }
                if (e.code == 'ArrowLeft') {
                    e.preventDefault();
                    switch (_this.selected) {
                        case 'second':
                            _this.selected = 'minute';
                            break;
                        case 'minute':
                            _this.selected = 'hour';
                            break;
                    }
                }
                if (e.code == 'Backspace') {
                    switch (_this.selected) {
                        case 'hour':
                            _this.apagar('hour');
                            break;
                        case 'minute':
                            _this.apagar('minute');
                            break;
                        case 'second':
                            _this.apagar('second');
                            break;
                    }
                }
                switch (e.key) {
                    case '1':
                        _this.digitar(1, _this.selected);
                        break;
                    case '2':
                        _this.digitar(2, _this.selected);
                        break;
                    case '3':
                        _this.digitar(3, _this.selected);
                        break;
                    case '4':
                        _this.digitar(4, _this.selected);
                        break;
                    case '5':
                        _this.digitar(5, _this.selected);
                        break;
                    case '6':
                        _this.digitar(6, _this.selected);
                        break;
                    case '7':
                        _this.digitar(7, _this.selected);
                        break;
                    case '8':
                        _this.digitar(8, _this.selected);
                        break;
                    case '9':
                        _this.digitar(9, _this.selected);
                        break;
                    case '0':
                        _this.digitar(0, _this.selected);
                        break;
                }
                _this.updateValue();
            });
        };
        NgxTimepicker12Component.prototype.lostFocus = function () {
            this.selected = null;
        };
        NgxTimepicker12Component.prototype.focus = function ($event) {
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
        };
        NgxTimepicker12Component.prototype.apagar = function (local) {
            if (local) {
                if (local == 'hour') {
                    var hora = this.hour.toString().split('');
                    if (hora.length > 1) {
                        var retirado = hora.pop();
                        this.hour = parseInt(hora.join(''));
                    }
                    else {
                        this.hour = 0;
                    }
                }
                if (local == 'minute') {
                    var minuto = this.minute.toString().split('');
                    if (minuto.length > 1) {
                        var retirado = minuto.pop();
                        this.minute = parseInt(minuto.join(''));
                    }
                    else {
                        this.minute = 0;
                    }
                }
                if (local == 'second') {
                    var segundo = this.second.toString().split('');
                    if (segundo.length > 1) {
                        var retirado = segundo.pop();
                        this.second = parseInt(segundo.join(''));
                    }
                    else {
                        this.second = 0;
                    }
                }
            }
        };
        NgxTimepicker12Component.prototype.digitar = function (num, local) {
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
        };
        NgxTimepicker12Component.prototype.updateValue = function () {
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
                    var respostaSegundo = ((this.hour * 60) + this.minute) * 60 + this.second;
                    this.responseChange.emit(respostaSegundo);
                    this.responseStringChange.emit(respostaSegundo.toString());
                    break;
                case 'minute':
                    var respostaMinuto = ((this.hour * 60) + Math.floor(this.second / 60)) + this.minute;
                    this.responseChange.emit(respostaMinuto);
                    this.responseStringChange.emit(respostaMinuto.toString());
                    break;
                case 'milisecond':
                    var respostaMilisegundo = (((this.hour * 60) + this.minute) * 60 + this.second) * 1000;
                    this.responseChange.emit(respostaMilisegundo);
                    this.responseStringChange.emit(respostaMilisegundo.toString());
                    break;
                case 'hour':
                    var respostaHora = Math.floor((Math.floor(this.second / 60) + this.minute) / 60) + this.hour;
                    this.responseChange.emit(respostaHora);
                    this.responseStringChange.emit(respostaHora.toString());
                    break;
                case 'time':
                    var resposta = (this.hour.toString().length === 1 ? '0' + this.hour : this.hour) + ":" + (this.minute.toString().length === 1 ? '0' + this.minute : this.minute) + ":" + (this.second.toString().length === 1 ? '0' + this.second : this.second);
                    var respostaSeparada = {
                        hour: this.hour,
                        minute: this.minute,
                        second: this.second
                    };
                    this.responseStringChange.emit(resposta);
                    this.responseChange.emit(respostaSeparada);
                    break;
            }
        };
        NgxTimepicker12Component.prototype.maxClock = function () {
            this.hour = this.maxHour;
            this.minute = this.maxMinute;
            this.second = this.maxSecond;
            this.fecharMenu(this.menuTrigger);
        };
        NgxTimepicker12Component.prototype.nowClock = function () {
            var agora = new Date();
            var horas = agora.getHours();
            var minutos = agora.getMinutes();
            var segundos = agora.getSeconds();
            this.hour = horas;
            this.minute = minutos;
            this.second = segundos;
            this.fecharMenu(this.menuTrigger);
        };
        NgxTimepicker12Component.prototype.fecharMenu = function (trigger) {
            this.disableClock = true;
            trigger.closeMenu();
            this.updateValue();
        };
        NgxTimepicker12Component.prototype.preencherDivs = function () {
            var _this = this;
            this.disableClock = true;
            this.hourClock = null;
            this.minuteClock = null;
            this.secondClock = null;
            this.destroyDivs('hourClock');
            this.destroyDivs('minuteClock');
            this.destroyDivs('secondClock');
            var criarDivs = function (parentElementId, id, limite) {
                var parentElement = document.getElementById(parentElementId);
                var _loop_1 = function (i) {
                    var numberDiv = document.createElement('div');
                    numberDiv.textContent = i < 10 ? "0" + i : "" + i;
                    numberDiv.style.borderBottom = "1px solid black";
                    numberDiv.style.padding = "5px 10px";
                    numberDiv.style.cursor = "pointer";
                    numberDiv.style.margin = "2px";
                    var classIdentifier = '';
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
                    numberDiv.addEventListener('click', function () {
                        var allSiblings = parentElement.querySelectorAll("." + classIdentifier);
                        allSiblings.forEach(function (sibling) {
                            if (sibling instanceof HTMLElement) {
                                sibling.style.backgroundColor = "";
                            }
                        });
                        if (classIdentifier === 'numHourClock')
                            _this.hourClock = numberDiv.textContent;
                        if (classIdentifier === 'numMinuteClock')
                            _this.minuteClock = numberDiv.textContent;
                        if (classIdentifier === 'numSecondClock')
                            _this.secondClock = numberDiv.textContent;
                        numberDiv.style.backgroundColor = "lightblue";
                        if (_this.hourClock && _this.minuteClock && _this.secondClock) {
                            _this.disableClock = false;
                        }
                    });
                    parentElement.appendChild(numberDiv);
                };
                for (var i = 0; i <= limite; i++) {
                    _loop_1(i);
                }
            };
            criarDivs('hourClock', 0, this.maxHour);
            criarDivs('minuteClock', 1, 59);
            criarDivs('secondClock', 2, 59);
        };
        NgxTimepicker12Component.prototype.destroyDivs = function (id) {
            var element = document.getElementById(id);
            if (element) {
                element.innerHTML = '';
            }
        };
        NgxTimepicker12Component.prototype.confirmClock = function () {
            this.hour = parseInt(this.hourClock);
            this.minute = parseInt(this.minuteClock);
            this.second = parseInt(this.secondClock);
            this.fecharMenu(this.menuTrigger);
        };
        return NgxTimepicker12Component;
    }());
    NgxTimepicker12Component.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxTimepicker12Component, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    NgxTimepicker12Component.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: NgxTimepicker12Component, selector: "ngx-timepicker", inputs: { width: "width", height: "height", font: "font", max: "max", min: "min", response: "response", responseString: "responseString", needSeconds: "needSeconds", type: "type", cor: "cor", disabled: "disabled" }, outputs: { responseChange: "responseChange", responseStringChange: "responseStringChange" }, viewQueries: [{ propertyName: "menuTrigger", first: true, predicate: ["trigger"], descendants: true }], usesOnChanges: true, ngImport: i0__namespace, template: "<div \nclass=\"timepicker\"\n[style.width]=\"widthCss\" \n[style.height]=\"heightCss\"  \n[style.borderBottom]=\"disabled ? '1px solid gray' : '1px solid black'\">\n  <div \n  id=\"hour\" \n  tabindex=\"1\" \n  (blur)=\"lostFocus()\" \n  (focus)=\"focus($event)\" \n  [style.background-color]=\"selected==='hour'? cor : 'transparent'\" \n  [style.color]=\"disabled ? 'gray' : 'black'\"\n  (click)=\"focus($event)\">{{hour.toString().length - maxHourLength !== 0 ? ('0'.repeat(maxHourLength - hour.toString().length)) + this.hour : this.hour}}\n</div>\n  <div\n  [style.color]=\"disabled ? 'gray' : 'black'\"\n  >:</div>\n  <div \n  id=\"minute\" \n  tabindex=\"1\" \n  (blur)=\"lostFocus()\" \n  (focus)=\"focus($event)\" \n  [style.background-color]=\"selected==='minute'? cor : 'transparent'\" \n  [style.color]=\"disabled ? 'gray' : 'black'\"\n  (click)=\"focus($event)\">{{minute.toString().length===1?'0'+this.minute:this.minute}}</div>\n  <div *ngIf=\"needSeconds\"\n  [style.color]=\"disabled ? 'gray' : 'black'\"\n  >:</div>\n  <div \n  *ngIf=\"needSeconds\" \n  id=\"second\" [style.color]=\"disabled ? 'gray' : 'black'\" \n  tabindex=\"1\" (blur)=\"lostFocus()\" (focus)=\"focus($event)\" \n  [style.background-color]=\"selected==='second'? cor : 'transparent'\" \n  (click)=\"focus($event)\">{{second.toString().length===1?'0'+this.second:this.second}}\n  </div>\n  <button *ngIf=\"!disabled\" mat-icon-button style=\"padding:20px;position:relative;bottom:1px\" [matMenuTriggerFor]=\"aboveMenu\" #trigger=\"matMenuTrigger\" class=\"btnClock\" (click)=\"preencherDivs()\">\n    <svg width=\"20px\" height=\"20px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" style=\"width: 17px;\">\n      <path d=\"M12 7V12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    </svg>\n  </button>\n  <mat-menu #aboveMenu=\"matMenu\" yPosition=\"above\">\n  <div class=\"matMenuClock\" (click)=\"$event.stopPropagation();\">\n    <div class=\"numbers\">\n      <div id=\"hourClock\"></div>\n      <div id=\"minuteClock\"></div>\n      <div id=\"secondClock\"></div>\n    </div>\n    <div class=\"footerClock\">\n      <button mat-raised-button *ngIf=\"max !== '23:59:59'\" (click)=\"maxClock()\">Max</button>\n      <button mat-raised-button *ngIf=\"max == '23:59:59'\" (click)=\"nowClock()\">Now</button>\n      <button mat-raised-button [disabled]=\"disableClock\" (click)=\"confirmClock()\">Ok</button>\n    </div>\n  </div>\n  </mat-menu>\n</div>", styles: [".timepicker{border-bottom:1px solid gray;display:flex;flex-wrap:nowrap;justify-content:center;align-items:center}div{-webkit-user-select:none;user-select:none}div:focus{outline:none}.btnClock{margin:0 5px;height:30px;min-width:25px;display:flex;justify-content:center;align-items:center}.btnClock{display:flex;justify-content:center;align-items:center;min-height:25px;height:25px}.matMenuClock{width:150px;height:150px;display:flex;flex-direction:column}.numbers{width:150px;height:120px;display:flex}.numbers>div{width:50px;height:120px;display:flex;flex-direction:column;align-items:center;overflow:scroll;scrollbar-width:none}.numbers>div::-webkit-scrollbar{display:none}.footerClock{width:150px;height:30px;display:flex;justify-content:space-around;align-items:center}.footerClock button{min-width:50px;min-height:20px;width:50px;height:20px;font-size:15px;display:flex;justify-content:center;align-items:center}\n"], components: [{ type: i1__namespace.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i2__namespace.MatMenu, selector: "mat-menu", exportAs: ["matMenu"] }], directives: [{ type: i3__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", exportAs: ["matMenuTrigger"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxTimepicker12Component, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-timepicker',
                        templateUrl: 'ngx-timepicker12.component.html',
                        styleUrls: ['ngx-timepicker12.component.scss'],
                    }]
            }], ctorParameters: function () { return []; }, propDecorators: { menuTrigger: [{
                    type: i0.ViewChild,
                    args: ['trigger']
                }], width: [{
                    type: i0.Input
                }], height: [{
                    type: i0.Input
                }], font: [{
                    type: i0.Input
                }], max: [{
                    type: i0.Input
                }], min: [{
                    type: i0.Input
                }], response: [{
                    type: i0.Input
                }], responseString: [{
                    type: i0.Input
                }], needSeconds: [{
                    type: i0.Input
                }], type: [{
                    type: i0.Input
                }], cor: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], responseChange: [{
                    type: i0.Output
                }], responseStringChange: [{
                    type: i0.Output
                }] } });

    var NgxTimepicker12Module = /** @class */ (function () {
        function NgxTimepicker12Module() {
        }
        return NgxTimepicker12Module;
    }());
    NgxTimepicker12Module.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxTimepicker12Module, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    NgxTimepicker12Module.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxTimepicker12Module, declarations: [NgxTimepicker12Component], imports: [i3.CommonModule,
            i1.MatButtonModule,
            i2.MatMenuModule], exports: [NgxTimepicker12Component] });
    NgxTimepicker12Module.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxTimepicker12Module, imports: [[
                i3.CommonModule,
                i1.MatButtonModule,
                i2.MatMenuModule,
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxTimepicker12Module, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            NgxTimepicker12Component,
                        ],
                        imports: [
                            i3.CommonModule,
                            i1.MatButtonModule,
                            i2.MatMenuModule,
                        ],
                        exports: [
                            NgxTimepicker12Component,
                        ]
                    }]
            }] });

    /*
     * Public API Surface of ngx-timepicker12
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NgxTimepicker12Component = NgxTimepicker12Component;
    exports.NgxTimepicker12Module = NgxTimepicker12Module;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=gabrihhh-ngx-timepicker12.umd.js.map
