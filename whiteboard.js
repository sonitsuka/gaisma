//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let drawing = false;
let mode = 'draw'; 

let addingText = false; 
let currentTextInput = null;

let textObjects = []; 
let erasingText = false; 

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

document.getElementById('saveButton').addEventListener('click', saveCanvas);

canvas.addEventListener('mousedown', function(e) {
    drawing = true;
    context.beginPath();
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
});

canvas.addEventListener('mousemove', function(e) {
    if (!drawing) return;
    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.strokeStyle = mode === 'draw' ? context.fillStyle : 'white'; 
    context.stroke();
});

canvas.addEventListener('mouseup', endDrawing);
canvas.addEventListener('mouseout', endDrawing);

function endDrawing() {
    drawing = false;
    saveCanvas();
}

document.getElementById('drawButton').addEventListener('click', function() {
    mode = 'draw';
});

document.getElementById('eraseButton').addEventListener('click', function() {
    mode = 'erase';
});

document.getElementById('clearButton').addEventListener('click', function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    textObjects = []; 
    if (currentTextInput) {
        currentTextInput.parentNode.removeChild(currentTextInput);
        currentTextInput = null;
    }
    saveCanvas();
});

document.getElementById('textButton').addEventListener('click', function() {
    if (currentTextInput) {
        currentTextInput.parentNode.removeChild(currentTextInput);
        currentTextInput = null;
    }
    addingText = true;
});

canvas.addEventListener('click', function(e) {
    if (erasingText) {
        for (let i = textObjects.length - 1; i >= 0; i--) {
            const textObject = textObjects[i];
            const textWidth = context.measureText(textObject.text).width;
            if (e.clientX >= textObject.x && e.clientX <= textObject.x + textWidth
                && e.clientY >= textObject.y - 10 && e.clientY <= textObject.y) {
                textObjects.splice(i, 1);
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

    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.style.position = 'absolute';
    textInput.style.left = (e.clientX - canvas.offsetLeft) + 'px';
    textInput.style.top = (e.clientY - canvas.offsetTop) + 'px';
    document.body.appendChild(textInput);
    textInput.focus();
    currentTextInput = textInput;

    textInput.addEventListener('input', function() {
        textInput.size = Math.max(1, textInput.value.length); 
    });

    textInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const text = textInput.value;
            context.fillText(text, parseFloat(textInput.style.left), parseFloat(textInput.style.top) + parseFloat(lineWidth));
            saveCanvas();
            textInput.parentNode.removeChild(textInput);
            currentTextInput = null;
            textObjects.push({text: text, x: parseFloat(textInput.style.left), y: parseFloat(textInput.style.top) + parseFloat(lineWidth)});
        }
    });
});

let lineWidth = 1;
document.getElementById('lineWidth').addEventListener('input', function(e) {
    lineWidth = e.target.value;
    context.lineWidth = lineWidth;
    context.font = lineWidth + "px sans-serif";
});

// Color picker
document.getElementById('colorPicker').addEventListener('input', function(e) {
    context.fillStyle = e.target.value;
});



/* ------------
// Firebase config, replace with your own config

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCw74HmErJJDC2wSUny8tdzxL-VU5Gpsc",
  authDomain: "gaisma-userspace.firebaseapp.com",
  projectId: "gaisma-userspace",
  storageBucket: "gaisma-userspace.appspot.com",
  messagingSenderId: "677439752872",
  appId: "1:677439752872:web:0d617255081d2ebc38d09d",
  measurementId: "G-DBFYSD28C7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = firebase.firestore();

async function saveCanvas() {
    const canvasData = canvas.toDataURL();
    try {
        const docRef = await db.collection('canvases').add({
            data: canvasData,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Canvas data saved with ID:', docRef.id);
    } catch (error) {
        console.error('Error:', error);
    }
}

window.addEventListener('load', async function() {
    try {
        const querySnapshot = await db.collection('canvases').orderBy('timestamp', 'desc').limit(1).get();
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const canvasData = doc.data().data;
            const img = new Image();
            img.onload = function() {
                context.drawImage(img, 0, 0);
            };
            img.src = canvasData;
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

*/
