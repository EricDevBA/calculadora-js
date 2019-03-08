 class CalcController {

     constructor() {

         this._lastOperator = '';
         this._lastNumber = '';
         this._operation = [];
         this._locale = 'pt-BR';
         this._displayCalcEl = document.querySelector("#display");
         this._dateEl = document.querySelector("#data");
         this._timeEl = document.querySelector("#hora");
         this._currentDate;
         this.initButtonsEvents();
         this.initialize();
     }

     initialize() {

         this.setDisplayDateTime(); //Chamando o método

         setInterval(() => { //Intervalo, a cada 1000 milissegundos

             this.setDisplayDateTime();

         }, 1000);

         this.setLastNumberToDisplay();


     }


     addEventListenerAll(elements, events, fn) { //Método para cada elemento ter seu evento! Utilizando o Split,ele me retorna um Array

         events.split(' ').forEach(event => {
             elements.addEventListener(event, fn, false);

         });


     }

     clearAll() {
         this._operation = [];

         this.setLastNumberToDisplay();

     }

     clearEntry() {
         this._operation.pop();
         this.setLastNumberToDisplay();


     }

     getLastOperation() {
         return this._operation[this._operation.length - 1];

     }

     setLastOperation(value) {

         this._operation[this._operation.length - 1] = value;

     }

     isOperation(value) {

         return (['+', '-', '/', '%', '*'].indexOf(value) > -1);

     }

     pushOperation(value) {

         this._operation.push(value);

         if (this._operation.length > 3) {

             this.calc();

         }

     }

     getResult() //Retorna o Eval da operação
     {
         return eval(this._operation.join(""));
     }

     calc() {

         let last = '';

         this._lastOperator = this.getLastItem();

         if (this._operation.length < 3) { //Número de Operações (Se for menor...)

             let firstItem = this._operation[0];
             this._operation = [firstItem, this._lastOperator, this._lastNumber];


         }

         if (this._operation.length > 3) { //Se for maior 
             last = this._operation.pop();

             this._lastNumber = this.getResult();

         } else if (this._operation.length == 3) { //Se for igual

             this._lastNumber = this.getLastItem(false);


         }

         console.log('_lastOperator', this._lastOperator);
         console.log('_lastNumber', this._lastNumber);

         let result = this.getResult();

         if (last == '%') { // Tratando o botão "%" (porcentagem)

             result /= 100; //variavel igual a ela mesma

             this._operation = [result];

         } else {

             this._operation = [result];
             if (last) this._operation.push(last);


         }

         this.setLastNumberToDisplay();

     }

     getLastItem(isOperation = true) { //Por padrão me retorna o último operador

         let lastItem;

         for (let i = this._operation.length - 1; i >= 0; i--) {


             if (this.isOperation(this._operation[i]) == isOperation) {
                 lastItem = this._operation[i];
                 break;

             }

         }

         if (!lastItem) {

             lastItem = (isOperation) ? this._lastOperator : this.lastNumber;

         }

         return lastItem;

     }

     setLastNumberToDisplay() {
         let lastNumber = this.getLastItem(false);

         if (!lastNumber) lastNumber = 0;

         this.displayCalc = lastNumber;


     }

     addOperation(value) {


         if (isNaN(this.getLastOperation())) {

             if (this.isOperation(value)) { //Trocar o Operador 

                 this.setLastOperation(value);

             } else {
                 this.pushOperation(value);
                 this.setLastNumberToDisplay();

             }

         } else {

             if (this.isOperation(value)) {

                 this.pushOperation(value);

             } else {

                 let newValue = this.getLastOperation().toString() + value.toString();
                 this.setLastOperation(parseFloat(newValue));
                 this.setLastNumberToDisplay();


             }

         }


     }

     setError() {
         this.displayCalc = 'ERROR';

     }

     addDot() {

         let lastOperation = this.getLastOperation();

         if (isNaN(this.isOperation(lastOperation) || !lastOperation)) {
             this.pushOperation('0.');
         } else {
             this.setLastOperation(lastOperation.toString() + '.');

         }

         this.setLastNumberToDisplay();

     }


     execBtn(value) { //Tratamento dos botões da calculadora através dos switch cases
         switch (value) {
             case 'ac':
                 this.clearAll();
                 break;

             case 'ce':
                 this.clearEntry();
                 break;

             case 'soma':
                 this.addOperation('+');
                 break;

             case 'divisao':
                 this.addOperation('/');
                 break;

             case 'multiplicacao':
                 this.addOperation('*');
                 break;

             case 'subtracao':
                 this.addOperation('-');
                 break;

             case 'porcento':
                 this.addOperation('%');
                 break;

             case 'igual':
                 this.calc();
                 break;

             case 'ponto':
                 this.addDot();
                 break;


             case '0':
             case '1':
             case '2':
             case '3':
             case '4':
             case '5':
             case '6':
             case '7':
             case '8':
             case '9':
                 this.addOperation(parseInt(value));
                 break

             default:
                 this.setError();
                 break;
         }



     }

     initButtonsEvents() { // Eventos do botão
         let buttons = document.querySelectorAll("#buttons > g, #parts > g");

         buttons.forEach((btn, index) => {

             // Eventos do mouse/,interações do usuário
             this.addEventListenerAll(btn, 'click drag', e => {
                 let textBtn = btn.className.baseVal.replace('btn-', '');

                 this.execBtn(textBtn)



             });

             this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
                 btn.style.cursor = 'pointer';

             });


         });


     }


     setDisplayDateTime() { //Método para data e hora incluindo segundos em tempo real
         this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
         this.displayDate = this.currentDate.toLocaleDateString(this._locale);


     }


     // Getters e Setters 

     get displayTime() {
         return this._timeEl.innerHTML;
     }

     set displayTime(value) {
         this._timeEl.innerHTML = value
     }

     get displayDate() {
         return this._dateEl.innerHTML;

     }

     set displayDate(value) {
         this._dateEl.innerHTML = value;
     }

     get displayCalc() {
         return this._displayCalcEl.innerHTML;

     }

     set displayCalc(value) {
         this._displayCalcEl.innerHTML = value;

     }

     get currentDate() {
         return new Date();
     }

     set currentDate(data) {
         this.currentDate = data;

     }

 }