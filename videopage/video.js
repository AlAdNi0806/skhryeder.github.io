let listVideo = document.querySelectorAll('.video-list .vid');
let mainVideo = document.querySelector('.main-video video');
let title = document.querySelector('.main-video .title');
let description = document.querySelector('.main-video p');

listVideo.forEach(video => {
    video.onclick = () =>{
        listVideo.forEach(vid => vid.classList.remove('active'));
        video.classList.add('active');
        if(video.classList.contains('active')){
            let src = video.children[0].getAttribute('src');
            mainVideo.src = src;
            let text = video.children[1].innerHTML;
            title.innerHTML = text;
            let dsc = video.children[2].innerHTML;
            description.innerHTML = dsc;
            truncateText(description, 70);
            video.addEventListener('ended', console.log("done"));
        }
    };
});

function truncateText(element, maxLength) {
    let originalText = element.textContent;
    let truncatedText = originalText.slice(0, maxLength) + " <a href='#' class='expansion' data-action='more'>...more</a>";
    element.innerHTML = truncatedText;

    element.addEventListener('click', function (e) {
        e.preventDefault();

        if (e.target.classList.contains('expansion')) {
            if (e.target.dataset.action === 'more') {
                element.innerHTML = originalText + " <a href='#' class='expansion' data-action='less'>show less</a>";
            } else {
                element.innerHTML = truncatedText;
            }
        }
    });
}

truncateText(description, 70);
 
