<h1 align="center">TimePicker Angular</h1>
<h3>Descrição</h3>
<p align="justify">Propósito do repositório é criar um input do tipo horario que retorne uma parcela de tempo em um tipo específico para o angular 12.</p>
<h3>Métodos</h3>

  -  `[(response)]:` Espera uma variavel do tipo number|null e retorna ela modificada.
  -  `[(responseString)]:`Espera uma variavel do tipo string|null e retorna ela modificada.
  -  `[max]:`recebe o valor de horário maximo para se escolher baseando-se na string "hh:mm:ss"
  -  `[type]:`recebe o tipo de valor que vai ser retornado sendo ele:
      -  `'milisecond':`retorna o valor em milisegundos.
      -  `'second':`retorna o valor em segundos.
      -  `'minute':`retorna o valor em minutos.
      -  `'hour':`retorna o valor em horas.
      -  `'time':`retorna o horário baseado em "hh:mm:ss" sendo string.

<h3>Implementação</h3>
<p align="justify">Para implementar o repositório, faça o "npm i @gabrihhh/ngx-timepicker" a pasta do projeto, importe o NgxTimePickerModule no Módulo de sua preferência e após isso utilize a tag <ngx-timepicker></ngx-timepicker> no HTML onde irá utilizar.</p>
<br>

>[!NOTE]
>
>Os métodos são utilizados dentro da tag do timepicker:<br>
><ngx-timepicker type="time" [(response)]="variavel">

<br>

<h3>Exemplo de uso</h3>
<h4>appModule:</h4>
<br>

```js
  import { NgxTimePickerModule } from 'caminho/completo';

  @NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NgxTimePickerModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
<br>
<h4>html do component que será utilizado:</h4>
<br>

```js
  <ngx-timepicker type="time" [(response)]="variavel que será modificada"></ngx-timepicker>
```
<br>
<h4>Como funciona?</h4>
<p align="justify">Instancie uma váriavel para guardar o valor desejado, utilize ela no "response" para receber em o valor numerico ou no "responseString" para receber o valor em string, após isso defina o "type" pelo tipo de dado que você quer receber. Exemplo de component utilizando timepicker para recebimento de horario em string("00:00:00") com botão para receber o valor no console:</p>
<br>

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ngx-timepicker [max]="maxValue" type="time" [(responseString)]="value"></ngx-timepicker>
    <button (click)="getTime()">Submit</button>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public value = '12:00:00'
  public maxValue = '22:00:00'
  public getTime() {
    console.log(this.value)
  }
}

```
>[!NOTE]
>
>"value" o valor mostrado na inicialização e a resposta do input.<br>
>"maxValue" o valor que o input não deixará ultrapassar.
>"type" o tipo de dado que será recebido.
