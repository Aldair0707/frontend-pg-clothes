var url = "https://pg-api-clothes.onrender.com/api/clothes";  

function postClothing() {
    var clothing = {
        name: $('#name').val(),
        type: $('#type').val(),
        color: $('#color').val(),
        size: $('#size').val(),
        description: $('#description').val(),
        price: $('#price').val(),
        quantity: $('#quantity').val()
    };

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(clothing),
        success: function (data) {
            limpiarInputs();
            $('#btn-update').hide();
            $('#resultado').html(`<div class="mensaje-exito">✅ Prenda creada correctamente</div>`);
            getClothes();
        },
        error: function (err) {
            alert('Error al crear prenda');
            console.error(err);
        }
    });
}

function editarClothing(id) {
    $.getJSON(url + '/' + id, function (data) {
        const clothing = data.clothing;

        if (clothing) {
            $('#name').val(clothing.name);
            $('#type').val(clothing.type);
            $('#color').val(clothing.color);
            $('#size').val(clothing.size);
            $('#description').val(clothing.description);
            $('#price').val(clothing.price);
            $('#quantity').val(clothing.quantity);

            $('#btn-update').show().data('id', id);
            $('#resultado').html("");
        } else {
            alert('Prenda no encontrada.');
        }
    });
}

function updateClothing() {
    const id = $('#btn-update').data('id');

    var clothing = {
        name: $('#name').val(),
        type: $('#type').val(),
        color: $('#color').val(),
        size: $('#size').val(),
        description: $('#description').val(),
        price: $('#price').val(),
        quantity: $('#quantity').val()
    };

    $.ajax({
        url: url + '/' + id,
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(clothing),
        success: function (data) {
            alert('Prenda actualizada');
            $('#btn-update').hide();
            limpiarInputs();
            getClothes();
        },
        error: function (err) {
            alert('Error al actualizar prenda');
            console.error(err);
        }
    });
}

function getClothingById() {
    const id = $('#id-clothing').val();

    $.getJSON(url + '/' + id, function (data) {
        const clothing = data.clothing;

        if (clothing) {
            var html = '<table border="1">' +
                '<tr><th>ID</th><th>Nombre</th><th>Tipo</th><th>Color</th><th>Talla</th><th>Descripción</th><th>Precio</th><th>Cantidad</th><th>Acciones</th></tr>' +
                '<tr>' +
                `<td>${clothing.id}</td><td>${clothing.name}</td><td>${clothing.type}</td><td>${clothing.color}</td><td>${clothing.size}</td><td>${clothing.description}</td><td>${clothing.price}</td><td>${clothing.quantity}</td>` + 
                `<td><button class="editar" onclick="editarClothing(${clothing.id})"><i class="fas fa-pencil-alt"></i> Editar</button> 
                <button onclick="deleteClothing(${clothing.id})"><i class="fas fa-trash-alt"></i> Eliminar</button></td>` +
                '</tr>' +
                '</table>';
            $('#resultado').html(html);
        }
    }).fail(function (jqXHR) {
        if (jqXHR.status === 404) {
            $('#resultado').html(""); 
            mostrarNotificacion(`❌ No se encontró la prenda con ID ${id}.`, 5000);
        } else {
            mostrarNotificacion(`⚠️ Error al buscar la prenda. Intenta más tarde.`, 5000);
            console.error(jqXHR);
        }
    });
}

function getClothes() {
    $.getJSON(url, function (json) {
        var arr = json.clothes;
        var html = '<table border="1">' +
            '<tr><th>ID</th><th>Nombre</th><th>Tipo</th><th>Color</th><th>Talla</th><th>Descripción</th><th>Precio</th><th>Cantidad</th><th>Acciones</th></tr>';

        arr.forEach(function (item) {
            html += `<tr>
                <td>${item.id}</td><td>${item.name}</td><td>${item.type}</td><td>${item.color}</td><td>${item.size}</td><td>${item.description}</td><td>${item.price}</td><td>${item.quantity}</td>
                <td><button onclick="editarClothing(${item.id})">Editar</button> <button onclick="deleteClothing(${item.id})">Eliminar</button></td>
            </tr>`;
        });

        html += '</table>';
        $('#resultado').html(html);
    });
}

function deleteClothing(id) {
    if (!confirm("¿Estás seguro de eliminar la prenda con ID " + id + "?")) return;

    $.ajax({
        url: url + '/' + id,
        type: 'DELETE',
        success: function () {
            alert('Prenda eliminada');
            getClothes();
        },
        error: function (err) {
            alert('Error al eliminar prenda');
            console.error(err);
        }
    });
}

function limpiarInputs() {
    $('#name, #type, #color, #size, #description, #price, #id-clothing, #quantity').val('');
}

function mostrarNotificacion(mensaje, duracion = 3000) {
    const noti = $('#notificacion');
    noti.text(mensaje).fadeIn();

    setTimeout(() => {
        noti.fadeOut();
    }, duracion);
}

function mostrarNotificacion(mensaje, duracion = 3000) {
    const noti = $('#notificacion');
    noti.text(mensaje).fadeIn();

    setTimeout(() => {
        noti.fadeOut();
    }, duracion);
}
