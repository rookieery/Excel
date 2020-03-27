var downScreenX = 0;
var downScreenY = 0;
var oldMoveScreenX = 0;
var oldMoveScreenY = 0;
var newMoveScreenX = 0;
var newMoveScreenY = 0;
var startResizeLeft = 0;
var startCellFlag = false;
var startResizeEsFlag = false;
var startResizeSsFlag = false;
var headerChange = null;
var rowHeaderChange = null;
var EDivHeader = null;
var SDivHeader = null;
var head = document.getElementsByClassName('head')[0];
var tableX = head.clientWidth;
var length = head.cells.length;
var table = document.getElementsByClassName('table')[0];
var cells = document.getElementsByClassName('cell');
var headers = document.getElementsByClassName('header');
var rowHeaders = document.getElementsByClassName("rowHeader");
var both = document.getElementsByClassName("both")[0];
var addButton = document.getElementsByClassName('add')[0];
var removeButton = document.getElementsByClassName('remove')[0];
var resizeEs = document.getElementsByClassName('resizeE');
var resizeSs = document.getElementsByClassName('resizeS');
// large frame
var divElement = document.getElementsByClassName('divElement')[0];
// small frame
var fixDivElement = document.getElementsByClassName('fixDivElement')[0];
var divStatus = [];
divStatus[0] = cells[0];
divStatus[1] = cells[0];
changeDiv();
for (var i = 0; i < resizeEs.length; i++) {
    resizeEs[i].addEventListener('mousedown', resizeEsDownHandler, false);
}
for (var i = 0; i < resizeSs.length; i++) {
    resizeSs[i].addEventListener('mousedown', resizeSsDownHandler, false);
}
for (var i = 0; i < cells.length; i++) {
    cellEvent(cells[i]);
}
for (var i = 0; i < headers.length; i++) {
    headerEvent(headers[i]);
}
headers[0].classList.add('selected');
for (var i = 0; i < rowHeaders.length; i++) {
    rowHeaderEvent(rowHeaders[i]);
}
rowHeaders[0].classList.add('selected');
both.addEventListener('click', bothHandler, false);
function cellEvent(cell) {
    cell.addEventListener('click', cellHandler, false);
    cell.addEventListener('dblclick', dblCellHandler, false);
    cell.addEventListener('mousedown', cellDownHandler, false);
    cell.addEventListener('mouseup', cellUpHandler, false);
    cell.addEventListener('mousemove', cellMoveHandler, false);
}
function headerEvent(header) {
    header.addEventListener('click', headerHandler, false);
    header.addEventListener('contextmenu', headerMenuHandler, false);
    header.addEventListener('mouseup', headerUpHandler, false);
}
function rowHeaderEvent(rowHeader) {
    rowHeader.addEventListener('click', rowHeaderHandler, false);
    rowHeader.addEventListener('contextmenu', rowHeaderMenuHandler, false);
    rowHeader.addEventListener('mouseup', rowHeaderUpHandler, false);
}
// The most amazing function  Draw big frame
function changeDiv() {
    divElement.style.height = Math.max(divStatus[1].getBoundingClientRect().bottom - divStatus[0].getBoundingClientRect().top, divStatus[0].getBoundingClientRect().bottom - divStatus[1].getBoundingClientRect().top) + 'px';
    divElement.style.width = Math.max(divStatus[1].getBoundingClientRect().right - divStatus[0].getBoundingClientRect().left, divStatus[0].getBoundingClientRect().right - divStatus[1].getBoundingClientRect().left) + 'px';
    divElement.style.top = Math.min(divStatus[0].getBoundingClientRect().top, divStatus[1].getBoundingClientRect().top) + 'px';
    divElement.style.left = Math.min(divStatus[0].getBoundingClientRect().left, divStatus[1].getBoundingClientRect().left) + 'px';
    changeFixDiv();
    fixDivText(divStatus[0]);
}
// Draw small frame
function changeFixDiv() {
    fixDivElement.style.width = divStatus[0].getBoundingClientRect().width - 4 + 'px';
    fixDivElement.style.height = divStatus[0].getBoundingClientRect().height - 4 + 'px';
    fixDivElement.style.top = divStatus[0].getBoundingClientRect().top + 1.5 + 'px';
    fixDivElement.style.left = divStatus[0].getBoundingClientRect().left + 1.5 + 'px';
}
function resizeEsDownHandler(e) {
    hidden();
    document.addEventListener('mousemove', resizeEsMoveHandler, false);
    document.addEventListener('mouseup', resizeEsUpHandler, false);
    var rect = e.srcElement.getBoundingClientRect();
    EDivHeader = e.srcElement.parentElement;
    startResizeLeft = rect.left;
    startResizeEsFlag = true;
    downScreenX = e.screenX;
    divElement.style.visibility = 'hidden';
    fixDivElement.style.visibility = 'hidden';
}
function resizeSsDownHandler(e) {
    hidden();
    document.addEventListener('mousemove', resizeSsMoveHandler, false);
    document.addEventListener('mouseup', resizeSsUpHandler, false);
    var rect = e.srcElement.getBoundingClientRect();
    SDivHeader = e.srcElement.parentElement.parentElement;
    startResizeTop = rect.top;
    startResizeSsFlag = true;
    downScreenY = e.screenY;
    divElement.style.visibility = 'hidden';
    fixDivElement.style.visibility = 'hidden';
}
function resizeEsUpHandler(e) {
    changeDiv();
    divElement.style.visibility = 'visible';
    fixDivElement.style.visibility = 'visible';
    if (startCellFlag) {
        startCellFlag = false;
    }
    if (startResizeEsFlag) {
        startResizeEsFlag = false;
        downScreenX = 0;
        oldMoveScreenX = 0;
        newMoveScreenX = 0;
        EDivHeader = null;
        document.removeEventListener('mousemove', resizeEsMoveHandler, false);
        document.removeEventListener('mouseup', resizeEsUpHandler, false);
    }
}
function resizeSsUpHandler(e) {
    changeDiv();
    divElement.style.visibility = 'visible';
    fixDivElement.style.visibility = 'visible';
    if (startCellFlag) {
        startCellFlag = false;
    }
    if (startResizeSsFlag) {
        startResizeSsFlag = false;
        downScreenY = 0;
        oldMoveScreenY = 0;
        newMoveScreenY = 0;
        SDivHeader = null;
        document.removeEventListener('mousemove', resizeSsMoveHandler, false);
        document.removeEventListener('mouseup', resizeSsUpHandler, false);
    }
}
function resizeEsMoveHandler(e) {
    if (startResizeEsFlag) {
        newMoveScreenX = e.screenX;
        var headerWidth = EDivHeader.getClientRects()[0].width;
        var tableWidth = table.getClientRects()[0].width;
        if (oldMoveScreenX == 0) {
            oldMoveScreenX = downScreenX;
        }
        var changedEDiv = headerWidth + (newMoveScreenX - oldMoveScreenX);
        EDivHeader.style.width = changedEDiv < 64 ? 64 + 'px' : changedEDiv + 'px';
        table.style.width = changedEDiv < 64 ? tableWidth + 'px' : tableWidth + (newMoveScreenX - oldMoveScreenX) + 'px';
        oldMoveScreenX = newMoveScreenX;
    }
}
function resizeSsMoveHandler(e) {
    if (startResizeSsFlag) {
        newMoveScreenY = e.screenY;
        var headerHeight = SDivHeader.getClientRects()[0].height;
        var tableHeight = table.getClientRects()[0].height;
        if (oldMoveScreenY == 0) {
            oldMoveScreenY = downScreenY;
        }
        var changedSDiv = headerHeight + (newMoveScreenY - oldMoveScreenY);
        SDivHeader.style.height = changedSDiv < 25 ? 25 + 'px' : changedSDiv + 'px';
        table.style.height = changedSDiv < 25 ? tableHeight + 'px' : tableHeight + (newMoveScreenY - oldMoveScreenY) + 'px';
        oldMoveScreenY = newMoveScreenY;
    }
}

