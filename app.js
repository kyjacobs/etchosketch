const SIZE_DEFAULT = 16;
const COLOR_DEFAULT = "black";

const container = document.getElementById('container');

function createGrid(size) {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for(let i = 0; i < size*size; i++){
        const box = document.createElement('div');
        box.classList.add('box');
        box.addEventListener('mousedown', beginDrawing);
        box.addEventListener('mouseup', stopDrawing);
        container.appendChild(box);
    }
}

/*
    Stop-gap solution, eventually I want to have dynamic resizing via slider or some other method.
*/
function newGrid() {
    let newSize = prompt("Enter desired size for new grid: ");
    if(newSize == null) {
        return;
    }
    else if(newSize > 100 || newSize < 1){
        alert("Please choose a value between 1 and 100");
        newGrid();
    }
    else {
        clearGrid();
        createGrid(newSize);
    }
}

function clearGrid(){
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.remove();
    });
}

function beginDrawing(e) {
    const boxes = document.querySelectorAll('.box');
    draw(e);
    boxes.forEach((box) => {
        box.addEventListener('mouseover', draw);
    });
}

function stopDrawing() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.removeEventListener('mouseover', draw);
    });
}

function draw(e) {
    e.target.style.backgroundColor = COLOR_DEFAULT;
}

window.onload = () => {
    createGrid(SIZE_DEFAULT);
}