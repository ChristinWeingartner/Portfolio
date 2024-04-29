let oneTimeCalled = false;

document.addEventListener('scroll', () => showSvg("slider-1", ".svg-1"));
document.addEventListener('scroll', () => showSvg("image-2", ".svg-2"));

function showSvg(imageId, pathSelector) {
    if(isSvgOverMiddle(imageId) && !isSvgTooHigh(imageId)) {
        if(!oneTimeCalled) {
            drawSvg(pathSelector);
            oneTimeCalled = true;
        } 
    }
    else {
        removeSvg(pathSelector);
        oneTimeCalled = false;
    }
}


function isSvgOverMiddle(imageId) {
    const projectImage = document.getElementById(imageId);
    const projectImageRect = projectImage.getBoundingClientRect();

    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Calculate the middle of the window height
    const windowMiddleY = windowHeight / 2;

    // Check if the top of the image is above the middle of the window height
    return projectImageRect.top <= windowMiddleY;
}

function isSvgTooHigh(imageId) {
    const projectImage = document.getElementById(imageId);
    const projectImageRect = projectImage.getBoundingClientRect();

    // Check if the image is on top or above the window
    return projectImageRect.top <= 0;
}

function drawSvg(pathSelector) {
    const firstProjectPaths = document.querySelectorAll(pathSelector);

    // Add a class to the paths to trigger the transition
    firstProjectPaths.forEach((path) => {
        path.classList.add('fill-transition');
    });

    // Trigger a reflow to ensure the transition class is applied before changing the fill
    void firstProjectPaths[0].offsetWidth;

    // Change the fill color to start the transition
    firstProjectPaths.forEach((path) => {
        path.style.strokeDashoffset = 0;
    });
}

function removeSvg(pathSelector) {
    const firstProjectPaths = document.querySelectorAll(pathSelector);

    // Remove a class to the paths to trigger the transition
    firstProjectPaths.forEach((path) => {
        path.classList.remove('fill-transition');
    });

}
