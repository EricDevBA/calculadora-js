 class CalcController {

     constructor() {
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

     }


     addEventListenerAll(elements, events, fn) { //Método para cada elemento ter seu evento! Utilizando o Split,ele me retorna um Array

         events.split(' ').forEach(event => {
             elements.addEventListener(event, fn, false);

         });


     }

     clearAll() {
         this._operation = [];

     }

     clearEntry() {
         this._operation.pop();
     }

     getLastOperation() {
         return this._operation[this._operation.length - 1];

     }

     setLastOperation(value) {

         this._operation[this._operation.length - 1] = value;

     }

     IsOperation(value) {

         return (['+', '-', '/', '%', '*'].indexOf(value) > -1);

     }

     pushOperation(value) {

         if (this._operation.length > 3) {

             let last = this._operation.pop();

             this.calc()

         }

     }
     calc() {
         let last = this._operation.pop();
         let result = eval(this._operation.join(""));
         this._operation = [result, last];




     }


     setLastNumberToDisplay() {


     }

     addOperation(value) {


         if (isNaN(this.getLastOperation())) {

             if (this.IsOperation(value)) { //Trocar o Operador 

                 this.setLastOperation(value);

             } else if (isNaN(value)) {

                 console.log('Outra coisa', value);

             } else {
                 this.pushOperation(value);
             }

         } else {

             if (this.IsOperation(value)) {

                 this.pushOperation(value);

             } else {

                 let newValue = this.getLastOperation().toString() + value.toString();
                 this.setLastOperation(parseInt(newValue));
                 this.setLastNumberToDisplay();


             }

         }


     }

     setError() {
         this.displayCalc = 'ERROR';

     }


     execBtn(value) {
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
                 break;

             case 'ponto':
                 this.addOperation('.')
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