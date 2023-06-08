// This variable is used to keep track of the currently dragged item.
var draggedItem = null;

// This function is triggered when a draggable item starts being dragged.
// It sets the effectAllowed property of the dataTransfer object to 'move',
// indicating that the item can be moved.

function handleDragStart(event) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', event.target.innerHTML);
    event.target.style.opacity = '0.4';
    draggedItem = event.target;
}

//  It sets the dropEffect property of the dataTransfer object to 'move', operation is allowed.
function handleDragOver(event) {
    if (event.preventDefault) {
        event.preventDefault();
    }
    event.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(event) {
    event.target.classList.add('over');
}

function handleDragLeave(event) {
    event.target.classList.remove('over');
}

function handleDrop(event) {
    if (event.preventDefault) {
        event.preventDefault();
    }
    if (event.stopPropagation) {
        event.stopPropagation();
    }
    event.target.classList.remove('over');
    var data = event.dataTransfer.getData('text/plain');
    event.target.innerHTML += '<div class="item" draggable="true">' + data + '</div>';
    draggedItem.parentNode.removeChild(draggedItem);
    draggedItem = null;
    displaySuccessMessage();
    return false;
}

function displaySuccessMessage() {
    var successOverlay = document.createElement('div');
    successOverlay.classList.add('success-overlay');
    
    var successMessage = document.createElement('p');
    successMessage.classList.add('success-message');
    successMessage.innerHTML = 'Item dropped successfully!';
    
    successOverlay.appendChild(successMessage);
    document.body.appendChild(successOverlay);
    
    setTimeout(function() {
      successOverlay.parentNode.removeChild(successOverlay);
    }, 2000);
  }

function reset() {
    var firstContainer = document.getElementById('first-container');
    while (firstContainer.firstChild) {
        firstContainer.removeChild(firstContainer.firstChild);
    }
    firstContainer.innerHTML = '<div class="item" draggable="true">Item 1</div>' +
        '<div class="item" draggable="true">Item 2</div>' +
        '<div class="item" draggable="true">Item 3</div>';

    var secondContainer = document.getElementById('second-container');
    while (secondContainer.firstChild) {
        secondContainer.removeChild(secondContainer.firstChild);
    }
}

var firstContainer = document.getElementById('first-container');
var secondContainer = document.getElementById('second-container');

firstContainer.addEventListener('dragstart', handleDragStart, false);
firstContainer.addEventListener('dragover', handleDragOver, false);
firstContainer.addEventListener('dragenter', handleDragEnter, false);
firstContainer.addEventListener('dragleave', handleDragLeave, false);
firstContainer.addEventListener('drop', handleDrop, false);

secondContainer.addEventListener('dragstart', handleDragStart, false);
secondContainer.addEventListener('dragover', handleDragOver, false);
secondContainer.addEventListener('dragenter', handleDragEnter, false);
secondContainer.addEventListener('dragleave', handleDragLeave, false);
secondContainer.addEventListener('drop', handleDrop, false);