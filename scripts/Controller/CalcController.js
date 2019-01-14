 class CalcController {

     constructor() {
         this._locale = 'pt-BR';
         this._displayCalcEl = document.querySelector("#display");
         this._dateEl = document.querySelector("#data");
         this._timeEl = document.querySelector('#hora');
         this._currentDate;
         this.initialize();
     }

     initialize() {

         this.setDisplayDateTime(); //Chamando o método

         setInterval(() => {  //Intervalo, a cada 1000 milissegundos

             this.setDisplayDateTime();

         }, 1000);

     }

     setDisplayDateTime() {  //Método para data e hora incluindo segundos em tempo real
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