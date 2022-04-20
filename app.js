const SIZE_DEFAULT = 16;
const COLOR_DEFAULT = "black"; // Maybe delete? Not really used.
const container = document.getElementById('container');
const nat_colors = ["#d5ce3b", "#aa7b08", "#9ab106", "#385802", "#3e3e07", 
                    "#2c2342", "#555515", "#b0bc24", "#e09f3e", "#fff3b0",
                    "#9e2a2b", "#540b0e"];
let NAT_FLAG = false;
let SIZE_NEW = SIZE_DEFAULT;
let COLOR_NEW = COLOR_DEFAULT;
let colorInput = document.querySelector('#color');
colorInput.addEventListener('input', () => {
    let color = colorInput.value;
    COLOR_NEW = color;
});

function getNewSize(){
    
    let currentSize = SIZE_NEW;
    SIZE_NEW = prompt("Enter desired size for new grid (between 1 and 128): ");
    
    if (SIZE_NEW == null) {
        SIZE_NEW = currentSize;
        return;
    }
    else if(SIZE_NEW < 1 || SIZE_NEW > 128) {
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
        box.classList.add('bordered');
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

function toggleGridLines(){
    const gridButton = document.getElementById('grid-btn');
    const boxes = document.querySelectorAll('.box');
    if(gridButton.textContent === "Hide grid lines") {
        gridButton.textContent = "Show grid lines";
        boxes.forEach((box) => {
            box.classList.remove('bordered');
        });
    } 
    else {
        gridButton.textContent  = "Hide grid lines";
        boxes.forEach((box) => {
            box.classList.add('bordered');
        });
    }
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
    
    if(NAT_FLAG) {
        e.target.style.backgroundColor = nat_colors[randomInt(0, 12)];
        return;
    }

    e.target.style.backgroundColor = COLOR_NEW;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function natColorToggle() {
    if(NAT_FLAG) {
        NAT_FLAG = false;
    }
    else {
        NAT_FLAG = true;
    }
}

function natColorEvent() {
    const btn = document.getElementById('nature-colors');
    btn.addEventListener('click', function onClick() {
        if(NAT_FLAG) {
            btn.style.backgroundColor = "#855e42";
        }
        else {
            btn.style.backgroundColor = "#cfe1c9";
        }
    });
}

window.onload = () => {
    createGrid(SIZE_DEFAULT);
    natColorEvent();
}