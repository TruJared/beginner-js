// set up
const video = document.querySelector('.webcam');
const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');
const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');
const faceDetector = new window.FaceDetector();
const SIZE = 10;
const SCALE = 1.35;

// write a function to populate users video

async function populateVideo() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
    });
    video.srcObject = stream;
    await video.play();
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    faceCanvas.width = video.videoWidth;
    faceCanvas.height = video.videoHeight;
}

function censor({ boundingBox: face }) {
    faceCtx.imageSmoothingEnabled = false;
    faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
    // draw small face
    faceCtx.drawImage(
        video, // Where should I grab the photo from?
        face.x, // from what x and y should I start capturing from?
        face.y,
        face.width, // how wide and high should I capture from?
        face.height,
        face.x, // now to draw it, where should I start x and y?
        face.y,
        SIZE, // how wide and high should it be?
        SIZE
    );

    const width = face.width * SCALE;
    const height = face.height * SCALE;

    // then draw it back on, but scaled up
    faceCtx.drawImage(
        faceCanvas, // Where should I grab the photo from?
        face.x, // from what x and y should I start capturing from?
        face.y, // from what x and y should I start capturing from?
        SIZE,
        SIZE,
        // Drawing
        face.x - (width - face.width) / 2,
        face.y - (height - face.height) / 2,
        width,
        height
    );
}

function drawFace(face) {
    const { width, height, top, left } = face.boundingBox;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ffc600';
    ctx.lineWidth = 2;
    ctx.strokeRect(left, top, height, width);
}

async function detect() {
    const faces = await faceDetector.detect(video);
    faces.forEach(drawFace);
    faces.forEach(censor);
    requestAnimationFrame(detect);
}

populateVideo().then(detect);
