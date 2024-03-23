    // Double click gallery app: 

const tabsContainer = document.querySelector('.tabs-container')
export function createGallery() {
    let index = 0;

    const galleryIcon = document.querySelector('.icons--gallery');
    
    galleryIcon.addEventListener('dblclick', (event) => {
        event.stopPropagation();
    
        const applicationContainer = document.querySelector('.application-container');
        applicationContainer.classList.toggle('visible'); 
        applicationContainer.style.width = '65%';
        applicationContainer.style.height = '85%';
    
        // change app title
        const appName = document.querySelector('.app-name');
        appName.textContent = 'Gallery';
    
        // Check if gallery container already exists
        if (!document.querySelector('.gallery-container')) {
            // Create gallery container div
            const galleryContainer = document.createElement('div');
            galleryContainer.classList.add('gallery-container');
    
            // Make gallery header
            const galleryHeader = document.createElement('div');
            galleryHeader.classList.add('gallery-header');
    
            // Make nav buttons to move back and forth
            const prevButton = document.createElement('button');
            prevButton.textContent = 'Previous';
            prevButton.addEventListener('click', () => switchImages(-1));
    
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.addEventListener('click', () => switchImages(1));
    
            galleryHeader.appendChild(prevButton);
    
            // Make image containers
            const images = [
                {src: './assets/gallery/pikachu.jpg', alt: 'pika', text: 'pikachu.jpeg'},
                {src: './assets/gallery/eevee.jpg', alt: 'eevee', text: 'eevee.jpeg' },
                {src: './assets/gallery/snorlax.jpg', alt: 'snorlax', text: 'snorlax.jpeg' },
                {src: './assets/gallery/jigglypuff.jpg', alt: 'jiggly', text: 'jigglypuff.jpeg'},
                {src: './assets/gallery/ditto.jpg', alt: 'ditto', text: 'ditto.jpeg'}
            ];
    
            const zoomDiv = document.createElement('div');
            zoomDiv.classList.add('zoom');
    
            // Set the zoom div as the first image
            const firstImg = document.createElement('img');
            firstImg.classList.add('view-img');
            firstImg.src = images[0].src;
            firstImg.alt = images[0].alt;
    
            zoomDiv.appendChild(firstImg);
    
            galleryHeader.appendChild(zoomDiv);
            galleryHeader.appendChild(nextButton);
    
            // Create gallery-box div to wrap img-container elements
            const galleryBox = document.createElement('div');
            galleryBox.classList.add('gallery-box');
    
            images.forEach(image => {
                const imgContainer = document.createElement('div');
                imgContainer.classList.add('img-container');
    
                const img = document.createElement('img');
                img.classList.add('gallery-img');
                img.src = image.src;
                img.alt = image.alt;
    
                img.addEventListener('click', () => {
                    const zoomImg = document.querySelector('.view-img');
                    zoomImg.src = image.src;
                    zoomImg.alt = image.alt;
                });
    
                const paragraph = document.createElement('p');
                paragraph.textContent = image.text;
    
                imgContainer.appendChild(img);
                imgContainer.appendChild(paragraph);
    
                galleryBox.appendChild(imgContainer);
            });
    
            galleryContainer.appendChild(galleryHeader);
            galleryContainer.appendChild(galleryBox);
    
            // Add gallery container to applicationContainer
            applicationContainer.appendChild(galleryContainer);
    
            // create a gallery tab on the taskbar
            const newTab = document.createElement('div');
            newTab.className = 'tab-item gallery-tab';  
    
            const tabText = document.createElement('p');
            tabText.textContent = 'Gallery';
    
            newTab.appendChild(tabText);
            tabsContainer.appendChild(newTab);
        }
    });
    
    // function to move between images
    function switchImages(direction) {
        index += direction;
        const images = document.querySelectorAll('.gallery-img');
    
        if (index < 0) {
            index = images.length - 1;
        } else if (index >= images.length) {
            index = 0;
        }
    
        const zoomImg = document.querySelector('.view-img');
        zoomImg.src = images[index].src;
        zoomImg.alt = images[index].alt;
    }
    
}
