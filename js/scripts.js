"use strict";
(function () {

  document.addEventListener('DOMContentLoaded', function() {
    
    // generowanie losowego numeru
    function randomString() {
      var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
      var str = '';
      for (var i = 0; i < 10; i++) {
          str += chars[Math.floor(Math.random() * chars.length)];
      }
      return str;
    }

    //generuje szablon
    function generateTemplate(name, data, basicElement) {
      var template = document.getElementById(name).innerHTML;
      var element = document.createElement(basicElement || 'div');
    
      Mustache.parse(template);
      element.innerHTML = Mustache.render(template, data);
    
      return element;
    }

    // tworzenie klasy column
    function Column(name) {
      var self = this;
  
      this.id = randomString();
      this.name = name;
      this.element = generateTemplate('column-template', { name: this.name });

      // dodawaie/ kasowanie kolumny
      this.element.querySelector('.column').addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-delete')) {
          self.removeColumn();
        }
      
        if (event.target.classList.contains('add-card')) {
          self.addCard(new Card(prompt("Enter the name of the card")));
        }
      });
    }
      // metoda dodania/usunięcia kolumny
    Column.prototype = {
      addCard: function(card) {
        this.element.querySelector('ul').appendChild(card.element);
      },
      removeColumn: function() {
        this.element.parentNode.removeChild(this.element);
      }
    };

     // tworzenie klasy card
    function Card(description) {
      var self = this;
      this.id = randomString();
      this.description = description;
      this.element = generateTemplate('card-template', { description: this.description }, 'li');
    
      //usuwanie karty
      this.element.querySelector('.card').addEventListener('click', function (event) {
        event.stopPropagation();

        if (event.target.classList.contains('btn-delete')) {
          self.removeCard();
        }
      });
    }

    // metoda usniecia karty
    Card.prototype = {
      removeCard: function() {
        this.element.parentNode.removeChild(this.element);
        }
    }

    // tablica z kolumnami
    var board = {
      name: 'Kanban Board',
      addColumn: function(column) {
        this.element.appendChild(column.element);
        initSortable(column.id); 
      },
      element: document.querySelector('#board .column-container')
    };

    function initSortable(id) {   // umożliwa przenoszenie kolumn
      var el = document.getElementById(id);
      var sortable = Sortable.create(el, {
        group: 'kanban',
        sort: true
      });
    }

    // wrzuca kolumny do tablicy
    document.querySelector('#board .create-column').addEventListener('click', function() {
      var name = prompt('Enter a column name');
      var column = new Column(name);
      board.addColumn(column);
    });

    // tworzenie kolumn
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // dodanie kolumn do tablicy
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // tworzenie kard
    var card1 = new Card('New task');
    var card2 = new Card('In progress');
    var card3 = new Card('Finished');


    // dodanie kart kolumn
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
    doneColumn.addCard(card3);

  });

})();