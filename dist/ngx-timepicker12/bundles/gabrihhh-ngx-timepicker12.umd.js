(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@gabrihhh/ngx-timepicker12', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.gabrihhh = global.gabrihhh || {}, global.gabrihhh["ngx-timepicker12"] = {}), global.ng.core, global.ng.common));
})(this, (function (exports, i0, i1) { 'use strict';

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

    var NgxTimepicker12Service = /** @class */ (function () {
        function NgxTimepicker12Service() {
        }
        return NgxTimepicker12Service;
    }());
    NgxTimepicker12Service.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxTimepicker12Service, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    NgxTimepicker12Service.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxTimepicker12Service, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxTimepicker12Service, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return []; } });

    var NgxTimepicker12Component = /** @class */ (function () {
        function NgxTimepicker12Component() {
            this.width = 100;
            this.height = 30;
            this.font = 10;
            this.max = '23:59:59';
            this.response = null;
            this.responseString = null;
            this.needSeconds = true;
            this.type = 'second';
            this.cor = "#48b9c7";
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
            this.newInput = true;
            this.tabIndex = false;
        }
        NgxTimepicker12Component.prototype.ngOnInit = function () {
            if (this.max != '') {
                var arrayMax = this.max.split(':');
                this.maxHour = parseInt(arrayMax[0]);
                this.maxMinute = parseInt(arrayMax[1]);
                this.maxSecond = parseInt(arrayMax[2]);
            }
            if (this.responseString) {
                var array = this.responseString.split(':');
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
                            _this.hour++;
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
                            if (_this.hour == 0) {
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
                if (_this.minute > 59 || _this.minute < 0) {
                    _this.minute = 0;
                }
                if (_this.second > 59 || _this.second < 0) {
                    _this.second = 0;
                }
                if (_this.hour.toString().length > 3 || _this.hour < 0) {
                    _this.hour = 0;
                }
                _this.updateValue();
            });
        };
        NgxTimepicker12Component.prototype.lostFocus = function () {
            this.selected = null;
        };
        NgxTimepicker12Component.prototype.focus = function ($event) {
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
        };
        NgxTimepicker12Component.prototype.updateValue = function () {
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
        return NgxTimepicker12Component;
    }());
    NgxTimepicker12Component.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxTimepicker12Component, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    NgxTimepicker12Component.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: NgxTimepicker12Component, selector: "ngx-timepicker", inputs: { width: "width", height: "height", font: "font", max: "max", response: "response", responseString: "responseString", needSeconds: "needSeconds", type: "type", cor: "cor" }, outputs: { responseChange: "responseChange", responseStringChange: "responseStringChange" }, ngImport: i0__namespace, template: "\n  <div [style.width]=\"widthCss\" [style.height]=\"heightCss\" class=\"timepicker\">\n    <div id=\"hour\" tabindex=\"1\" (blur)=\"lostFocus()\" (focus)=\"focus($event)\" [style.background-color]=\"selected==='hour'? cor : 'transparent'\" (click)=\"focus($event)\">{{hour.toString().length===1?'0'+this.hour:this.hour}}</div>\n    <div>:</div>\n    <div id=\"minute\" tabindex=\"1\" (blur)=\"lostFocus()\" (focus)=\"focus($event)\" [style.background-color]=\"selected==='minute'? cor : 'transparent'\" (click)=\"focus($event)\">{{minute.toString().length===1?'0'+this.minute:this.minute}}</div>\n    <div *ngIf=\"needSeconds\">:</div>\n    <div *ngIf=\"needSeconds\" id=\"second\" tabindex=\"1\" (blur)=\"lostFocus()\" (focus)=\"focus($event)\" [style.background-color]=\"selected==='second'? cor : 'transparent'\" (click)=\"focus($event)\">{{second.toString().length===1?'0'+this.second:this.second}}</div>\n  </div>\n", isInline: true, styles: [".timepicker{\n      border-bottom: 1px solid gray;\n      display: flex;\n      flex-wrap: nowrap;\n      justify-content: center;\n      align-items: center;\n    }\n    div{\n      -webkit-user-select: none; /* Safari */\n      -moz-user-select: none; /* Firefox */\n      -ms-user-select: none; /* IE10+/Edge */\n      user-select: none;\n      cursor:pointer;\n    }\n    div:focus{\n      outline:none;\n    }"], directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxTimepicker12Component, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-timepicker',
                        template: "\n  <div [style.width]=\"widthCss\" [style.height]=\"heightCss\" class=\"timepicker\">\n    <div id=\"hour\" tabindex=\"1\" (blur)=\"lostFocus()\" (focus)=\"focus($event)\" [style.background-color]=\"selected==='hour'? cor : 'transparent'\" (click)=\"focus($event)\">{{hour.toString().length===1?'0'+this.hour:this.hour}}</div>\n    <div>:</div>\n    <div id=\"minute\" tabindex=\"1\" (blur)=\"lostFocus()\" (focus)=\"focus($event)\" [style.background-color]=\"selected==='minute'? cor : 'transparent'\" (click)=\"focus($event)\">{{minute.toString().length===1?'0'+this.minute:this.minute}}</div>\n    <div *ngIf=\"needSeconds\">:</div>\n    <div *ngIf=\"needSeconds\" id=\"second\" tabindex=\"1\" (blur)=\"lostFocus()\" (focus)=\"focus($event)\" [style.background-color]=\"selected==='second'? cor : 'transparent'\" (click)=\"focus($event)\">{{second.toString().length===1?'0'+this.second:this.second}}</div>\n  </div>\n",
                        styles: [
                            ".timepicker{\n      border-bottom: 1px solid gray;\n      display: flex;\n      flex-wrap: nowrap;\n      justify-content: center;\n      align-items: center;\n    }\n    div{\n      -webkit-user-select: none; /* Safari */\n      -moz-user-select: none; /* Firefox */\n      -ms-user-select: none; /* IE10+/Edge */\n      user-select: none;\n      cursor:pointer;\n    }\n    div:focus{\n      outline:none;\n    }"
                        ]
                    }]
            }], propDecorators: { width: [{
                    type: i0.Input
                }], height: [{
                    type: i0.Input
                }], font: [{
                    type: i0.Input
                }], max: [{
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
    NgxTimepicker12Module.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxTimepicker12Module, declarations: [NgxTimepicker12Component], imports: [i1.CommonModule], exports: [NgxTimepicker12Component] });
    NgxTimepicker12Module.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxTimepicker12Module, imports: [[
                i1.CommonModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxTimepicker12Module, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            NgxTimepicker12Component
                        ],
                        imports: [
                            i1.CommonModule
                        ],
                        exports: [
                            NgxTimepicker12Component
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
    exports.NgxTimepicker12Service = NgxTimepicker12Service;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=gabrihhh-ngx-timepicker12.umd.js.map