function hidden() {
    addButton.style.visibility = 'hidden';
    removeButton.style.visibility = 'hidden';
}
function headerMenuHandler(e) {
    e.preventDefault();
}

function rowHeaderMenuHandler(e) {
    e.preventDefault();
}

function headerUpHandler(e) {
    hidden();
    if (e.target.className == 'resizeE') {
        return;
    }
    if (e.button == 2) {
        headerChange = e.srcElement;
        displayButton(headerChange);
    }
}

function rowHeaderUpHandler(e) {
    hidden();
    if (e.target.className == 'resizeS') {
        return;
    }
    if (e.button == 2) {
        rowHeaderChange = e.srcElement;
        displayButton(rowHeaderChange);
    }
}
function displayButton(headChange) {
    headChange.click();
    addButton.style.visibility = 'visible';
    removeButton.style.visibility = 'visible';
    addButton.addEventListener('click', addHandler, false);
    removeButton.addEventListener('click', removeHandler, false);
}

function addHandler(e) {
    if (headerChange == null) { // insert row
        var index = Number(rowHeaderChange.innerText);
        var row = table.insertRow(index);
        var rowHeader = row.insertCell(0);
        appendRowHeader(rowHeader, index);
        for (var i = 1; i <= headers.length; i++) {
            appendCells(row, headers[i - 1].innerText, i);
        }
        for (var i = 0; i < rowHeaders.length; i++) {
            if (Number(rowHeaders[i].children[0].innerText) >= index) {
                rowHeaders[i].children[0].innerText = i + 1;
            }
        }
        rowHeader.click();
        rowHeaderChange = null;
    } else { // insert column
        var rows = table.rows;
        var index = headerChange.innerText;
        var clickHeader;
        for (var i = 0; i < rows.length; i++) {
            if (i == 0) { // insert th
                clickHeader = appendTh(rows, index);
            } else { // insert td
                appendTd(rows, index, i);
            }
        }
        clickHeader.click();
        headerChange = null;
    }
    hidden();
}
function appendRowHeader(rowHeader, index) {
    rowHeader.classList.add('rowHeader');
    var resizeS = document.createElement('div');
    var span = document.createElement('span');
    resizeS.classList.add('resizeS');
    rowHeader.appendChild(span);
    rowHeader.appendChild(resizeS);
    rowHeader.children[0].innerText = index;
    resizeS.addEventListener('mousedown', resizeSsDownHandler, false);
    rowHeaderEvent(rowHeader);
}
function appendCells(row, index, i) {
    var cell = row.insertCell(i);
    cell.classList.add('cell');
    cell.setAttribute('data-index', index);
    cellEvent(cell);
}
function appendHeader(rows, index) {
    var header = document.createElement('th');
    header.classList.add('header');
    var resizeE = document.createElement('div');
    var span = document.createElement('span');
    resizeE.classList.add('resizeE');
    header.appendChild(span);
    header.appendChild(resizeE);
    header.children[0].innerText = index;
    resizeE.addEventListener('mousedown', resizeEsDownHandler, false);
    rows[0].appendChild(header);
    headerEvent(header);
}
function appendTh(rows, index) {
    var clickHeader;
    var headChildren = rows[0].children;
    var headLength = headChildren.length;
    var firstInsert = false;
    for (var j = 1; j <= headLength; j++) {
        if (headChildren[j].innerText == index && !firstInsert) {
            clickHeader = headChildren[j];
            appendHeader(rows, index);
            firstInsert = true;
        } else {
            if (firstInsert) {
                headChildren[j].children[0].innerText = String.fromCharCode(headChildren[j - 1].children[0].innerText.charCodeAt() + 1);
            }
        }
    }
    return clickHeader;
}
function appendTd(rows, index, i) {
    var rowsChildren = rows[i].children;
    var rowLength = rowsChildren.length;
    var firstInsert = false;
    for (var j = 1; j <= rowLength; j++) {
        if (rowsChildren[j].getAttribute('data-index') == index && !firstInsert) {
            appendCells(rows[i], index, j);
            firstInsert = true;
        } else {
            if (firstInsert) {
                rowsChildren[j].setAttribute('data-index', String.fromCharCode(rowsChildren[j - 1].getAttribute('data-index').charCodeAt() + 1));
            }
        }
    }
}

