// tworzenie klasy card
function Card(id, name) {
    var self = this;

    this.id = id;
    this.name = name || 'No name given';
    this.element = generateTemplate('card-template', {
        description: this.name,
        id: this.id
    }, 'li') // nazwa: card-template, li jako element ul którą jest nasza kolumna

    this.element.querySelector('.card').addEventListener('click', function (event) {
        event.stopPropagation();

        if (event.target.classList.contains('btn-delete')) {
            self.removeCard();

        }
    });

    this.element.querySelector('.card').addEventListener('dblclick', function (event) {
        event.stopPropagation();
        self.update();
    });

}
// usunięcie karty z serwera
Card.prototype = {
    removeCard: function () {
        var self = this;

        fetch(baseUrl + '/card/' + self.id, {
                method: 'DELETE',
                headers: myHeaders
            })
            .then(function (resp) {
                return resp.json();
            })
            .then(function (resp) {
                self.element.parentNode.removeChild(self.element);
            })
    },

    update: function (targetList) {
        var self = this;

        if (event.type == 'dblclick') {
            var newName = prompt('Enter new name');
        }

        var columnId = targetList;
        var data = new FormData();

        data.append('name', newName || this.name);
        data.append('bootcamp_kanban_column_id', columnId);
        var contentType = {
            'Content-Type': 'application/json; charset=utf-8'
        }

        newHeaders = Object.assign({}, myHeaders);
        newHeaders['Content-Type'] = 'application/json; charset=utf8';



        fetch(baseUrl + '/card/' + self.id, {
                method: 'PUT',
                headers: newHeaders,
                body: data
            })
            .then(function (resp) {
                return resp.json();
            })
            .then(function (resp) {

                self.element.querySelector('.card-description').innerTEXT = newName;
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}