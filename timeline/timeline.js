const showDiv = document.querySelector('.show');
const container = document.querySelector('.container');
const checkbox = document.querySelector('.checker');
const timeline = document.querySelector('.timeline');
let scrolling = false;


const scrollSpeed = 2; // Adjust the scroll speed as needed
const duration = 5 * 60 * 1000 - 19000; // 5 minutes in milliseconds

let startTime;

function scrollPage(timestamp) {
    if(scrolling === true){
        if (!startTime) {
            startTime = timestamp;
            }
        
            const elapsedTime = timestamp - startTime;
        
            // Calculate the scroll position based on elapsed time and scroll speed
            const scrollPosition = (elapsedTime / duration) * (document.body.scrollHeight - window.innerHeight);
        
            // Scroll the page
            window.scrollTo(0, scrollPosition);
        
            // Continue scrolling until the duration is reached
            if (elapsedTime < duration) {
            requestAnimationFrame(scrollPage);
        }
    }
}


checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        container.classList.add('checked');
        timeline.classList.add('real');
        startTime = null; // Reset the start time
        scrolling = true;
        requestAnimationFrame(scrollPage);
    } else {
        scrolling = false;
        container.classList.remove('checked');
        timeline.classList.remove('real');
        window.scrollTo(0, 0); // Scroll back to the top
    }
});