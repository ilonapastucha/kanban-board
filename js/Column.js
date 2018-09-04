function Column(id, name) {
  var self = this; // kontekst

  this.id = id;
  this.name = name || 'no name given';
  this.element = generateTemplate('column-template', {
    name: this.name,
    id: this.id
  });

  // dodanie kolumny
  this.element.querySelector('.column').addEventListener('click', function (event) {

    if (event.target.classList.contains('btn-delete')) {
      self.removeColumn();
    }
    // wywołanie funkcji przez element z klasą add-card
    if (event.target.classList.contains('add-card')) {

      var cardName = prompt('Enter the name of the card');
      event.preventDefault();

      // wykonuje się po utworzeniu nowej kolumny
      var data = new FormData(); // interfejs dostarczający możliwość tworzenia par klucz-wartość, reprezentujących pola formularza
      data.append('name', cardName);
      data.append('bootcamp_kanban_column_id', self.id);


      fetch(baseUrl + '/card', {
          method: 'POST',
          headers: myHeaders,
          body: data
        })
        .then(function (resp) { //utrata kontekstu powoduje użycie self
          return resp.json();
        })
        .then(function (resp) {
          var card = new Card(resp.id, cardName);
          self.addCard(card);
        });
    }
  });
}

Column.prototype = {
  addCard: function (card) {
    this.element.querySelector('ul').appendChild(card.element);
  },

  //usuwanie kolumny z potwierdzeniem z serwera 
  removeColumn: function () {
    var self = this;
    fetch(baseUrl + '/column/' + self.id, {
        method: 'DELETE',
        headers: myHeaders
      })
      .then(function (resp) {
        return resp.json();
      })
      .then(function (resp) {
        self.element.parentNode.removeChild(self.element);
      })
  }
}