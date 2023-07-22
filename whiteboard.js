const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let drawing = false;
let mode = 'draw'; // can be 'draw' or 'erase'

let addingText = false; // whether we're currently adding text
let currentTextInput = null; // to store current text input field if any

let textObjects = []; // to store all texts and their positions
let erasingText = false; // whether we're currently erasing text

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
    textObjects = []; // remove all texts
    if (currentTextInput) { // remove text input field if present
        currentTextInput.parentNode.removeChild(currentTextInput);
        currentTextInput = null;
    }
    saveCanvas();
});

document.getElementById('textButton').addEventListener('click', function() {
    // remove existing text input field if any
    if (currentTextInput) {
        currentTextInput.parentNode.removeChild(currentTextInput);
        currentTextInput = null;
    }
    addingText = true;
});

canvas.addEventListener('click', function(e) {
    if (erasingText) {
        // check if we clicked on a text
        for (let i = textObjects.length - 1; i >= 0; i--) {
            const textObject = textObjects[i];
            const textWidth = context.measureText(textObject.text).width;
            if (e.clientX >= textObject.x && e.clientX <= textObject.x + textWidth
                && e.clientY >= textObject.y - 10 && e.clientY <= textObject.y) {
                // we clicked on a text, remove it
                textObjects.splice(i, 1);
                // redraw the canvas
                context.clearRect(0, 0, canvas.width, canvas.height);
                for (const textObject of textObjects) {
                    context.fillText(textObject.text, textObject.x, textObject.y);
                }
                saveCanvas();
                return;
            }
        }
    }
    if (!addingText) return;
    addingText = false;
    // create new text input field
    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.style.position = 'absolute';
    textInput.style.left = (e.clientX - canvas.offsetLeft) + 'px';
    textInput.style.top = (e.clientY - canvas.offsetTop) + 'px';
    document.body.appendChild(textInput);
    textInput.focus();
    currentTextInput = textInput;
    textInput.addEventListener('input', function() {
        // adjust the size of the input field based on the text length
        textInput.size = Math.max(1, textInput.value.length); // at least 1
    });
    textInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const text = textInput.value;
            context.fillText(text, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            saveCanvas();
            // remove the text input field
            textInput.parentNode.removeChild(textInput);
            currentTextInput = null;
            // add this text to our array
            textObjects.push({text: text, x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop});
        }
    });
});
