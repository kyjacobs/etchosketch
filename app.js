const SIZE_DEFAULT = 16;
const COLOR_DEFAULT = "black"; // Maybe delete? Not really used.
const container = document.getElementById('container');
let SIZE_NEW = SIZE_DEFAULT;
let COLOR_NEW = COLOR_DEFAULT;
let colorInput = document.querySelector('#color');
colorInput.addEventListener('input', () => {
    let color = colorInput.value;
    COLOR_NEW = color;
});

function getNewSize(){
    let currentSize = SIZE_NEW;
    SIZE_NEW = prompt("Enter desired size for new grid (between 1 and 100): ");
    if (SIZE_NEW == null) {
        SIZE_NEW = currentSize;
        return;
    }
    else if(SIZE_NEW < 1 || SIZE_NEW > 100) {
        alert("Invalid Size");
        getNewSize();
    }
    
}

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

function resizeGrid(){
    getNewSize();
    clearGrid();
}

function deleteGrid(){
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.remove();
    });
}

function clearGrid(){
    deleteGrid();
    createGrid(SIZE_NEW);
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
    e.target.style.backgroundColor = COLOR_NEW;
}

window.onload = () => {
    createGrid(SIZE_DEFAULT);
}