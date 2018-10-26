/*jslint plusplus: true */
/*jslint browser: true*/
/*global $, jQuery, alert*/
var caught = 0, progress = 0, pokemon, i, totalPokemon = 722, numberOfBoxes = 32;
$.getJSON("json/pokemon.json", "json", function (json) {
    "use strict";
    pokemon = json;
    totalPokemon = json.length;
});
//var client = new $.RestClient("localhost:8000/api/v2/");
$('#progress').progressbar({max: totalPokemon}, 'enable');
function populate() {
    "use strict";
    var i, j, k, poke = 1, currentPokemon, boxNumber, m, key, tableHeader, boxCount;
    for (i = 1; i < 33; i++) {
        $("#boxes").append("<table id='box" + i + "' class='box'></table>");
        $('<thead />', {
            id: 'thead' + i
        }).appendTo('#box' + i);
        $('<tr />' + i, {
        }).appendTo('#thead' + i);
        for (m = 1; m < 7; m++) {
            $('<th />', {
                id: 't' + i + 'h' + m
                //text: 'test'
            }).appendTo('#thead' + i + ' > tr');
        }
        $('<tbody>', {
            id: 'tbody' + i
        }).appendTo('#box' + i);
        for (j = 1; j <= 5; j++) {
            $("#tbody" + i).append("<tr id='row" + j + "'></tr>");
            for (k = 1; k <= 6; k++) {
                //Calculate the number of the box based on table, column, and row
                currentPokemon = 30 * (i - 1) + 6 * (j - 1) + (k - 1);
                boxNumber = currentPokemon + 1;
                $("#box" + i + " > tbody > #row" + j).append('<td id="tabledata' + k + '" class="box' + boxNumber + '"></td>');
            }
        }
    }
    //Create pokemon checkboxes as well as labels
    for (key in pokemon) {
        $('<input />', {
            type: 'checkbox',
            name: 'poke' + key,
            value: pokemon[key].identifier,
            label: pokemon[key].identifier,
            id: 'poke' + key,
            text: pokemon[key].identifier
        }).appendTo('.box' + key);
        $('.box' + key + ' > input').wrap('<label />');
        $('.box' + key + ' > label').append(pokemon[key].identifier);
    }
    // Populate progressbars in boxes
    for (tableHeader = 1; tableHeader <= numberOfBoxes; tableHeader++) {
        boxCount = $('#box' + tableHeader + ' input:checkbox').length;
        $('#t' + tableHeader + 'h6').progressbar({value: 0, max: boxCount}, 'enable');
    }
    $('.ui-progressbar-value').append('<div />');
}

function update() {
    "use strict";
    var progress = $('input:checked').length,
        percent = (progress / totalPokemon) * 100,
        tableHeader,
        boxValue,
        boxCount;
    $('#progress').progressbar('value', progress);
    $('.ui-progressbar-value > div').text(percent.toPrecision(3) + '% Complete');
    $('#needed').text(totalPokemon - progress + ' Pokemon needed to complete dex');
    for (tableHeader = 1; tableHeader <= numberOfBoxes; tableHeader++) {
        boxValue = $('#box' + tableHeader + ' input:checkbox:checked').length;
        boxCount = $('#box' + tableHeader + ' input:checkbox').length;
        percent = (boxValue / boxCount) * 100;
        $('#t' + tableHeader + 'h6').progressbar('value', boxValue);
        $('#box' + tableHeader + ' .ui-progressbar-value > div').text(percent.toPrecision(3) + '%');
    }
}

$(document).ready(function () {
    "use strict";
    populate();
});
$(document).click(function () {
    "use strict";
    update();
});
