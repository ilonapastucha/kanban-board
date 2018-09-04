var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
    'X-Client-Id': '3507',
    'X-Auth-Token': '0e7f2728083188aaf56325802540cc4b',
    //'Content-Type': 'application/json; charset=utf-8'
};

 //generuje szablon
function generateTemplate(name, data, basicElement) {
    var template = document.getElementById(name).innerHTML;
    var element = document.createElement(basicElement || 'div');
  
    Mustache.parse(template);
    element.innerHTML = Mustache.render(template, data);
  
    return element;
}

document.addEventListener('DOMContentLoaded', function() {
    // funkcja odpytująca serwer o zasób tablicy
    fetch(baseUrl + '/board', { headers: myHeaders })
        .then(function(resp) {
            return resp.json();
        })
        .then(function(resp) {
            setupColumns(resp.columns);
        });

    // tworzenie kolumn i dodanie do tablicy

    function setupColumns(columns) {
        columns.forEach(function(column) {
              var col = new Column(column.id, column.name);
            board.addColumn(col);
            setupCards(col, column.cards); //dodaje kartę do kolumny
        });
    }
    // tworzy karty w kolumnie
    function setupCards(col, cards) {
        cards.forEach(function (card) {
        var cardObj = new Card(card.id, card.name);
          col.addCard(cardObj);
        });
    }

})