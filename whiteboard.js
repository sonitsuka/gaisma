const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let drawing = false;
let mode = 'draw'; // can be 'draw' or 'erase'

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function saveCanvas() {
    localStorage.setItem('canvasData', canvas.toDataURL());
}

window.addEventListener('load', function() {
    const savedData = localStorage.getItem('canvasData');
    if (savedData) {
        const img = new Image();
        img.onload = function() {
            context.drawImage(img, 0, 0);
        };
        img.src = savedData;
    }
});

canvas.addEventListener('mousedown', function(e) {
    drawing = true;
    context.beginPath();
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
});

canvas.addEventListener('mousemove', function(e) {
    if (!drawing) return;
    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.strokeStyle = mode === 'draw' ? 'black' : 'white';
    context.stroke();
});

canvas.addEventListener('mouseup', function(e) {
    drawing = false;
    saveCanvas();
});

canvas.addEventListener('mouseout', function(e) {
    drawing = false;
    saveCanvas();
});

document.getElementById('drawButton').addEventListener('click', function() {
    mode = 'draw';
});

document.getElementById('eraseButton').addEventListener('click', function() {
    mode = 'erase';
});

document.getElementById('clearButton').addEventListener('click', function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    saveCanvas();
});

let color = 'black'; // default color

document.getElementById('colorPicker').addEventListener('input', function(e) {
    color = e.target.value;
});

// Then use this color when drawing on the canvas
context.strokeStyle = color;


let lineWidth = 1; // default line width

document.getElementById('lineWidth').addEventListener('input', function(e) {
    lineWidth = e.target.value;
});

// Then use this line width when drawing on the canvas
context.lineWidth = lineWidth;
