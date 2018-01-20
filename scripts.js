$(document).ready(function () {
    disableDragAndDrop();
    setupInstructionsModal();
    initializeSizePickerFormHandler();
});

function disableDragAndDrop() {
    $(window).on('dragstart', function (event) {
        event.preventDefault();
    });

    $(window).on('drop', function (event) {
        event.preventDefault();
    });
}

function setupInstructionsModal() {
    let modal = $('#modalInstructions');
    let modalBtn = $('#modalBtn');
    let closeBtn = $('#closeBtn');

    $(modalBtn).on('click', function () {
        $(modal).css('display', 'block');
    });

    $(closeBtn).on('click', function () {
        $(modal).css('display', 'none');
    });

    $(window).on('click', function (event) {
        if (event.target == modal.get(0)) {
            $(modal).css('display', 'none');
        }
    });
}

function initializeSizePickerFormHandler() {
    $('#sizePicker').submit(function (event) {
        clearGrid();
        // clearGridUsingWhile()
        makeGrid();
        registerMouseHandlers();
        event.preventDefault();
    });
}

function clearGrid() {
    $('#pixel_canvas').children().remove();
}

/*
 * Alternative function to clear grid using a while loop in accordance to project specification.
 */
/*function clearGridUsingWhile() {
    var tables = document.getElementsByTagName('table');
    var table = tables.item(0);
    var i = table.rows.length - 1;
    while (i >= 0) {
        table.deleteRow(0);
        i--;
    }    
}*/

function makeGrid() {
    let inputH = $('#input_height').val();
    let inputW = $('#input_width').val();
    let table = $('#pixel_canvas');

    for (let r = 1; r <= inputH; r++) {
        // create row
        let row = $('<tr></tr>').appendTo(table);
        for (let c = 1; c <= inputW; c++) {
            // create table cells (columns)
            row.append('<td></td>');
        }
    }
}

function registerMouseHandlers() {
    $('td').on('mousemove', paintOrErase);

    $('td').on('mousedown', togglePaintMode);

    $('body').on('mouseup', resetPaintMode);

    $('td').on('click', paintSingleCell);

    $('td').on('dblclick', clearSingleCell);

    $('#bgPicker').on('submit', changeGridBackgroundColor);

    $('#toggleGridButton').on('click', toggleGrid);
}

let mouseIsDown = false;
let paintMode = true;

function paintOrErase() {
    let backgroundColor = $(this).css('backgroundColor');
    if (mouseIsDown && paintMode) {
        let color = $('#colorPicker').val();
        $(this).css('backgroundColor', color);
    } else if (mouseIsDown) {
        $(this).css('backgroundColor', 'rgba(0,0,0,0)');
    }
}

function togglePaintMode() {
    let tdColor = $(this).css('backgroundColor');
    if (tdColor !== 'rgba(0, 0, 0, 0)') {
        paintMode = false;
    }
    mouseIsDown = true;
}

function resetPaintMode() {
    paintMode = true;
    mouseIsDown = false;
}

function paintSingleCell() {
    let color = $('#colorPicker').val();
    $(this).css('backgroundColor', color);
}

function clearSingleCell() {
    $(this).css('background', 'none');
}

function changeGridBackgroundColor(event) {
    let bgColor = $('#backgroundColorPicker').val();
    $('table').css('backgroundColor', bgColor);
    event.preventDefault();
}

function toggleGrid() {
    let border = $('td').css('border');
    //    let bgColor = $('#backgroundColorPicker').val();
    if (border === '#111') {
        $('td').css('border', '0.6px solid rgba(0, 0, 0, 0)');
    } else {
        $('td').css('border', '0.6px solid #111');
    }
}



// TODO Disable right click menu for better handle or missclicks on canvas


// Adding and removing rows from each side

// quick access to main colors
// colors history
// presenting design without table borders

// prevent cells from loosing square shape