function removeHandler(e) {
    if (headerChange == null) {// remove row
        var index = rowHeaderChange.innerText;
        var deleteHeight = rowHeaderChange.tagName == 'SPAN' ? rowHeaderChange.parentElement.getBoundingClientRect().height : rowHeaderChange.getBoundingClientRect().height;
        table.style.height = table.getBoundingClientRect().height - deleteHeight + 'px';
        table.deleteRow(index);
        var rowHeader = removeRowHeader(Number(index));
        rowHeader.click();
        rowHeaderChange = null;
    } else {// remove column
        var rows = table.rows;
        var index = headerChange.innerText;
        var deleteWidth = headerChange.tagName == 'SPAN' ? headerChange.parentElement.getBoundingClientRect().width : headerChange.getBoundingClientRect().width;
        table.style.width = table.getBoundingClientRect().width - deleteWidth + 'px';
        var clickHeader;
        for (var i = 0; i < rows.length; i++) {
            if (i == 0) {// remove th
                clickHeader = removeTh(rows, index);
            } else {// remove td
                removeTd(rows, index, i);
            }
        }
        clickHeader.click();
        headerChange = null;
    }
    hidden();
}
function removeRowHeader(index) {
    var rowHeader;
    for (var i = 0; i < rowHeaders.length; i++) {
        if (rowHeaders[i].children[0].innerText > index) {
            if (Number(rowHeaders[i].children[0].innerText) - 1 == index) {
                rowHeader = rowHeaders[i];
            }
            rowHeaders[i].children[0].innerText = i + 1;
        }
    }
    return rowHeader;
}
function removeTh(rows, index) {
    var clickHeader;
    var headChildren = rows[0].children;
    var headLength = headChildren.length - 1;
    for (var j = 1; j < headLength; j++) {
        if (headChildren[j].innerText == index) {
            clickHeader = headChildren[j + 1];
            rows[0].removeChild(headChildren[j]);
        }
        if (headChildren[j].innerText >= index) {
            headChildren[j].children[0].innerText = String.fromCharCode(headChildren[j].children[0].innerText.charCodeAt() - 1);
        }
    }
    return clickHeader;
}
function removeTd(rows, index, i) {
    var rowsChildren = rows[i].children;
    var rowLength = rowsChildren.length - 1;
    for (var j = 1; j < rowLength; j++) {
        if (rowsChildren[j].getAttribute('data-index') == index) {
            rows[i].deleteCell(j);
        }
        if (rowsChildren[j].getAttribute('data-index') >= index) {
            rowsChildren[j].setAttribute('data-index', String.fromCharCode(rowsChildren[j].getAttribute('data-index').charCodeAt() - 1));
        }
    }
}
function cellHandler(e) {
    hidden();
    var index = e.target.getAttribute("data-index");
    var rows = [e.srcElement, e.srcElement.parentElement];;
    var rowHeader = rows[1].getElementsByClassName('rowHeader')[0];
    setHeadsThree(index, rowHeader, rowHeaders);
    setHeadsThree(index, rowHeader, headers);
    if (both.classList.contains('active')) {
        both.classList.remove('active');
    }
    divStatus[0] = rows[0];
    divStatus[1] = rows[0];
    changeDiv();
}

