/**
 * 
 * -------------------------------------
 * DOM Manipulation / Traversal Activity
 * -------------------------------------
 * 
 * 1. Create and attach an event handler (function) to each ".image" 
 * element so that when the ".image" element is clicked, the corresponding 
 * image loads in the .featured image element.

* 2. Create event handlers for the next and previous buttons. The next button should
*    show the next image in the thumbnail list. The previous should show the previous.
* 
* 3. If you get to the end, start at the beginning. 
* 
* 4. If you get to the beginning, loop around to the end.
* 
* 
*/


const images = [
    'images/field1.jpg',
    'images/purple.jpg',
    'images/jar.jpg',
    'images/green.jpg',
    'images/green1.jpg',
    'images/purple1.jpg',
    'images/magnolias.jpg',
    'images/daisy1.jpg'
];

const initScreen = () => {
    images.forEach((image, idx) => {
        document.querySelector('.cards').innerHTML += `
            <li class="card">
                <div class="image" 
                    style="background-image:url('${image}')"
                    data-index="${idx}"></div>
            </li>`;
    });
};

initScreen();

let currentIndex = 0;

// Step One 

const makeFeatured = (ev) => {
        const singleImage = ev.currentTarget;
        const newIndex = Number(singleImage.dataset.index);
        currentIndex = newIndex;
        document.querySelector('div').style.backgroundImage = singleImage.style.backgroundImage;
};

const allImages = document.querySelectorAll('.image');

for (const singleImage of allImages) {
    singleImage.onclick = makeFeatured;
};

// Step Two


const showNext = (ev) => {
    currentIndex += 1;
    if (currentIndex > (allImages.length - 1)) {
        currentIndex = 0;
    } 
    const calledImage = allImages[currentIndex];
    document.querySelector('div').style.backgroundImage = calledImage.style.backgroundImage;
    
};

const showPrevious = (ev) => {
    currentIndex -= 1;
    if (currentIndex < 0) {
        currentIndex = (allImages.length - 1);
    }
    const calledImage = allImages[currentIndex];
    document.querySelector('div').style.backgroundImage = calledImage.style.backgroundImage;

};


document.querySelector('.next').onclick = showNext;
document.querySelector('.prev').onclick = showPrevious;
document.querySelector('.featured_image').onclick = showNext;
