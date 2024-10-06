document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.querySelector('.image-container');
    const sharpSpot = document.querySelector('.sharp-spot');
    const image = document.querySelector('.blurred-image');
    const slides = document.querySelectorAll('.swiper-slide');
    
    let zoomLevel = 1.5;
    const zoomFactor = 0.1;
    const sharpSpotSize = 280; // Assuming sharpSpot is 300x300

    imageContainer.addEventListener('mousemove', zooming);
    // imageContainer.addEventListener('touchmove', zooming);

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);

        };
    }

    function toggleBlur() {
        image.classList.remove('disable-blur')
    }

    const toggleBlurDebounced = debounce(toggleBlur, 100);

    function zooming(event) {
        image.classList.add('disable-blur')
        toggleBlurDebounced()

        const { offsetX, offsetY } = event;

        const left = Math.min(Math.max(0, offsetX - sharpSpotSize / 2), imageContainer.clientWidth - sharpSpotSize);
        const top = Math.min(Math.max(0, offsetY - sharpSpotSize / 2), imageContainer.clientHeight - sharpSpotSize);

        sharpSpot.style.left = `${left}px`;
        sharpSpot.style.top = `${top}px`;
        sharpSpot.style.backgroundImage = `url('${image.src}')`;
        // sharpSpot.style.backgroundPosition = `-${left * zoomLevel}px -${top * zoomLevel}px`;
        sharpSpot.style.backgroundPosition = `-${(offsetX * zoomLevel) - (sharpSpotSize / 2)}px -${(offsetY * zoomLevel) - (sharpSpotSize / 2)}px`;
        sharpSpot.style.backgroundSize = `${imageContainer.clientWidth * zoomLevel}px ${imageContainer.clientHeight * zoomLevel}px`;
    };

    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            
            const activeSource = slides[index].dataset.image;
            
            if(activeSource) {
                image.src = 'images/' + activeSource;
                sharpSpot.style.backgroundImage = `url('${image.src}')`;
                sharpSpot.style.left = `0px`;
                sharpSpot.style.top = `0px`;
            }
        });
    });
});