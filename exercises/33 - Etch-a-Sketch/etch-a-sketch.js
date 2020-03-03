const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const moveAmount = 50;

// config
const { width, height } = canvas;
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = moveAmount;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// draw function
function draw({ key }) {
    hue = Math.random() * 360;
    // start the path
    ctx.beginPath();
    ctx.moveTo(x, y);
    // move x and y values
    switch (key) {
        case 'ArrowUp':
            y -= moveAmount;
            break;
        case 'ArrowRight':
            x += moveAmount;
            break;
        case 'ArrowDown':
            y += moveAmount;
            break;
        case 'ArrowLeft':
            x -= moveAmount;
            break;
        default:
            break;
    }
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.lineTo(x, y);
    ctx.stroke();
}

// keys handler
function handleKey(e) {
    if (e.key.includes('Arrow')) {
        e.preventDefault();
        draw({ key: e.key });
    }
}

// clear it with the shake
function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener(
        'animationend',
        function() {
            canvas.classList.remove('shake');
        },
        { once: true }
    );
}

// listen for key presses
window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas);