function headerHandler(e) {
    if (e.target.className == 'resizeE') {
        return;
    }
    hidden();
    var event = e.currentTarget;
    var clearBorderRight = false;
    var index = event.innerText;
    setHeadsOne(index, headers, clearBorderRight);
    setHeadsTwo(clearBorderRight, rowHeaders, 'borderRight');
    if (both.classList.contains('active')) {
        both.classList.remove('active');
    }
    var rows = table.rows;
    divStatus[0] = getDivStatus((rows)[1].children, index);
    divStatus[1] = getDivStatus((rows)[rows.length - 1].children, index);
    changeDiv();
}
function getDivStatus(row, index) {
    for (var i = 1; i < row.length; i++) {
        if (row[i].getAttribute("data-index") == index) {
            return row[i];
        }
    }
}
function rowHeaderHandler(e) {
    if (e.target.className == 'resizeS') {
        return;
    }
    hidden();
    var clearBorderBottom = false;
    var index = e.target.innerText;
    setHeadsOne(index, rowHeaders, clearBorderBottom);
    setHeadsTwo(clearBorderBottom, headers, 'borderBottom');
    if (both.classList.contains('active')) {
        both.classList.remove('active');
    }
    var targetRow = e.target.tagName == 'SPAN' ? e.srcElement.parentElement.parentElement.children : e.srcElement.parentElement.children;
    divStatus[0] = targetRow[1];
    divStatus[1] = targetRow[targetRow.length - 1];
    changeDiv();
}
// Set the style of the element above the large frame
function setHeadsOne(index, heads, clearBorderName) {
    for (var i = 0; i < heads.length; i++) {
        if (heads[i].classList.contains('active')) {
            heads[i].classList.remove('active');
        }
        if (heads[i].innerText == index) {
            if (heads[i].innerText == 1 || heads[i].innerText == 'A') {
                clearBorderName = true;
            }
            heads[i].classList.add('active');
        } else {
        }
        heads[i].classList.remove('selected');
    }
}
// Set styles the row of elements on the outermost edge parallel to the large frame
function setHeadsTwo(clearBorderBottom, heads, borderName) {
    for (var i = 0; i < heads.length; i++) {
        heads[i].classList.add('selected');
        if (heads[i].classList.contains('active')) {
            heads[i].classList.remove('active');
        }
        if (clearBorderBottom) {
            heads[i].classList.remove('selected');
        } else {
            heads[i].classList.add('selected');
        }
    }
}
// Set the single-most edge style property parallel to the sides of the large frame
function setHeadsThree(index, rowHeader, heads) {
    for (var i = 0; i < heads.length; i++) {
        if (heads[i].classList.contains('active')) {
            heads[i].classList.remove('active');
        }
        if (heads[i] == rowHeader || heads[i].innerText == index) {
            heads[i].classList.add('selected');
        } else {
            if (heads[i].classList.contains('selected')) {
                heads[i].classList.remove('selected');
            }
        }
    }
}
function bothHandler(e) {
    hidden();
    divStatus[0] = cells[0];
    var rows = table.rows;
    var lastRow = rows[rows.length - 1].children;
    divStatus[1] = lastRow[lastRow.length - 1];
    changeDiv();
    for (var i = 0; i < headers.length; i++) {
        headers[i].classList.add('active');
    }
    for (var i = 0; i < rowHeaders.length; i++) {
        rowHeaders[i].classList.add('active');
    }
    both.classList.add('active');
}
function dblCellHandler(e) {
    hidden();
    var rows = [e.srcElement, e.srcElement.parentElement];
    fixDivElement.style.top = e.srcElement.getBoundingClientRect().top + 1.5 + 'px';
    fixDivElement.style.left = e.srcElement.getBoundingClientRect().left + 1.5 + 'px';
    var rect = e.srcElement.getBoundingClientRect();
    var inputElement = document.createElement("input");
    setTimeout(() => {
        appendInput(inputElement, rows, rect);
    }, 0);
    var cell = e.srcElement;
    var oldText = cell.innerText;
    if (oldText != null) {
        inputElement.value = oldText;
    }
    var rowHeader = rows[1].getElementsByClassName('rowHeader')[0];
    var cellNext = getCellNext(rowHeader, cell);
    inputElement.addEventListener('keyup', function (event) {
        if (event.keyCode == 13) {
            cellText(cell, inputElement.value);
            // Manually trigger the click event of the next cell
            cellNext.click();
            inputElement.blur();
        }
    }, false);
    inputElement.addEventListener('blur', function () {
        cellText(cell, inputElement.value);
        table.removeChild(inputElement);
    }, false);
}
function appendInput(inputElement, rows, rect) {
    inputElement.style.width = rows[0].getClientRects()[0].width + 'px';
    inputElement.style.height = rows[0].getClientRects()[0].height + 'px';
    inputElement.style.border = '1.5px solid rgb(21, 104, 10)';
    inputElement.style.position = 'fixed';
    inputElement.style.top = rect.top + 'px';
    inputElement.style.left = rect.left + 'px';
    inputElement.style.outline = 'none';
    inputElement.style.zIndex = '3';
    table.appendChild(inputElement);
    inputElement.focus();
}
function getCellNext(rowHeader, cell) {
    for (var i = 0; i < rowHeaders.length; i++) {
        if (rowHeaders[i].innerText - 1 == rowHeader.innerText) {
            var parent = rowHeaders[i].parentElement;
            var children = parent.children;
            for (var i = 0; i < children.length; i++) {
                if (children[i].getAttribute("data-index") == cell.getAttribute("data-index")) {
                    return children[i];
                }
            }
        }
    }
}
function cellText(cell, text) {
    cell.innerText = text;
    if (isNaN(text)) {
        cell.style.textAlign = 'left';
    } else {
        cell.style.textAlign = 'right';
    }
}
function drawRect() {
    var rowHeaderBorder = true;
    var headerBorder = true;
    var rowHeader = divStatus[0].parentElement.children[0];
    if (rowHeader.innerText == 1) {
        headerBorder = false;
    }
    if (divStatus[0].getAttribute("data-index") == 'A') {
        rowHeaderBorder = false;
    }
    var startLeft = divStatus[0].getBoundingClientRect().left;
    var startTop = divStatus[0].getBoundingClientRect().top;
    var endLeft = divStatus[1].getBoundingClientRect().left;
    var endTop = divStatus[1].getBoundingClientRect().top;
    if (endTop <= startTop) {// top
        moveChangeRowHeader(startTop, endTop, rowHeaderBorder);
    }
    if (endTop > startTop) {// bottom
        moveChangeRowHeader(endTop, startTop, rowHeaderBorder);
    }
    if (endLeft <= startLeft) {// left
        moveChangeHeader(startLeft, endLeft, headerBorder);
    }
    if (endLeft > startLeft) {// right
        moveChangeHeader(endLeft, startLeft, headerBorder);
    }
    changeDiv();
}
function moveChangeRowHeader(startTop, endTop, rowHeaderBorder) {
    for (var j = 0; j < rowHeaders.length; j++) {
        var rowHeaderTop = rowHeaders[j].getBoundingClientRect().top;
        if (rowHeaders[j].classList.contains('active')) {
            rowHeaders[j].classList.remove('active');
        }
        if (rowHeaders[j].classList.contains('selected')) {
            rowHeaders[j].classList.remove('selected');
        }
        if (rowHeaderTop <= startTop && rowHeaderTop >= endTop) {
            rowHeaders[j].classList.add('selected');
            if (rowHeaderBorder) {
                rowHeaders[j].classList.add('selected');
            } else {
                rowHeaders[j].classList.remove('selected');
            }
        } else {
            rowHeaders[j].classList.remove('selected');
        }
    }
}
function moveChangeHeader(startLeft, endLeft, headerBorder) {
    for (var j = 0; j < headers.length; j++) {
        var headerLeft = headers[j].getBoundingClientRect().left;
        if (headers[j].classList.contains('active')) {
            headers[j].classList.remove('active');
        }
        if (headers[j].classList.contains('selected')) {
            headers[j].classList.remove('selected');
        }
        if (headerLeft >= endLeft && headerLeft <= startLeft) {
            headers[j].classList.add('selected');
            if (headerBorder) {
                headers[j].classList.add('selected');
            } else {
                headers[j].classList.remove('selected');
            }
        } else {
            headers[j].classList.remove('selected');
        }

    }
}
function cellDownHandler(e) {
    hidden();
    fixDivText(e.target);
    divStatus[0] = e.target;
    startCellFlag = true;
}

function cellUpHandler(e) {
    startCellFlag = false;
}
function fixDivText(cell) {
    setTimeout(() => {
        fixDivElement.innerText = null;
        var text = cell.innerText;
        fixDivElement.innerText = text;
        fixDivElement.style.lineHeight = fixDivElement.getBoundingClientRect().height + 'px';
        if (isNaN(text)) {
            fixDivElement.style.textAlign = 'left';
        } else {
            fixDivElement.style.textAlign = 'right';
        }
    }, 200);
}
function cellMoveHandler(e) {
    if (startCellFlag) {
        var rect = e.srcElement.getBoundingClientRect();
        var cell = getEndCell(rect.left, rect.right, rect.top, rect.bottom);
        divStatus[1] = cell;
        drawRect();
    }
}
function getEndCell(left, right, top, bottom) {
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].getBoundingClientRect().left >= left && cells[i].getBoundingClientRect().top >= top
            && cells[i].getBoundingClientRect().right <= right && cells[i].getBoundingClientRect().bottom <= bottom) {
            return cells[i];
        }
    }
    return null;
}