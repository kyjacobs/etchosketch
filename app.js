const MIN_SIZE = 16;
const COLOR_DEFAULT = "black";

const container = document.getElementById('container');
const body = document.querySelector('body');

function createGrid(size) {
    for(let i = 0; i < size; i++) {
        const flexContainer = document.createElement('div');
        flexContainer.classList.add('flex-container');
        container.appendChild(flexContainer);
        for(let j = 0; j < size; j++) {
            const box = document.createElement('div');
            box.classList.add('box');
            box.addEventListener('mousedown', beginDrawing);
            box.addEventListener('mouseup', stopDrawing);
            flexContainer.appendChild(box);
        }
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
    e.target.style.backgroundColor = COLOR_DEFAULT;
}




window.onload = () => {
    createGrid(MIN_SIZE);
}