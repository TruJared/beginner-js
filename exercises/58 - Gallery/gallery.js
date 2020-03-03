// create closure
function Gallery(gallery) {
    if (!gallery) {
        throw new Error('no gallery found');
    }

    const images = Array.from(gallery.querySelectorAll('img'));
    const modal = document.querySelector('.modal');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentImage;

    function handleKeyUp(e) {
        if (e.key === 'Escape') return closeModal();
        if (e.key === 'ArrowRight') return showNextImage();
        if (e.key === 'ArrowLeft') return showPrevImage();
    }

    function handleClickOutside(e) {
        if (e.target === e.currentTarget) closeModal();
    }

    function showNextImage(e) {
        showImage(currentImage.nextElementSibling || gallery.firstElementChild);
    }

    function showPrevImage(e) {
        showImage(currentImage.previousElementSibling || gallery.lastElementChild);
    }

    function openModal() {
        if (modal.matches('.open')) return;
        modal.classList.add('open');
        window.addEventListener('keyup', e => handleKeyUp(e));
        nextButton.addEventListener('click', e => showNextImage(e));
        prevButton.addEventListener('click', e => showPrevImage(e));
    }

    function closeModal() {
        modal.classList.remove('open');
        window.removeEventListener('keyup', e => handleKeyUp(e));
        nextButton.removeEventListener('click', e => showNextImage(e));
        prevButton.removeEventListener('click', e => showPrevImage(e));
    }

    function showImage(el) {
        if (!el) return;
        modal.querySelector('img').src = el.src;
        modal.querySelector('h2').textContent = el.title;
        modal.querySelector('figure p').textContent = el.dataset.description;
        openModal();
        currentImage = el;
    }

    images.forEach(image => image.addEventListener('click', e => showImage(e.currentTarget)));
    images.forEach(image =>
        image.addEventListener('keyup', e => {
            if (e.key === 'Enter') {
                showImage(e.currentTarget);
            }
        })
    );
    modal.addEventListener('click', e => handleClickOutside(e));
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
