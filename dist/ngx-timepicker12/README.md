<h1 align="center">TimePicker Angular</h1>
<h3>Descrição</h3>
<p align="justify">Propósito do repositório é criar um input do tipo horario que retorne uma parcela de tempo em um tipo específico para o angular 12.</p>
<h3>Métodos</h3>

  -  `[(response)]:` Espera uma variavel do tipo number|null e retorna ela modificada.
  -  `[(responseString)]:`Espera uma variavel do tipo string|null e retorna ela modificada.
  -  `(responseStringChange):`É emitido toda vez que o valor do responseString mudar.
  -  `(responseChange):`É emitido toda vez que o valor do response mudar.
  -  `[needSeconds]:`Espera uma váriavel do tipo boolean que desabilita os segundos caso false.
  -  `[disabled]:`Espera uma variavel do tipo boolean que desabilita o input caso for true.
  -  `[min]:`recebe o valor de horário minimo para se escolher baseando-se na string "hh:mm:ss"
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
  <ngx-timepicker type="time" [(tipo do dado retornado)]="variavel que armazenará esse dado"></ngx-timepicker>
```
<br>
<h4>Como funciona?</h4>
<p align="justify">Instancie uma váriavel para guardar o valor desejado ou utilize uma variavel já existente que você queira guardar o dado de retorno do input, utilize ela no "response" para receber o dado em o valor numérico ou no "responseString" para receber o valor em string, após isso defina o "type" pelo tipo de dado que você quer receber. </p>
<br>
<p>Exemplo de component utilizando timepicker para recebimento de horario em string("00:00:00") com botão para receber o valor no console:</p>
<br>

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ngx-timepicker [max]="maxValue" [min]="minValue" type="time" [(responseString)]="value"></ngx-timepicker>
    <button (click)="getTime()">Submit</button>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public value = "00:00:00"
  public minvalue = '12:00:00'
  public maxValue = '22:00:00'
  public getTime() {
    console.log(this.value)
  }
}

```

<p align="justify">Nesse exemplo o input retornará um valor em string de "hh:mm:ss" entre "12:00:00" e "22:00:00" onde o input será instanciado as "00:00:00".</p>

>[!NOTE]
>
>"value" o valor mostrado na inicialização e a resposta do input.<br>
>"maxValue" o valor que o input não deixará ultrapassar.
>"type" o tipo de dado que será recebido.
