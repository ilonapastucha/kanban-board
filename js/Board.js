// tablica z kolumnami
var board = {
  name: "Kanban Board", // nazwa
  addColumn: function (column) {
    this.element.appendChild(column.element); // dodaje możliwosc tworzenia kolumn // usówa bezpośrednio z danej kolumny
    initSortable(column.id);
  },
  element: document.querySelector('#board .column-container')
}

document.querySelector('#board .create-column').addEventListener('click', function () {
  var name = prompt('Enter a column name');
  var data = new FormData;

  data.append('name', name);

  fetch(baseUrl + '/column',{
      method: 'POST',
      headers: myHeaders,
      body: data,
    })
    .then(function (resp) {
      return resp.json();
    })
    .then(function (resp) {
      var column = new Column(resp.id, name);
      board.addColumn(column);
    });
});

function initSortable(id) {
  var self = this;
  var el = document.getElementById(id);
  var sortable = Sortable.create(el, {
    group: 'kanban',
    sort: true,

    onEnd: function (event, ui) {
      var cardName = event.item.querySelector('.card-description').innerHTML;
      var cardId = event.item.querySelector('.card').id;
      var newCard = new Card(cardId, cardName);

      newCard.update(event.target.id);
    }

  });
}